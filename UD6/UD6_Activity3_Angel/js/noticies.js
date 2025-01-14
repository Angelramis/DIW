
$(function() {
  
  let loggedUser = JSON.parse(localStorage.getItem('loggedUser'));
  
  // Si el usuario no tiene permisos de editar noticias
  if (loggedUser === null || !loggedUser['edit_news']) {
    // Ocultar botones de editar noticias y crear noticia
    let adminButtons = $(".call-to-action-button");

    $(adminButtons).hide();
  }
})