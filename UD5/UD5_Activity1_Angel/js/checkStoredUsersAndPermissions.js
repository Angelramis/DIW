import { obtenerElementos, addElemento, obtenerElemento } from "./gestionDB.js";


/* Incicializar elementos */
let admin_a = "";
let edit_news_a = "";
let logout_a = "";
let login_bar = "";

/* Función para comprobar si el usuario no ha iniciado sesión,
ocultándole elementos no necesarios/permitidos */
function checkLogout() {
  /* Elementos DOM para ser ocultados o mostrados */
  admin_a = $("#edit-users-a");
  edit_news_a = $("#edit-news-a");
  logout_a = $(".logout-bar");
  login_bar = $(".login-bar");

  let loggedUser = localStorage.getItem('loggedUser');

  // Si no está logeado
  if (!loggedUser) {
    $(logout_a).addClass("hide");
    $(edit_news_a).addClass("hide");
    $(admin_a).addClass("hide");
    $(login_bar).removeClass("hide");
  } else if (loggedUser) {
    $(logout_a).removeClass("hide");
    $(login_bar).addClass("hide");
    
    // Si el usuario tiene permisos de editar usuarios
    if (loggedUser.edit_users) {
      $(admin_a).removeClass("hide");
    }

    // Si el usuario tiene permisos de editar noticias
    if (loggedUser.edit_news) {
      $(admin_a).removeClass("hide");
    }
  }

}

/* Verificar si hay usuarios en localStorage */
$(document).ready(async function () {
  
  checkLogout(logout_a, admin_a);

  let users = await obtenerElementos("users");

  // Si no existen usuarios guardados, crear uno por defecto
  if (users.length == 0) {

    // Creación usuario por defecto
    let defaultUser = {
      id: (1).toString(),
      name: "admin",
      email: "desenvolupador@iesjoanramis.org", // Directamente hash y salt
      password_hash: "961408558045f2698f3f273e593aade113310696f8b85dcb5f4887d26118e8de",
      salt: "85da85a60855172eb579e23b282169c4",
      edit_users: true,
      edit_news: true,
      edit_bone_files: true,
      active: true,
      is_first_login: true
    };
    
    // Guardar usuario por defecto en Firebase
    addElemento("users", defaultUser.id, defaultUser);
  }


  // Al pulsar logout en header, si hay un usuario loggeado, deslogear
  $(logout_a).on("click", function (event) {
    let loggedUser = localStorage.getItem('loggedUser');
    
    if (loggedUser) {
      localStorage.removeItem('loggedUser');
      console.log("Sesión cerrada");
      
      checkLogout();
    }

  });

});

