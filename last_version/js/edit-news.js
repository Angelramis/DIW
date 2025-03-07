import { obtenerElementos, addElemento, actualizarElemento, eliminarElemento, obtenerElemento } from "../js/gestionDB.js";


// Funciones
function loadImage(event) {
  const input = event.target;
  const reader = new FileReader();
  reader.onload = function() {
    const img = $(input).siblings("img");
    img.attr("src", reader.result);
    img.show();
    $(input).hide();
  };
  reader.readAsDataURL(input.files[0]);
}

function editParagraph() {
  const $p = $(this);
  const currentText = $p.text();
  const input = $(`<input type="text" value="${currentText}" />`);

  input.on("blur", function() {
    const newText = $(this).val();
    $p.text(newText);
    $p.show();
    $(this).remove();
  });

  $p.hide();
  $p.after(input);
  input.focus();
}


// Gestión obtener y cargar noticia si se ha entrado por botón editar noticia
$(async function() {
  // Obtener noticias
  let savedNews = await obtenerElementos("news");
  
  // Conseguir el ID de noticia por URL
  let urlParams = new URLSearchParams(window.location.search);
  let newsId = urlParams.get('id');

  let newsToEdit = savedNews.find(news => news.id == newsId);

  if (newsToEdit) {
    // Cargar su contenido
    $('input[name="news-title"]').val(newsToEdit.title);
    $('input[name="news-subtitle"]').val(newsToEdit.subtitle);
    $('input[name="news-date"]').val(newsToEdit.creation_date);

    // Parsear contenido
    newsToEdit.content = JSON.parse(newsToEdit.content);

    $(".row-container").empty();
    newsToEdit.content.forEach(row => {
      let newRow = '<div class="row">';
      row.forEach(column => {
        newRow += column.length > 1 ? `<div class="column half">` : `<div class="column">`;
        column.forEach(content => {
          if (content.includes('data:image')) {
            newRow += `<div class="element"><img src="${content}" alt="Imagen"></div>`;
          } else {
            newRow += `<div class="element"><p class="editable">${content}</p></div>`;
          }
        });
        newRow += `</div>`;
      });
      newRow += `<button class="delete-row-btn">Eliminar fila</button></div>`;
      $(".row-container").append(newRow);
    });
  }
});


$(function() {
  // Gestión de noticias
  let loggedUser = JSON.parse(localStorage.getItem('loggedUser'));
  
  // Si el usuario no tiene permisos de editar noticias / no iniciado sesión
  if (!loggedUser || !loggedUser['edit_news']) {
    window.location.href = "../index.html";
  }

  /* GESTIÓN AÑADIR CONTENIDO */

  // Hacer los elementos de la toolbox arrastrables
  $(".tool").draggable({
    helper: "clone",
    revert: "invalid"
  });

  function initializeDroppable() {
    $(".column").droppable({
      accept: ".tool",
      drop: function(event, ui) {
        const type = ui.draggable.data("type");
        if ($(this).children().length >= 2 && $(this).hasClass("half")) {
          showMessage("Només es permeten dos elements per columna.", "show");
          return;
        }
        if ($(this).children().length >= 1 && !$(this).hasClass("half")) {
          showMessage("Només es permet un element a aquesta columna.", "show");
          return;
        }

        let newElement;
        if (type === "paragraph") {
          newElement = $(
            `<div class="element">
              <p class="editable">Escribe aquí tu texto...</p>
            </div>`
          );
          newElement.on('click', editParagraph);

        } else if (type === "image") {
          newElement = $(
            `<div class="element">
              <input type="file" accept="image/*"/>
              <img src="" alt="Imagen" style="display: none;">
            </div>`
          );
          newElement.on('change', loadImage);
        }

        $(this).append(newElement);
        makeElementsDraggable();
      }
    });
  }

  function makeElementsDraggable() {
    $(".element").draggable({
      helper: "original",
      revert: "invalid"
    });
  }

  $("#add-row").on("click", function() {
    const columnCount = $("#column-choice").val();
    let newRow = '<div class="row">';
    
    if (columnCount === "1") {
      newRow += `<div class="column"></div>`;
    } else {
      newRow += `
        <div class="column half"></div>
        <div class="column half"></div>`;
    }

    newRow += `
      <button class="delete-row-btn">Eliminar fila</button>
      </div>`;
    $("#builder .row-container").append(newRow);

    initializeDroppable();
    initializeDeleteButtons();
  });

  function initializeDeleteButtons() {
    $(".delete-row-btn").off("click").on("click", function() {
      $(this).closest(".row").remove();
    });
  }

  /* GESTIÓN BOTONES FINALIZACIÓN */

  // Al clicar GUARDAR CONFIGURACIÓN
  $("#save-config").on("click", async function() {
    // Obtener datos
    let title = $('input[name="news-title"]').val();
    let subtitle = $('input[name="news-subtitle"]').val();
    let date = $('input[name="news-date"]').val();
    let content = [];

    // Guardar CONTENIDO de la noticia
     $('.row-container .row').each(function() {
      let rowContent = [];
      $(this).find(".column").each(function() {
        let columnContent = [];
        $(this).children(".element").each(function() {
          if ($(this).find("p").length) {
            columnContent.push($(this).find("p").text());
          } else if ($(this).find("img").length) {
            columnContent.push($(this).find("img").attr("src"));
          }
        });
        rowContent.push(columnContent);
      });
      content.push(rowContent);
      console.log("Contenido: ", rowContent);
    });

    // Verificación rellenado campos
    if (!title || !subtitle || !date || !content.length) {
      showMessage("No hi poden haver camps buits.", "show");
      return;
    }

    // Obtener noticias y añadir nueva noticia
    let savedNews = await obtenerElementos("news");

    let newNews = {
      id: (savedNews.length + 1).toString(),
      title: title,
      subtitle: subtitle,
      author: loggedUser.name,
      creation_date: date,
      modification_date: new Date(),
      content: JSON.stringify(content),
      state: 0  // esborrany
    };

    console.log(newNews);

    // Guardar en Firestore
    await addElemento("news", newNews.id, newNews);
  });


  // Al clicar CARGAR CONFIGURACIÓN
  $('#load-config').on('click', async function() {
    // Obtener noticias
    let savedNews = await obtenerElementos("news");

    // Obtener el ID de la noticia si se entra por editar
    let urlParams = new URLSearchParams(window.location.search);
    let newsId = urlParams.get('id');  

    if (savedNews.length == 0) {
      showMessage("No hi ha notícies guardades.", "show");
      return;
    }

    let news = null;

    // Si hay un ID en la URL, obtener la noticia con ese ID
    if (newsId) {
      news = await obtenerElemento("news", newsId.toString());
    } else {
      // Obtener última la notícia guardada
      news = await obtenerElemento("news", savedNews.length.toString());
    }

      $('input[name="news-title"]').val(news.title);
      $('input[name="news-subtitle"]').val(news.subtitle);
      $('input[name="news-date"]').val(news.modification_date);

      $(".row-container").empty();
      
      // Parsear contenido
      news.content = JSON.parse(news.content);
      
      // Cargar su contenido
      news.content.forEach(row => {
        let newRow = '<div class="row">';
        row.forEach(column => {
          newRow += column.length > 1 ? `<div class="column half">` : `<div class="column">`;
          column.forEach(content => {
            if (content.includes('data:image')) {
              newRow += `<div class="element"><img src="${content}" alt="Imagen"></div>`;
            } else {
              newRow += `<div class="element"><p class="editable">${content}</p></div>`;
              newRow.on('click', editParagraph);
            }
          });
          newRow += `</div>`;
        });
        newRow += `<button class="delete-row-btn">Eliminar fila</button></div>`;
        $(".row-container").append(newRow);
      });

      initializeDroppable();
      initializeDeleteButtons();
    });

    initializeDroppable();
});


