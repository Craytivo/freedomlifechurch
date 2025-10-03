// Returns recent YouTube videos from a configured playlist or channel feed.
// Prefers YT_PLAYLIST_ID; falls back to YT_CHANNEL_ID feed. Caches for 5 minutes.

let cache = { items: null, expires: 0 };
const TTL_MS = 5 * 60 * 1000;

function extractEntries(atomXml) {
  const entries = [];
  const entryRegex = /<entry>([\s\S]*?)<\/entry>/g;
  let match;
  while ((match = entryRegex.exec(atomXml)) !== null) {
    const block = match[1];
    const videoId = (block.match(/<yt:videoId>([^<]+)<\/yt:videoId>/) || [])[1];
    const title = (block.match(/<title>([^<]+)<\/title>/) || [])[1];
    const published = (block.match(/<published>([^<]+)<\/published>/) || [])[1];
    const description = (block.match(/<media:description>([\s\S]*?)<\/media:description>/) || [])[1] || '';
    if (videoId) {
      entries.push({ id: videoId, title: title || 'Untitled', published, description: description.trim() });
    }
  }
  return entries;
}

async function fetchAtomFeed() {
  const playlistId = process.env.YT_PLAYLIST_ID;
  const channelId = process.env.YT_CHANNEL_ID || process.env.REACT_APP_YT_CHANNEL_ID;

  let url;
  if (playlistId) {
    url = `https://www.youtube.com/feeds/videos.xml?playlist_id=${playlistId}`;
  } else if (channelId) {
    url = `https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`;
  } else {
    const err = new Error('missing_ids');
    err.code = 'missing_ids';
    throw err;
  }

  const resp = await fetch(url, { cache: 'no-store' });
  if (!resp.ok) {
    const err = new Error(`upstream_${resp.status}`);
    err.status = resp.status;
    throw err;
  }
  return resp.text();
}

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).json({ error: 'method_not_allowed' });
  }

  const limit = Math.max(1, Math.min(20, parseInt(req.query.limit, 10) || 6));
  const now = Date.now();
  if (cache.items && cache.expires > now) {
    return res.status(200).json({ items: cache.items.slice(0, limit), cached: true });
  }

  try {
    const xml = await fetchAtomFeed();
    const entries = extractEntries(xml);
    cache = { items: entries, expires: now + TTL_MS };
    return res.status(200).json({ items: entries.slice(0, limit), cached: false, ttlSeconds: TTL_MS / 1000 });
  } catch (e) {
    if (cache.items) {
      return res.status(200).json({ items: cache.items.slice(0, limit), stale: true });
    }
    if (e.code === 'missing_ids') {
      return res.status(400).json({ error: 'missing_configuration' });
    }
    return res.status(500).json({ error: 'proxy_failure', message: e.message });
  }
}
