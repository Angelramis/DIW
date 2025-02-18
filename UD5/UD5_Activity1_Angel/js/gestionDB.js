import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
import { doc, getFirestore, collection, setDoc, getDocs, getDoc, deleteDoc, updateDoc } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js";


// Gestión iniciar Firebase
const firebaseConfig = {
  apiKey: "AIzaSyD5VfqH2sDcSMFeSRSuTJKKp2AekkclMww",
  authDomain: "whale-project-angel.firebaseapp.com",
  projectId: "whale-project-angel",
  storageBucket: "whale-project-angel.firebasestorage.app",
  messagingSenderId: "724353017224",
  appId: "1:724353017224:web:642a6760848421a576463d"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore();


// FUNCIONES

// Función para obtener elementos en base de datos
export async function obtenerElementos(nombreColeccion) {
  let coleccion = collection(db, nombreColeccion); // Obtener colección pasada

  let elementosSnapshot = await getDocs(coleccion); // Obtener elementos
   
  let elementos = elementosSnapshot.docs.map(doc => ({
                  ...doc.data(), 
                  id: doc.id     
                }));

  return elementos;
}


// Obtener elemento individual por su ID
export function obtenerElemento(nombreColeccion, idElemento) {
  let coleccion = collection(db, nombreColeccion);

  let elemento = getDoc(doc(coleccion, idElemento));

  return elemento;
}

// Añadir un elemento a Firestore
export function addElemento(nombreColeccion, idElemento, elemento) {
  let coleccion = collection(db, nombreColeccion); // Obtener colección pasada

  try {
  setDoc(doc(coleccion, idElemento.toString()), elemento); 
  } catch(error) {
    console.log("Error guardando elemento: ", error);
  }
}

// Eliminar un elemento
export function eliminarElemento(nombreColeccion, idElemento) {
  let coleccion = collection(db, nombreColeccion);

  // Eliminar el que tiene el id especificado
  deleteDoc(doc(coleccion, idElemento));
}

// Actualizar datos de un elemento
export function actualizarElemento(nombreColeccion, idElemento, nuevosDatos) {
  let coleccion = collection(db, nombreColeccion);

  updateDoc(doc(coleccion, idElemento), nuevosDatos);
}

