// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.2.0/firebase-app.js";
import { getFireStore, collection, addDoc, getDocs} from "https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDRXQ8uQImchOqyLO2AK6WDPBQ-aR9Cj5Q",
  authDomain: "tasks-aa221.firebaseapp.com",
  projectId: "tasks-aa221",
  storageBucket: "tasks-aa221.firebasestorage.app",
  messagingSenderId: "382622941300",
  appId: "1:382622941300:web:ec9e88888293fb53b15121"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFireStore();

export const saveTask = (title, description, priority) => {
 addDoc(collection(db, "tasks"), {title, description, priority });
}
