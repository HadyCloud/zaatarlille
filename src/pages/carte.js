import { MENU } from '../data.js';
import { t, lang } from '../i18n.js';
import { esc, formatPrice, filterMenu, CATS, DEFAULT_FILTERS } from '../format.js';
import { pic, ICON, links, imgSrc, external, watermark } from '../util.js';
import { openLightbox } from '../lightbox.js';
import { gsap, Flip, ScrollTrigger, state, mq, reveals, magnetic, scrollToEl } from '../motion.js';

// Filters survive a language switch; a fresh visit starts from the defaults.
let filters = { ...DEFAULT_FILTERS };
let pendingCat = 'all'; // ?cat= deep link: scroll to that section on arrival (the whole menu stays listed)

const star = () => ICON.star();
const catFromParams = (params) => (CATS.includes(params?.get('cat')) ? params.get('cat') : 'all');

function chip(s) {
  const d = t();
  const thumb = s.cover
    ? `<span class="chip__thumb">${pic(s.cover, { sizes: '44px', alt: '' })}</span>`
    : '<span class="chip__thumb" aria-hidden="true"><span class="chip__za">ZA\'</span></span>';
  return `<button class="chip" type="button" data-cat="${s.id}" aria-pressed="false">${thumb}<span class="chip__num">${s.num}</span>${esc(s.label[lang()])}</button>`;
}

function row(s, it) {
  const d = t().carte;
  const id = `${s.id}/${it.id}`;
  const full = `${s.itemPrefix}${it.name}`.trim();
  const photoBtn = (cls, inner) => `<button class="${cls}" type="button" data-open-photo aria-label="${esc(d.photoOf(full))}">${inner}</button>`;
  const gloss = it.gloss?.[lang()];
  return `<li class="row${it.photo ? ' has-thumb' : ''}" data-row="${id}"${it.photo ? ` data-photo="${it.photo}"` : ''}>
    <div class="row__line">
      ${it.photo ? photoBtn('row__thumb', pic(it.photo, { sizes: '44px', alt: '' })) : '<span class="row__thumb row__thumb--empty" aria-hidden="true"></span>'}
      <span class="row__name">${esc(it.name)}${it.veg ? `<span class="row__veg" title="${esc(d.vegTag)}">${ICON.leaf}<span class="sr-only">, ${esc(d.vegTag)}</span></span>` : ''}</span>
      <span class="row__dots" aria-hidden="true"></span>
      <span class="row__price">${formatPrice(it.price)}</span>
    </div>
    ${gloss ? `<p class="row__gloss">${esc(gloss)}</p>` : ''}
  </li>`;
}

function section(s) {
  const title = `<h2 class="h msec__title" id="sec-${s.id}" lang="fr">${s.pre ? `<span class="msec__pre">${esc(s.pre)}</span>` : ''}${esc(s.title)}${s.post ? `<span class="msec__post">${esc(s.post)}</span>` : ''}</h2>`;
  const cover = s.cover
    ? `<div class="arch msec__cover" data-cursor="view" data-photo="${s.cover}">${pic(s.cover, { sizes: '300px' })}</div>`
    : `<div class="arch msec__cover msec__cover--type" aria-hidden="true"><span class="za">ZA'</span><span class="script" lang="fr">${esc(s.script)}</span></div>`;
  return `<section class="msec" data-section="${s.id}" aria-labelledby="sec-${s.id}">
    <div class="msec__grid">
      <div>
        <header class="msec__head">
          <span class="msec__num">${star()}${s.num}.</span>
          ${title}
          ${s.script ? `<p class="msec__script" lang="fr">${esc(s.script)}</p>` : ''}
        </header>
        <ul class="rows">${s.items.map((it) => row(s, it)).join('')}</ul>
      </div>
      ${cover}
    </div>
  </section>`;
}

export function render(route, reason) {
  if (reason !== 'lang') { filters = { ...DEFAULT_FILTERS }; pendingCat = catFromParams(route.params); }
  const d = t();
  const c = d.carte;
  return `<section class="phero t-sage" aria-labelledby="carte-title">
      ${watermark()}
      <div class="wrap">
        <h1 class="h phero__title" id="carte-title" tabindex="-1" data-split>${esc(c.title)}</h1>
        <p class="phero__script" lang="fr">${esc(c.script)}</p>
        ${external(links.review, '', 'btn', `${esc(d.common.review)} ${ICON.arrow}`)}
      </div>
    </section>
    <div class="chips t-paper" data-chips>
      <div class="chips__scroller" role="group" aria-label="${esc(c.categories)}">
        ${MENU.sections.map(chip).join('')}
      </div>
    </div>
    <section class="t-paper board" data-board aria-label="${esc(c.filters)}">
      ${watermark()}
      <div class="wrap">
        <div class="tools" role="search">
          <div class="search">
            ${ICON.search}
            <label class="sr-only" for="menu-q">${esc(c.search)}</label>
            <input id="menu-q" type="search" autocomplete="off" enterkeyhint="search" placeholder="${esc(c.searchPh)}" value="${esc(filters.q)}" data-q>
            <button class="search__clear" type="button" aria-label="${esc(c.clear)}" data-clear ${filters.q ? '' : 'hidden'}>${ICON.close}</button>
          </div>
          <button class="toggle" type="button" aria-pressed="${filters.veg}" data-veg>
            <span class="toggle__track" aria-hidden="true"></span>${ICON.leaf}${esc(c.vegOnly)}
          </button>
        </div>
        <div data-sections>${MENU.sections.map(section).join('')}</div>
        <div class="empty" data-empty>
          ${star()}
          <p class="h h--m empty__title">${esc(c.empty)}</p>
          <p class="body">${esc(c.emptyHint)}</p>
          <button class="btn" type="button" data-reset>${esc(c.reset)}</button>
        </div>
        <p class="board__note">${star()}${esc(c.note)}</p>
      </div>
    </section>`;
}

