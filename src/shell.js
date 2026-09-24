import { CONFIG } from './data.js';
import { t, lang, LANGS, tl } from './i18n.js';
import { esc } from './format.js';
import { ICON, links, statusInfo, hoursGroups, imgSrc, external } from './util.js';
import { gsap, state, setPaused, onPause, lockScroll } from './motion.js';

const $ = (s, r = document) => r.querySelector(s);
const ROUTES = [['/', 'home'], ['/carte', 'carte'], ['/infos', 'infos']];

let tickerOff = null;
let onLangChange = () => {};
let currentPath = '/';

export function initShell({ onLang }) {
  onLangChange = onLang;
  renderShell();
  document.addEventListener('click', onDocClick);
  setInterval(updateStatus, 30_000);
  document.addEventListener('visibilitychange', () => { if (!document.hidden) updateStatus(); });
  onPause(syncMotionToggles);
  document.querySelector('[data-skip]').addEventListener('click', (e) => {
    e.preventDefault();
    const main = document.getElementById('main');
    main.focus({ preventScroll: true });
    main.scrollIntoView();
  });
}

export function renderShell() {
  if (overlayOpen) closeOverlay(true);
  const d = t();
  document.querySelector('[data-skip]').textContent = d.a11y.skip;
  $('#topbar').innerHTML = tickerHTML() + headerHTML();
  $('#overlay').innerHTML = overlayHTML();
  $('#overlay').setAttribute('aria-label', d.a11y.nav);
  $('#footer').innerHTML = footerHTML();
  $('#actionbar').innerHTML = actionbarHTML();
  $('#actionbar').setAttribute('aria-label', d.actions.menu);
  $('#lightbox').setAttribute('aria-label', d.a11y.photo);
  setActive(currentPath);
  updateStatus();
  syncMotionToggles(state.paused);
  tickerOff?.();
  tickerOff = initTicker($('.ticker'));
}

/* ── Templates ─────────────────────────────────────────────────────── */
function tickerHTML() {
  const d = t();
  const group = `<div class="ticker__group">${d.ticker.map((s) => `<span class="ticker__item">${esc(s)}${ICON.star()}</span>`).join('')}</div>`;
  return `<div class="ticker">
    <div class="ticker__track" aria-hidden="true">${group}${group}${group}</div>
    <button class="ticker__pause" type="button" data-motion-toggle aria-pressed="false" aria-label="${esc(d.a11y.pauseMotion)}">${ICON.pause}</button>
  </div>`;
}

const navItems = (cls = '') => {
  const d = t();
  return ROUTES.map(([path, key], i) => `<li><a class="${cls}" href="#${path}" data-nav="${path}">${cls ? `<span class="num">0${i + 1}</span>` : ICON.star()}${esc(d.nav[key])}</a></li>`).join('');
};

const langButtons = () => LANGS.map((l) =>
  `<button type="button" data-lang="${l}" lang="${l}" aria-pressed="${l === lang()}" aria-label="${esc(tl(l).name)}">${l.toUpperCase()}</button>`).join('');

function headerHTML() {
  const d = t();
  return `<header class="hdr">
    <a class="hdr__logo" href="#/" data-nav-home><img src="${imgSrc('logo-tile', 421)}" width="421" height="251" alt="${esc(d.a11y.home)}"></a>
    <nav class="hdr__nav" aria-label="${esc(d.a11y.nav)}"><ul class="pillnav">${navItems()}</ul></nav>
    <div class="hdr__langs pillnav langs" role="group" aria-label="${esc(d.a11y.lang)}">${langButtons()}</div>
    <a class="status" href="#/infos" data-status></a>
    <button class="burger" type="button" aria-expanded="false" aria-controls="overlay" aria-label="${esc(d.a11y.menuOpen)}" data-burger><span></span></button>
  </header>`;
}

function overlayHTML() {
  const d = t();
  return `<nav aria-label="${esc(d.a11y.nav)}"><ul class="overlay__links">${navItems('ovl')}</ul></nav>
    <div class="overlay__foot">
      <div class="pillnav langs" role="group" aria-label="${esc(d.a11y.lang)}">${langButtons()}</div>
      <div class="overlay__contact">
        <span>${esc(CONFIG.address.street)}, ${esc(CONFIG.address.city)}</span>
        <a href="${links.tel}">${ICON.phone}${esc(CONFIG.phone.display)}</a>
        ${external(links.instagram, '', '', `${ICON.insta}@${esc(CONFIG.instagram.handle)}`)}
      </div>
      ${motionToggleHTML()}
    </div>`;
}

