$(document).ready(function () {

  // Gestión formulario change password
  $("#formChangePassword").on("submit", function (e) {
    e.preventDefault();

    //Obtener elementos del DOM
    let newPassword = $("#new_password").val();
    let repeatedPassword = $("#repeated_password").val();
    let users = JSON.parse(localStorage.getItem('users')); // todos los usuarios
    let loggedUser = JSON.parse(localStorage.getItem('loggedUser')); // usuario logeado
    let errorHTML = $("#text_error");

    // Vaciar parágrafo de error
    errorHTML.html("");

    // Verificación si los campos están vacíos
    if (newPassword == "" || repeatedPassword == "") {
      showError(errorHTML, "Cap camp pot estar buit");
      return;
    }

    // Validar sintaxis del nuevo password
    validatePasswordSyntax(newPassword);

    // Validar que el password repetido sea el mismo
     if (newPassword != repeatedPassword) {
      showError(errorHTML, "Les contrasssenyes han de coincidir");
      return;
     }
    
    // Encriptar nueva contraseña
    let salt = generateSalt();
    let saltedPassword = newPassword + salt;
    let passwordHash = CryptoJS.SHA256(saltedPassword).toString();

    // -- Actualizar datos del usuario -- //

    // Localizar en users el usuario logeado por ID
    let loggedUserID = users.findIndex(user => user.id == loggedUser.id);
    console.log("ID del usuario logeado: " + loggedUserID);

    // Si encuentra el usuario, actualizar datos
    if (loggedUserID !== -1) {
      users[loggedUserID].password_hash = passwordHash;
      users[loggedUserID].salt = salt;
      users[loggedUserID].is_first_login = false;

      console.log(users);

      // Actualizar cambios en tabla de usuarios
      localStorage.setItem("users", JSON.stringify(users));

       // Actualizar datos del usuario logeado en LS loggedUser
       loggedUser.password_hash = passwordHash;
       loggedUser.salt = salt;
       loggedUser.is_first_login = false;
       localStorage.setItem("loggedUser", JSON.stringify(loggedUser));

       console.log("Datos y contraseña cambiados correctemante");
      
       // Redirigir al usuario
       if (loggedUser.edit_bone_files) {
        window.location.href = "edit_users.html";
       } else {
        window.location.href = "../index.html";
       }
       
    } else {
      showError(errorHTML, "Error: l'usuari no s'ha trobat.");
      return;
    }



  });




});