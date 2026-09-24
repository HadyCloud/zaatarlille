import { defineConfig } from 'vite';
import { CONFIG, MENU } from './src/data.js';

const DAY = { mon: 'Monday', tue: 'Tuesday', wed: 'Wednesday', thu: 'Thursday', fri: 'Friday', sat: 'Saturday', sun: 'Sunday' };

// Structured data built from src/data.js so prices and hours have one source of truth.
function jsonLd() {
  const base = CONFIG.siteUrl.replace(/\/$/, '');
  const abs = (p) => (base ? `${base}/${p}` : p);
  const byWindow = new Map();
  for (const [day, slots] of Object.entries(CONFIG.hours)) {
    for (const [opens, closes] of slots) {
      const k = `${opens}-${closes}`;
      if (!byWindow.has(k)) byWindow.set(k, { opens, closes, days: [] });
      byWindow.get(k).days.push(DAY[day]);
    }
  }
  const data = {
    '@context': 'https://schema.org',
    '@type': ['Bakery', 'Restaurant'],
    name: CONFIG.name,
    alternateName: `${CONFIG.name} — ${CONFIG.tagline}`,
    servesCuisine: ['Lebanese', 'Libanaise'],
    priceRange: '€',
    image: abs('assets/og.jpg'),
    logo: abs('assets/icon-512.png'),
    ...(base && { url: `${base}/` }),
    telephone: CONFIG.phone.tel,
    address: {
      '@type': 'PostalAddress',
      streetAddress: CONFIG.address.street,
      postalCode: CONFIG.address.postcode,
      addressLocality: CONFIG.address.city,
      addressCountry: CONFIG.address.country,
    },
    geo: { '@type': 'GeoCoordinates', latitude: CONFIG.geo.lat, longitude: CONFIG.geo.lng },
    sameAs: [CONFIG.instagram.url],
    openingHoursSpecification: [...byWindow.values()].map((w) => ({
      '@type': 'OpeningHoursSpecification', dayOfWeek: w.days, opens: w.opens, closes: w.closes,
    })),
    hasMenu: {
      '@type': 'Menu',
      name: 'La Carte',
      ...(base && { url: `${base}/#/carte` }),
      inLanguage: 'fr',
      hasMenuSection: MENU.sections.map((s) => ({
        '@type': 'MenuSection',
        name: [s.pre, s.title, s.post].filter(Boolean).join(' '),
        hasMenuItem: s.items.map((i) => ({
          '@type': 'MenuItem',
          name: `${s.itemPrefix}${i.name}`.trim(),
          ...(i.veg && { suitableForDiet: 'https://schema.org/VegetarianDiet' }),
          offers: { '@type': 'Offer', price: i.price.toFixed(2), priceCurrency: 'EUR' },
        })),
      })),
    },
  };
  if (CONFIG.GOOGLE_RATING) {
    data.aggregateRating = { '@type': 'AggregateRating', ratingValue: CONFIG.GOOGLE_RATING.value, reviewCount: CONFIG.GOOGLE_RATING.count };
  }
  return `<script type="application/ld+json">${JSON.stringify(data)}</script>`;
}

export default defineConfig({
  base: './',
  build: {
    assetsDir: '_app',
    target: 'es2020',
  },
  plugins: [
    {
      name: 'zaatar-jsonld',
      transformIndexHtml: (html) => {
        const base = CONFIG.siteUrl.replace(/\/$/, '');
        const out = html.replace('<!--JSONLD-->', jsonLd());
        // Social crawlers need absolute image URLs once the production URL is known.
        return base ? out.replace(/content="assets\/og\.jpg"/g, `content="${base}/assets/og.jpg"`) : out;
      },
    },
  ],
});
