import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Flip } from 'gsap/Flip';
import { SplitText } from 'gsap/SplitText';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger, Flip, SplitText);
ScrollTrigger.config({ ignoreMobileResize: true });

export { gsap, ScrollTrigger, Flip, SplitText };

const root = document.documentElement;
export const mq = {
  reduced: matchMedia('(prefers-reduced-motion: reduce)'),
  fine: matchMedia('(hover: hover) and (pointer: fine)'),
};
// ?motion=reduce forces the reduced-motion experience (handy for QA).
const forceReduce = /[?&]motion=reduce\b/.test(location.search);
export const state = { reduced: mq.reduced.matches || forceReduce, lenis: null };
root.classList.toggle('reduced', state.reduced);
root.classList.toggle('has-hover', mq.fine.matches);
mq.reduced.addEventListener('change', () => location.reload());

/* ── Smooth scroll ─────────────────────────────────────────────────── */
export function initSmoothScroll() {
  if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
  if (state.reduced) return;
  const lenis = new Lenis({ lerp: 0.1, anchors: false, autoRaf: false, stopInertiaOnNavigate: true });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);
  state.lenis = lenis;
}

export function scrollToY(y, immediate = false) {
  if (state.lenis) state.lenis.scrollTo(y, { immediate, force: true, duration: 1.1 });
  else window.scrollTo({ top: y, behavior: immediate || state.reduced ? 'instant' : 'smooth' });
}

export function scrollToEl(el, offset = 0, immediate = false) {
  const y = el.getBoundingClientRect().top + window.scrollY + offset;
  scrollToY(Math.max(0, y), immediate);
}

export function lockScroll(lock) {
  if (state.lenis) (lock ? state.lenis.stop() : state.lenis.start());
  root.style.overflow = lock ? 'hidden' : '';
}

/* ── Scroll progress + compact top bar ─────────────────────────────── */
export function initChrome() {
  const bar = document.querySelector('.progress span');
  const setBar = gsap.quickSetter(bar, 'scaleX');
  ScrollTrigger.create({ start: 0, end: 'max', onUpdate: (self) => setBar(self.progress) });
  const topbar = document.getElementById('topbar');
  ScrollTrigger.create({ start: 0, end: 'max', onUpdate: (self) => topbar.classList.toggle('is-compact', self.scroll() > 80) });
}

/* ── Reveals & parallax (called per page inside a gsap.context) ────── */
export function reveals(scope) {
  if (state.reduced) return;
  scope.querySelectorAll('[data-split]').forEach((el) => {
    SplitText.create(el, {
      type: 'lines', linesClass: 'split-line', autoSplit: true,
      onSplit: (self) => gsap.from(self.lines, {
        yPercent: 60, opacity: 0, duration: 1.1, ease: 'expo.out', stagger: 0.09,
        scrollTrigger: { trigger: el, start: 'top 88%', once: true },
      }),
    });
  });

  const ups = scope.querySelectorAll('[data-reveal="up"]');
  if (ups.length) {
    gsap.set(ups, { y: 36 });
    ScrollTrigger.batch(ups, {
      start: 'top 90%', once: true,
      onEnter: (batch) => gsap.to(batch, { opacity: 1, y: 0, duration: 1, ease: 'expo.out', stagger: 0.08, overwrite: true }),
    });
  }

  scope.querySelectorAll('[data-reveal="img"]').forEach((el) => {
    const img = el.querySelector('img, video');
    const tl = gsap.timeline({ scrollTrigger: { trigger: el, start: 'top 86%', once: true } });
    tl.fromTo(el, { '--shut': 1 }, { '--shut': 0, duration: 1.3, ease: 'expo.inOut' });
    if (img) tl.fromTo(img, { scale: 1.3 }, { scale: 1, duration: 1.8, ease: 'expo.out' }, 0.1);
  });

  scope.querySelectorAll('[data-speed]').forEach((el) => {
    const amt = (1 - parseFloat(el.dataset.speed)) * 100;
    gsap.fromTo(el, { yPercent: -amt / 2 }, {
      yPercent: amt / 2, ease: 'none',
      scrollTrigger: { trigger: el.parentElement, start: 'top bottom', end: 'bottom top', scrub: true },
    });
  });
}

/* ── Magnetic buttons ──────────────────────────────────────────────── */
export function magnetic(scope) {
  if (state.reduced || !mq.fine.matches) return () => {};
  const els = [...scope.querySelectorAll('[data-magnetic]')];
  const offs = els.map((el) => {
    const xTo = gsap.quickTo(el, 'x', { duration: 0.5, ease: 'power3.out' });
    const yTo = gsap.quickTo(el, 'y', { duration: 0.5, ease: 'power3.out' });
    const move = (e) => {
      const r = el.getBoundingClientRect();
      xTo((e.clientX - (r.left + r.width / 2)) * 0.28);
      yTo((e.clientY - (r.top + r.height / 2)) * 0.4);
    };
    const leave = () => { xTo(0); yTo(0); };
    el.addEventListener('pointermove', move);
    el.addEventListener('pointerleave', leave);
    return () => { el.removeEventListener('pointermove', move); el.removeEventListener('pointerleave', leave); };
  });
  return () => offs.forEach((f) => f());
}

