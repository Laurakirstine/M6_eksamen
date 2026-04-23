import { 
    onGetTasks, 
    saveTask, 
    deleteTask, 
    getTask,
    updateTask, 
} from "./firebaseconfig.js";
 



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


  console.log("JS loaded");
