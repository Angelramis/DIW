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

const db = getFirestore(app);


// FUNCIONES

// Función para obtener elementos en base de datos
export async function obtenerElementos(nombreColeccion, busquedaElemento = "") {
  let coleccion = collection(db, nombreColeccion); // Obtener colección pasada

  let elementosSnapshot = await getDocs(coleccion); // Obtener elementos
   
  let elementos = elementosSnapshot.docs.map(doc => ({
                  ...doc.data(), 
                  id: doc.id     
                }));

  // Gestión búsquedas específicas

  // Validar si no se ha escrito nada en busqueda
  if (!busquedaElemento) {
    return elementos;
  }

  let nombreLowerCase = busquedaElemento.toLowerCase();

  // Filtrar según nombre colección
  if (nombreColeccion == "users") {
    // Filtrar usuarios por nombre
    elementos = elementos.filter(elemento =>
      elemento.name && elemento.name.toLowerCase().includes(nombreLowerCase)
    );
  } else if (nombreColeccion == "news") {
    // Filtrar noticias por titulo
    elementos = elementos.filter(elemento =>
      elemento.title && elemento.title.toLowerCase().includes(nombreLowerCase)
    );
  }

  return elementos;
}


// Obtener elemento individual por su ID
export async function obtenerElemento(nombreColeccion, idElemento) {
  try {
    let coleccion = collection(db, nombreColeccion);

    let docRef = doc(coleccion, idElemento.toString());
    let docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    } else {
      showMessage("Error: l'element no existeix");
    }
  } catch (error) {
    showMessage("Error obtingent l'element: " + error, "show");
  }
}

// Añadir un elemento a Firestore
export async function addElemento(nombreColeccion, idElemento, elemento) {
  let coleccion = collection(db, nombreColeccion); // Obtener colección pasada

  let errorGuardant = false;

  try {
    await setDoc(doc(coleccion, idElemento), elemento); 
  } catch(error) {
    showMessage("Error guardant l'element: " + error, "show");
    errorGuardant = true;
  }

  if (errorGuardant == false) {
    showMessage("L'element s'ha guardat correctament.", "show");
  }
}

// Eliminar un elemento
export async function eliminarElemento(nombreColeccion, idElemento) {
  let coleccion = collection(db, nombreColeccion);

  // Eliminar el que tiene el id especificado
  try {
    await deleteDoc(doc(coleccion, idElemento));
  } catch(error) {
    showMessage("Error eliminant l'element: " + error, "show");
  }
}

// Actualizar datos de un elemento
export async function actualizarElemento(nombreColeccion, idElemento, elemento) {
  let coleccion = collection(db, nombreColeccion);

  let errorPublicant = false;

  try {
    await updateDoc(doc(coleccion, idElemento), elemento);
  } catch (error) {
    showMessage("Error actualitzant l'element: " + error, "show");
    errorPublicant = true;
  }

  if (errorPublicant == false) {
    showMessage("L'element s'ha actualitzat correctament.", "show");
  }
}