const motionToggleHTML = () => {
  const d = t().a11y;
  return `<button class="motion-toggle" type="button" data-motion-toggle aria-pressed="false">${ICON.pause}<span>${esc(d.motionLabel)} : <span data-motion-state>${esc(d.motionOn)}</span></span></button>`;
};

function footerHTML() {
  const d = t();
  const hours = hoursGroups().map((g) => `<li><span>${esc(g.days)}</span><span class="${g.closed ? 'closed' : ''}">${esc(g.text)}</span></li>`).join('');
  return `<div class="footer__top">
      <span class="wm" aria-hidden="true">ZA'</span>
      <img class="footer__logo" src="${imgSrc('logo-tile', 842)}" width="842" height="502" alt="Za'atar — La Boulangerie Libanaise" loading="lazy">
      <p class="footer__pitch">${esc(d.footer.pitch)}</p>
    </div>
    <div class="footer__base"><div class="wrap">
      <div class="footer__grid">
        <div class="footer__col"><h2>${ICON.star()}${esc(d.common.address)}</h2>
          <p>${esc(CONFIG.address.street)}<br>${esc(CONFIG.address.postcode)} ${esc(CONFIG.address.city)}</p>
          ${external(links.directions, '', '', `${esc(d.common.directions)} ${ICON.arrow}`)}
        </div>
        <div class="footer__col"><h2>${ICON.star()}${esc(d.common.hours)}</h2><ul class="footer__hours">${hours}</ul></div>
        <div class="footer__col"><h2>${ICON.star()}${esc(d.common.phone)}</h2><a href="${links.tel}">${ICON.phone}${esc(CONFIG.phone.display)}</a></div>
        <div class="footer__col"><h2>${ICON.star()}${esc(d.common.instagram)}</h2>${external(links.instagram, '', '', `${ICON.insta}@${esc(CONFIG.instagram.handle)}`)}</div>
      </div>
      <div class="footer__bottom">
        <p class="footer__signed">${esc(d.footer.signed)}</p>
        <div class="footer__tools">${motionToggleHTML()}<div class="pillnav langs" role="group" aria-label="${esc(d.a11y.lang)}">${langButtons()}</div></div>
        <p>${esc(d.footer.rights)}</p>
      </div>
    </div></div>`;
}

function actionbarHTML() {
  const d = t();
  return `<a href="${links.tel}">${ICON.phone}<span>${esc(d.actions.call)}</span></a>
    ${external(links.directions, '', '', `${ICON.pin}<span>${esc(d.actions.route)}</span>`)}
    <a href="#/carte" data-nav="/carte">${ICON.menu}<span>${esc(d.actions.menu)}</span></a>`;
}

/* ── Live status ───────────────────────────────────────────────────── */
export function updateStatus() {
  const s = statusInfo();
  document.querySelectorAll('[data-status]').forEach((el) => {
    el.classList.toggle('is-open', s.open);
    el.innerHTML = `<span class="status__dot" aria-hidden="true"></span>
      <span class="status__short">${esc(s.short)}</span>
      <span class="status__long">${esc(s.label)}<span class="status__detail"> · ${esc(s.detail)}</span></span>`;
  });
  document.querySelectorAll('[data-livebox]').forEach((el) => {
    el.classList.toggle('is-open', s.open);
    el.innerHTML = `<span class="status__dot" aria-hidden="true" style="position:relative"></span><span><strong>${esc(s.label)}</strong> · ${esc(s.detail)}</span>`;
  });
}

/* ── Active route ──────────────────────────────────────────────────── */
export function setActive(path) {
  currentPath = path;
  document.querySelectorAll('[data-nav]').forEach((a) => {
    if (a.dataset.nav === path) a.setAttribute('aria-current', 'page');
    else a.removeAttribute('aria-current');
  });
}

/* ── Clicks: language, motion, burger ─────────────────────────────── */
function onDocClick(e) {
  const langBtn = e.target.closest('[data-lang]');
  if (langBtn) {
    const l = langBtn.dataset.lang;
    if (l !== lang()) onLangChange(l);
    return;
  }
  if (e.target.closest('[data-motion-toggle]')) { setPaused(!state.paused); return; }
  if (e.target.closest('[data-burger]')) { toggleOverlay(); return; }
  if (e.target.closest('#overlay a[href^="#/"]')) closeOverlay(true);
}

