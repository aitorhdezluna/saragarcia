/* ==========================================
   SARA GARCÍA STUDIO - JAVASCRIPT PRINCIPAL
   ========================================== */

document.addEventListener('DOMContentLoaded', () => {

    // 1. Menú Hamburguesa para Móviles
    const navBar = document.querySelector('.navbar');
    const navLinks = document.querySelector('.nav-links');

    if (navBar && navLinks) {
        const toggleBtn = document.createElement('div');
        toggleBtn.classList.add('menu-toggle');
        toggleBtn.innerHTML = '<span></span><span></span><span></span>';
        navBar.insertBefore(toggleBtn, navLinks);

        toggleBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // 2. Animación de aparición suave al hacer scroll (Scroll Reveal)
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const revealOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const animatableElements = document.querySelectorAll('.servicio-bloque, .galeria img, .cta');
    animatableElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        revealOnScroll.observe(el);
    });

    // 3. Resaltar enlace activo en el menú
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const menuLinks = document.querySelectorAll('.nav-links a');

    menuLinks.forEach(link => {
        if (link.getAttribute('href') === currentPath) {
            link.style.color = 'var(--accent-color)';
            link.style.fontWeight = '600';
        }
    });

});
