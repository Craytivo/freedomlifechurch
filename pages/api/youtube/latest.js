// Pages Router style API handler for broader platform compatibility (Netlify functions, etc.)
// Simple in-memory cache (per server instance)
let cached = { videoId: null, expires: 0 };
const TTL_MS = 5 * 60 * 1000; // 5 minutes

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).json({ error: 'method_not_allowed' });
  }
  const channelId = process.env.YT_CHANNEL_ID || process.env.REACT_APP_YT_CHANNEL_ID;
  if (!channelId) {
    return res.status(400).json({ error: 'missing_channel_id' });
  }
  const now = Date.now();
  if (cached.videoId && cached.expires > now) {
    return res.status(200).json({ videoId: cached.videoId, cached: true });
  }
  const feedUrl = `https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`;
  try {
    const upstream = await fetch(feedUrl, { cache: 'no-store' });
    if (!upstream.ok) {
      return res.status(502).json({ error: 'upstream_error', status: upstream.status });
    }
    const xml = await upstream.text();
    const match = xml.match(/<yt:videoId>([^<]+)<\/yt:videoId>/);
    if (!match) {
      return res.status(404).json({ error: 'no_video_found' });
    }
    cached = { videoId: match[1], expires: now + TTL_MS };
    return res.status(200).json({ videoId: match[1], cached: false, ttlSeconds: TTL_MS / 1000 });
  } catch (e) {
    if (cached.videoId) {
      return res.status(200).json({ videoId: cached.videoId, stale: true });
    }
    return res.status(500).json({ error: 'proxy_failure', message: e.message });
  }
}
