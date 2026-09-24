import { CONFIG, MENU, REVIEWS, HERO_REEL } from '../data.js';
import { t, lang } from '../i18n.js';
import { esc } from '../format.js';
import { pic, ICON, links, hoursGroups, external, watermark } from '../util.js';
import { mapHTML, mountMap } from '../map.js';
import { visitCardHTML } from '../visit.js';
import { openLightbox } from '../lightbox.js';
import { gsap, ScrollTrigger, state, mq, reveals, magnetic, boil, sparks } from '../motion.js';

const star = () => ICON.star();

/* ── Templates ─────────────────────────────────────────────────────── */
function hero() {
  const d = t();
  const chars = [..."ZA'ATAR"].map((c) => `<span class="ch"><span>${c}</span></span>`).join('');
  const hours = hoursGroups().map((g) => `${esc(g.days)} ${esc(g.text)}`).join(star());
  return `<section class="hero t-sage" data-hero>
    <div class="hero__stage">
      <p class="hero__eyebrow" data-intro>${esc(d.home.eyebrow)}</p>
      <h1 class="hero__word" tabindex="-1"><span class="sr-only">Za'atar — ${esc(CONFIG.tagline)}, Lille</span><span class="hero__chars" aria-hidden="true" style="display:contents">${chars}</span></h1>
      <p class="hero__tag" data-intro aria-hidden="true">${esc(CONFIG.tagline)}</p>
      <div class="hero__cell">
        <div class="hero__arch" data-arch>
          <div class="hero__inner" data-inner>
            ${HERO_REEL.map((p, i) => `<div class="hero__slide">${pic(p, {
              sizes: '100vw', eager: i === 0, priority: i === 0, alt: i === 0 ? undefined : '',
              attrs: i === 0 ? '' : 'fetchpriority="low"',
            })}</div>`).join('')}
            <video class="hero__video" data-src="${CONFIG.heroVideo}" muted loop playsinline preload="none" aria-hidden="true"></video>
          </div>
        </div>
      </div>
    </div>
    <canvas class="hero__sparks" aria-hidden="true"></canvas>
    <div class="hero__copy">
      <p class="hero__lead" data-intro>${esc(d.home.lead)}</p>
      <div class="hero__ctas" data-intro>
        <a class="btn" href="#/carte" data-magnetic>${esc(d.home.ctaMenu)} ${ICON.arrow}</a>
        <a class="btn btn--ghost" href="#/infos" data-magnetic>${esc(d.home.ctaFind)}</a>
      </div>
      <p class="hero__hours" data-intro>${hours}</p>
    </div>
  </section>`;
}

function ratingBadge() {
  const r = CONFIG.GOOGLE_RATING;
  if (!r) return '';
  return `<p class="badge" data-reveal="up"><span class="num">${String(r.value).replace('.', ',')}</span>${esc(t().common.rating(String(r.value).replace('.', ','), r.count))}</p>`;
}

function maison() {
  const d = t();
  const m = d.home.maison;
  const stamp = ['Halal', ...d.ticker.slice(2, 5)].join(' · ') + ' · ';
  return `<section class="sec t-paper maison" aria-labelledby="maison-title">
    ${watermark()}
    <div class="wrap maison__grid">
      <div class="maison__text stack">
        <h2 class="h h--xl" id="maison-title" data-split>${m.title}</h2>
        <p class="body" data-reveal="up">${esc(m.p1)}</p>
        <p class="body" data-reveal="up">${esc(m.p2)}</p>
        ${ratingBadge()}
        <a class="link" href="#/infos#histoire" data-reveal="up">${esc(d.common.story)} ${ICON.arrow}</a>
      </div>
      <figure class="maison__media">
        <div class="arch maison__arch shutter" data-reveal="img" data-cursor="view" data-photo="homepage">${pic('homepage', { sizes: '(min-width: 900px) 40vw, 90vw', pos: '12% 50%', attrs: 'data-speed="0.9"' })}</div>
        <div class="stamp" aria-hidden="true">
          <svg class="stamp__ring" viewBox="0 0 100 100"><defs><path id="stamp-c" d="M50,50 m-39,0 a39,39 0 1,1 78,0 a39,39 0 1,1 -78,0"/></defs>
            <text><textPath href="#stamp-c" textLength="243" lengthAdjust="spacingAndGlyphs">${esc(stamp)}</textPath></text></svg>
          ${star()}
        </div>
      </figure>
    </div>
  </section>`;
}

