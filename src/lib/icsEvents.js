/* global Map Set */
import fs from 'fs';
import path from 'path';

// Absolute path to the ICS file in the repo
const ICS_FILE = path.join(
  process.cwd(),
  'src',
  'assets',
  'calender',
  'Freedom Life Church Events_8e73fa46e8c3ad6c7a7411573ace4e8ab8c2edf600abc7c72cc3dc82cf38a9eb@group.calendar.google.com.ics'
);

function unfoldLines(text) {
  // RFC5545: lines can be folded by inserting CRLF followed by a single linear white space character (space or tab)
  // Unfold by joining any line that starts with space/tab to the previous line
  return text.replace(/\r?\n[\t ]/g, '');
}

function parseProperties(block) {
  const obj = {};
  const lines = block.split(/\r?\n/).filter(Boolean);
  for (const line of lines) {
    const idx = line.indexOf(':');
    if (idx === -1) continue;
    const rawKey = line.slice(0, idx);
    const value = line.slice(idx + 1);
    // Keys may include parameters, e.g., DTSTART;TZID=America/Edmonton
    const [prop, ...params] = rawKey.split(';');
    const key = prop.toUpperCase();
    if (obj[key]) {
      // Support repeated keys like EXDATE (collect all)
      const existing = Array.isArray(obj[key]) ? obj[key] : [obj[key]];
      obj[key] = [...existing, { value, params }];
    } else {
      obj[key] = { value, params };
    }
  }
  return obj;
}

function parseICSEvents(text) {
  const unfolded = unfoldLines(text);
  const veventBlocks = unfolded
    .split('BEGIN:VEVENT')
    .slice(1)
    .map(s => s.split('END:VEVENT')[0])
    .filter(Boolean);

  const master = [];
  const overrides = []; // RECURRENCE-ID instances
  for (const block of veventBlocks) {
    const props = parseProperties(block);
    const pick = (k) => {
      const v = props[k];
      if (!v) return '';
      if (Array.isArray(v)) return v[0]?.value || '';
      return v.value || '';
    };
    const uid = pick('UID') || '';
    const summary = pick('SUMMARY') || '';
    const categories = pick('CATEGORIES') || '';
    const location = pick('LOCATION') || '';
    const description = (pick('DESCRIPTION') || '').replace(/\\n/g, ' ').replace(/\\,/g, ',');

    // DTSTART may be in several formats
    const dtstartItem = Array.isArray(props['DTSTART']) ? props['DTSTART'][0] : props['DTSTART'];
    const dtstartRaw = dtstartItem?.value || '';
    const dtstartParams = dtstartItem?.params?.join(';') || '';
    let isAllDay = /VALUE=DATE/i.test(dtstartParams) || /^(\d{8})$/.test(dtstartRaw);
    let startDate;
    if (isAllDay) {
      // Expect YYYYMMDD
      const m = dtstartRaw.match(/^(\d{4})(\d{2})(\d{2})/);
      if (m) {
        startDate = new Date(`${m[1]}-${m[2]}-${m[3]}T00:00:00`);
      }
    } else {
      // Expect YYYYMMDDTHHmm(SS)? maybe Z or with TZ param; treat as local if no Z
      const m = dtstartRaw.match(/^(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})(\d{2})?/);
      if (m) {
        const y = m[1], mo = m[2], d = m[3], hh = m[4], mm = m[5], ss = m[6] || '00';
        // Interpret as local time (simple, avoids TZ complexity in SSG)
        startDate = new Date(`${y}-${mo}-${d}T${hh}:${mm}:${ss}`);
      }
    }
    if (!startDate) continue; // skip if missing

    // EXDATE(s)
    const exdatesRaw = props['EXDATE'] ? (Array.isArray(props['EXDATE']) ? props['EXDATE'] : [props['EXDATE']]) : [];
    const exdateKeys = new Set();
    for (const ex of exdatesRaw) {
      const values = ex.value.split(',');
      for (const v of values) {
        const dk = toDateKey(parseICSTimestamp(v));
        if (dk) exdateKeys.add(dk);
      }
    }

    const rrule = pick('RRULE');
    const recurrenceIdRaw = pick('RECURRENCE-ID');
    const recurrenceId = recurrenceIdRaw ? toDateKey(parseICSTimestamp(recurrenceIdRaw)) : null;

    const base = {
      uid,
      summary,
      categories,
      location,
      description,
      isAllDay,
      startDate,
      exdateKeys,
      rrule,
    };

    if (recurrenceId) {
      overrides.push({ ...base, recurrenceId });
    } else {
      master.push(base);
    }
  }
  return expandRecurring(master, overrides);
}

