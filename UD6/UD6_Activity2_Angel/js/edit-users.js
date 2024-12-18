$(document).ready(function () {

  /* Crear elementos base */
  let titulo = `<div class='titulo'>
                  <h1>GESTIÓ SUPERUSUARI</h1>
                </div>`

  let botonAnadirUsuario = `<button type='button' class='call-to-action-button'>
                              <img src='../assets/icons/mas.png' alt='mas'>Crear usuari
                            </button>`


  $("main").append(titulo);
  $("main").append(botonAnadirUsuario);


});