const header=document.querySelector('[data-header]');
const toggle=document.querySelector('.menu-toggle');
const nav=document.querySelector('.site-nav');
let lastY=window.scrollY;

toggle?.addEventListener('click',()=>{
  const open=toggle.getAttribute('aria-expanded')==='true';
  toggle.setAttribute('aria-expanded',String(!open));
  nav.classList.toggle('is-open',!open);
  document.body.style.overflow=!open?'hidden':'';
});

nav?.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>{
  toggle?.setAttribute('aria-expanded','false');
  nav.classList.remove('is-open');
  document.body.style.overflow='';
}));

window.addEventListener('scroll',()=>{
  const y=window.scrollY;
  header?.classList.toggle('is-hidden',y>lastY&&y>160&&!nav?.classList.contains('is-open'));
  lastY=y;
},{passive:true});

const observer=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('is-visible');observer.unobserve(entry.target);}});
},{threshold:.14,rootMargin:'0px 0px -8%'});
document.querySelectorAll('.image-reveal').forEach(el=>observer.observe(el));

document.querySelector('[data-year]').textContent=new Date().getFullYear();