function parseICSTimestamp(val) {
  // Supports YYYYMMDD or YYYYMMDDTHHmmSS(Z?)
  const dOnly = val.match(/^(\d{4})(\d{2})(\d{2})$/);
  if (dOnly) return new Date(`${dOnly[1]}-${dOnly[2]}-${dOnly[3]}T00:00:00`);
  const dt = val.match(/^(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})(\d{2})?Z?$/);
  if (dt) return new Date(`${dt[1]}-${dt[2]}-${dt[3]}T${dt[4]}:${dt[5]}:${dt[6] || '00'}`);
  return null;
}

function toDateKey(d) {
  if (!d || isNaN(d.getTime())) return null;
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
}

function formatTime(d) {
  const hours = d.getHours();
  const minutes = d.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const h12 = hours % 12 || 12;
  return `${h12}:${String(minutes).padStart(2, '0')} ${ampm}`;
}

const BYDAY_MAP = { SU:0, MO:1, TU:2, WE:3, TH:4, FR:5, SA:6 };

function expandRecurring(master, overrides) {
  const overrideMap = new Map();
  for (const ov of overrides) {
    const key = `${ov.uid}:${ov.recurrenceId}`;
    overrideMap.set(key, ov);
  }

  const now = new Date();
  // Include an even more generous window so SSG and runtime cover a broad range
  const windowStart = new Date(now.getFullYear(), now.getMonth() - 18, 1);
  const windowEnd = new Date(now.getFullYear(), now.getMonth() + 30, 0); // ~30 months ahead

  const out = [];

  for (const ev of master) {
    const cat = ev.categories ? ev.categories.split(',')[0].trim() : 'Church-wide';
    const locName = ev.location?.includes('Freedom Life Church') ? 'Freedom Life Church' : (ev.location || '');
    const address = ev.location || '';
    const baseInfo = { cat, locName, address };

    if (!ev.rrule) {
      const dateKey = toDateKey(ev.startDate);
      const timeLabel = ev.isAllDay ? 'All day' : formatTime(ev.startDate);
      out.push({
        id: makeId(ev.summary, dateKey, ev.uid),
        title: ev.summary || '(Untitled event)',
        date: dateKey,
        time: timeLabel,
        category: baseInfo.cat || 'Church-wide',
        locationName: baseInfo.locName,
        address: baseInfo.address,
        blurb: ev.description || '',
        provides: []
      });
      continue;
    }

    // Parse RRULE
    const parts = Object.fromEntries(ev.rrule.split(';').map(s => s.split('=')));
    const freq = parts['FREQ'];
    const until = parts['UNTIL'] ? parseICSTimestamp(parts['UNTIL']) : null;
    const byday = parts['BYDAY'] ? parts['BYDAY'].split(',') : [];
  // const wkst = parts['WKST'] || 'MO'; // not used currently

    const endLimit = until && until < windowEnd ? until : windowEnd;

    if (freq === 'WEEKLY') {
      // For each requested weekday
      const days = byday.length ? byday : [weekdayToToken(ev.startDate.getDay())];
      for (const token of days) {
        const w = BYDAY_MAP[token];
        if (w == null) continue;
        // first occurrence on/after max(windowStart, startDate)
        let d = new Date(Math.max(windowStart.getTime(), ev.startDate.getTime()));
        d.setHours(ev.startDate.getHours(), ev.startDate.getMinutes(), ev.startDate.getSeconds(), 0);
        // move to the desired weekday
        const delta = (w - d.getDay() + 7) % 7;
        d.setDate(d.getDate() + delta);
        // ensure not before DTSTART
        if (d < ev.startDate) d.setDate(d.getDate() + 7);
        while (d <= endLimit) {
          const dk = toDateKey(d);
          if (!ev.exdateKeys.has(dk)) pushOccurrence(out, ev, d, baseInfo, overrideMap);
          d = new Date(d.getFullYear(), d.getMonth(), d.getDate() + 7, d.getHours(), d.getMinutes(), d.getSeconds());
        }
      }
    } else if (freq === 'MONTHLY' && byday.length === 1) {
      // Handle patterns like 1WE, 2SA, 3WE, -1SA
      const token = byday[0];
      const match = token.match(/^(-?\d)([A-Z]{2})$/);
      if (match) {
        const n = parseInt(match[1], 10); // e.g., 1, 2, 3, -1
        const dow = BYDAY_MAP[match[2]];
        if (dow != null) {
          let cursor = new Date(windowStart.getFullYear(), windowStart.getMonth(), 1);
          while (cursor <= endLimit) {
            const y = cursor.getFullYear();
            const m = cursor.getMonth();
            const occurrence = nthWeekdayOfMonth(y, m, dow, n);
            if (occurrence) {
              // bring in time from DTSTART
              occurrence.setHours(ev.startDate.getHours(), ev.startDate.getMinutes(), ev.startDate.getSeconds(), 0);
              if (occurrence >= ev.startDate && occurrence <= endLimit) {
                const dk = toDateKey(occurrence);
                if (!ev.exdateKeys.has(dk)) pushOccurrence(out, ev, occurrence, baseInfo, overrideMap);
              }
            }
            // next month
            cursor = new Date(y, m + 1, 1);
          }
        }
      }
    } else {
      // Fallback: emit DTSTART only (at least shows first one)
      const dk = toDateKey(ev.startDate);
      const timeLabel = ev.isAllDay ? 'All day' : formatTime(ev.startDate);
      out.push({
        id: makeId(ev.summary, dk, ev.uid),
        title: ev.summary || '(Untitled event)',
        date: dk,
        time: timeLabel,
        category: baseInfo.cat || 'Church-wide',
        locationName: baseInfo.locName,
        address: baseInfo.address,
        blurb: ev.description || '',
        provides: []
      });
    }
  }

  // Sort by date
  out.sort((a, b) => (a.date < b.date ? -1 : a.date > b.date ? 1 : 0));
  return out;
}

