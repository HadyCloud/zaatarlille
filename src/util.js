import MANIFEST from './manifest.json';
import { CONFIG, PHOTOS } from './data.js';
import { getStatus, groupDays, DAY_KEYS } from './hours.js';
import { t, lang, time } from './i18n.js';
import { esc } from './format.js';

// In the single-file build, window.__ZA_ASSETS__ maps photo name → data URI (one size each).
const INLINE = typeof window !== 'undefined' ? window.__ZA_ASSETS__ : null;

export function imgSrc(name, w) {
  if (INLINE?.[name]) return INLINE[name];
  const m = MANIFEST[name];
  const widths = m.widths;
  const pick = w ? widths.find((x) => x >= w) || widths[widths.length - 1] : widths[0];
  return `assets/img/${name}-${pick}.webp`;
}

/**
 * Responsive <img>. Explicit width/height keep CLS at zero; containers set the aspect ratio.
 */
export function pic(name, { sizes = '100vw', cls = '', eager = false, priority = false, alt, pos, attrs = '' } = {}) {
  const m = MANIFEST[name];
  const photo = PHOTOS[name];
  const altText = alt ?? photo?.alt?.[lang()] ?? '';
  const src = imgSrc(name);
  const srcset = INLINE?.[name] ? '' : m.widths.map((w) => `assets/img/${name}-${w}.webp ${w}w`).join(', ');
  const position = pos ?? photo?.pos ?? '50% 50%';
  return `<img src="${src}"${srcset ? ` srcset="${srcset}" sizes="${sizes}"` : ''} width="${m.w}" height="${m.h}" alt="${esc(altText)}"${
    eager ? '' : ' loading="lazy"'} decoding="async"${priority ? ' fetchpriority="high"' : ''} class="${cls}" style="object-position:${position}" ${attrs}>`;
}

export const links = {
  tel: `tel:${CONFIG.phone.tel}`,
  directions: `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(`${CONFIG.googleQuery}`)}`,
  profile: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(CONFIG.googleQuery)}`,
  review: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(CONFIG.googleQuery)}`,
  instagram: CONFIG.instagram.url,
  osm: () => {
    const { lat, lng } = CONFIG.geo;
    const d = 0.0045;
    return `https://www.openstreetmap.org/export/embed.html?bbox=${lng - d * 1.6}%2C${lat - d * 0.7}%2C${lng + d * 1.6}%2C${lat + d * 0.7}&layer=mapnik&marker=${lat}%2C${lng}`;
  },
};

export const addressLine = () => `${CONFIG.address.street}, ${CONFIG.address.postcode} ${CONFIG.address.city}`;

export function slotsText(slots) {
  return slots.map(([a, b]) => `${time(a)}–${time(b)}`).join(' · ');
}

// "Mar–Sam 10h–15h · 18h–20h30 / Dim 10h–15h / Lun fermé"
export function hoursGroups() {
  const d = t();
  return groupDays(CONFIG.hours).map((g) => ({
    days: g.from === g.to ? d.daysShort[g.from] : `${d.daysShort[g.from]}–${d.daysShort[g.to]}`,
    text: g.slots.length ? slotsText(g.slots) : d.common.closed,
    closed: !g.slots.length,
  }));
}

export function hoursSentence() {
  const d = t();
  return groupDays(CONFIG.hours).map((g) => {
    const slots = g.slots.map(([a, b]) => `${time(a)}–${time(b)}`).join(` ${d.common.and} `);
    return d.hoursSentence(d.days, g.from, g.to, slots, !g.slots.length);
  }).join('. ') + '.';
}

export function weekRows() {
  const d = t();
  return DAY_KEYS.map((key, i) => ({
    i, day: d.days[i], slots: CONFIG.hours[key], text: CONFIG.hours[key].length ? slotsText(CONFIG.hours[key]) : d.common.closed,
  }));
}

export function statusInfo(date = new Date()) {
  const s = getStatus(CONFIG.hours, date, CONFIG.timezone);
  const st = t().status;
  if (s.open) return { open: true, label: st.open, detail: st.until(time(s.closesAt)), short: st.openShort };
  if (!s.next) return { open: false, label: st.closed, detail: '', short: st.closed };
  const tm = time(s.next.time);
  let detail;
  if (s.next.dayOffset === 0) detail = st.opensAt(tm);
  else if (s.next.dayOffset === 1) detail = st.opensTomorrow(tm);
  else detail = st.opensDay(t().days[s.next.dayIndex], tm);
  return { open: false, label: st.closed, detail, short: `${st.closed} · ${tm}` };
}

export const ICON = {
  star: (cls = 'star') => `<svg class="${cls}" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><use href="#sfiha"/></svg>`,
  arrow: '<svg class="ico" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M4 12h15m-6-6 6 6-6 6" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  phone: '<svg class="ico" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M6.6 3.5h2.6l1.4 4-2 1.3a11 11 0 0 0 6.6 6.6l1.3-2 4 1.4v2.6a2 2 0 0 1-2.1 2A16.5 16.5 0 0 1 4.6 5.6a2 2 0 0 1 2-2.1Z" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/></svg>',
  pin: '<svg class="ico" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21Z" fill="none" stroke="currentColor" stroke-width="1.6"/><circle cx="12" cy="9.5" r="2.4" fill="none" stroke="currentColor" stroke-width="1.6"/></svg>',
  menu: '<svg class="ico" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M5 4.5h11.5a2 2 0 0 1 2 2V20l-3-1.6-3 1.6-3-1.6-3 1.6V5a.5.5 0 0 1 .5-.5Z" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/><path d="M8.5 9h6.5M8.5 12.5h6.5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>',
  insta: '<svg class="ico" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><rect x="3.5" y="3.5" width="17" height="17" rx="5" fill="none" stroke="currentColor" stroke-width="1.6"/><circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" stroke-width="1.6"/><circle cx="17.2" cy="6.8" r="1.1" fill="currentColor"/></svg>',
  search: '<svg class="ico" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><circle cx="10.5" cy="10.5" r="6" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="m15 15 5 5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>',
  close: '<svg class="ico" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="m6 6 12 12M18 6 6 18" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>',
  leaf: '<svg class="ico ico--leaf" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M5 19c0-8 5-13 14-14-1 9-6 14-14 14Zm0 0 7-7" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/></svg>',
  pause: '<svg class="ico" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M8.5 6v12M15.5 6v12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>',
  play: '<svg class="ico" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M8 5.5v13l10-6.5-10-6.5Z" fill="currentColor"/></svg>',
  camera: '<svg class="ico" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M4 8.5h3l1.6-2.5h6.8L17 8.5h3v10H4Z" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/><circle cx="12" cy="13" r="3.2" fill="none" stroke="currentColor" stroke-width="1.6"/></svg>',
};

export const watermark = (cls = '') => `<span class="wm ${cls}" aria-hidden="true">ZA'</span>`;

export const external = (href, label, cls = '', inner = null) =>
  `<a class="${cls}" href="${href}" target="_blank" rel="noopener">${inner ?? esc(label)}<span class="sr-only"> ${esc(t().a11y.newTab)}</span></a>`;
