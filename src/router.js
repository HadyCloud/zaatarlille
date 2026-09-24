import * as home from './pages/home.js';
import * as carte from './pages/carte.js';
import * as infos from './pages/infos.js';
import { CONFIG } from './data.js';
import { t } from './i18n.js';
import { setActive, closeOverlay, updateStatus } from './shell.js';
import { gsap, ScrollTrigger, state, scrollToY, scrollToEl } from './motion.js';

const PAGES = { '/': home, '/carte': carte, '/infos': infos };
const KEYS = { '/': 'home', '/carte': 'carte', '/infos': 'infos' };
const main = document.getElementById('main');

let cur = null;
let busy = false;
let queued = null;

// Hash routes: #/ · #/carte?cat=wraps · #/infos#histoire. Other hashes (e.g. #main) are ignored.
export function parse(hash = location.hash) {
  if (hash && !hash.startsWith('#/')) return null;
  const raw = (hash || '#/').slice(1);
  const [pq, anchor = ''] = raw.split('#');
  const [path, qs = ''] = pq.split('?');
  return { path: PAGES[path] ? path : '/', params: new URLSearchParams(qs), anchor };
}

function setMeta(path) {
  const [title, desc] = t().meta[KEYS[path]];
  document.title = title;
  const set = (sel, val) => document.querySelector(sel)?.setAttribute('content', val);
  set('meta[name="description"]', desc);
  set('meta[property="og:title"]', title);
  set('meta[property="og:description"]', desc);
  set('meta[name="twitter:title"]', title);
  set('meta[name="twitter:description"]', desc);
  if (CONFIG.siteUrl) {
    let link = document.querySelector('link[rel="canonical"]');
    if (!link) { link = document.createElement('link'); link.rel = 'canonical'; document.head.appendChild(link); }
    link.href = `${CONFIG.siteUrl.replace(/\/$/, '')}/${path === '/' ? '' : `#${path}`}`;
  }
}

function headerOffset() {
  return -(parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--header-h')) || 70) - 16;
}

function scrollToAnchor(id, immediate) {
  const el = document.getElementById(id);
  if (el) scrollToEl(el, headerOffset(), immediate);
}

function mountRoute(r, reason) {
  cur?.inst.cleanup();
  const page = PAGES[r.path];
  main.innerHTML = page.render(r, reason);
  setMeta(r.path);
  setActive(r.path);
  if (reason !== 'lang') scrollToY(0, true);
  const inst = page.mount(main, r, reason);
  cur = { path: r.path, inst };
  updateStatus();
  ScrollTrigger.refresh();
  if (r.anchor) requestAnimationFrame(() => scrollToAnchor(r.anchor, reason === 'initial'));
  if (reason === 'nav') {
    const h1 = main.querySelector('h1');
    h1?.focus({ preventScroll: true });
    document.getElementById('live').textContent = t().a11y.routeLoaded(t().nav[KEYS[r.path]]);
  }
}

const curtain = document.getElementById('curtain');
const arch = curtain.firstElementChild;

function curtainIn() {
  if (state.reduced) return gsap.to(main, { opacity: 0, duration: 0.18 }).then();
  curtain.style.visibility = 'visible';
  return gsap.fromTo(arch, { y: window.innerHeight * 1.3 }, { y: 0, duration: 0.32, ease: 'power3.in' }).then();
}

function curtainOut() {
  if (state.reduced) return gsap.fromTo(main, { opacity: 0 }, { opacity: 1, duration: 0.25 }).then();
  return gsap.to(arch, {
    y: -window.innerHeight * 1.3, duration: 0.42, ease: 'power3.out',
    onComplete: () => { curtain.style.visibility = 'hidden'; },
  }).then();
}

async function go(r) {
  if (busy) { queued = r; return; }
  busy = true;
  closeOverlay(true);
  await curtainIn();
  mountRoute(r, 'nav');
  await curtainOut();
  cur.inst.intro?.();
  busy = false;
  if (queued) {
    const q = queued;
    queued = null;
    if (q.path !== cur.path) go(q);
  }
}

function onHash() {
  const r = parse();
  if (!r) return;
  if (cur && r.path === cur.path) {
    closeOverlay(true);
    if (r.anchor) scrollToAnchor(r.anchor);
    else if (cur.inst.update) cur.inst.update(r);
    else scrollToY(0);
    return;
  }
  go(r);
}

export function start() {
  window.addEventListener('hashchange', onHash);
  const r = parse() || parse('#/');
  mountRoute(r, 'initial');
  return cur.inst;
}

export function rerender() {
  if (!cur) return;
  const y = window.scrollY;
  const r = parse() || parse('#/');
  mountRoute({ ...r, anchor: '' }, 'lang');
  cur.inst.intro?.({ instant: true });
  scrollToY(y, true);
  ScrollTrigger.refresh();
}
