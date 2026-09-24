import { t } from './i18n.js';
import { esc } from './format.js';
import { ICON, links, addressLine, external } from './util.js';

export function mapHTML(cls = '') {
  const d = t();
  return `<div class="map ${cls}" data-map>
    <div class="map__fallback">
      ${ICON.pin}
      <p class="lead">${esc(addressLine())}</p>
      ${external(links.directions, '', 'btn btn--sm', `${esc(d.common.directions)} ${ICON.arrow}`)}
    </div>
    <iframe title="${esc(d.a11y.mapTitle)}" data-src="${links.osm()}" loading="lazy" referrerpolicy="no-referrer"></iframe>
  </div>`;
}

// Loads the OpenStreetMap iframe near the viewport; keeps the styled fallback card if it never loads.
export function mountMap(scope) {
  const offs = [...scope.querySelectorAll('[data-map]')].map((el) => {
    const iframe = el.querySelector('iframe');
    let timer;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      iframe.addEventListener('load', () => { clearTimeout(timer); el.classList.add('is-live'); }, { once: true });
      timer = setTimeout(() => el.classList.remove('is-live'), 9000);
      iframe.src = iframe.dataset.src;
    }, { rootMargin: '600px 0px' });
    io.observe(el);
    return () => { io.disconnect(); clearTimeout(timer); };
  });
  return () => offs.forEach((f) => f());
}
