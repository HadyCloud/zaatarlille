import { describe, it, expect } from 'vitest';
import { getStatus, groupDays } from './hours.js';
import { CONFIG } from './data.js';

const at = (iso) => getStatus(CONFIG.hours, new Date(iso), 'Europe/Paris');

// 2026-09-29 is a Tuesday; Paris is UTC+2 (CEST) until 2026-10-25.
describe('open / closed, Europe/Paris', () => {
  it('Monday: closed all day, opens Tuesday 10:00', () => {
    expect(at('2026-09-28T10:00:00Z')).toEqual({ open: false, closesAt: null, next: { dayOffset: 1, dayIndex: 1, time: '10:00' } });
  });
  it('Sunday 16:00: closed, next is Tuesday (Monday closed)', () => {
    expect(at('2026-09-27T14:00:00Z').next).toEqual({ dayOffset: 2, dayIndex: 1, time: '10:00' });
  });
  it('Sunday 14:59 is open until 15:00', () => {
    expect(at('2026-09-27T12:59:00Z')).toMatchObject({ open: true, closesAt: '15:00' });
  });
  it('Tuesday 09:59 closed, opens today at 10:00', () => {
    expect(at('2026-09-29T07:59:00Z')).toMatchObject({ open: false, next: { dayOffset: 0, time: '10:00' } });
  });
  it('Tuesday 15:00 closed, reopens at 18:00', () => {
    expect(at('2026-09-29T13:00:00Z')).toMatchObject({ open: false, next: { dayOffset: 0, time: '18:00' } });
  });
  it('Tuesday 15:01 closed, reopens at 18:00', () => {
    expect(at('2026-09-29T13:01:00Z')).toMatchObject({ open: false, next: { dayOffset: 0, time: '18:00' } });
  });
  it('Tuesday 18:00 open until 20:30', () => {
    expect(at('2026-09-29T16:00:00Z')).toEqual({ open: true, closesAt: '20:30', next: null });
  });
  it('Tuesday 20:29 still open', () => {
    expect(at('2026-09-29T18:29:00Z').open).toBe(true);
  });
  it('Tuesday 20:30 closed, opens Wednesday 10:00', () => {
    expect(at('2026-09-29T18:30:00Z')).toMatchObject({ open: false, next: { dayOffset: 1, dayIndex: 2, time: '10:00' } });
  });
  it('Tuesday 20:31 closed, opens Wednesday 10:00', () => {
    expect(at('2026-09-29T18:31:00Z')).toMatchObject({ open: false, next: { dayOffset: 1, dayIndex: 2 } });
  });
  it('Saturday 20:30 → next opening is Sunday 10:00', () => {
    expect(at('2026-10-03T18:30:00Z').next).toEqual({ dayOffset: 1, dayIndex: 6, time: '10:00' });
  });
});

describe('DST changes', () => {
  // Clocks go back on Sun 2026-10-25: Paris becomes UTC+1.
  it('Sun 25 Oct 13:30Z = 14:30 CET → open (a fixed +2 offset would say 15:30, closed)', () => {
    expect(at('2026-10-25T13:30:00Z').open).toBe(true);
  });
  it('Tue 27 Oct 16:30Z = 17:30 CET → closed (a fixed +2 offset would say 18:30, open)', () => {
    expect(at('2026-10-27T16:30:00Z')).toMatchObject({ open: false, next: { dayOffset: 0, time: '18:00' } });
  });
  // Clocks go forward on Sun 2027-03-28: Paris becomes UTC+2.
  it('Tue 30 Mar 2027 16:30Z = 18:30 CEST → open (a fixed +1 offset would say 17:30, closed)', () => {
    expect(at('2027-03-30T16:30:00Z').open).toBe(true);
  });
  it('Sun 28 Mar 2027 01:30Z = 03:30 CEST, day of the change → closed, opens 10:00 today', () => {
    expect(at('2027-03-28T01:30:00Z')).toMatchObject({ open: false, next: { dayOffset: 0, time: '10:00' } });
  });
});

describe('groupDays', () => {
  it('groups Tue–Sat, then Sun, closed Monday last', () => {
    const g = groupDays(CONFIG.hours).map(({ from, to, slots }) => [from, to, slots.length]);
    expect(g).toEqual([[1, 5, 2], [6, 6, 1], [0, 0, 0]]);
  });
});
