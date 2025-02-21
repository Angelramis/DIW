import { obtenerElementos, addElemento, actualizarElemento, eliminarElemento, obtenerElemento } from "../js/gestionDB.js";

$(async function() {
  /* GESTIÓN MOSTRAR NOTICIAS */

  let loggedUser = JSON.parse(localStorage.getItem('loggedUser'));
  
  // Verificaciones de permisos/inicio sesión
  if (!loggedUser || !loggedUser['edit_news']) {
    // Ocultar botones de admins
    let adminButtons = $(".call-to-action-button");
    $(adminButtons).hide();
  }

  // Obtener noticias de LS
  let savedNews = await obtenerElementos("news");

  function showNews() {
    const section = $('#section-noticies');
    section.empty();

    if (savedNews.length == 0) {
      section.append('<p>No hi ha notícies.</p>');
      return;
    }

    savedNews.forEach(news => {
      let stateText = news.state == 1 ? 'Publicat' : 'Esborrany';

      // Si el usuario no tiene permisos y la noticia está en borrador, saltarla
      if (news.state == 0 && (!loggedUser || !loggedUser.edit_news)) {
        return;
      }
    
      // Parsear contenido
      news.content = JSON.parse(news.content);

      // Buscar la primera imagen en contenido de noticia como imagen principal
      let foundImage = '../assets/noticies/noticia_defecte.png';
      news.content.some(row => {
        return row.some(column => {
          return column.some(item => {
            if (item.includes('data:image')) {
              foundImage = item; // Si se encuentra, asignarla
              return true;  
            }
            return false;
          });
        });
      });
     
      let newsItem = `
        <article class="md:max-w-40">
        ${loggedUser && loggedUser.edit_news ? ` 
          <a href="../views/edit-news.html?id=${news.id}">
            <button type="button" class="call-to-action-button h-12 w-20">
              <img src="../assets/icons/edit.png" alt="Editar notícia" class="w-10">
            </button>
          </a>
        ` : ''}
          <a href="noticia.html?id=${news.id}">
            <div class="encapcalat_noticia">
                <div class="titol_subtitol_div">
                  <h2 class="titol_noticia">${news.title}</h2>
                  <h3 class="subtitol_noticia">${news.subtitle || ''}</h3>
                </div>
                  
            </div>
            <img src="${foundImage || '../assets/noticies/noticia_defecte.png'}" alt="Imatge de la notícia" class="pt-1 pb-1 max-w-96 shadow-standard">
            ${loggedUser && loggedUser.edit_news ? `
              <p class="text-left pt-1">${stateText}</p>
            ` : ''}
          </a>
        </article>`;
      section.append(newsItem);
    });
  }

  showNews();

});