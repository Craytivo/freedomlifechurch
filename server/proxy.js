// Simple Express proxy to fetch YouTube channel feed and return latest video ID.
// Usage: npm run dev (runs both CRA and this proxy on port 5001 by default)

const express = require('express');
const fetch = require('node-fetch');
const app = express();

const PORT = process.env.PROXY_PORT || 5001;
const CHANNEL_ID = process.env.YT_CHANNEL_ID || process.env.REACT_APP_YT_CHANNEL_ID;

app.get('/api/youtube/latest', async (req, res) => {
  if (!CHANNEL_ID) {
    return res.status(400).json({ error: 'missing_channel_id' });
  }
  const feedUrl = `https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`;
  try {
    const resp = await fetch(feedUrl);
    if (!resp.ok) {
      return res.status(502).json({ error: 'upstream_error', status: resp.status });
    }
    const xml = await resp.text();
    const match = xml.match(/<yt:videoId>([^<]+)<\/yt:videoId>/);
    if (!match) {
      return res.status(404).json({ error: 'no_video_found' });
    }
    res.json({ videoId: match[1] });
  } catch (e) {
    res.status(500).json({ error: 'proxy_failure', message: e.message });
  }
});

app.get('/api/health', (_req, res) => res.json({ ok: true }));

app.listen(PORT, () => {
  console.log(`YouTube proxy running on http://localhost:${PORT}`);
  console.log('Endpoint: /api/youtube/latest');
});
