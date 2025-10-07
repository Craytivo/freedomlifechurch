// Shared helpers to keep Events page, API, and Event detail in sync

export function classifyEventFrom(e) {
  const tags = new Set();
  const title = (e.title || '').toLowerCase();
  const blurb = (e.blurb || '').toLowerCase();
  const text = `${title} ${blurb}`;

  if (/\b(sunday\s+service|service)\b/.test(text)) tags.add('Services');
  if (/\bprayer\b/.test(text)) tags.add('Prayer');
  if (/(small\s*group|\bgroups?\b|bible)/.test(text)) tags.add('Groups');
  if (/(women|women's|ladies)/.test(text)) tags.add('Women');
  if (/(men|men's)/.test(text)) tags.add('Men');
  if (/(child|children|kids|youth|vbs|vacation\s*bible)/.test(text)) tags.add('Kids & Youth');
  if (tags.size === 0) tags.add('Special');

  try {
    const d = new Date(e.date);
    if (!isNaN(d)) {
      const dayName = d.toLocaleString(undefined, { weekday: 'long' });
      tags.add(dayName);
    }
  } catch {}

  return Array.from(tags);
}

// Temporary time normalization for specific events while source calendar is adjusted.
export function normalizeEvent(e) {
  if (!e) return e;
  const title = (e.title || '').toLowerCase();
  if (title.includes('altar experience')) {
    try {
      const d = new Date(e.date);
      const dow = d.getDay(); // 0=Sun, 5=Fri, 6=Sat
      if (dow === 5) return { ...e, time: '7:00 PM' };
      if (dow === 6) return { ...e, time: '7:00 PM' };
      if (dow === 0) return { ...e, time: '12:00 PM' };
    } catch {}
  }
  return e;
}
