import { getPhaseById } from './etapes-projets-data.js';

const LAYER_ID = 'etape-detail-layer';

let lastTrigger = null;

const setPhaseButtonsExpanded = (expandedPhaseId) => {
    const buttons = document.querySelectorAll('#etapes-projets-grid [data-phase-id]');
    buttons.forEach((node) => {
        if (!(node instanceof HTMLButtonElement)) {
            return;
        }
        const id = node.getAttribute('data-phase-id');
        const isOpen = Boolean(expandedPhaseId && id === expandedPhaseId);
        node.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
};

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

const renderPhaseDetail = (layer, phase) => {
    const fragment = document.createDocumentFragment();

    const header = document.createElement('header');
    header.className = 'etape-detail-header';

    const closeBtn = document.createElement('button');
    closeBtn.type = 'button';
    closeBtn.id = 'etape-detail-close';
    closeBtn.className = 'etape-detail-close';
    closeBtn.setAttribute('aria-label', 'Fermer le détail de l’étape');
    closeBtn.textContent = 'Fermer';

    const titleBar = document.createElement('p');
    titleBar.className = 'etape-detail-header-label';
    titleBar.textContent = 'Étape du projet';

    header.append(titleBar, closeBtn);

    const detailBody = document.createElement('section');
    detailBody.className = 'etape-detail-main';
    detailBody.setAttribute('aria-labelledby', 'etape-detail-title');

    const heroFigure = document.createElement('figure');
    heroFigure.className = 'etape-detail-hero';
    heroFigure.appendChild(createImage({
        src: phase.detailHeroImage.src,
        alt: phase.detailHeroImage.alt,
        className: 'etape-detail-hero-img',
        eager: true,
    }));

    const h2 = document.createElement('h2');
    h2.id = 'etape-detail-title';
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
    substepsWrap.id = 'etape-detail-substeps';
    substepsWrap.className = 'etape-detail-substeps';

    const substeps = Array.isArray(phase.substeps) ? phase.substeps : [];
    substeps.forEach((substep, index) => {
        substepsWrap.appendChild(buildSubstep(substep, index));
    });

    detailBody.appendChild(substepsWrap);
    fragment.append(header, detailBody);
    layer.replaceChildren(fragment);
};

const scrollToElement = (element) => {
    if (!(element instanceof HTMLElement)) {
        return;
    }
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    element.scrollIntoView({
        behavior: reduceMotion ? 'auto' : 'smooth',
        block: 'start',
    });
};

export const closePhaseDetail = () => {
    const layer = document.getElementById(LAYER_ID);
    if (!layer || layer.hidden) {
        return;
    }

    const trigger = lastTrigger;

    layer.hidden = true;
    layer.setAttribute('aria-hidden', 'true');
    layer.removeAttribute('role');
    layer.removeAttribute('aria-labelledby');
    layer.replaceChildren();
    setPhaseButtonsExpanded(null);

    if (trigger instanceof HTMLElement) {
        scrollToElement(trigger);
        trigger.focus();
        lastTrigger = null;
    }
};

export const openPhaseDetail = (phaseId, trigger) => {
    const layer = document.getElementById(LAYER_ID);
    const phase = getPhaseById(phaseId);

    if (!layer || !phase) {
        return;
    }

    lastTrigger = trigger instanceof HTMLElement ? trigger : null;
    renderPhaseDetail(layer, phase);

    layer.hidden = false;
    layer.removeAttribute('aria-hidden');
    layer.setAttribute('role', 'region');
    layer.setAttribute('aria-labelledby', 'etape-detail-title');
    setPhaseButtonsExpanded(phaseId);

    const closeBtn = document.getElementById('etape-detail-close');
    if (closeBtn instanceof HTMLButtonElement) {
        closeBtn.addEventListener('click', () => closePhaseDetail(), { once: true });
        closeBtn.focus();
    }

    requestAnimationFrame(() => {
        scrollToElement(layer);
    });
};

export const initEtapesProjets = () => {
    const grid = document.getElementById('etapes-projets-grid');
    const layer = document.getElementById(LAYER_ID);

    if (!grid || !layer) {
        return;
    }

    grid.addEventListener('click', (event) => {
        const target = event.target;
        if (!(target instanceof Element)) {
            return;
        }
        const btn = target.closest('[data-phase-id]');
        if (!(btn instanceof HTMLButtonElement)) {
            return;
        }
        const phaseId = btn.getAttribute('data-phase-id');
        if (!phaseId) {
            return;
        }
        openPhaseDetail(phaseId, btn);
    });

    document.addEventListener('keydown', (event) => {
        if (event.key !== 'Escape' || layer.hidden) {
            return;
        }
        closePhaseDetail();
    });
};