// Al clicar PUBLICAR CONFIGURACIÓN
$("#publish-config").on("click", async function() {
  // Obtener noticias
  let savedNews = await obtenerElementos("news");

  if (savedNews.length == 0) {
    showMessage("S'ha de guardar la noticia abans de publicar-la.", "show");
    return;
  }

  // Obtener el ID de la noticia si se entra por editar
  let urlParams = new URLSearchParams(window.location.search);
  let newsId = urlParams.get('id');  

  if (savedNews.length == 0) {
    showMessage("No hi ha notícies guardades.", "show");
    return;
  }

  let news = null;

  // Si hay un ID en la URL, obtener la noticia con ese ID
  if (newsId) {
    news = await obtenerElemento("news", newsId.toString());
  } else {
     // Obtener última la notícia guardada
    news = await obtenerElemento("news", savedNews.length.toString());
  }

  console.log(news);

  if (news.state == 1) {
    showMessage("La notícia més recent ja està publicada.", "show");
    return;
  }

  news.state = 1;  // Cambiar estado a publicado
  news.modification_date = new Date();
  news.content = news.content;

  // Publicar noticia
  await actualizarElemento("news", news.id.toString(), news);

  // Redirigir a la página noticias
  window.location.href = "../views/noticies.html";
});


// Al clicar ELIMINAR NOTICIA
$("#delete-config").on("click", async function() {
  // Obtener noticias
  let savedNews = await obtenerElementos("news");

  // Obtener el ID de la noticia si se entra por editar
  let urlParams = new URLSearchParams(window.location.search);
  let newsId = urlParams.get('id');  

  if (savedNews.length == 0) {
    showMessage("No hi ha notícies guardades.", "show");
    return;
  }

  // Mensaje alert para confirmar eliminar la noticia
  if (newsId) {
    if (!confirm("Estás segur que vols eliminar la notícia?")) {
      return;
    }
  } else {
    // Si se ha entrado por botón general editor
    if (!confirm("Estás segur que vols eliminar la última notícia?")) {
      return;
    }
  }
  
  // Si hay un ID en la URL, eliminar la noticia con ese ID
  if (newsId) {
    await eliminarElemento("news", newsId.toString());
  } else {
    // Si no hay ID, eliminar la última noticia del array de LS
    await eliminarElemento("news", savedNews.length);
  }
  
  // Redirigir a la página noticias
  window.location.href = "../views/noticies.html";
});