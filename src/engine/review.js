// Spaced review: a concept comes back after 1, 3, 7, 14, then 30 days. A miss sends it back to day 1.
export const DAY = 86400000;
export const INTERVAL_DAYS = [1, 3, 7, 14, 30];

export function schedule(entry, correct, now) {
  if (!entry) return { box: 0, due: now + INTERVAL_DAYS[0] * DAY, last: now };
  const box = correct ? Math.min((entry.box ?? 0) + 1, INTERVAL_DAYS.length - 1) : 0;
  return { box, due: now + INTERVAL_DAYS[box] * DAY, last: now };
}

export function dueLessons(review, now) {
  return Object.entries(review).filter(([, r]) => r.due <= now).sort((a, b) => a[1].due - b[1].due).map(([id]) => id);
}

export const dayKey = (t) => {
  const d = new Date(t);
  return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
};

/** consecutive active days ending today (or yesterday, so the streak is not lost before the student starts today) */
export function streak(days, now) {
  let n = 0; let t = now;
  if (!days[dayKey(t)]) t -= DAY;
  while (days[dayKey(t)]) { n++; t -= DAY; }
  return n;
}
