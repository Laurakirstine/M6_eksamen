// Importerede funktioner fra firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.12.1/firebase-app.js";
import {
  getFirestore,
  collection,
  getDocs,
  onSnapshot,
  addDoc,
  deleteDoc,
  doc,
  updateDoc
} from "https://www.gstatic.com/firebasejs/12.12.1/firebase-firestore.js";


//Firebase konfiguration
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

// Kollektion reference i firebase
const colRef = collection(db, "opgaver");

// Hent alle dokumenter i kollektion "opgaver"
getDocs(colRef)
    .then((snapshot) => {
        console.log(snapshot.docs);
    });
    
/**
 * Gem en ny opgave i Firestore
 * @param {string} opgavenavn Navn på opgaven
 * @param {string} beskrivelse Kort beskrivelse af opgaven
 * @param {Date} deadline Deadline for opgaven
 * @param {boolean} status Beskriver om opgaven er afsluttet eller ej
 */
export const saveTask = (opgavenavn, beskrivelse, deadline, status) =>
  addDoc(collection(db, "opgaver"), 
    { 
      opgavenavn, 
      beskrivelse, 
      deadline: new Date(deadline), 
      status 
    });

export const onGetTasks = (callback) =>
  onSnapshot(collection(db, "opgaver"), callback);

/**
 * Håndtering af en opgave (slet eller opdater)
 * @param {string} id Opgave ID
 */
export const deleteTask = (id) => deleteDoc(doc(db, "opgaver", id));

export const updateTask = (id, newFields) =>
  updateDoc(doc(db, "opgaver", id), newFields);


