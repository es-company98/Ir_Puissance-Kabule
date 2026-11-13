const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const RECIPIENT = 'contact@ingpuissance.com';

const trimField = (value) => value.trim().replace(/\s+/g, ' ');

const isValidEmail = (email) => EMAIL_PATTERN.test(email);

export const initContactForm = () => {
    const form = document.getElementById('contact-form');
    const status = document.getElementById('contact-form-status');
    if (!form || !status) {
        return;
    }

    const setStatus = (message, isError) => {
        status.textContent = message;
        status.classList.toggle('contact-form-status--error', Boolean(isError));
        status.classList.toggle('contact-form-status--success', !isError && message.length > 0);
    };

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        setStatus('', false);

        const nameInput = document.getElementById('contact-input-name');
        const emailInput = document.getElementById('contact-input-email');
        const messageInput = document.getElementById('contact-input-message');

        if (!nameInput || !emailInput || !messageInput) {
            setStatus('Formulaire indisponible. Réessayez plus tard.', true);
            return;
        }

        const name = trimField(nameInput.value);
        const email = trimField(emailInput.value);
        const message = trimField(messageInput.value);

        if (name.length < 2) {
            setStatus('Indiquez un nom valide (au moins 2 caractères).', true);
            nameInput.focus();
            return;
        }

        if (!isValidEmail(email)) {
            setStatus('Indiquez une adresse e-mail valide.', true);
            emailInput.focus();
            return;
        }

        if (message.length < 10) {
            setStatus('Votre message doit contenir au moins 10 caractères.', true);
            messageInput.focus();
            return;
        }

        const subject = encodeURIComponent(`Demande de contact — ${name}`);
        const body = encodeURIComponent(
            `Nom : ${name}\nE-mail : ${email}\n\nMessage :\n${message}`,
        );
        const mailto = `mailto:${RECIPIENT}?subject=${subject}&body=${body}`;

        window.location.href = mailto;
        setStatus('Votre client mail va s’ouvrir pour envoyer le message.', false);
    });
};