function process() {
  const d = t();
  const pr = d.home.process;
  const steps = [['minipizza'], ['furn'], ['manoucheZaatar'], ['wraps']].map(([photo], i) => `
    <li class="step">
      <div class="arch step__media shutter">${pic(photo, { sizes: '(min-width: 900px) 22vw, 45vw' })}</div>
      <div class="step__meta">
        <span class="step__num">0${i + 1}</span>
        <h4 class="step__title">${esc(pr.steps[i][0])}</h4>
        <p class="step__text">${esc(pr.steps[i][1])}</p>
      </div>
    </li>`).join('');
  return `<section class="sec t-paper process-sec" aria-label="${esc(pr.eyebrow)}">
    <div class="wrap process" data-process>
      <div class="process__head">
        <div class="stack" style="--gap:1rem"><h3 class="h h--l" data-split>${pr.title}</h3></div>
      </div>
      <div class="process__body" style="position:relative">
        <div class="process__track" aria-hidden="true"><span class="process__fill"></span></div>
        <ol class="process__steps" role="list">${steps}</ol>
      </div>
    </div>
  </section>`;
}

function chef() {
  const c = t().home.chef;
  return `<section class="sec sec--tight t-sagedeep chef" aria-labelledby="chef-title">
    ${watermark()}
    <div class="wrap chef__grid">
      <div class="arch chef__media shutter" data-reveal="img" data-cursor="view" data-photo="knefe_chef">${pic('knefe_chef', { sizes: '(min-width: 900px) 34vw, 90vw' })}</div>
      <div class="chef__text stack">
        <h2 class="h h--l" id="chef-title" data-split>${c.title}</h2>
        <p class="body" data-reveal="up">${esc(c.p)}</p>
        <a class="chef__house" data-reveal="up" href="${CONFIG.chef.otherHouseUrl}" target="_blank" rel="noopener noreferrer">${star()}${esc(CONFIG.chef.otherHouse)} · Lille ${ICON.arrow}</a>
      </div>
    </div>
  </section>`;
}

function envies() {
  const d = t();
  const panels = MENU.sections.filter((s) => !s.id.startsWith('boissons')).map((s) => {
    const label = s.label[lang()];
    const media = s.cover
      ? `<div class="env__media">${pic(s.cover, { sizes: '(min-width: 1024px) 64vw, 100vw' })}</div>`
      : `<div class="env__type" aria-hidden="true"><span class="za">ZA'</span><span class="script" lang="fr">${esc(s.script)}</span></div>`;
    return `<a class="env${s.cover ? '' : ' env--type'}" href="#/carte?cat=${s.id}" data-env>
      ${media}
      <div class="env__side" aria-hidden="true"><span class="env__num">${s.num}</span><span class="env__vt">${esc(label)}</span></div>
      <div class="env__body">
        <span class="env__num">${s.num}</span>
        <h3 class="env__title">${esc(label)}</h3>
        <span class="env__cta">${esc(d.common.discover)} ${ICON.arrow}</span>
      </div>
    </a>`;
  }).join('');
  return `<section class="sec t-sage envies" aria-labelledby="envies-title">
    ${watermark()}
    <div class="wrap envies__head stack">
      <h2 class="h h--xl" id="envies-title" data-split>${d.home.envies.title}</h2>
      <p class="lead" data-reveal="up">${esc(d.home.envies.lead)}</p>
    </div>
    <div class="wrap"><div class="envies__rail" data-envies>${panels}</div></div>
    <div class="wrap envies__more"><a class="btn" href="#/carte" data-magnetic>${esc(d.common.seeMenu)} ${ICON.arrow}</a></div>
  </section>`;
}

