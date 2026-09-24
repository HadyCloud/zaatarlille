// Converts the source photos into WebP variants in public/assets/img and writes src/manifest.json.
// Requires cwebp/dwebp (libwebp) and macOS sips. Run: npm run images
import { execFileSync } from 'node:child_process';
import { mkdirSync, writeFileSync, rmSync, existsSync, statSync } from 'node:fs';
import { join } from 'node:path';
import { tmpdir } from 'node:os';

const ROOT = new URL('..', import.meta.url).pathname;
const OUT = join(ROOT, 'public/assets/img');
const TMP = join(tmpdir(), 'zaatar-img');
mkdirSync(OUT, { recursive: true });
mkdirSync(TMP, { recursive: true });

const SOURCES = [
  ['menu photos/furn.jpg', 'furn', [240, 800, 1400]],
  ['menu photos/sfiha.jpg', 'sfiha', [240, 800, 1400]],
  ['menu photos/manoucheZaatar.jpg', 'manoucheZaatar', [240, 800, 1400]],
  ['menu photos/taouk.jpg', 'taouk', [240, 800, 1400]],
  ['menu photos/jebnelahme.jpg', 'jebnelahme', [240, 800, 1400]],
  ['menu photos/knefe chef.jpg', 'knefe_chef', [240, 800, 1400]],
  ['menu photos/wrapsoujoukjebne.jpg', 'wrapsoujoukjebne', [240, 800, 1400]],
  ['menu photos/epinard.jpg', 'epinard', [240, 800, 1400]],
  ['menu photos/pizzalibaniase.jpg', 'pizzalibaniase', [240, 800, 1400]],
  ['menu photos/manouchefromagepommedeterre.jpg', 'manouchefromagepommedeterre', [240, 800, 1080]],
  ['store photos/storefront.jpeg', 'storefront', [240, 800, 1024]],
  ['store photos/interior.jpeg', 'interior', [240, 800, 1600]],
  ['store photos/furn.jpeg', 'furn_boutique', [240, 800, 1024]],
  ['menu photos/fatayers_plateau.jpg', 'fatayers_plateau', [240, 800, 1400]],
  ['menu photos/jebne.jpg', 'jebne', [240, 800, 1080]],
  ['menu photos/zaatar_labneh_legumes.jpg', 'zaatar_labneh_legumes', [240, 750]],
  ['menu photos/minipizza_cuite.jpg', 'minipizza_cuite', [240, 800, 1080]],
  ['menu photos/mini_zaatar.jpg', 'mini_zaatar', [240, 430]],
  ['menu photos/kebbe.jpg', 'kebbe', [240, 322]],
  ['menu photos/samboussek.jpg', 'samboussek', [240, 478]],
  ['menu photos/dinde_fromage.jpg', 'dinde_fromage', [240, 800, 1080]],
  ['menu photos/knefeh.jpg', 'knefeh', [240, 800, 1080]],
  ['menu photos/pizza_reine.jpg', 'pizza_reine', [240, 800, 1080]],
  ['menu photos/pizza_pepperoni.jpg', 'pizza_pepperoni', [240, 800, 1080]],
  ['menu photos/pizza_truffe.jpg', 'pizza_truffe', [240, 800, 1080]],
  ['website photos/wraps.jpg', 'wraps', [240, 800, 1080]],
  ['website photos/minipizza.jpg', 'minipizza', [240, 800, 1080]],
  ['website photos/sfihafromage.jpg', 'sfihafromage', [240, 800, 1400]],
  ['website photos/homepage.jpg', 'homepage', [240, 765]],
  ['website photos/dessert.jpeg', 'dessert', [240, 800, 1376]],
  ['website photos/Portrait.jpeg', 'Portrait', [240, 800, 1080]],
];

const run = (cmd, args) => execFileSync(cmd, args, { stdio: ['ignore', 'pipe', 'pipe'] }).toString();
const dims = (file) => {
  const out = run('sips', ['-g', 'pixelWidth', '-g', 'pixelHeight', '-g', 'orientation', file]);
  const w = +out.match(/pixelWidth: (\d+)/)[1];
  const h = +out.match(/pixelHeight: (\d+)/)[1];
  const o = out.match(/orientation: (\d+)/);
  return { w, h, orientation: o ? +o[1] : 1 };
};
const kb = (f) => Math.round(statSync(f).size / 1024);

const manifest = {};
for (const [src, name, widths] of SOURCES) {
  const file = join(ROOT, src);
  const d = dims(file);
  if (d.orientation !== 1) throw new Error(`${src} has EXIF orientation ${d.orientation}; rotate it first`);
  const made = [];
  for (const w of widths) {
    const tw = Math.min(w, d.w);
    const out = join(OUT, `${name}-${tw}.webp`);
    run('cwebp', ['-quiet', '-q', '78', '-m', '6', '-sharp_yuv', '-metadata', 'none', '-resize', String(tw), '0', file, '-o', out]);
    made.push(tw);
    console.log(`${name}-${tw}.webp  ${kb(out)} KB`);
  }
  manifest[name] = { w: d.w, h: d.h, widths: [...new Set(made)] };
}

// ── Logo ────────────────────────────────────────────────────────────────
// Text bounding box measured on logo.webp: x 148–930, y 312–754 (bg #637C7A, ink #E8E3D7).
const LOGO = join(ROOT, 'logo.webp');
const CROP = { x: 118, y: 282, w: 842, h: 502 };
run('cwebp', ['-quiet', '-q', '90', '-metadata', 'none', '-crop', ...[CROP.x, CROP.y, CROP.w, CROP.h].map(String), LOGO, '-o', join(OUT, 'logo-tile-842.webp')]);
run('cwebp', ['-quiet', '-q', '90', '-metadata', 'none', '-crop', ...[CROP.x, CROP.y, CROP.w, CROP.h].map(String), '-resize', '421', '0', LOGO, '-o', join(OUT, 'logo-tile-421.webp')]);
manifest['logo-tile'] = { w: CROP.w, h: CROP.h, widths: [421, 842] };

// Favicons: crop "ZA'" (x 136–426) and pad to a sage square.
const favCrop = join(TMP, 'fav-crop.png');
const fav = join(TMP, 'fav.png');
run('dwebp', ['-quiet', LOGO, '-crop', '136', '276', '290', '400', '-o', favCrop]);
run('sips', ['--padToHeightWidth', '440', '440', '--padColor', '637C7A', favCrop, '--out', fav]);
const ASSETS = join(ROOT, 'public/assets');
for (const [size, file] of [[32, 'favicon-32.png'], [180, 'apple-touch-icon.png'], [512, 'icon-512.png']]) {
  run('sips', ['-z', String(size), String(size), fav, '--out', join(ASSETS, file)]);
}

// OG image 1200×630: full logo on sage.
const ogSq = join(TMP, 'og-sq.png');
run('dwebp', ['-quiet', LOGO, '-scale', '630', '630', '-o', ogSq]);
run('sips', ['--padToHeightWidth', '630', '1200', '--padColor', '637C7A', ogSq, '--out', join(TMP, 'og.png')]);
run('sips', ['-s', 'format', 'jpeg', '-s', 'formatOptions', '86', join(TMP, 'og.png'), '--out', join(ASSETS, 'og.jpg')]);

writeFileSync(join(ROOT, 'src/manifest.json'), JSON.stringify(manifest, null, 2) + '\n');
if (existsSync(TMP)) rmSync(TMP, { recursive: true, force: true });
console.log('\nmanifest → src/manifest.json');
