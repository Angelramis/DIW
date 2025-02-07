// GESTIÓN DB FIREBASE GENERAL //

import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
import { doc, getFirestore, collection, addDoc, setDoc, getDocs } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js"


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

// Variables
let newsCollection = collection(db, "news");

// FUNCIONES

// Función para obtener las noticias en base de datos
export async function obtenerNoticias() {
  const querySnapshot = await getDocs(newsCollection); // Obtener colección noticias
   
  let savedNews = querySnapshot.docs.map((doc) => doc.data());

  return savedNews;
}

// export async function guardarNoticia(newsID, newNews) {
//   let newsRef = doc(newsCollection, String(newsID)); // Asignar ID, como String

//   await setDoc(newsRef, newNews); // Añadir a Firestore
// }

// Función para guardar noticia en la base de datos con addDoc
export function guardarNoticia(newNews) {
  addDoc(newsCollection, newNews);
}