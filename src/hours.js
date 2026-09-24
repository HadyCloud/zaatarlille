export const DAY_KEYS = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
const WEEKDAY_INDEX = { Mon: 0, Tue: 1, Wed: 2, Thu: 3, Fri: 4, Sat: 5, Sun: 6 };

const toMin = (hhmm) => {
  const [h, m] = hhmm.split(':').map(Number);
  return h * 60 + m;
};

// Wall-clock day/minute in the given IANA zone; Intl handles DST.
export function zonedNow(date, timeZone) {
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone, weekday: 'short', hour: '2-digit', minute: '2-digit', hourCycle: 'h23',
  }).formatToParts(date);
  const get = (t) => parts.find((p) => p.type === t).value;
  return { dayIndex: WEEKDAY_INDEX[get('weekday')], minutes: +get('hour') * 60 + +get('minute') };
}

/**
 * @returns {{ open: boolean, closesAt: string|null, next: { dayOffset: number, dayIndex: number, time: string } | null }}
 */
export function getStatus(hours, date = new Date(), timeZone = 'Europe/Paris') {
  const { dayIndex, minutes } = zonedNow(date, timeZone);
  const today = hours[DAY_KEYS[dayIndex]] || [];

  for (const [start, end] of today) {
    if (minutes >= toMin(start) && minutes < toMin(end)) return { open: true, closesAt: end, next: null };
  }
  const later = today.find(([start]) => toMin(start) > minutes);
  if (later) return { open: false, closesAt: null, next: { dayOffset: 0, dayIndex, time: later[0] } };

  for (let k = 1; k <= 7; k++) {
    const d = (dayIndex + k) % 7;
    const slots = hours[DAY_KEYS[d]] || [];
    if (slots.length) return { open: false, closesAt: null, next: { dayOffset: k, dayIndex: d, time: slots[0][0] } };
  }
  return { open: false, closesAt: null, next: null };
}

// Groups consecutive days with identical slots; closed groups go last.
export function groupDays(hours) {
  const groups = [];
  DAY_KEYS.forEach((key, i) => {
    const sig = JSON.stringify(hours[key] || []);
    const last = groups[groups.length - 1];
    if (last && last.sig === sig && last.to === i - 1) last.to = i;
    else groups.push({ from: i, to: i, sig, slots: hours[key] || [] });
  });
  return [...groups.filter((g) => g.slots.length), ...groups.filter((g) => !g.slots.length)];
}

export function todayIndex(date = new Date(), timeZone = 'Europe/Paris') {
  return zonedNow(date, timeZone).dayIndex;
}
