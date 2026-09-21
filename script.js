const WHATSAPP_PHONE = '243896449595';

const sanitizeText = (value, maxLength) => {
    if (typeof value !== 'string') return '';
    return value.trim().slice(0, maxLength);
};

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

const initSlider = () => {
    const slides = Array.from(document.querySelectorAll('.slide'));
    const dots = Array.from(document.querySelectorAll('.slider-dot'));
    const btnPrev = document.getElementById('slider-btn-prev');
    const btnNext = document.getElementById('slider-btn-next');

    if (slides.length === 0) return;

    let currentIndex = 0;

    const goToSlide = (index) => {
        const total = slides.length;
        currentIndex = ((index % total) + total) % total;

        slides.forEach((slide, i) => {
            const isActive = i === currentIndex;
            slide.classList.toggle('is-active', isActive);
            slide.setAttribute('aria-hidden', String(!isActive));
        });

        dots.forEach((dot, i) => {
            const isActive = i === currentIndex;
            dot.classList.toggle('is-active', isActive);
            dot.setAttribute('aria-selected', String(isActive));
        });
    };

    btnPrev?.addEventListener('click', () => goToSlide(currentIndex - 1));
    btnNext?.addEventListener('click', () => goToSlide(currentIndex + 1));

    dots.forEach((dot, i) => {
        dot.addEventListener('click', () => goToSlide(i));
    });

    let autoplayTimer = setInterval(() => goToSlide(currentIndex + 1), 5000);

    const slider = document.getElementById('slider');
    slider?.addEventListener('mouseenter', () => clearInterval(autoplayTimer));
    slider?.addEventListener('mouseleave', () => {
        autoplayTimer = setInterval(() => goToSlide(currentIndex + 1), 5000);
    });
};

const initStickyCta = () => {
    const bar = document.getElementById('sticky-cta');
    const hero = document.getElementById('accueil');
    if (!bar || !hero) return;

    const show = () => {
        bar.hidden = false;
        bar.classList.add('is-visible');
        document.body.classList.add('has-sticky-cta');
    };

    const hide = () => {
        bar.classList.remove('is-visible');
        document.body.classList.remove('has-sticky-cta');
        window.setTimeout(() => {
            if (!bar.classList.contains('is-visible')) {
                bar.hidden = true;
            }
        }, 400);
    };

    const observer = new IntersectionObserver(
        ([entry]) => {
            if (entry.isIntersecting) {
                hide();
            } else {
                show();
            }
        },
        { threshold: 0.05 }
    );

    observer.observe(hero);
};

const initContactForm = () => {
    const form = document.getElementById('contact-form');
    const nameInput = document.getElementById('input-name');
    const messageInput = document.getElementById('input-message');
    const errorEl = document.getElementById('form-error');

    if (!form || !nameInput || !messageInput || !errorEl) return;

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        errorEl.hidden = true;
        errorEl.textContent = '';

        const name = sanitizeText(nameInput.value, 100);
        const message = sanitizeText(messageInput.value, 1000);

        if (!name || !message) {
            errorEl.textContent = 'Veuillez remplir tous les champs.';
            errorEl.hidden = false;
            return;
        }

        const text = `Bonjour, je m'appelle ${name}. ${message}`;
        const url = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(text)}`;
        window.open(url, '_blank', 'noopener,noreferrer');
    });
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

const init = () => {
    initNavToggle();
    initHeaderScroll();
    initScrollReveal();
    initParallax();
    initStickyCta();
    initSlider();
    initContactForm();
    initHero3dLazy();
};

document.addEventListener('DOMContentLoaded', init);
