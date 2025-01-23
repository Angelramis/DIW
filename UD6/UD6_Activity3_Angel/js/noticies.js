$(function() {
  
  let loggedUser = JSON.parse(localStorage.getItem('loggedUser'));
  
  // Verificaciones de permisos/inicio sesion
  if (!loggedUser || !loggedUser['edit_news']) {
    // Ocultar botones
    let adminButtons = $(".call-to-action-button");
    $(adminButtons).hide();
  }

  /* GESTIÓN AÑADIR NOTICIAS */

  // Obtener noticias de LS, si no hay, vacío.
  let newsLS = JSON.parse(localStorage.getItem('news')) || [];

  function renderNews() {
    const section = $('#section-noticies');
    section.empty();

    if (newsLS.length === 0) {
      section.append('<p>No hi ha noticies.</p>');
      return;
    }

    newsLS.forEach(news => {
      let stateText = news.state === 1 ? 'Publicat' : 'Esborrany';
      let newsItem = `
        <article class="md:max-w-40">
          <a href="../views/edit-news.html">
            <button type="button" class="call-to-action-button h-12 w-20">
              <img src="../assets/icons/edit.png" alt="Editar notícia" class="w-10">
            </button>
          </a>
          <a href="noticia.html?id=${news.id}" class="noticia">
            <div class="encapcalat_noticia">
                <div class="titol_subtitol_div">
                  <h2 class="titol_noticia">${news.title}</h2>
                  <h3 class="subtitol_noticia">${news.subtitle || ''}</h3>
                </div>
                  
            </div>

            <div class="div_img_noticia">
              <img src="${news.image || '../assets/noticies/noticia_defecte.png'}" alt="Imatge de la notícia" class="img_noticia pt-1 pb-1 max-w-96 shadow-standard">
            </div>
            <p class="text-left pt-1">${stateText}</p>
          </a>
        </article>`;
      section.append(newsItem);
    });
  }

  renderNews();



});