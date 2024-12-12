$(document).ready(function () {

  // Funcion para validar el password acorde a los requerimientos
  function validateSecurePassword(input) {
    validatePasswordLength(input, 12, 25);
  }

  // Gestión formulario change password
  $("#formChangePassword").on("submit", function (e) {
    e.preventDefault();
    //Obtener elementos del DOM
    let oldPassword = $("#old_password").val();
    let newPassword = $("#new_password").val();
    let users = JSON.parse(localStorage.getItem('users'));


    // Validar que el password old sea el mismo
    // if (oldPassword == )

  });




});