const menuButton = document.querySelector('.menu-button');
const nav = document.querySelector('#site-nav');

menuButton?.addEventListener('click', () => {
  const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!isOpen));
  nav?.classList.toggle('open', !isOpen);
});

nav?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    menuButton?.setAttribute('aria-expanded', 'false');
    nav.classList.remove('open');
  });
});

const year = document.querySelector('#year');
if (year) year.textContent = String(new Date().getFullYear());

const backToTop = document.querySelector('.back-to-top');
const updateBackToTop = () => backToTop?.classList.toggle('is-visible', window.scrollY > 320);
window.addEventListener('scroll', updateBackToTop, { passive: true });
updateBackToTop();

const motionIsReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const revealItems = document.querySelectorAll('.section, .impact-card, .timeline article, .contact > *');

if (motionIsReduced || !('IntersectionObserver' in window)) {
  revealItems.forEach((item) => item.classList.add('is-visible'));
} else {
  revealItems.forEach((item) => item.classList.add('reveal'));
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -7% 0px' });
  revealItems.forEach((item) => revealObserver.observe(item));
}
