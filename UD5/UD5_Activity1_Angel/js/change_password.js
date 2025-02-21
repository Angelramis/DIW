import { obtenerElementos, actualizarElemento, obtenerElemento } from "../js/gestionDB.js";

$(document).ready(async function () {

  // Identificar el usuario de Firebase y el logged In de LocalStorage

  // Usuario log in en LS
  let loggedUser = JSON.parse(localStorage.getItem('loggedUser'));
  
  if (loggedUser.id) {
    console.log("ID del usuario logeado LS: " + loggedUser.id);
  } else {
    showError(errorHTML, "Error: l'usuari no s'ha trobat.");
    return;
  }
    
  // Identificar usuario de Firebase con su ID
  let user = await obtenerElemento("users", (loggedUser.id).toString());
  console.log("Usuario de firebase: ", user);
  

  // Gestión formulario al darle a submit
  $("#formChangePassword").on("submit", async function (e) {
    e.preventDefault();

    //Obtener elementos del DOM
    let newPassword = $("#new_password").val();
    let repeatedPassword = $("#repeated_password").val();
    let errorHTML = $("#text_error");

    // Vaciar parágrafo de error
    errorHTML.html("");

    // Verificación si los campos están vacíos
    if (newPassword == "" || repeatedPassword == "") {
      showError(errorHTML, "Cap camp pot estar buit");
      return;
    }

    // Validar que el password repetido sea el mismo
     if (newPassword != repeatedPassword) {
      showError(errorHTML, "Les contrasssenyes han de coincidir");
      return;
     }

    // Validar sintaxis del nuevo password
    validatePasswordSyntax(newPassword);
    
    // Si las contraseñas son correctas, encriptar nueva contraseña
    let salt = generateSalt();
    let saltedPassword = newPassword + salt;
    let passwordHash = CryptoJS.SHA256(saltedPassword).toString();

     
    // Actualizar datos en loggedUser LS
    loggedUser.password_hash = passwordHash;
    loggedUser.salt = salt;
    loggedUser.is_first_login = false;

    localStorage.setItem("loggedUser", JSON.stringify(loggedUser));
    console.log(loggedUser);

    // Actualizar datos del usuario en Firebase
    user = {
      name: user.name,
      email: user.email,
      password_hash: passwordHash,
      salt: salt,
      edit_news: user.edit_news,
      edit_users: user.edit_users,
      edit_bone_files: user.edit_bone_files,
      is_first_login: false,
      active: user.active
    };

    // Actualizarlo en la base de datos
    await actualizarElemento("users", loggedUser.id.toString(), user);

    console.log("Datos y contraseña cambiados correctemante");
      
    // Redirigir al usuario
    console.log("redirigiendo");
    if (loggedUser.edit_bone_files) {
      window.location.href = "edit_users.html";
    } else {
      window.location.href = "../index.html";
    }
  });
});