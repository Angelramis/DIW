// Imports
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.3.0/firebase-app.js";
import { getFirestore, doc, collection, getDocs, addDoc, setDoc, deleteDoc, getDoc, updateDoc } from "https://www.gstatic.com/firebasejs/11.3.0/firebase-firestore.js";

// Configuración e inicialización Firestore
const firebaseConfig = {
  apiKey: "AIzaSyBRw-i-_txaKxKKevBfMflYEPj8ZH5Tp30",
  authDomain: "tareas-examen.firebaseapp.com",
  projectId: "tareas-examen",
  storageBucket: "tareas-examen.firebasestorage.app",
  messagingSenderId: "256693265947",
  appId: "1:256693265947:web:24fc2af2dd24f351f1babe",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Variables
let coleccionTareas = collection(db, "tareas");

// FUNCIONES

export async function obtenerTareas() {
  let tareasSnapshot = await getDocs(coleccionTareas);

  // Declarar el contenido de la noticia y también su id generado automáticamente
  let tareas = tareasSnapshot.docs.map(doc => ({
    ...doc.data(), 
    id: doc.id     
  }));

  return tareas;
}

// Obtener tarea individual por su ID
export function obtenerTarea(idTarea) {
  let tarea = getDoc(doc(coleccionTareas, idTarea));

  return tarea;
}

export function addTarea(tarea) {
  addDoc(coleccionTareas, tarea);
}

export function eliminarTarea(idTarea) {
  // Eliminar el elemento con el id especificado
  deleteDoc(doc(coleccionTareas, idTarea));
}

// Actualizar datos en BBDD de tarea
export function actualizarTarea(idTarea, nuevosDatos) {
  updateDoc(doc(coleccionTareas, idTarea), nuevosDatos);
}