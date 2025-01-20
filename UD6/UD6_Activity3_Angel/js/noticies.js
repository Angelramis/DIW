$(function() {
  
  let loggedUser = JSON.parse(localStorage.getItem('loggedUser'));
  
  // Verificaciones si el usuario no tiene permisos/ no iniciado sesión
  if (!loggedUser || !loggedUser['edit_news']) {
    // Ocultar botones de editar noticias y crear noticia
    let adminButtons = $(".call-to-action-button");
    $(adminButtons).hide();
  }


})