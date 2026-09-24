// WCAG 2.2 contrast check for every text/background pairing used in the CSS.
// Run: npm run contrast   (exits 1 if any pair fails its threshold)
const C = {
  sage: '#637c7a', sageDeep: '#4f6660', forest: '#26332f', forest2: '#1d2825',
  cream: '#e8e3d7', paper: '#f4f0e6', paper2: '#ebe5d7',
  ember: '#e2682b', emberInk: '#a8421a', sesame: '#d9a441', zaatar: '#5b5a2e', muted: '#c9c4b6',
};

const lum = (hex) => {
  const [r, g, b] = hex.match(/\w\w/g).map((h) => {
    const c = parseInt(h, 16) / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};
const ratio = (a, b) => {
  const [hi, lo] = [lum(a), lum(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
};

// [foreground, background, minimum, where]
const PAIRS = [
  ['cream', 'sage', 3, 'Large display text on logo sage (hero wordmark, headings, eyebrow script, lead ≥24px)'],
  ['paper', 'sage', 3, 'Script accents on sage (large)'],
  ['cream', 'sageDeep', 4.5, 'Body/small text on sage-deep (eyebrow pills, nav capsule, footer base, chef)'],
  ['forest', 'cream', 4.5, 'Primary buttons (forest on cream)'],
  ['cream', 'forest', 4.5, 'Ticker, status pill, action bar, reviews, overlay'],
  ['muted', 'forest', 4.5, 'Muted text on forest'],
  ['muted', 'forest2', 4.5, 'Review author on review card'],
  ['cream', 'forest2', 4.5, 'Review text'],
  ['sesame', 'forest', 4.5, 'Sesame numerals & focus ring on forest'],
  ['forest', 'sesame', 4.5, '"Avis d\'exemple" tag'],
  ['ember', 'forest', 3, 'Ember script accents on forest (large only)'],
  ['forest', 'paper', 4.5, 'Body text, menu rows, prices on paper'],
  ['forest', 'paper2', 4.5, 'Text on paper-2 cards / FAQ'],
  ['sageDeep', 'paper', 4.5, 'Muted text, glosses, eyebrows on paper'],
  ['sageDeep', 'paper2', 4.5, 'Muted text on paper-2'],
  ['emberInk', 'paper', 4.5, 'Ember-ink numerals & script accents on paper'],
  ['emberInk', 'paper2', 4.5, 'Ember-ink on paper-2'],
  ['zaatar', 'paper', 3, 'Vegetarian leaf icon (non-text, 3:1)'],
  ['cream', 'sage', 3, 'Focus ring on sage (non-text, 3:1)'],
  ['forest', 'paper', 3, 'Focus ring on paper (non-text, 3:1)'],
];

let fail = 0;
const pad = (s, n) => String(s).padEnd(n);
console.log(`${pad('fg', 10)}${pad('bg', 10)}${pad('ratio', 8)}${pad('min', 6)}ok   where`);
for (const [fg, bg, min, where] of PAIRS) {
  const r = ratio(C[fg], C[bg]);
  const ok = r >= min;
  if (!ok) fail++;
  console.log(`${pad(fg, 10)}${pad(bg, 10)}${pad(r.toFixed(2), 8)}${pad(min, 6)}${ok ? '✓' : '✗'}    ${where}`);
}
console.log(`\nForbidden by design: small text on --sage (cream ${ratio(C.cream, C.sage).toFixed(2)}:1), ember text on paper (${ratio(C.ember, C.paper).toFixed(2)}:1).`);
if (fail) { console.error(`\n${fail} pair(s) below threshold`); process.exit(1); }
console.log('\nAll pairs pass.');