/* ── Custom cursor ─────────────────────────────────────────────────── */
const VIEW = { fr: 'Voir', en: 'View', es: 'Ver' };
export function initCursor() {
  if (state.reduced || !mq.fine.matches) return;
  root.classList.add('has-cursor');
  const c = document.getElementById('cursor');
  const dot = c.querySelector('.cursor__dot');
  const ring = c.querySelector('.cursor__ring');
  const label = c.querySelector('.cursor__label');
  const dx = gsap.quickTo(dot, 'x', { duration: 0.06 });
  const dy = gsap.quickTo(dot, 'y', { duration: 0.06 });
  const rx = gsap.quickTo(ring, 'x', { duration: 0.38, ease: 'power3.out' });
  const ry = gsap.quickTo(ring, 'y', { duration: 0.38, ease: 'power3.out' });
  let seen = false;
  window.addEventListener('pointermove', (e) => {
    if (e.pointerType !== 'mouse') return;
    if (!seen) { gsap.set([dot, ring], { x: e.clientX, y: e.clientY }); seen = true; }
    dx(e.clientX); dy(e.clientY); rx(e.clientX); ry(e.clientY);
    c.classList.remove('is-hidden');
  }, { passive: true });
  document.addEventListener('pointerover', (e) => {
    const t = e.target;
    const view = t.closest?.('[data-cursor="view"]');
    const link = t.closest?.('a, button, [role="button"], label, select');
    c.classList.toggle('is-view', !!view);
    c.classList.toggle('is-link', !view && !!link);
    c.classList.toggle('is-hidden', t.tagName === 'IFRAME' || !!t.closest?.('input, textarea'));
    label.textContent = view ? VIEW[root.lang] || VIEW.fr : '';
  });
  document.documentElement.addEventListener('pointerleave', () => c.classList.add('is-hidden'));
}

/* ── Hand-drawn "boiling line" on the wordmark (~9 fps) ────────────── */
export function boil(el) {
  if (state.reduced) return () => {};
  const noise = document.getElementById('boil-noise');
  el.classList.add('is-boiling');
  let visible = true;
  let seed = 1;
  const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; });
  io.observe(el);
  const id = setInterval(() => {
    if (!visible || document.hidden) return;
    seed = (seed % 4) + 1;
    noise.setAttribute('seed', String(seed));
  }, 110);
  return () => { clearInterval(id); io.disconnect(); el.classList.remove('is-boiling'); };
}

/* ── Ember sparks + flour dust (≤ 40 particles, paused off-screen) ─── */
export function sparks(canvas) {
  if (state.reduced) return () => {};
  const ctx = canvas.getContext('2d');
  let w = 0; let h = 0; let visible = true;
  const parts = [];
  const resize = () => {
    const r = canvas.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = r.width; h = r.height;
    canvas.width = Math.round(w * dpr); canvas.height = Math.round(h * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  };
  const spawn = (p, initial) => {
    p.life = 0; p.seed = Math.random() * 10;
    if (p.kind === 'ember') {
      p.x = w * (0.32 + Math.random() * 0.36);
      p.y = initial ? h * (0.45 + Math.random() * 0.55) : h + 8;
      p.vx = (Math.random() - 0.5) * 24; p.vy = -(34 + Math.random() * 70);
      p.max = 2.6 + Math.random() * 3.4; p.r = 0.7 + Math.random() * 1.7;
    } else {
      p.x = Math.random() * w; p.y = Math.random() * h;
      p.vx = 3 + Math.random() * 7; p.vy = -3 + Math.random() * 6;
      p.max = 7 + Math.random() * 9; p.r = 0.6 + Math.random() * 1.3;
    }
  };
  for (let i = 0; i < 38; i++) { const p = { kind: i < 28 ? 'ember' : 'flour' }; parts.push(p); }
  resize();
  parts.forEach((p) => spawn(p, true));
  const tick = (_t, dtMs) => {
    if (!visible || document.hidden) return;
    const dt = Math.min(dtMs, 50) / 1000;
    ctx.clearRect(0, 0, w, h);
    for (const p of parts) {
      p.life += dt;
      if (p.life > p.max || p.y < -10) spawn(p, false);
      p.x += (p.vx + Math.sin(p.life * 2.6 + p.seed) * 14) * dt;
      p.y += p.vy * dt;
      const a = Math.sin(Math.PI * Math.min(p.life / p.max, 1));
      if (p.kind === 'ember') {
        ctx.fillStyle = `rgba(242, 124, 52, ${a * 0.22})`;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r * 3.2, 0, 6.283); ctx.fill();
        ctx.fillStyle = `rgba(255, 196, 120, ${a * 0.95})`;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, 6.283); ctx.fill();
      } else {
        ctx.fillStyle = `rgba(244, 240, 230, ${a * 0.32})`;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, 6.283); ctx.fill();
      }
    }
  };
  const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; });
  io.observe(canvas);
  const ro = new ResizeObserver(resize);
  ro.observe(canvas);
  gsap.ticker.add(tick);
  return () => { gsap.ticker.remove(tick); io.disconnect(); ro.disconnect(); };
}
