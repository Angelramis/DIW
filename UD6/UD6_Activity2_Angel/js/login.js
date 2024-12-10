$(document).ready(function () {
  console.log(JSON.parse(localStorage.getItem('users')));
  
  /* Gestión formulario LOGIN */

  $("#formLogin").on("submit", function (e) {
    e.preventDefault();

    let email = $("#loginEmail").val();
    let password = $("#loginPassword").val();
    let users = JSON.parse(localStorage.getItem('users'));

    // Buscar usuario por email
    let user = users.find(user => user.email === email);

    if (!user) {
      console.log("Usuari o contrassenya incorrectes");
      return;
    }

    // Validar contraseña
    if (!validatePassword(password, user.password_hash, user.salt)) {
      console.log("Usuari o contrassenya incorrectes");
      return;
    }

    // Redirigir usuario al iniciar sesión
    if (user.is_first_login) {
      console.log("és necesari canviar la contrassenya");
      window.location.href = "change_password.html";
    } else {
      console.log("Inici de sessió correcte");
      window.location.href = "edit_users.html";
    }
  });
});