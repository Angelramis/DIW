// Imports
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.3.0/firebase-app.js";
import { getFirestore, doc, collection, getDocs, addDoc, setDoc, deleteDoc } from "https://www.gstatic.com/firebasejs/11.3.0/firebase-firestore.js";

// Configuración e inicialización Firestore
const firebaseConfig = {
  
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


export async function addTarea(tarea) {
  
  await addDoc(coleccionTareas, tarea);
}

export function eliminarTarea(idTarea) {
  // Eliminar el elemento con el id especificado
  deleteDoc(doc(coleccionTareas, idTarea));
}