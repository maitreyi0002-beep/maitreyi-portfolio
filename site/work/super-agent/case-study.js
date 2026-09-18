document.querySelectorAll('[data-carousel]').forEach((carousel) => {
  const viewport = carousel.querySelector('[data-viewport]');
  const slides = [...viewport.children];
  const count = carousel.querySelector('[data-count]');
  let current = 0;
  const update = () => {
    current = Math.max(0, Math.min(slides.length - 1, Math.round(viewport.scrollLeft / viewport.clientWidth)));
    count.textContent = `${current + 1} / ${slides.length}`;
  };
  const go = (next) => { current = (next + slides.length) % slides.length; slides[current].scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', inline: 'start', block: 'nearest' }); };
  carousel.querySelector('[data-prev]').addEventListener('click', () => go(current - 1));
  carousel.querySelector('[data-next]').addEventListener('click', () => go(current + 1));
  viewport.addEventListener('scroll', update, { passive: true });
  viewport.addEventListener('keydown', (event) => { if (event.key === 'ArrowLeft') { event.preventDefault(); go(current - 1); } if (event.key === 'ArrowRight') { event.preventDefault(); go(current + 1); } });
  update();
});
