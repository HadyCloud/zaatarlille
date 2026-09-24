const NNBSP = ' ';

// French style: 5 → "5 €", 6.5 → "6,50 €" (narrow no-break space before €).
export function formatPrice(n) {
  const s = Number.isInteger(n) ? String(n) : n.toFixed(2).replace('.', ',');
  return `${s}${NNBSP}€`;
}

// Accent-, case- and apostrophe-insensitive: "epinard" finds "épinards", "manouche" finds "Man'ouche".
export function norm(s = '') {
  return s
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/['’‘`´\-–]/g, '')
    .replace(/[^\p{L}\p{N}]+/gu, ' ')
    .trim();
}

export function formatTime(hhmm, lang) {
  const [h, m] = hhmm.split(':').map(Number);
  if (lang === 'en') {
    const suffix = h < 12 ? 'am' : 'pm';
    const h12 = h % 12 || 12;
    return `${h12}${m ? `:${String(m).padStart(2, '0')}` : ''}${NNBSP}${suffix}`;
  }
  if (lang === 'es') return `${h}:${String(m).padStart(2, '0')}`;
  return `${h}h${m ? String(m).padStart(2, '0') : ''}`;
}

export const esc = (s = '') =>
  String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);

export const CATS = ['manouche', 'fatayers', 'wraps', 'desserts', 'boissons'];
export const DEFAULT_FILTERS = Object.freeze({ cat: 'all', veg: false, q: '', sort: 'menu' });

/**
 * Pure menu filter. Sort applies within each section so the board keeps its structure.
 * @returns {{ sections: Array, count: number }}
 */
export function filterMenu(menu, filters, lang = 'fr') {
  const { cat = 'all', veg = false, q = '', sort = 'menu' } = filters;
  const tokens = norm(q).split(' ').filter(Boolean);
  let count = 0;
  const sections = menu.sections
    .filter((s) => cat === 'all' || s.id === cat)
    .map((s) => {
      let items = s.items.filter((it) => {
        if (veg && !it.veg) return false;
        if (!tokens.length) return true;
        const hay = norm([it.name, s.title, s.label?.[lang], s.label?.fr, it.gloss?.[lang], it.gloss?.fr].join(' '));
        return tokens.every((t) => hay.includes(t));
      });
      if (sort === 'asc') items = [...items].sort((a, b) => a.price - b.price);
      if (sort === 'desc') items = [...items].sort((a, b) => b.price - a.price);
      count += items.length;
      return { ...s, items };
    })
    .filter((s) => s.items.length);
  return { sections, count };
}

export function findItem(menu, ref) {
  const [sid, iid] = ref.split('/');
  const section = menu.sections.find((s) => s.id === sid);
  return section?.items.find((i) => i.id === iid) || null;
}
