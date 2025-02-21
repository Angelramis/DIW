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
      // Rellenar inputs
      $('input[name="user-name"]').val(userExistente.username);
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
  let username = $('input[name="user-name"]').val().trim();
  let email = $('input[name="user-email"]').val().trim();
  let edit_news = $('input[name="edit_news"]').prop("checked");
  let edit_users = $('input[name="edit_users"]').prop("checked");
  let edit_bone_files = $('input[name="edit_bone_files"]').prop("checked");
  let active = $('input[name="active"]').prop("checked");

  // Verificación de campos vacíos
  if (username === "" || email === "") {
    showMessage("No hi poden haver camps buits.", "show");
    return;
  }

  // Si el usuario ya existe, actualización
  if (userExistente) {
    let updatedUser = {
      username: username,
      email: email,
      edit_news: edit_news,
      edit_users: edit_users,
      edit_bone_files: edit_bone_files,
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
      username: username,
      email: email,
      password: "Ramis.20",
      edit_news: edit_news,
      edit_users: edit_users,
      edit_bone_files: edit_bone_files,
      active: active
    };

    // Crear un nuevo usuario en Firestore
    await addElemento("users", newUser.id, newUser);
    showMessage("Usuari creat correctament.", "show");
  }
});

});