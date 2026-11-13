import { ETAPES_PROJETS } from './etapes-projets-data.js';

const createImage = ({ src, alt, className, eager = false }) => {
    const img = document.createElement('img');
    img.className = className;
    img.src = src;
    img.alt = alt;
    img.loading = eager ? 'eager' : 'lazy';
    img.decoding = 'async';
    return img;
};

const buildSubstep = (substep, index) => {
    const article = document.createElement('article');
    article.className = `etape-detail-substep etape-detail-substep--${index % 2 === 0 ? 'left' : 'right'}`;
    article.id = substep.id;

    const figure = document.createElement('figure');
    figure.className = 'etape-detail-substep-figure';
    figure.appendChild(createImage({
        src: substep.image.src,
        alt: substep.image.alt,
        className: 'etape-detail-substep-img',
    }));

    const body = document.createElement('div');
    body.className = 'etape-detail-substep-body';

    const h3 = document.createElement('h3');
    h3.className = 'etape-detail-substep-title';
    h3.textContent = substep.title;

    const p = document.createElement('p');
    p.className = 'etape-detail-substep-text';
    p.textContent = substep.body;

    body.append(h3, p);
    article.append(figure, body);
    return article;
};

const buildPhaseBlock = (phase, index) => {
    const block = document.createElement('article');
    block.id = `etape-phase-${phase.id}`;
    block.className = 'etape-phase-block etape-detail-layer';
    block.setAttribute('aria-labelledby', `etape-phase-title-${phase.id}`);

    const detailBody = document.createElement('div');
    detailBody.className = 'etape-detail-main';

    const heroFigure = document.createElement('figure');
    heroFigure.className = 'etape-detail-hero';
    heroFigure.appendChild(createImage({
        src: phase.detailHeroImage.src,
        alt: phase.detailHeroImage.alt,
        className: 'etape-detail-hero-img',
        eager: index === 0,
    }));

    const h2 = document.createElement('h3');
    h2.id = `etape-phase-title-${phase.id}`;
    h2.className = 'etape-detail-title';
    h2.textContent = phase.title;

    detailBody.append(heroFigure, h2);

    if (typeof phase.detailLead === 'string' && phase.detailLead.length > 0) {
        const lead = document.createElement('p');
        lead.className = 'etape-detail-lead';
        lead.textContent = phase.detailLead;
        detailBody.appendChild(lead);
    }

    const substepsWrap = document.createElement('div');
    substepsWrap.className = 'etape-detail-substeps';

    const substeps = Array.isArray(phase.substeps) ? phase.substeps : [];
    substeps.forEach((substep, subIndex) => {
        substepsWrap.appendChild(buildSubstep(substep, subIndex));
    });

    detailBody.appendChild(substepsWrap);
    block.appendChild(detailBody);
    return block;
};

const renderAllPhases = (container) => {
    const fragment = document.createDocumentFragment();
    ETAPES_PROJETS.forEach((phase, index) => {
        fragment.appendChild(buildPhaseBlock(phase, index));
    });
    container.replaceChildren(fragment);
};

export const initEtapesProjets = () => {
    const container = document.getElementById('etapes-projets-all');
    if (!container) {
        return;
    }
    renderAllPhases(container);
};
