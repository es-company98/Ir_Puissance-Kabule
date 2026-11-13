import { REALISATIONS_ITEMS, validateRealisationsData } from './realisations-data.js';

const buildItem = (item, index) => {
    const article = document.createElement('article');
    article.id = item.id;
    article.className = 'realisations-item';

    const figure = document.createElement('figure');
    figure.className = 'realisations-figure';

    const img = document.createElement('img');
    img.className = 'realisations-img';
    img.src = item.src;
    img.alt = item.alt;
    img.loading = index === 0 ? 'eager' : 'lazy';
    img.decoding = 'async';
    img.width = 900;
    img.height = 600;

    figure.appendChild(img);

    const caption = document.createElement('p');
    caption.className = 'realisations-caption';
    caption.textContent = item.caption;

    article.append(figure, caption);
    return article;
};

export const initRealisations = () => {
    validateRealisationsData();

    const stage = document.getElementById('realisations-stage');
    if (!stage || REALISATIONS_ITEMS.length === 0) {
        return;
    }

    const fragment = document.createDocumentFragment();
    REALISATIONS_ITEMS.forEach((item, index) => {
        fragment.appendChild(buildItem(item, index));
    });
    stage.replaceChildren(fragment);
};
