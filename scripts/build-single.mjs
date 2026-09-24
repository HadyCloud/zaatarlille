// Folds dist/ into one self-contained HTML file (CSS, JS and one WebP per photo inlined).
// Run: npm run build:single  →  dist-single/zaatar.html
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const ROOT = new URL('..', import.meta.url).pathname;
const DIST = join(ROOT, 'dist');
const OUT_DIR = join(ROOT, 'dist-single');
const manifest = JSON.parse(readFileSync(join(ROOT, 'src/manifest.json'), 'utf8'));
const HERO = ['storefront', 'furn', 'interior', 'sfiha', 'manoucheZaatar', 'taouk', 'fatayers_plateau', 'pizza_reine', 'wraps', 'dessert'];

const dataUri = (file, type) => `data:${type};base64,${readFileSync(file).toString('base64')}`;

// One size per photo: hero frames up to 1400px, the rest 800px.
const assets = {};
for (const [name, m] of Object.entries(manifest)) {
  const cap = HERO.includes(name) ? 1400 : name === 'logo-tile' ? 842 : 800;
  const w = [...m.widths].filter((x) => x <= cap).pop() ?? m.widths[0];
  const file = join(DIST, 'assets/img', `${name}-${w}.webp`);
  if (!existsSync(file)) throw new Error(`missing ${file}`);
  assets[name] = dataUri(file, 'image/webp');
}

let html = readFileSync(join(DIST, 'index.html'), 'utf8');

html = html.replace(/<link rel="stylesheet"[^>]*href="\.\/(_app\/[^"]+\.css)"[^>]*>/g, (_, p) =>
  `<style>${readFileSync(join(DIST, p), 'utf8')}</style>`);

html = html.replace(/<script type="module"[^>]*src="\.\/(_app\/[^"]+\.js)"[^>]*><\/script>/g, (_, p) => {
  const js = readFileSync(join(DIST, p), 'utf8').replace(/<\/script/gi, '<\\/script');
  return `<script>window.__ZA_ASSETS__=${JSON.stringify(assets)};</script>\n<script type="module">${js}</script>`;
});

html = html
  .replace(/<link rel="preload" as="image"[^>]*>\s*/g, '')
  .replace(/assets\/img\/logo-tile-842\.webp/g, assets['logo-tile'])
  .replace(/assets\/img\/logo-tile-421\.webp/g, assets['logo-tile'])
  .replace(/href="assets\/favicon-32\.png"/g, `href="${dataUri(join(DIST, 'assets/favicon-32.png'), 'image/png')}"`)
  .replace(/href="assets\/apple-touch-icon\.png"/g, `href="${dataUri(join(DIST, 'assets/apple-touch-icon.png'), 'image/png')}"`);

if (/_app\//.test(html)) throw new Error('unresolved _app/ reference left in HTML');

mkdirSync(OUT_DIR, { recursive: true });
const out = join(OUT_DIR, 'zaatar.html');
writeFileSync(out, html);
const mb = (Buffer.byteLength(html) / 1024 / 1024).toFixed(2);
console.log(`dist-single/zaatar.html  ${mb} MB`);
if (mb > 12) { console.error('Over the 12 MB budget'); process.exit(1); }
