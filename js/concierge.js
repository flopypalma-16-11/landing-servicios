// js/concierge.js

document.addEventListener('DOMContentLoaded', () => {
    createWhatsAppButton();
    initContactForm();
});

// ── Floating WhatsApp Button ──────────────────────────────────────────────────

function createWhatsAppButton() {
    const wrapper = document.createElement('div');
    wrapper.style.cssText = 'position:fixed;bottom:3.2rem;right:3.2rem;z-index:100;';

    const btn = document.createElement('a');
    btn.href = 'https://wa.me/34600000000';
    btn.target = '_blank';
    btn.rel = 'noopener noreferrer';
    btn.id = 'btn-whatsapp-flotante';
    btn.title = 'Contactar por WhatsApp';
    btn.style.cssText = [
        'display:flex', 'align-items:center', 'justify-content:center',
        'width:6rem', 'height:6rem', 'border-radius:50%',
        'background-color:#25D366',
        'box-shadow:0 6px 24px rgba(37,211,102,0.4)',
        'transition:transform 0.3s ease, box-shadow 0.3s ease',
        'text-decoration:none'
    ].join(';');

    btn.addEventListener('mouseenter', () => {
        btn.style.transform = 'scale(1.1)';
        btn.style.boxShadow = '0 8px 32px rgba(37,211,102,0.6)';
    });
    btn.addEventListener('mouseleave', () => {
        btn.style.transform = 'scale(1)';
        btn.style.boxShadow = '0 6px 24px rgba(37,211,102,0.4)';
    });

    // SVG oficial de WhatsApp
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
    svg.setAttribute('viewBox', '0 0 32 32');
    svg.setAttribute('width', '30');
    svg.setAttribute('height', '30');
    svg.setAttribute('fill', '#ffffff');
    svg.setAttribute('aria-label', 'WhatsApp');

    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', 'M16.002 2C8.268 2 2 8.268 2 15.999c0 2.463.645 4.878 1.87 7.007L2.05 30l7.185-1.883A13.93 13.93 0 0016.002 30C23.732 30 30 23.731 30 16.001 30 8.268 23.732 2 16.002 2zm0 25.417a11.35 11.35 0 01-5.786-1.585l-.415-.247-4.266 1.12 1.14-4.163-.27-.427A11.35 11.35 0 014.583 16c0-6.296 5.122-11.417 11.42-11.417S27.417 9.704 27.417 16c0 6.297-5.12 11.417-11.415 11.417zm6.264-8.554c-.343-.172-2.032-1.003-2.347-1.117-.315-.115-.545-.172-.775.172-.229.343-.888 1.117-1.089 1.347-.2.23-.401.258-.744.086-.343-.172-1.448-.534-2.758-1.703-1.019-.91-1.707-2.034-1.907-2.377-.2-.344-.021-.53.15-.701.155-.154.344-.401.515-.602.172-.2.23-.344.344-.573.115-.23.058-.43-.029-.602-.086-.172-.775-1.87-1.062-2.562-.28-.673-.563-.581-.775-.592-.2-.01-.43-.012-.659-.012-.23 0-.601.086-.916.43-.315.344-1.203 1.175-1.203 2.865s1.231 3.325 1.402 3.555c.172.23 2.423 3.7 5.872 5.19.821.354 1.462.566 1.962.725.824.262 1.573.225 2.166.137.66-.099 2.032-.831 2.319-1.633.286-.801.286-1.488.2-1.633-.086-.143-.315-.23-.659-.4z');
    svg.appendChild(path);
    btn.appendChild(svg);

    wrapper.appendChild(btn);
    document.body.appendChild(wrapper);
}


// ── Contact Form ──────────────────────────────────────────────────────────────

function initContactForm() {
    const form = document.getElementById('form-contacto');
    if (!form) return;

    const inputNombre = document.getElementById('input-nombre');
    const inputEmail = document.getElementById('input-email');
    const selectServ = document.getElementById('select-servicio');
    const successEl = document.getElementById('cta-success');

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        // Reset estado
        [inputNombre, inputEmail, selectServ].forEach(el => el && el.classList.remove('is-invalid'));
        successEl.className = 'cta-success';
        clearText(successEl);

        const nombre = inputNombre ? inputNombre.value.trim() : '';
        const email = inputEmail ? inputEmail.value.trim() : '';
        const servicio = selectServ ? selectServ.value : '';

        let hasError = false;

        if (inputNombre && nombre.length < 2) {
            inputNombre.classList.add('is-invalid');
            hasError = true;
        }
        if (!isValidEmail(email)) {
            inputEmail.classList.add('is-invalid');
            hasError = true;
        }
        if (selectServ && !servicio) {
            selectServ.classList.add('is-invalid');
            hasError = true;
        }

        if (hasError) {
            successEl.appendChild(document.createTextNode('Por favor, rellene todos los campos correctamente.'));
            successEl.classList.add('show-error');
            return;
        }

        // Simulación de envío
        const submitBtn = form.querySelector('[type="submit"]');
        const submitText = submitBtn.querySelector('span:last-child');
        submitBtn.disabled = true;
        clearText(submitText);
        submitText.appendChild(document.createTextNode('Enviando…'));

        // En producción: fetch('/api/contacto', { method:'POST', body: JSON.stringify({ nombre, email, servicio }) })
        setTimeout(() => {
            form.reset();
            submitBtn.disabled = false;
            clearText(submitText);
            submitText.appendChild(document.createTextNode('Solicitar llamada'));

            successEl.appendChild(document.createTextNode('¡Gracias, ' + nombre + '! Hemos recibido su solicitud sobre '));
            const strong = document.createElement('strong');
            strong.appendChild(document.createTextNode(servicio));
            successEl.appendChild(strong);
            successEl.appendChild(document.createTextNode('. Nos pondremos en contacto en breve.'));
            successEl.classList.add('show-ok');
        }, 1200);
    });
}

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function clearText(el) {
    if (!el) return;
    while (el.firstChild) {
        el.removeChild(el.firstChild);
    }
}

