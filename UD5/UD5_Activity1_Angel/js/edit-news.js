import { guardarNoticia } from "../js/gestionDB.js";


// Funciones
function loadImage() {
  const $event = $(this);
  const input = $event.target;
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


$(function() {
  
  // Gestión obtener y cargar noticia si se 
  // ha entrado por botón editar noticia

  // Obtener noticias de LS
  let newsLS = JSON.parse(localStorage.getItem('news')) || [];

  // Conseguir el ID de noticia por URL
  let urlParams = new URLSearchParams(window.location.search);
  let newsId = urlParams.get('id');

  let newsToEdit = newsLS.find(news => news.id == newsId);

  if (newsToEdit) {
    // Cargar su contenido
    $('input[name="news-title"]').val(newsToEdit.title);
    $('input[name="news-subtitle"]').val(newsToEdit.subtitle);
    $('input[name="news-author"]').val(newsToEdit.author);
    $('input[name="news-date"]').val(newsToEdit.creation_date);

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
  // Gestión Creación/Obtención/Modificación/Eliminación noticias

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
  $("#save-config").on("click", function() {
    // Obtener datos
    let title = $('input[name="news-title"]').val();
    let subtitle = $('input[name="news-subtitle"]').val();
    let author = $('input[name="news-author"]').val();
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
    });

    // Verificación rellando campos
    if (!title || !subtitle || !author || !date || !content.length) {
      showMessage("No hi poden haver camps buits.", "show");
      return;
    }

    // Obtener LS de noticias y añadir nueva noticia
    let newsLS = JSON.parse(localStorage.getItem('news')) || [];

    let newNews = {
      id: newsLS.length + 1,
      title: title,
      subtitle: subtitle,
      author: author,
      creation_date: date,
      modification_date: new Date(),
      content: JSON.stringify(content),
      state: 0  // esborrany
    };

    // Guardar en Firestore
    guardarNoticia(newNews.id, newNews);

    showMessage("Esborrany guardat.", "show");
  });



  // Al clicar CARGAR CONFIGURACIÓN
  $('#load-config').on('click', function() {

    // Obtener noticias de LS
    let newsLS = JSON.parse(localStorage.getItem('news')) || [];

    if (newsLS.length == 0) {
      showMessage("No hi ha notícies guardades.", "show");
      return;
    }

    // Obtener última la notícia gestionada
    let latestNews = newsLS[newsLS.length - 1];
    $('input[name="news-title"]').val(latestNews.title);
    $('input[name="news-subtitle"]').val(latestNews.subtitle);
    $('input[name="news-author"]').val(latestNews.author);
    $('input[name="news-date"]').val(latestNews.modification_date);

    $(".row-container").empty();

    // Cargar su contenido
    latestNews.content.forEach(row => {
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
$("#publish-config").on("click", function() {
  // Obtener noticias LS
  let newsLS = JSON.parse(localStorage.getItem('news')) || [];

  if (newsLS.length == 0) {
    showMessage("S'ha de guardar la noticia abans de publicar-la.", "show");
    return;
  }

  let latestNews = newsLS[newsLS.length - 1];

  if (latestNews.state == 1) {
    showMessage("La notícia més recent ja està publicada.", "show");
    return;
  }

  latestNews.state = 1;  // Cambiar estado a publicado
  latestNews.modification_date = new Date();

  localStorage.setItem('news', JSON.stringify(newsLS));
  showMessage("La notícia s'ha publicat correctament.", "show");
});


// Al clicar ELIMINAR NOTICIA
$("#delete-config").on("click", function() {

  let newsLS = JSON.parse(localStorage.getItem('news')) || [];

  // Obtener el ID de la noticia si se entra por editar
  let urlParams = new URLSearchParams(window.location.search);
  let newsId = urlParams.get('id');  

  if (newsLS.length == 0) {
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
    newsLS = newsLS.filter(news => news.id !== parseInt(newsId));
  } else {
    // Si no hay ID, eliminar la última noticia del array de LS
    newsLS.pop(); 
  }

  // Guardar la lista actualizada de LS
  localStorage.setItem('news', JSON.stringify(newsLS));
  showMessage("La notícia s'ha eliminat correctament.", "show");

  // Redirigir a la página noticias
  window.location.href = "../src/noticies.html";
});