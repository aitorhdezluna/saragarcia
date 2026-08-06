const body = document.body;
const boot = document.querySelector('.boot');
const header = document.querySelector('[data-header]');
const menu = document.querySelector('[data-menu]');
const menuButton = document.querySelector('.menu-button');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

window.addEventListener('load', () => {
  if (!reduceMotion) setTimeout(() => boot?.classList.add('is-done'), 350);
  else boot?.remove();
});

menuButton?.addEventListener('click', () => {
  if (!menu) return;
  const open = !menu.classList.contains('is-open');
  menu.classList.toggle('is-open', open);
  body.classList.toggle('menu-open', open);
  menuButton.setAttribute('aria-expanded', String(open));
});

document.querySelectorAll('.menu a').forEach(link => link.addEventListener('click', () => {
  menu?.classList.remove('is-open');
  body.classList.remove('menu-open');
  menuButton?.setAttribute('aria-expanded', 'false');
}));

let lastY = 0;
window.addEventListener('scroll', () => {
  const y = window.scrollY;
  header?.classList.toggle('is-hidden', y > lastY && y > 120 && !body.classList.contains('menu-open'));
  lastY = y;
}, { passive: true });

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('is-visible');
    });
  }, { threshold: .14 });
  document.querySelectorAll('.reveal-media').forEach(el => observer.observe(el));
} else {
  document.querySelectorAll('.reveal-media').forEach(el => el.classList.add('is-visible'));
}

if (!reduceMotion) {
  const heroMedia = document.querySelector('[data-parallax]');
  let ticking = false;
  const updateParallax = () => {
    const y = window.scrollY;
    if (heroMedia && y < window.innerHeight * 1.2) {
      heroMedia.style.transform = `translateY(${y * .08}px) rotate(${4 - y * .003}deg)`;
    }
    ticking = false;
  };
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(updateParallax);
      ticking = true;
    }
  }, { passive: true });
}

const legalDialog = document.querySelector('[data-legal-dialog]');
const legalCloser = document.querySelector('[data-legal-close]');
let legalTrigger = null;

function openLegalDialog(trigger) {
  if (!legalDialog) return;
  legalTrigger = trigger instanceof HTMLElement ? trigger : null;

  try {
    if (typeof legalDialog.showModal === 'function' && !legalDialog.open) {
      legalDialog.showModal();
    } else {
      legalDialog.setAttribute('open', '');
    }
  } catch (error) {
    legalDialog.setAttribute('open', '');
  }

  legalDialog.classList.add('is-open');
  body.classList.add('dialog-open');
  requestAnimationFrame(() => legalCloser?.focus());
}

function closeLegalDialog() {
  if (!legalDialog) return;

  try {
    if (typeof legalDialog.close === 'function' && legalDialog.open) legalDialog.close();
    else legalDialog.removeAttribute('open');
  } catch (error) {
    legalDialog.removeAttribute('open');
  }

  legalDialog.classList.remove('is-open');
  body.classList.remove('dialog-open');
  legalTrigger?.focus();
}

document.addEventListener('click', event => {
  const opener = event.target.closest('[data-legal-open]');
  if (opener) {
    event.preventDefault();
    openLegalDialog(opener);
    return;
  }

  if (event.target.closest('[data-legal-close]')) {
    event.preventDefault();
    closeLegalDialog();
    return;
  }

  if (event.target === legalDialog) closeLegalDialog();
});

legalDialog?.addEventListener('cancel', event => {
  event.preventDefault();
  closeLegalDialog();
});

legalDialog?.addEventListener('close', () => {
  legalDialog.classList.remove('is-open');
  body.classList.remove('dialog-open');
});
