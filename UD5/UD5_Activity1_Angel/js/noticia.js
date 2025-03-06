import { obtenerElementos} from "../js/gestionDB.js";

$(async function() {
  /* GESTIÓN MOSTRAR NOTÍCIA */

  // Obtener noticia
  let savedNews = await obtenerElementos("news");

  // Obtener id de la noticia desde la url enviada
  function obtenerParamURL(param) {
    let urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
  }

  let newsId = obtenerParamURL('id');
  let news = savedNews.find(n => n.id == newsId);

  // Si no se encuentra
  if (!news) {
    $('main').html('<p>Error: Notícia no trobada.</p>');
    return;
  }
  
  news.content = JSON.parse(news.content);
  
  let article = `
    <article class='article-noticia'>
      <div class="encapcalat-noticia">
        <h2>${news.title}</h2>
        <h3>${news.subtitle || ''}</h3>
        <p>Autor: ${news.author}</p>
      </div>
      
      ${news.content.map(row => { // Cargar contenido noticia
        return `<div>${row.map(column => {
          return `<div class='column'>${column.map(element => {
            return typeof element == 'string' && element.includes('data:image') 
              ? `<img src='${element}' alt='Imatge de la notícia' class='img-noticia'/>`
              : `<p>${element}</p>`;
          }).join('')}</div>`;
        }).join('')}</div>`;
      }).join('')}
    </article>
  `;

  $('main').html(article);
});