function syncMotionToggles(paused) {
  const d = t().a11y;
  document.querySelectorAll('[data-motion-toggle]').forEach((b) => {
    b.setAttribute('aria-pressed', String(paused));
    const icon = b.querySelector('.ico');
    if (icon) icon.outerHTML = paused ? ICON.play : ICON.pause;
    const st = b.querySelector('[data-motion-state]');
    if (st) st.textContent = paused ? d.motionOff : d.motionOn;
    if (b.classList.contains('ticker__pause')) b.setAttribute('aria-label', paused ? d.playMotion : d.pauseMotion);
  });
}

/* ── Mobile overlay ───────────────────────────────────────────────── */
let overlayOpen = false;
let trapOff = null;

function toggleOverlay() { (overlayOpen ? closeOverlay : openOverlay)(); }

function openOverlay() {
  const ov = $('#overlay');
  const burger = $('[data-burger]');
  overlayOpen = true;
  ov.hidden = false;
  burger.setAttribute('aria-expanded', 'true');
  burger.setAttribute('aria-label', t().a11y.menuClose);
  document.body.classList.add('overlay-open');
  lockScroll(true);
  const items = ov.querySelectorAll('.overlay__links li, .overlay__foot > *');
  if (state.reduced) gsap.fromTo(ov, { opacity: 0 }, { opacity: 1, duration: 0.2 });
  else {
    gsap.fromTo(ov, { yPercent: -100 }, { yPercent: 0, duration: 0.7, ease: 'expo.out' });
    gsap.fromTo(items, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, ease: 'expo.out', stagger: 0.06, delay: 0.15 });
  }
  ov.querySelector('a')?.focus();
  const onKey = (e) => {
    if (e.key === 'Escape') { closeOverlay(); return; }
    if (e.key !== 'Tab') return;
    const f = [burger, ...ov.querySelectorAll('a, button')];
    const i = f.indexOf(document.activeElement);
    if (e.shiftKey && i <= 0) { e.preventDefault(); f[f.length - 1].focus(); }
    else if (!e.shiftKey && i === f.length - 1) { e.preventDefault(); f[0].focus(); }
  };
  document.addEventListener('keydown', onKey);
  trapOff = () => document.removeEventListener('keydown', onKey);
}

export function closeOverlay(fromNav = false) {
  if (!overlayOpen) return;
  const ov = $('#overlay');
  const burger = $('[data-burger]');
  overlayOpen = false;
  trapOff?.();
  burger.setAttribute('aria-expanded', 'false');
  burger.setAttribute('aria-label', t().a11y.menuOpen);
  document.body.classList.remove('overlay-open');
  lockScroll(false);
  const done = () => { ov.hidden = true; gsap.set(ov, { clearProps: 'transform,opacity' }); };
  if (state.reduced || fromNav) done();
  else gsap.to(ov, { yPercent: -100, duration: 0.5, ease: 'expo.in', onComplete: done });
  if (!fromNav) burger.focus();
}

/* ── Ticker: speed follows scroll velocity ─────────────────────────── */
function initTicker(el) {
  const track = el.querySelector('.ticker__track');
  const group = track.firstElementChild;
  let width = group.offsetWidth;
  let x = 0;
  let lastY = window.scrollY;
  let vel = 0;
  const set = gsap.quickSetter(track, 'x', 'px');
  const ro = new ResizeObserver(() => { width = group.offsetWidth; });
  ro.observe(group);
  let hover = false;
  el.addEventListener('pointerenter', () => { hover = true; });
  el.addEventListener('pointerleave', () => { hover = false; });
  const tick = (_t, dtMs) => {
    const y = window.scrollY;
    const dt = Math.min(dtMs, 50) / 1000;
    vel += ((Math.abs(y - lastY) / Math.max(dt, 0.001)) - vel) * 0.12;
    lastY = y;
    if (state.reduced || state.paused || hover || !width) return;
    x -= (36 + Math.min(vel * 0.45, 640)) * dt;
    if (x <= -width) x += width;
    set(x);
  };
  gsap.ticker.add(tick);
  return () => { gsap.ticker.remove(tick); ro.disconnect(); };
}
