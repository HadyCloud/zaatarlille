import { t, lang } from './i18n.js';
import { esc } from './format.js';
import { ICON, imgSrc } from './util.js';
import { PHOTOS } from './data.js';
import { gsap, state, lockScroll } from './motion.js';

let items = [];
let index = 0;
let wired = false;

const dlg = () => document.getElementById('lightbox');

/** items: [{ photo: 'name', caption?: string }] */
export function openLightbox(list, start = 0) {
  const d = dlg();
  items = list;
  index = start;
  const a = t().a11y;
  d.innerHTML = `
    <button class="lightbox__close" type="button" aria-label="${esc(a.close)}" data-lb="close">${ICON.close}</button>
    <div class="lightbox__stage" data-lb-stage><img class="lightbox__img" alt="" data-lb-img></div>
    <div class="lightbox__bar">
      <div><p class="lightbox__count" data-lb-count></p><p class="lightbox__cap" data-lb-cap></p></div>
      <div class="lightbox__nav" ${items.length < 2 ? 'hidden' : ''}>
        <button class="lightbox__prev" type="button" aria-label="${esc(a.prev)}" data-lb="prev">${ICON.arrow}</button>
        <button class="lightbox__next" type="button" aria-label="${esc(a.next)}" data-lb="next">${ICON.arrow}</button>
      </div>
    </div>`;
  if (!wired) wire(d);
  show(0);
  d.showModal();
  lockScroll(true);
}

function show(dir) {
  const d = dlg();
  const it = items[index];
  const img = d.querySelector('[data-lb-img]');
  const alt = PHOTOS[it.photo]?.alt?.[lang()] || '';
  const swap = () => {
    img.src = imgSrc(it.photo, 1400);
    img.alt = alt;
    d.querySelector('[data-lb-cap]').textContent = it.caption || alt;
    d.querySelector('[data-lb-count]').textContent = items.length > 1 ? `${index + 1} / ${items.length}` : '';
  };
  if (!dir || state.reduced) { swap(); return; }
  gsap.to(img, {
    opacity: 0, x: -40 * dir, duration: 0.18, ease: 'power2.in',
    onComplete: () => { swap(); gsap.fromTo(img, { opacity: 0, x: 40 * dir }, { opacity: 1, x: 0, duration: 0.35, ease: 'power3.out' }); },
  });
}

const step = (dir) => {
  if (items.length < 2) return;
  index = (index + dir + items.length) % items.length;
  show(dir);
};

function wire(d) {
  wired = true;
  d.addEventListener('click', (e) => {
    const b = e.target.closest('[data-lb]');
    if (b) {
      const act = b.dataset.lb;
      if (act === 'close') d.close();
      if (act === 'prev') step(-1);
      if (act === 'next') step(1);
    }
  });
  d.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') step(document.documentElement.dir === 'rtl' ? -1 : 1);
    if (e.key === 'ArrowLeft') step(document.documentElement.dir === 'rtl' ? 1 : -1);
  });
  d.addEventListener('close', () => { lockScroll(false); d.innerHTML = ''; });
  let x0 = null;
  d.addEventListener('pointerdown', (e) => { if (e.target.closest('[data-lb-stage]')) x0 = e.clientX; });
  d.addEventListener('pointerup', (e) => {
    if (x0 === null) return;
    const dx = e.clientX - x0;
    x0 = null;
    if (Math.abs(dx) > 50) step(dx < 0 ? 1 : -1);
  });
}