function reviewCard(r) {
  const d = t();
  const stars = r.stars ? `<span class="rcard__stars" role="img" aria-label="${r.stars}/5">${'★'.repeat(r.stars)}</span>` : '';
  return `<figure class="rcard">
    <blockquote class="rcard__text" lang="fr">${esc(r.text)}</blockquote>
    <figcaption class="rcard__foot"><span class="rcard__author">${esc(r.author)}</span>${stars}${r.placeholder ? `<span class="rcard__tag">${esc(d.common.sample)}</span>` : ''}</figcaption>
  </figure>`;
}

function reviews() {
  const d = t();
  const a = REVIEWS.map(reviewCard).join('');
  const b = [...REVIEWS].reverse().map(reviewCard).join('');
  const r = CONFIG.GOOGLE_RATING;
  return `<section class="sec t-forest reviews" aria-labelledby="rev-title">
    <div class="wrap reviews__head">
      <div class="arch reviews__portrait shutter" data-reveal="img" data-cursor="view" data-photo="Portrait">${pic('Portrait', { sizes: '(min-width: 900px) 26vw, 80vw', attrs: 'data-speed="0.9"' })}</div>
      <div class="reviews__text stack">
        <h2 class="h h--xl" id="rev-title" data-split>${d.home.reviews.title}</h2>
        ${r ? `<p class="lead" data-reveal="up">${esc(d.common.rating(String(r.value).replace('.', ','), r.count))}</p>` : ''}
        <div class="reviews__actions" data-reveal="up">
          ${external(links.review, '', 'btn', `${esc(d.common.review)} ${ICON.arrow}`)}
          <button class="btn btn--ghost btn--sm" type="button" data-mq-toggle aria-pressed="false">${ICON.pause}<span>${esc(d.a11y.pause)}</span></button>
        </div>
      </div>
    </div>
    <div class="mq" data-mq>
      <div class="mq__row"><div class="mq__track">${a}</div><div class="mq__track" aria-hidden="true">${a}</div></div>
      <div class="mq__row mq__row--rev" aria-hidden="true"><div class="mq__track">${b}</div><div class="mq__track">${b}</div></div>
    </div>
  </section>`;
}

function find() {
  const d = t();
  return `<section class="sec t-paper find" aria-labelledby="find-title">
    <div class="wrap">
      <div class="stack" style="--gap:1.2rem;margin-bottom:clamp(32px,4vw,56px)">
        <h2 class="h h--xl" id="find-title" data-split>${d.home.find.title}</h2>
      </div>
      <div class="find__grid">${mapHTML()}${visitCardHTML()}</div>
    </div>
  </section>`;
}

export function render() {
  return hero() + maison() + envies() + process() + chef() + reviews() + find();
}

/* ── Behaviour ─────────────────────────────────────────────────────── */
function heroScroll(root) {
  if (state.reduced) return;
  const hero = root.querySelector('[data-hero]');
  const arch = hero.querySelector('[data-arch]');
  const inner = hero.querySelector('[data-inner]');
  const setArch = (v) => { arch.style.transform = `scale(${v})`; };
  const setInner = (v) => { inner.style.transform = `scale(${v})`; };
  const target = () => {
    const W = arch.offsetWidth;
    const H = arch.offsetHeight;
    const ry = window.innerWidth >= 768 ? H * 0.64 : Math.min(W / 2, H);
    return Math.max(window.innerWidth / W, hero.offsetHeight / Math.max(H - ry, 1)) * 1.04;
  };
  const p = { s: 1 };
  const tl = gsap.timeline({
    scrollTrigger: { trigger: hero, start: 'top top', end: '+=85%', pin: true, scrub: 0.5, invalidateOnRefresh: true },
  });
  tl.fromTo(p, { s: 1 }, { s: target, ease: 'power1.in', onUpdate: () => { setArch(p.s); setInner(1 / p.s); } }, 0)
    .to(hero.querySelectorAll('.hero__eyebrow, .hero__word, .hero__tag'), { y: -70, ease: 'none' }, 0)
    .to(hero.querySelector('.hero__sparks'), { opacity: 0.35, ease: 'none' }, 0);
}

