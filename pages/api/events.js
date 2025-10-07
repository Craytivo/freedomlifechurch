import { loadEventsFromICS } from '../../src/lib/icsEvents';
import { normalizeEvent } from '../../src/lib/eventsUtil';

export default async function handler(req, res) {
  try {
  const eventsRaw = await loadEventsFromICS();
  const events = eventsRaw.map(normalizeEvent);
    res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate=60');
    res.status(200).json({ events });
  } catch (e) {
    console.error('API /events failed', e);
    res.status(500).json({ events: [] });
  }
}
