$(function() {

  /* GESTIÓN OBTENER USUARIO */
  let loggedUser = JSON.parse(localStorage.getItem('loggedUser'));
  
  // Si el usuario no tiene permisos de editar noticias
  if (!loggedUser || !loggedUser['edit_news']) {
    // Si no ha iniciado sesión o no tiene permisos, salir de la página
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
          alert("Solo se permiten dos elementos por columna.");
          return;
        }
        if ($(this).children().length >= 1 && !$(this).hasClass("half")) {
          alert("Solo se permite un elemento en esta columna.");
          return;
        }

        let newElement;
        if (type === "paragraph") {
          newElement = $(
            `<div class="element">
              <p class="editable" onclick="editParagraph(this)">Escribe aquí tu texto...</p>
            </div>`
          );
        } else if (type === "image") {
          newElement = $(
            `<div class="element">
              <input type="file" accept="image/*" onchange="loadImage(event)" />
              <img src="" alt="Imagen" style="display: none;">
            </div>`
          );
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

    // Obtener LS de noticias y añadir la nueva noticia
    let newsLS = JSON.parse(localStorage.getItem('news')) || [];

    let newNews = {
      id: newsLS.length + 1,
      title: title,
      author: author,
      creation_date: date,
      modification_date: new Date(),
      content: content,
      state: 0  // esborrany
    };

    newsLS.push(newNews);
    localStorage.setItem('news', JSON.stringify(newsLS));
    alert('Esborrany guardat');
  });












  // Al clicar CARGAR CONFIGURACIÓN
  $('#load-config').on('click', function() {
    let newsLS = JSON.parse(localStorage.getItem('news')) || [];
    if (newsLS.length === 0) {
      alert("No hay noticias guardadas.");
      return;
    }
    let latestNews = newsLS[newsLS.length - 1];
    $('input[name="news-title"]').val(latestNews.title);
    $('input[name="news-author"]').val(latestNews.author);
    $('input[name="news-date"]').val(latestNews.created_at.split('T')[0]);

    $(".row-container").empty();
    latestNews.content.forEach(row => {
      let newRow = '<div class="row">';
      row.forEach(column => {
        newRow += column.length > 1 ? `<div class="column half">` : `<div class="column">`;
        column.forEach(content => {
          if (content.includes('data:image')) {
            newRow += `<div class="element"><img src="${content}" alt="Imagen"></div>`;
          } else {
            newRow += `<div class="element"><p class="editable" onclick="editParagraph(this)">${content}</p></div>`;
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
  let newsLS = JSON.parse(localStorage.getItem('news')) || [];
  if (newsLS.length === 0) {
    alert("No hay noticias para publicar.");
    return;
  }

  let latestNews = newsLS[newsLS.length - 1];
  latestNews.state = 1;  // Cambiar estado a publicado
  latestNews.modification_date = new Date();

  localStorage.setItem('news', JSON.stringify(newsLS));
  alert("La noticia ha sido publicada correctamente.");

  // Opcional: Redirigir a la página de noticias
  window.location.href = "../src/noticies.html";
});





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

function editParagraph(paragraph) {
  const $p = $(paragraph);
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