function reel(root) {
  const slides = [...root.querySelectorAll('.hero__slide')];
  if (slides.length < 2) return () => {};
  let i = 0;
  let kb = null;
  let timer = null;
  let visible = true;
  let stopped = false;
  const kenburns = (el) => (state.reduced ? null : gsap.fromTo(el.querySelector('img'),
    { scale: 1.16, xPercent: gsap.utils.random(-2.5, 2.5) }, { scale: 1.02, xPercent: 0, duration: 3.4, ease: 'none' }));
  const next = () => {
    if (stopped) return;
    const a = slides[i];
    i = (i + 1) % slides.length;
    const b = slides[i];
    gsap.set(b, { zIndex: 2 });
    gsap.set(a, { zIndex: 1 });
    gsap.fromTo(b, { opacity: 0 }, { opacity: 1, duration: state.reduced ? 0.8 : 0.7, ease: 'power2.inOut', onComplete: () => gsap.set(a, { opacity: 0, zIndex: 0 }) });
    kb?.kill();
    kb = kenburns(b);
  };
  const schedule = () => { timer = gsap.delayedCall(state.reduced ? 5 : 2.6, () => { next(); schedule(); }); if (!visible) timer.pause(); };
  kb = kenburns(slides[0]);
  schedule();
  const sync = () => { timer?.paused(!visible); kb?.paused(!visible); };
  const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; sync(); });
  io.observe(root.querySelector('[data-hero]'));
  return Object.assign(() => { stopped = true; timer?.kill(); kb?.kill(); io.disconnect(); }, { stop: () => { stopped = true; timer?.kill(); } });
}

function heroVideo(root, stopReel) {
  const v = root.querySelector('.hero__video');
  if (!v || state.reduced || !v.dataset.src) return;
  fetch(v.dataset.src, { method: 'HEAD' })
    .then((r) => {
      if (!r.ok || !(r.headers.get('content-type') || '').startsWith('video')) return;
      v.src = v.dataset.src;
      return v.play().then(() => { v.classList.add('is-ready'); stopReel.stop(); });
    })
    .catch(() => {});
}

function processScrub(root) {
  const el = root.querySelector('[data-process]');
  const steps = [...el.querySelectorAll('.step')];
  if (state.reduced) { steps.forEach((s) => s.classList.add('is-lit')); return; }
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: el.querySelector('.process__body'), start: 'top 82%', end: 'bottom 62%', scrub: 0.8,
      onUpdate: (self) => steps.forEach((s, i) => s.classList.toggle('is-lit', self.progress >= i / steps.length + 0.03)),
    },
  });
  tl.fromTo(el.querySelector('.process__fill'), { scaleX: 0 }, { scaleX: 1, ease: 'none', duration: steps.length }, 0);
  steps.forEach((s, i) => {
    const media = s.querySelector('.step__media');
    tl.fromTo(media, { '--shut': 1 }, { '--shut': 0, duration: 0.9, ease: 'power2.inOut' }, i)
      .fromTo(media.querySelector('img'), { scale: 1.3 }, { scale: 1.02, duration: 1.2, ease: 'power2.out' }, i)
      .fromTo(s.querySelector('.step__meta'), { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6 }, i + 0.3);
  });
}

function responsive(root) {
  const mm = gsap.matchMedia();
  mm.add('(min-width: 1024px)', () => {
    const rail = root.querySelector('[data-envies]');
    const panels = [...rail.querySelectorAll('[data-env]')];
    let active = 0;
    const layout = (k, instant) => {
      const W = rail.clientWidth;
      const n = panels.length;
      const c = Math.round(Math.max(116, Math.min(168, W * 0.115)));
      const E = W - (n - 1) * c;
      rail.style.setProperty('--c', `${c}px`);
      rail.style.setProperty('--bodyw', `${E}px`);
      const dur = instant || state.reduced ? 0 : 0.95;
      panels.forEach((p, j) => {
        const x = j <= k ? j * c : k * c + E + (j - k - 1) * c;
        const v = j === k ? E : c;
        p.style.width = `${E}px`;
        gsap.to(p, { x, duration: dur, ease: 'expo.out', overwrite: 'auto' });
        const media = p.querySelector('.env__media, .env__type');
        if (media) gsap.to(media, { x: (v - E) / 2, duration: dur, ease: 'expo.out', overwrite: 'auto' });
        p.classList.toggle('is-active', j === k);
      });
      active = k;
    };
    layout(0, true);
    const enter = (e) => { const j = panels.indexOf(e.currentTarget); if (j !== active) layout(j); };
    panels.forEach((p) => { p.addEventListener('pointerenter', enter); p.addEventListener('focus', enter); });
    const ro = new ResizeObserver(() => layout(active, true));
    ro.observe(rail);
    return () => {
      ro.disconnect();
      panels.forEach((p) => {
        p.removeEventListener('pointerenter', enter); p.removeEventListener('focus', enter);
        p.style.width = ''; p.classList.remove('is-active');
      });
    };
  });

  mm.add('(max-width: 1023px) and (prefers-reduced-motion: no-preference)', () => {
    if (state.reduced) return;
    root.querySelectorAll('.env__media').forEach((m) => {
      gsap.fromTo(m, { yPercent: -8 }, { yPercent: 8, ease: 'none', scrollTrigger: { trigger: m.parentElement, start: 'top bottom', end: 'bottom top', scrub: true } });
    });
  });
  return () => mm.revert();
}

