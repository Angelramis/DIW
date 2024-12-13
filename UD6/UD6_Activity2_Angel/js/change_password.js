$(document).ready(function () {

  // Gestión formulario change password
  $("#formChangePassword").on("submit", function (e) {
    e.preventDefault();

    //Obtener elementos del DOM
    let oldPassword = $("#old_password").val();
    let newPassword = $("#new_password").val();
    let users = JSON.parse(localStorage.getItem('users'));
    let errorHTML = $("#text_error");

    // Vaciar parágrafo de error
    errorHTML.html("");

    // Verificación si los campos están vacíos
    if (oldPassword == "" || newPassword == "") {
      showError(errorHTML, "Cap camp pot estar buit");
      return;
    }

    // Validar que el password antiguo sea el mismo
    // if (oldPassword == )



    // Validar sintaxis del nuevo password
    validatePasswordSyntax(newPassword);
  });




});