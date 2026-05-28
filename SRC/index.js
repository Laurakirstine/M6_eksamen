//Henter navigationsmenu
fetch("../navigationsmenu.html")
  .then(response => response.text())
  .then(data => {
    const container = document.getElementById("menu-container");
    if (container) {
      container.innerHTML = data;
    }
  })
  .catch(error => console.error("Fejl ved indlæsning af menu:", error));

//Henter Firebase funktioner
import { 
    onGetTasks, 
    saveTask, 
    deleteTask, 
    getTask,
    updateTask, 
} from "./firebaseconfig.js";
 
//Funktion til at opdatere status på en opgave
const updateTaskStatus = (id, status) => {
    updateTask(id, { status });
};

// Håndtering af tilføj opgaver til tilføj_opgave.html
if (document.querySelector('h1') && document.querySelector('h1').textContent === 'Tilføj opgave') {
    const opgaveForm = document.getElementById('opgaveForm');

    opgaveForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const titel = document.getElementById('opgaveTitel').value;
        const beskrivelse = document.getElementById('opgaveBeskrivelse').value;
        const deadline = document.getElementById('opgaveDeadline').value;
        saveTask(titel, beskrivelse, deadline, false);
        opgaveForm.reset();
        alert('Opgave tilføjet!');
    });
}

// hent og vis opgaver på opgaveplanner siden
if (document.getElementById('tasks-list')) {
    const tasksList = document.getElementById('tasks-list');
    let currentTasks = []; // Store tasks to apply sorting when dropdown changes
    
    // Sorting functions
    const sortTasks = (tasks, sortType) => {
        const tasksCopy = [...tasks]; // Create a copy to avoid mutating original
    
        switch(sortType) {
            case 'alphabetical':
                return tasksCopy.sort((a, b) => 
                    (a.opgavenavn || '').localeCompare(b.opgavenavn || '')
                );
        
            case 'date-asc':
                return tasksCopy.sort((a, b) => {
                    const dateA = a.deadline?.seconds || Infinity;
                    const dateB = b.deadline?.seconds || Infinity;
                    return dateA - dateB;
                });
        
            case 'date-desc':
                return tasksCopy.sort((a, b) => {
                    const dateA = a.deadline?.seconds || 0;
                    const dateB = b.deadline?.seconds || 0;
                    return dateB - dateA;
                });
        
            default:
                return tasksCopy;
        }
    };

    // Funktion til render tasks
    const renderTasks = (tasks) => {
       /* console.log("Rendering tasks:", tasks); / Debug log */
        tasksList.innerHTML = ''; // Clear existing content
        
        tasks.forEach((task) => {
            const taskData = task;
            
            const taskElement = document.createElement('div');
            taskElement.classList.add('task-item'); // Optional: Add a class for styling


            if (taskData.status) {
                taskElement.classList.add('completed');
            }
            
            taskElement.innerHTML = `
                <h3>${taskData.opgavenavn || 'Untitled Task'}</h3>
                <p>${taskData.beskrivelse || 'No description'}</p>
                <p>Deadline: ${taskData.deadline ? new Date(taskData.deadline.seconds * 1000).toLocaleDateString() : 'No deadline'}</p>
                
                <div class="task-actions">
                    <label class="status-label">
                        <input
                            type="checkbox"
                            class="status-checkbox"
                            data-id="${task.id}"
                            ${taskData.status ? 'checked' : ''}
                        />
                    </label>

                    <button class="delete-btn" data-id="${task.id}">Delete</button>
                </div>
            `;
            tasksList.appendChild(taskElement);

        });

        //Event listeners for status checkboxes
        document.querySelectorAll('.status-checkbox').forEach(checkbox => {
            checkbox.addEventListener('change', (e) => {
                const taskId = e.target.getAttribute('data-id');
                const isChecked = e.target.checked;
                updateTaskStatus(taskId, isChecked);
            });
        });

        // tilføj event listeners til delete knapper
        document.querySelectorAll('.delete-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const taskId = e.target.getAttribute('data-id');
                deleteTask(taskId); // This will trigger onGetTasks to re-render
            });
        });
    };

    // Handle sort dropdown - moved OUTSIDE renderTasks
    const sortSelect = document.getElementById('sort-select');
    if (sortSelect) {
        sortSelect.addEventListener('change', (e) => {
            const sortType = e.target.value;
            localStorage.setItem('taskSortPreference', sortType);
            // Re-render with new sort order
            const sortedTasks = sortTasks(currentTasks, sortType);
            renderTasks(sortedTasks);
        });
    }
    
    //Hent opdatering af opgavestatus
    onGetTasks((snapshot) => {
        console.log("onGetTasks triggered, snapshot docs:", snapshot.docs.length); // Debug log
        let tasks = snapshot.docs.map(doc => ({ 
            id: doc.id, ...doc.data() 
        }));

        if ( 
            document.querySelector('h1') && document.querySelector('h1').textContent === 'Igangværende opgaver'
        ) {
            tasks = tasks.filter(task => task.status === false);
        }

        if ( 
            document.querySelector('h1') && document.querySelector('h1').textContent === 'Afsluttede opgaver'
        ) {
            tasks = tasks.filter(task => task.status === true);
        }

        currentTasks = tasks; // Store the filtered tasks
        const sortPreference = document.getElementById('sort-select')?.value || 'none';
        tasks = sortTasks(tasks, sortPreference);

        renderTasks(tasks);
    });
}