function tilt(root) {
  if (state.reduced || !mq.fine.matches) return () => {};
  const offs = [...root.querySelectorAll('[data-tilt]')].map((el) => {
    const move = (e) => {
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      gsap.to(el, { rotateY: px * 9, rotateX: -py * 7, transformPerspective: 900, duration: 0.6, ease: 'power3.out' });
    };
    const leave = () => gsap.to(el, { rotateY: 0, rotateX: 0, duration: 0.9, ease: 'elastic.out(1, 0.5)' });
    el.addEventListener('pointermove', move);
    el.addEventListener('pointerleave', leave);
    return () => { el.removeEventListener('pointermove', move); el.removeEventListener('pointerleave', leave); };
  });
  return () => offs.forEach((f) => f());
}

function marqueeToggle(root) {
  const btn = root.querySelector('[data-mq-toggle]');
  const el = root.querySelector('[data-mq]');
  const a = t().a11y;
  btn.addEventListener('click', () => {
    const paused = !el.classList.contains('is-paused');
    el.classList.toggle('is-paused', paused);
    btn.setAttribute('aria-pressed', String(paused));
    btn.innerHTML = `${paused ? ICON.play : ICON.pause}<span>${esc(paused ? a.play : a.pause)}</span>`;
  });
}

export function mount(root) {
  const offs = [];
  const ctx = gsap.context(() => {
    reveals(root);
    heroScroll(root);
    processScrub(root);
  }, root);
  offs.push(responsive(root));
  const stopReel = reel(root);
  offs.push(stopReel);
  heroVideo(root, stopReel);
  offs.push(boil(root.querySelector('.hero__word')));
  offs.push(sparks(root.querySelector('.hero__sparks')));
  offs.push(magnetic(root), tilt(root), mountMap(root));
  marqueeToggle(root);
  const onClick = (e) => {
    const ph = e.target.closest('[data-photo]');
    if (ph) openLightbox([{ photo: ph.dataset.photo }], 0);
  };
  root.addEventListener('click', onClick);
  offs.push(() => root.removeEventListener('click', onClick));

  const intro = ({ instant = false } = {}) => {
    const chars = root.querySelectorAll('.hero__word .ch > span');
    const bits = root.querySelectorAll('.hero [data-intro]');
    if (state.reduced || instant) { gsap.set(chars, { y: 0 }); gsap.set(bits, { opacity: 1, y: 0 }); return; }
    gsap.timeline()
      .fromTo(chars, { yPercent: 105, y: 0 }, { yPercent: 0, duration: 1.15, ease: 'expo.out', stagger: 0.055 })
      .fromTo(bits, { opacity: 0, y: 22 }, { opacity: 1, y: 0, duration: 1, ease: 'expo.out', stagger: 0.09 }, 0.3);
  };

  return {
    intro,
    archRect: () => {
      const a = root.querySelector('[data-arch]');
      const r = a.getBoundingClientRect();
      return { x: r.left, y: r.top, w: r.width, h: r.height, ry: window.innerWidth >= 768 ? 0.64 : null };
    },
    cleanup: () => { ctx.revert(); offs.forEach((f) => f && f()); ScrollTrigger.getAll().forEach((st) => st.vars.trigger && root.contains(st.vars.trigger) && st.kill()); },
  };
}
