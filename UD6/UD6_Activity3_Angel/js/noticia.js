$(function() {
  function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
  }

  const newsId = getQueryParam('id');
  const newsLS = JSON.parse(localStorage.getItem('news')) || [];
  const news = newsLS.find(n => n.id == newsId);

  if (!news) {
    $('main').html('<p class="text-center text-red-500">Notícia no trobada.</p>');
    return;
  }

  const article = `
    <article class="article_noticia flex flex-col gap-5">
      <div class="encapcalat_noticia encapcalat_individual text-left">
        <h2 class="titol_noticia">${news.title}</h2>
        <h3 class="subtitol_noticia">${news.subtitle || ''}</h3>
      </div>

      ${news.content.map(row => {
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
