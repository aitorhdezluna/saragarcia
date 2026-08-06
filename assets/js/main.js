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
  const open = !menu.classList.contains('is-open');
  menu.classList.toggle('is-open', open);
  body.classList.toggle('menu-open', open);
  menuButton.setAttribute('aria-expanded', String(open));
});

document.querySelectorAll('.menu a').forEach(link => link.addEventListener('click', () => {
  menu.classList.remove('is-open'); body.classList.remove('menu-open'); menuButton?.setAttribute('aria-expanded','false');
}));

let lastY = 0;
window.addEventListener('scroll', () => {
  const y = window.scrollY;
  header?.classList.toggle('is-hidden', y > lastY && y > 120 && !body.classList.contains('menu-open'));
  lastY = y;
}, {passive:true});

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('is-visible'); });
}, {threshold:.14});
document.querySelectorAll('.reveal-media').forEach(el => observer.observe(el));

if (!reduceMotion) {
  const heroMedia = document.querySelector('[data-parallax]');
  let ticking = false;
  const updateParallax = () => {
    const y = window.scrollY;
    if (heroMedia && y < window.innerHeight * 1.2) heroMedia.style.transform = `translateY(${y * .08}px) rotate(${4 - y * .003}deg)`;
    ticking = false;
  };
  window.addEventListener('scroll', () => { if (!ticking) { requestAnimationFrame(updateParallax); ticking = true; } }, {passive:true});
}
