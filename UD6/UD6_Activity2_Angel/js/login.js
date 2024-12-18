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
    let user = users.find(user => user.email == email);
    console.log(user); 

    // Verificación si los campos están vacíos
    if (email == "" || password == "") {
      showError(errorHTML, "Cap camp pot estar buit");
      return;
    }

    // Verificación si no se encuentra el usuario
    if (!user) {
      showError(errorHTML, "Usuari no trobat");
      return;
    }

    // Validar que contraseña sea la misma al usuario
    if (!validatePassword(password, user.password_hash, user.salt)) {
      showError(errorHTML, "Contrassenya incorrecta");
      return;
    }

    // Guardar el usuario correcto para tener sus datos en todas las páginas.
    // Cambios de usuario hacerlos en users.
    let loggedUser = localStorage.setItem('loggedUser', JSON.stringify(user));

    // Redirección de usuario si los campos son correctos
    if (user.is_first_login) {
      window.location.href = "change_password.html";
    } else { // Si la contraseña ya la actualizó el usuario
      console.log("Inici de sessió correcte");
      window.location.href = "edit_users.html";
    }
  });
});