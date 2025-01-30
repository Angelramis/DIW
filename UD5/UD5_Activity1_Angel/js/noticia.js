$(function() {
  /* GESTIÓN MOSTRAR NOTÍCIA */

  let newsLS = JSON.parse(localStorage.getItem('news')) || [];

  // Obtener id de la noticia desde la url enviada
  function obtenerParamURL(param) {
    let urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
  }

  let newsId = obtenerParamURL('id');
  let news = newsLS.find(n => n.id == newsId);

  // Si no se encuentra
  if (!news) {
    $('main').html('<p class="text-center text-red-500">Notícia no trobada.</p>');
    return;
  }

  let article = `
    <article class="article_noticia flex flex-col gap-5">
      <div class="encapcalat_noticia encapcalat_individual text-left">
        <h2 class="titol_noticia">${news.title}</h2>
        <h3 class="subtitol_noticia">${news.subtitle || ''}</h3>
        <p class="text-left">Autor: ${news.author}</p>
      </div>

      ${news.content.map(row => { // Cargar contenido noticia
        return `<div class='contingut_noticia_costat'>${row.map(column => {
          return `<div class='column'>${column.map(element => {
            return typeof element === 'string' && element.includes('data:image') 
              ? `<img src='${element}' alt='Imatge de la notícia' class='img_noticia pt-1 pb-1 shadow-standard'/>`
              : `<p class='p_noticia text-left'>${element}</p>`;
          }).join('')}</div>`;
        }).join('')}</div>`;
      }).join('')}
    </article>
  `;

  $('main').html(article);
});
