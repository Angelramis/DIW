import { obtenerElementos } from "../js/gestionDB.js";

$(async function() {
  /* GESTIÓN MOSTRAR NOTICIAS */

  let loggedUser = JSON.parse(localStorage.getItem('loggedUser'));
  
  // Verificaciones de permisos/inicio sesión
  if (!loggedUser || !loggedUser['edit_news']) {
    // Ocultar botones de admins
    let adminButtons = $(".call-to-action-button");
    $(adminButtons).hide();
  }

  // Obtener noticias de Firebase
  let savedNews = await obtenerElementos("news");

  async function mostrarNoticias(filtro = "") {
    let section = $("#section-noticies");
    section.empty();

    // Filtrar noticias si hay texto en buscador
    let filteredNews = savedNews.filter(news =>
      news.title.toLowerCase().includes(filtro.toLowerCase())
    );

    if (filteredNews.length == 0) {
      section.append("<p>No hi ha notícies.</p>");
      return;
    }

    filteredNews.forEach(news => {
      let stateText = news.state == 1 ? "Publicat" : "Esborrany";

      // Si el usuario no tiene permisos y la noticia está en borrador, saltarla
      if (news.state == 0 && (!loggedUser || !loggedUser.edit_news)) {
        return;
      }

      // Parsear contenido si es tipo String en Firebase
      if (typeof news.content === "string") {
        news.content = JSON.parse(news.content);
      }
      
      // Buscar la primera imagen en contenido de noticia como imagen de portada
      let foundImage = "../assets/noticies/noticia_defecte.png";
      news.content.some(row =>
        row.some(column =>
          column.some(item => {
            if (item.includes("data:image")) {
              foundImage = item;
              return true; // surt de la funció
            }
            return false;
          })
        )
      );

      let newsItem = `
        <article class="noticia-article">
        ${loggedUser && loggedUser.edit_news ? ` 
          <a href="../views/edit-news.html?id=${news.id}">
            <button type="button" class="call-to-action-button button-editar">
              <img src="../assets/icons/edit.png" alt="Editar notícia">
            </button>
          </a>
        ` : ""}
          <a href="noticia.html?id=${news.id}">
            <div class="encapcalat-noticia">
              <h2>${news.title}</h2>
              <h3>${news.subtitle}</h3>
            </div>
            <img src="${foundImage}" alt="Imatge de la notícia" class="imatge-noticia">
            ${loggedUser && loggedUser.edit_news ? `<p class="estat-noticia">${stateText}</p>` : ""}
          </a>
        </article>`;
      section.append(newsItem);
    });
  }

  await mostrarNoticias();

  // Evento buscar noticias por titulo
  $("#input-search").on("input", async function() {
    let inputSearch = $(this).val().trim();
    await mostrarNoticias(inputSearch);
  });

});