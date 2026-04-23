// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.12.1/firebase-app.js";
import {
  getFirestore,
  collection,
  getDocs,
  onSnapshot,
  addDoc,
  deleteDoc,
  doc,
  getDoc,
  updateDoc
} from "https://www.gstatic.com/firebasejs/12.12.1/firebase-firestore.js";




// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBlKdlqTVRtGWwu_JzuHhfCe5C8wiBbA7k",
  authDomain: "m6firebase-346b7.firebaseapp.com",
  projectId: "m6firebase-346b7",
  storageBucket: "m6firebase-346b7.firebasestorage.app",
  messagingSenderId: "145435402776",
  appId: "1:145435402776:web:b762237ddeda899ee4996d",
  measurementId: "G-NTNMT8760P"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

// Collection reference
const colRef = collection(db, "opgaver");

// Get all documents
getDocs(colRef)
    .then((snapshot) => {
        console.log(snapshot.docs);
    });
    
/**
 * Save a New Task in Firestore
 * @param {string} title the title of the Task
 * @param {string} description the description of the Task
 */
export const saveTask = (title, description) =>
  addDoc(collection(db, "tasks"), { title, description });

export const onGetTasks = (callback) =>
  onSnapshot(collection(db, "tasks"), callback);

/**
 *
 * @param {string} id Task ID
 */
export const deleteTask = (id) => deleteDoc(doc(db, "tasks", id));

export const getTask = (id) => getDoc(doc(db, "tasks", id));

export const updateTask = (id, newFields) =>
  updateDoc(doc(db, "tasks", id), newFields);

export const getTasks = () => getDocs(collection(db, "tasks"));