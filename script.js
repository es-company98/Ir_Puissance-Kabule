import { initEtapesProjets } from './js/etapes-projets.js';
import { initRealisations } from './js/realisations.js';
import { initDevNoticePopup } from './js/popup.js';
import { initContactForm } from './js/contact-form.js';

const initNavToggle = () => {
    const toggle = document.getElementById('nav-toggle');
    const nav = document.getElementById('main-nav');
    if (!toggle || !nav) return;

    toggle.addEventListener('click', () => {
        const isOpen = toggle.classList.toggle('is-open');
        nav.classList.toggle('is-open', isOpen);
        toggle.setAttribute('aria-expanded', String(isOpen));
    });

    nav.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', () => {
            toggle.classList.remove('is-open');
            nav.classList.remove('is-open');
            toggle.setAttribute('aria-expanded', 'false');
        });
    });
};

const initScrollReveal = () => {
    const elements = document.querySelectorAll('.reveal');
    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );

    elements.forEach((el) => observer.observe(el));
};

const initHeaderScroll = () => {
    const header = document.getElementById('site-header');
    if (!header) return;

    const onScroll = () => {
        header.classList.toggle('is-scrolled', window.scrollY > 60);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
};

const initParallax = () => {
    const heroImg = document.getElementById('hero-bg-img');
    if (!heroImg) return;

    let ticking = false;

    const updateParallax = () => {
        const scrollY = window.scrollY;
        const scale = 1.05 + scrollY * 0.00015;
        const offset = scrollY * 0.25;
        heroImg.style.transform = `translateY(${offset}px) scale(${Math.min(scale, 1.15)})`;
        ticking = false;
    };

    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(updateParallax);
            ticking = true;
        }
    }, { passive: true });
};

const hideHero3dPanel = () => {
    const panel = document.getElementById('hero-3d-right');
    if (panel) {
        panel.classList.add('is-unavailable');
    }
};

const initHero3dLazy = () => {
    const wrap = document.getElementById('hero-3d-canvas-wrap');
    if (!wrap) {
        return;
    }

    const start = () => {
        import('./js/hero-3d.js')
            .then((mod) => {
                if (typeof mod.initHero3d !== 'function') {
                    hideHero3dPanel();
                    return;
                }
                const ok = mod.initHero3d();
                if (ok === false) {
                    hideHero3dPanel();
                }
            })
            .catch(() => {
                hideHero3dPanel();
            });
    };

    if ('requestIdleCallback' in window) {
        window.requestIdleCallback(start, { timeout: 800 });
    } else {
        window.setTimeout(start, 0);
    }
};

const initHeroCopySwap = () => {
    const first = document.getElementById('hero-title');
    const second = document.getElementById('hero-lead');
    if (!first || !second) {
        return;
    }

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        return;
    }

    const holdMs = 6500;
    let showingFirst = true;

    const swap = () => {
        showingFirst = !showingFirst;
        first.classList.toggle('is-visible', showingFirst);
        second.classList.toggle('is-visible', !showingFirst);
        first.setAttribute('aria-hidden', String(!showingFirst));
        second.setAttribute('aria-hidden', String(showingFirst));
    };

    window.setInterval(swap, holdMs);
};

const init = () => {
    initDevNoticePopup();
    initNavToggle();
    initHeaderScroll();
    initScrollReveal();
    initParallax();
    initEtapesProjets();
    initRealisations();
    initContactForm();
    initHeroCopySwap();
    initHero3dLazy();
};

document.addEventListener('DOMContentLoaded', init);