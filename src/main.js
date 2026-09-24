import './styles/base.css';
import './styles/shell.css';
import './styles/home.css';
import './styles/carte.css';

import { initLang, setLang } from './i18n.js';
import { initShell, renderShell } from './shell.js';
import { gsap, state, initSmoothScroll, initChrome, initCursor, lockScroll } from './motion.js';
import * as router from './router.js';

const wait = (ms) => new Promise((r) => setTimeout(r, ms));

// Oven door: an arch-shaped hole grows from the bottom until it matches the hero arch.
function holePath(W, H, x, y, w, h, ryFactor) {
  const rx = w / 2;
  const ry = ryFactor ? h * ryFactor : Math.min(rx, h);
  const top = y + ry;
  return `path(evenodd, "M0 0H${W}V${H}H0Z M${x} ${y + h}V${top}A${rx} ${ry} 0 0 1 ${x + w} ${top}V${y + h}Z")`;
}

function preloaderIntro(pre) {
  const logo = pre.querySelector('.preloader__logo');
  const line = pre.querySelector('.preloader__line');
  return gsap.timeline()
    .fromTo(logo, { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.35, ease: 'power2.out' })
    .to(line, { scaleX: 1, duration: 0.5, ease: 'power2.inOut' }, 0.12);
}

function preloaderOpen(pre, target) {
  const W = window.innerWidth;
  const H = window.innerHeight;
  const T = target || { x: -W * 0.3, y: -H * 0.4, w: W * 1.6, h: H * 1.8, ry: null };
  const cx = T.x + T.w / 2;
  const bottom = T.y + T.h;
  const p = { t: 0 };
  return gsap.timeline()
    .to(pre.querySelectorAll('.preloader__logo, .preloader__line'), { opacity: 0, y: -16, duration: 0.28, ease: 'power2.in' }, 0)
    .to(p, {
      t: 1, duration: 0.62, ease: 'expo.inOut',
      onUpdate: () => {
        const w = T.w * p.t;
        const h = T.h * p.t;
        pre.style.clipPath = holePath(W, H, cx - w / 2, bottom - h, w, h, T.ry);
      },
    }, 0.05)
    .then();
}

async function boot() {
  initLang();
  initShell({
    onLang: (l) => { setLang(l); renderShell(); router.rerender(); },
  });
  initSmoothScroll();
  initChrome();
  initCursor();

  const pre = document.getElementById('preloader');
  const withPreloader = !state.reduced && !document.documentElement.classList.contains('no-preload');
  if (withPreloader) { lockScroll(true); preloaderIntro(pre); }

  await Promise.race([document.fonts?.ready ?? Promise.resolve(), wait(withPreloader ? 700 : 1200)]);
  const page = router.start();

  if (withPreloader) {
    await wait(120);
    await preloaderOpen(pre, page.archRect?.());
    lockScroll(false);
  }
  pre.remove();
  try { sessionStorage.setItem('zaatar.visited', '1'); } catch { /* private mode */ }
  page.intro?.();
}

boot();
