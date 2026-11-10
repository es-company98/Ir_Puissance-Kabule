const SESSION_KEY = 'puissance-dev-notice-dismissed';
const NOTICE_DELAY_MS = 10000;
const NOTICE_VISIBLE_MS = 10000;

const isNoticeDismissed = () => {
    try {
        return sessionStorage.getItem(SESSION_KEY) === '1';
    } catch {
        return false;
    }
};

const persistNoticeDismissed = () => {
    try {
        sessionStorage.setItem(SESSION_KEY, '1');
    } catch {
        /* sessionStorage indisponible */
    }
};

const showDevNoticePopup = () => {
    const notice = document.createElement('aside');
    notice.id = 'dev-notice-dialog';
    notice.className = 'dev-notice-dialog';
    notice.setAttribute('role', 'status');
    notice.setAttribute('aria-live', 'polite');
    notice.setAttribute('aria-labelledby', 'dev-notice-title');
    notice.setAttribute('aria-describedby', 'dev-notice-desc');

    const inner = document.createElement('div');
    inner.id = 'dev-notice-inner';
    inner.className = 'dev-notice-inner';

    const title = document.createElement('h2');
    title.id = 'dev-notice-title';
    title.className = 'dev-notice-title';
    title.textContent = 'Site en cours de développement';

    const desc = document.createElement('p');
    desc.id = 'dev-notice-desc';
    desc.className = 'dev-notice-desc';
    desc.textContent =
        'Ce site est en cours de finalisation. Les contenus affichés (textes, images, coordonnées) sont indicatifs et peuvent évoluer. Merci de votre compréhension.';

    const closeBtn = document.createElement('button');
    closeBtn.id = 'dev-notice-close';
    closeBtn.type = 'button';
    closeBtn.className = 'dev-notice-close';
    closeBtn.setAttribute('aria-label', "Fermer l'avis de développement");
    closeBtn.textContent = '\u00D7';

    inner.appendChild(closeBtn);
    inner.appendChild(title);
    inner.appendChild(desc);
    notice.appendChild(inner);

    let closed = false;
    let hideTimerId = 0;

    const teardown = () => {
        if (hideTimerId) {
            window.clearTimeout(hideTimerId);
            hideTimerId = 0;
        }
        document.removeEventListener('keydown', onKeyDown);
        notice.remove();
    };

    const dismiss = () => {
        if (closed) {
            return;
        }
        closed = true;
        persistNoticeDismissed();
        teardown();
    };

    const onKeyDown = (event) => {
        if (event.key === 'Escape') {
            dismiss();
        }
    };

    closeBtn.addEventListener('click', dismiss);

    document.addEventListener('keydown', onKeyDown);
    document.body.appendChild(notice);

    hideTimerId = window.setTimeout(dismiss, NOTICE_VISIBLE_MS);
};

export const initDevNoticePopup = () => {
    if (isNoticeDismissed()) {
        return;
    }

    window.setTimeout(() => {
        if (isNoticeDismissed()) {
            return;
        }
        showDevNoticePopup();
    }, NOTICE_DELAY_MS);
};
