import { obtenerElementos, addElemento, actualizarElemento, eliminarElemento, obtenerElemento } from "../js/gestionDB.js";

$(async function() {
  
  // Si hay un id en barra de busqueda, obtenerlo
  // Obtener el ID de la noticia si se entra por editar
  let urlParams = new URLSearchParams(window.location.search);
  let userId = urlParams.get('id');  


  let userExistente = null;

  // Si hay un ID en la URL, obtener usuario con ese ID
  if (userId) {


    userExistente = await obtenerElemento("users", userId.toString());

    if (userExistente) {
      // Validación si es el usuario admin
      if (userExistente.id == 1 && userExistente.name == "admin") {
        window.location.href = "../views/edit_users.html";
      }


      // Rellenar inputs
      $('input[name="user-name"]').val(userExistente.name);
      $('input[name="user-email"]').val(userExistente.email);
      $('input[name="edit_news"]').prop("checked", userExistente.edit_news);
      $('input[name="edit_users"]').prop("checked", userExistente.edit_users);
      $('input[name="edit_bone_files"]').prop("checked", userExistente.edit_bone_files);
      $('input[name="active"]').prop("checked", userExistente.active);
    }
  }

    





// Al hacer clic en el botón de submit
$("#edit-user-form").on("submit", async function(e) {
  e.preventDefault();

  // Obtener datos del formulario
  let name = $('input[name="user-name"]').val().trim();
  let email = $('input[name="user-email"]').val().trim();
  let edit_news = $('input[name="edit_news"]').prop("checked");
  let edit_users = $('input[name="edit_users"]').prop("checked");
  let edit_bone_files = $('input[name="edit_bone_files"]').prop("checked");
  let active = $('input[name="active"]').prop("checked");

  // Verificación de campos vacíos
  if (name === "" || email === "") {
    showMessage("No hi poden haver camps buits.", "show");
    return;
  }

  if(name.length < 3) {
    showMessage("El nom ha de tenir almenys 3 caràcters.", "show");
    return;
  }

  if (!validateEmail(email)) {
    showMessage("El correu ha de tenir una sintaxis correcta.", "show");
    return;
  }


  // Si el usuario ya existe, actualización
  if (userExistente) {
    let updatedUser = {
      name: name,
      email: email,
      password_hash: userExistente.password_hash,
      salt: userExistente.salt,
      edit_news: edit_news,
      edit_users: edit_users,
      edit_bone_files: edit_bone_files,
      is_first_login: userExistente.is_first_login,
      active: active
    };

    // Actualizar usuario en Firestore
    await actualizarElemento("users", userId.toString(), updatedUser);
    showMessage("Usuari actualitzat correctament.", "show");

  } else {
    // Si el usuario no existe, crear uno nuevo
    let savedUsers = await obtenerElementos("users");
    let newUser = {
      id: (savedUsers.length + 1).toString(),
      name: name,
      email: email,
      password_hash: "961408558045f2698f3f273e593aade113310696f8b85dcb5f4887d26118e8de",
      salt: "85da85a60855172eb579e23b282169c4",
      edit_news: edit_news,
      edit_users: edit_users,
      edit_bone_files: edit_bone_files,
      is_first_login: true,
      active: active
    };

    // Crear un nuevo usuario en Firestore
    addElemento("users", newUser.id, newUser);
    showMessage("Usuari creat correctament.", "show");
  }
});

});