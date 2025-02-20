import { obtenerElementos, addElemento, actualizarElemento, eliminarElemento, obtenerElemento } from "../js/gestionDB.js";

$(async function() {
  
// Al hacer clic en el botón de submit
$("#edit-user-form").on("submit", async function(e) {
  e.preventDefault();

  // Obtener datos del formulario
  let username = $('input[name="user-name"]').val();
  let email = $('input[name="user-email"]').val();
  let edit_news = $('input[name="edit_news"]').val();
  let edit_users = $('input[name="edit_users"]').val();
  let edit_bone_files = $('input[name="edit_bone_files"]').val();
  let active = $('input[name="active"]').val();

  // Verificación de campos vacíos
  if (username =="" || email == "") {
    showMessage("No hi poden haver camps buits.", "show");
    return;
  }

  let savedUsers = await obtenerElementos("users");

  // Crear nuevo usuario
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

  // Guardar en Firestore
  addElemento("users", newUser.id, newUser);

  showMessage("Usuari creat correctament.", "show");
});

});