$(document).ready(function () {
  console.log(JSON.parse(localStorage.getItem('users')));
  
  /* Gestión formulario LOGIN */

  $("#formLogin").on("submit", function (e) {
    e.preventDefault();
    
    // Elementos del DOM
    let email = $("#loginEmail").val();
    let password = $("#loginPassword").val();
    let errorHTML = $("#text_error");

    // Obtener usuarios en LS
    let users = JSON.parse(localStorage.getItem('users'));

    // Vaciar parágrafo de error
    errorHTML.html("");

    // Buscar usuario por email
    let user = users.find(user => user.email === email);

    // Verificación si los campos están vacíos
    if (email == "" || password == "") {
      errorHTML.html("Cap camp pot estar buit");
      return;
    }

    // Verificación si no se encuentra el usuario
    if (!user) {
      errorHTML.html("Usuari no trobat");
      return;
    }

    // Validar que contraseña sea la misma al usuario
    if (!validatePassword(password, user.password_hash, user.salt)) {
      errorHTML.html("Contrassenya incorrecta");
      return;
    }

    // Redirección de usuario si los campos son correctos
    if (user.is_first_login) {
      window.location.href = "change_password.html";
    } else { // Si su contraseña ya la actualizó el usuario
      console.log("Inici de sessió correcte");
      window.location.href = "edit_users.html";
    }
  });
});