export function mount(root, route, reason) {
  const c = t().carte;
  const offs = [];
  const board = root.querySelector('[data-board]');
  const chipsBar = root.querySelector('[data-chips]');
  const scroller = chipsBar.querySelector('.chips__scroller');
  const chips = [...chipsBar.querySelectorAll('[data-cat]')];
  const sections = [...root.querySelectorAll('[data-section]')];
  const rowEls = new Map([...root.querySelectorAll('[data-row]')].map((el) => [el.dataset.row, el]));
  const empty = root.querySelector('[data-empty]');
  const input = root.querySelector('[data-q]');
  const clearBtn = root.querySelector('[data-clear]');
  const vegBtn = root.querySelector('[data-veg]');
  const live = document.getElementById('live');
  let flipTl = null;
  let seq = 0;
  let announceTimer;

  const syncControls = () => {
    vegBtn.setAttribute('aria-pressed', String(filters.veg));
    clearBtn.hidden = !filters.q;
    if (input.value !== filters.q) input.value = filters.q;
  };

  const announce = (n) => {
    clearTimeout(announceTimer);
    announceTimer = setTimeout(() => { live.textContent = c.count(n); }, 400);
  };

  async function apply({ animate = true, scrollTop = false } = {}) {
    const my = ++seq;
    const result = filterMenu(MENU, filters, lang());
    const order = new Map(result.sections.map((s) => [s.id, s.items.map((i) => `${s.id}/${i.id}`)]));
    const visible = new Set([...order.values()].flat());
    syncControls();
    if (animate) announce(result.count);
    const doAnim = animate && !state.reduced;

    if (flipTl) { flipTl.progress(1).kill(); flipTl = null; }
    const leaving = [...rowEls.entries()].filter(([id, el]) => !el.hidden && !visible.has(id)).map(([, el]) => el);
    if (doAnim && leaving.length) {
      await gsap.to(leaving, { opacity: 0, duration: 0.14, ease: 'power1.in', overwrite: true });
      if (my !== seq) return;
    }
    const targets = [...sections, ...rowEls.values()];
    const flipState = doAnim ? Flip.getState(targets) : null;

    sections.forEach((sec) => {
      const ids = order.get(sec.dataset.section);
      sec.hidden = !ids;
      if (ids) {
        const list = sec.querySelector('.rows');
        ids.forEach((id) => list.appendChild(rowEls.get(id)));
      }
    });
    rowEls.forEach((el, id) => { el.hidden = !visible.has(id); });
    if (leaving.length) gsap.set(leaving, { clearProps: 'opacity' });
    empty.classList.toggle('is-on', result.count === 0);

    if (scrollTop) {
      const top = board.getBoundingClientRect().top;
      if (top < 0) scrollToEl(board, -(chipsBar.offsetHeight + parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--header-h'))), false);
    }
    if (flipState) {
      flipTl = Flip.from(flipState, {
        targets, duration: 0.6, ease: 'power3.inOut', nested: true, prune: true, simple: true,
        onEnter: (els) => gsap.fromTo(els, { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.45, ease: 'power2.out', stagger: 0.012 }),
        onComplete: () => ScrollTrigger.refresh(),
      });
    } else {
      ScrollTrigger.refresh();
    }
    spy.update();
  }

  /* Scroll-spy: the whole menu stays listed; the chip of the section in view is highlighted as you scroll. */
  const spy = (() => {
    let current = null;
    let lockUntil = 0;
    const inView = new Map();
    const mark = (id) => {
      if (id === current) return;
      current = id;
      chips.forEach((b) => {
        const on = b.dataset.cat === id;
        b.classList.toggle('is-spy', on);
        b.setAttribute('aria-pressed', String(on));
      });
      const chipEl = chips.find((b) => b.dataset.cat === id);
      if (chipEl) scroller.scrollTo({ left: Math.max(0, chipEl.offsetLeft - 24), behavior: state.reduced ? 'auto' : 'smooth' });
    };
    const recompute = () => {
      if (performance.now() < lockUntil) return;
      const first = sections.find((s) => inView.get(s.dataset.section) && !s.hidden);
      mark(first ? first.dataset.section : null);
    };
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => inView.set(e.target.dataset.section, e.isIntersecting));
      recompute();
    }, { rootMargin: '-35% 0px -55% 0px' });
    sections.forEach((s) => io.observe(s));
    offs.push(() => io.disconnect());
    return {
      update: () => { current = undefined; recompute(); },
      // A tapped chip stays highlighted while the page glides there (the last sections can't reach the top).
      force: (id) => { lockUntil = performance.now() + 1500; mark(id); setTimeout(recompute, 1550); },
    };
  })();

  /* Chip tap = jump to that section of the full menu. */
  const goTo = (id, immediate = false) => {
    const sec = sections.find((x) => x.dataset.section === id && !x.hidden);
    if (!sec) return;
    const headerH = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--header-h')) || 68;
    state.lenis?.resize?.(); // page height may not be measured yet on a cold load
    spy.force(id);
    scrollToEl(sec, -(headerH + chipsBar.offsetHeight + 12), immediate);
  };

  /* Events */
  chips.forEach((b) => b.addEventListener('click', () => goTo(b.dataset.cat)));
  vegBtn.addEventListener('click', () => { filters.veg = !filters.veg; apply(); });
  let qTimer;
  input.addEventListener('input', () => {
    clearBtn.hidden = !input.value;
    clearTimeout(qTimer);
    qTimer = setTimeout(() => { filters.q = input.value; apply(); }, 180);
  });
  input.addEventListener('keydown', (e) => { if (e.key === 'Escape' && input.value) { e.preventDefault(); filters.q = ''; apply(); } });
  clearBtn.addEventListener('click', () => { filters.q = ''; apply(); input.focus(); });
  root.querySelector('[data-reset]').addEventListener('click', () => {
    filters = { ...DEFAULT_FILTERS };
    apply({ scrollTop: true });
    chips[0].focus();
  });

  /* Photos: lightbox (all sizes), cursor-following preview (fine pointers) */
  board.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-open-photo]');
    const cover = e.target.closest('.msec__cover[data-photo]');
    if (!btn && !cover) return;
    const rows = [...board.querySelectorAll('.row.has-thumb')].filter((r) => !r.hidden);
    const list = rows.map((r) => ({ photo: r.dataset.photo, caption: `${r.querySelector('.row__name').firstChild.textContent} · ${r.querySelector('.row__price').textContent}` }));
    if (btn) openLightbox(list, Math.max(0, rows.indexOf(btn.closest('.row'))));
    else openLightbox([{ photo: cover.dataset.photo }], 0);
  });

  if (mq.fine.matches && !state.reduced) {
    const fp = document.getElementById('floatpic');
    const img = fp.querySelector('img');
    const xTo = gsap.quickTo(fp, 'x', { duration: 0.45, ease: 'power3.out' });
    const yTo = gsap.quickTo(fp, 'y', { duration: 0.45, ease: 'power3.out' });
    let activeRow = null;
    const over = (e) => {
      const r = e.target.closest('.row.has-thumb');
      if (r === activeRow) return;
      activeRow = r;
      if (!r) { gsap.to(fp, { opacity: 0, scale: 0.85, rotate: -4, duration: 0.3, overwrite: 'auto' }); return; }
      img.src = imgSrc(r.dataset.photo, 400);
      gsap.to(fp, { opacity: 1, scale: 1, rotate: 0, duration: 0.45, ease: 'expo.out', overwrite: 'auto' });
    };
    const move = (e) => { xTo(e.clientX); yTo(e.clientY); };
    const leave = () => { activeRow = null; gsap.to(fp, { opacity: 0, scale: 0.85, duration: 0.3 }); };
    gsap.set(fp, { scale: 0.85 });
    board.addEventListener('pointerover', over);
    board.addEventListener('pointermove', move);
    board.addEventListener('pointerleave', leave);
    offs.push(() => { leave(); board.removeEventListener('pointerover', over); board.removeEventListener('pointermove', move); board.removeEventListener('pointerleave', leave); });
  }

  const ctx = gsap.context(() => reveals(root), root);
  offs.push(magnetic(root));
  apply({ animate: false });

  return {
    intro: () => {
      if (pendingCat === 'all') return;
      const id = pendingCat;
      pendingCat = 'all'; // used once: a later language switch must not scroll again
      // Cold load: let the layout settle (lazy images, pinned hero) before jumping, then once more to be safe.
      requestAnimationFrame(() => requestAnimationFrame(() => goTo(id, true)));
      setTimeout(() => goTo(id, true), 500);
    },
    update: (r) => {
      const cat = catFromParams(r.params);
      if (cat !== 'all') goTo(cat);
    },
    cleanup: () => { ctx.revert(); offs.forEach((f) => f && f()); flipTl?.kill(); clearTimeout(announceTimer); },
  };
}
