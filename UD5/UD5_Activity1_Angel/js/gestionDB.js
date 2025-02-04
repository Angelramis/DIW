// GESTIÓN DB FIREBASE GENERAL //

import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-firestore.js"


// Gestión iniciar Firebase y FireStore //
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

// FUNCIONES //

// Función para obtener las noticias en base de datos
export function obtenerNoticias() {
  getDocs(collection)
}


// Función para guardar noticia en la base de datos
export function guardarNoticia(newNews) {
  // id, title, subtitle, author, creation_date, modification_date, content, state
  addDoc(collection(db, "news"), newNews);
}