function weekdayToToken(dayIdx) {
  return Object.keys(BYDAY_MAP).find(k => BYDAY_MAP[k] === dayIdx) || 'MO';
}

function nthWeekdayOfMonth(year, month, weekday, n) {
  const first = new Date(year, month, 1);
  const last = new Date(year, month + 1, 0);
  if (n > 0) {
    const delta = (weekday - first.getDay() + 7) % 7;
    const day = 1 + delta + (n - 1) * 7;
    if (day <= last.getDate()) return new Date(year, month, day);
    return null;
  } else {
    // last, -1 => last occurrence, -2 => second last, etc.
    const delta = (last.getDay() - weekday + 7) % 7;
    const day = last.getDate() - delta + (n + 1) * 7; // n is negative
    if (day >= 1) return new Date(year, month, day);
    return null;
  }
}

function pushOccurrence(out, ev, occurrenceDate, baseInfo, overrideMap) {
  const dk = toDateKey(occurrenceDate);
  const key = `${ev.uid}:${dk}`;
  const ov = overrideMap.get(key);
  const use = ov || ev;
  const timeLabel = use.isAllDay ? 'All day' : formatTime(occurrenceDate);
  out.push({
    id: makeId(use.summary, dk, ev.uid),
    title: use.summary || '(Untitled event)',
    date: dk,
    time: timeLabel,
    category: baseInfo.cat || 'Church-wide',
    locationName: baseInfo.locName,
    address: baseInfo.address,
    blurb: use.description || '',
    provides: []
  });
}

function slugify(str) {
  return (str || '')
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

function makeId(summary, dateKey, uid) {
  const base = slugify(summary) || 'event';
  const datePart = (dateKey || '').replace(/-/g, '');
  // include a short hash from uid for uniqueness if needed
  const uidHash = (uid || '').split('').reduce((acc, ch) => ((acc * 31 + ch.charCodeAt(0)) >>> 0), 0).toString(36).slice(0, 4);
  return `${base}-${datePart}${uidHash ? '-' + uidHash : ''}`;
}

async function loadRawICS() {
  const url = process.env.CALENDAR_ICS_URL;
  // Default public Google Calendar ICS URL fallback (keeps live working even if env var is missing)
  const DEFAULT_ICS_URL = 'https://calendar.google.com/calendar/ical/8e73fa46e8c3ad6c7a7411573ace4e8ab8c2edf600abc7c72cc3dc82cf38a9eb%40group.calendar.google.com/public/basic.ics';
  const candidates = [url, DEFAULT_ICS_URL].filter(Boolean);
  for (const u of candidates) {
    try {
      const res = await fetch(u, { headers: { 'cache-control': 'no-cache' } });
      if (!res.ok) throw new Error(`Fetch failed ${res.status}`);
      const txt = await res.text();
      if (txt && txt.trim()) return txt;
    } catch (e) {
      console.error('Failed to fetch ICS URL:', u, e);
    }
  }
  try {
    return fs.readFileSync(ICS_FILE, 'utf8');
  } catch (e) {
    console.error('Failed to read local ICS file:', ICS_FILE, e);
    return '';
  }
}

export async function loadEventsFromICS() {
  const raw = await loadRawICS();
  if (!raw) return [];
  return parseICSEvents(raw).sort((a, b) => (a.date < b.date ? -1 : a.date > b.date ? 1 : 0));
}

export async function findEventById(id) {
  const all = await loadEventsFromICS();
  return all.find(e => e.id === id);
}

export async function listEventIds() {
  const all = await loadEventsFromICS();
  return all.map(e => e.id);
}
