import { describe, it, expect } from 'vitest';
import { formatPrice, norm, filterMenu, formatTime, findItem } from './format.js';
import { MENU, SIGNATURE } from './data.js';

describe('formatPrice', () => {
  it('uses French decimals and a narrow no-break space', () => {
    expect(formatPrice(6.5)).toBe('6,50 €');
    expect(formatPrice(1.5)).toBe('1,50 €');
    expect(formatPrice(5)).toBe('5 €');
  });
});

describe('formatTime', () => {
  it('formats per language', () => {
    expect(formatTime('18:00', 'fr')).toBe('18h');
    expect(formatTime('20:30', 'fr')).toBe('20h30');
    expect(formatTime('20:30', 'en')).toBe('8:30 pm');
    expect(formatTime('10:00', 'en')).toBe('10 am');
    expect(formatTime('10:00', 'es')).toBe('10:00');
  });
});

describe('norm / search', () => {
  it('is accent- and apostrophe-insensitive', () => {
    expect(norm('Mini épinards')).toContain('epinards');
    expect(norm("Man'ouche")).toBe('manouche');
  });
  it('"epinard" finds Mini épinards', () => {
    const r = filterMenu(MENU, { q: 'epinard' });
    expect(r.count).toBe(1);
    expect(r.sections[0].items[0].name).toBe('Mini épinards');
  });
  it('"JEBNE" finds every jebné item', () => {
    expect(filterMenu(MENU, { q: 'JEBNE' }).count).toBe(4);
  });
});

describe('filterMenu', () => {
  it('has 54 items in total', () => {
    expect(filterMenu(MENU, {}).count).toBe(54);
  });
  it('category filter', () => {
    const r = filterMenu(MENU, { cat: 'wraps' });
    expect(r.sections.map((s) => s.id)).toEqual(['wraps']);
    expect(r.count).toBe(6);
  });
  it('category + vegetarian + search combined', () => {
    const r = filterMenu(MENU, { cat: 'manouche', veg: true, q: 'zaatar' });
    expect(r.sections[0].items.map((i) => i.price)).toEqual([4, 5, 5, 5, 6]);
  });
  it('vegetarian only keeps tagged items', () => {
    const r = filterMenu(MENU, { cat: 'wraps', veg: true });
    expect(r.sections[0].items.map((i) => i.name)).toEqual(['Halloumi pesto']);
  });
  it('empty state', () => {
    const r = filterMenu(MENU, { cat: 'desserts', q: 'halloumi' });
    expect(r).toEqual({ sections: [], count: 0 });
  });
  it('signature refs resolve to menu prices', () => {
    expect(SIGNATURE.map((s) => findItem(MENU, s.ref).price)).toEqual([5, 6, 9]);
  });
});
