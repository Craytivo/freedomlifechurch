import { loadEventsFromICS, loadEventsFromICSFresh } from '../../src/lib/icsEvents';
import { normalizeEvent } from '../../src/lib/eventsUtil';

export default async function handler(req, res) {
  try {
    const fresh = req.query?.fresh === '1';
    const eventsRaw = fresh ? await loadEventsFromICSFresh() : await loadEventsFromICS();
  const events = eventsRaw.map(normalizeEvent);
  const fetchedAt = new Date().toISOString();
  res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate=60');
    res.status(200).json({ events, fetchedAt, fresh });
  } catch (e) {
    console.error('API /events failed', e);
    res.status(500).json({ events: [] });
  }
}
