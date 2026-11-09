import { CONFIG, GALLERY } from '../data.js';
import { t } from '../i18n.js';
import { esc } from '../format.js';
import { pic, ICON, links, weekRows, hoursSentence, external, watermark } from '../util.js';
import { todayIndex } from '../hours.js';
import { mapHTML, mountMap } from '../map.js';
import { visitCardHTML } from '../visit.js';
import { openLightbox } from '../lightbox.js';
import { updateStatus } from '../shell.js';
import { gsap, state, reveals, magnetic } from '../motion.js';

const star = () => ICON.star();

function weekTable() {
  const d = t();
  const today = todayIndex(new Date(), CONFIG.timezone);
  const rows = weekRows().map((r) => `<tr class="${r.i === today ? 'is-today' : ''}">
      <th scope="row">${esc(r.day)}${r.i === today ? `<span class="today-tag">${star()}${esc(d.common.today)}</span>` : ''}</th>
      <td class="${r.slots.length ? '' : 'closed'}">${esc(r.text)}</td>
    </tr>`).join('');
  return `<table class="week"><caption>${esc(d.infos.weekTitle)}</caption><tbody>${rows}</tbody></table>`;
}

export function render() {
  const d = t();
  const i = d.infos;
  const g = i.gallery;
  const f = i.faq;
  const tiles = GALLERY.map((tile, n) => `<button class="tile tile--${tile.size}${tile.pcOnly ? ' tile--pc' : ''}" type="button" data-tile="${n}" data-cursor="view" data-reveal="up" aria-label="${esc(d.a11y.photo)} ${n + 1}/${GALLERY.length}">
      ${pic(tile.photo, { sizes: tile.size === 'xl' ? '(min-width: 768px) 50vw, 100vw' : '(min-width: 768px) 25vw, 50vw', alt: '' })}
      ${tile.video ? `<video muted loop playsinline preload="none" data-src="${esc(tile.video)}" aria-hidden="true"></video>` : ''}
    </button>`).join('');
  const faq = f.items.map(([q, a], n) => `<li class="faq__item">
      <h3><button class="faq__q" type="button" aria-expanded="false" aria-controls="faq-${n}" id="faq-q-${n}">${esc(q)}<span class="faq__icon" aria-hidden="true"></span></button></h3>
      <div class="faq__a" id="faq-${n}" role="region" aria-labelledby="faq-q-${n}" hidden><p>${a === 'HOURS' ? esc(hoursSentence()) : esc(a)}</p></div>
    </li>`).join('');

  return `<section class="sec sec--tight t-paper infos-main" aria-labelledby="infos-title">
      <h1 class="sr-only" id="infos-title" tabindex="-1">${esc(i.title.replace(/<[^>]*>/g, ''))}</h1>
      <div class="wrap find__grid">
        <div class="stack" style="--gap:18px">
          ${mapHTML()}
          <div class="visit visit--week" data-reveal="up" style="background:var(--paper-2)">${weekTable()}</div>
        </div>
        ${visitCardHTML()}
      </div>
      <div class="wrap" style="margin-top:28px">
        <ul class="visit__actions" role="list" data-reveal="up">
          <li>${external(links.instagram, '', 'handle', `${ICON.insta} @${esc(CONFIG.instagram.handle)}`)}</li>
          <li><a class="handle" href="${links.tel}">${ICON.phone} ${esc(CONFIG.phone.display)}</a></li>
        </ul>
      </div>
    </section>

    <section class="sec t-paper" aria-labelledby="gallery-title">
      <div class="wrap">
        <div class="mosaic__head">
          <div class="stack">
            <h2 class="h h--xl" id="gallery-title" data-split>${g.title}</h2>
            <p class="body" data-reveal="up">${esc(g.lead)}</p>
          </div>
          ${external(links.instagram, '', 'btn', `${ICON.insta} ${esc(g.follow)}`)}
        </div>
        <div class="mosaic">${tiles}</div>
      </div>
    </section>

    <section class="sec t-paper2" aria-labelledby="faq-title">
      <div class="wrap faq">
        <h2 class="h h--xl" id="faq-title" data-split>${f.title}</h2>
        <ul class="faq__list" role="list">${faq}</ul>
      </div>
    </section>`;
}

export function mount(root) {
  const offs = [];
  const ctx = gsap.context(() => reveals(root), root);
  offs.push(magnetic(root), mountMap(root));
  updateStatus();

  const onClick = (e) => {
    const q = e.target.closest('.faq__q');
    if (q) {
      const open = q.getAttribute('aria-expanded') !== 'true';
      const panel = document.getElementById(q.getAttribute('aria-controls'));
      q.setAttribute('aria-expanded', String(open));
      panel.hidden = !open;
      if (open && !state.reduced) gsap.fromTo(panel.firstElementChild, { opacity: 0, y: -8 }, { opacity: 1, y: 0, duration: 0.45, ease: 'power2.out' });
      return;
    }
    const tile = e.target.closest('[data-tile]');
    if (tile) { openLightbox(GALLERY.map((g) => ({ photo: g.photo })), +tile.dataset.tile); return; }
    const ph = e.target.closest('[data-photo]');
    if (ph) openLightbox([{ photo: ph.dataset.photo }], 0);
  };
  root.addEventListener('click', onClick);
  offs.push(() => root.removeEventListener('click', onClick));

  // Instagram-style clips: play in view when a tile has a video that exists.
  const videos = [...root.querySelectorAll('.tile video[data-src]')];
  if (videos.length && !state.reduced) {
    const io = new IntersectionObserver((entries) => entries.forEach((en) => {
      const v = en.target;
      if (en.isIntersecting) {
        if (!v.src) v.src = v.dataset.src;
        v.play().catch(() => {});
      } else v.pause();
    }), { threshold: 0.35 });
    videos.forEach((v) => io.observe(v));
    offs.push(() => io.disconnect());
  }

  return { cleanup: () => { ctx.revert(); offs.forEach((f) => f && f()); } };
}
