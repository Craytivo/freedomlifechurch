import { NextResponse } from 'next/server';

// Force dynamic so we always execute (can still leverage our own cache)
export const dynamic = 'force-dynamic';

// Simple in-memory cache (per server instance) – good enough for lightweight feed lookups
let cached = {
  videoId: null,
  expires: 0
};

const TTL_MS = 5 * 60 * 1000; // 5 minutes

export async function GET() {
  const channelId = process.env.YT_CHANNEL_ID || process.env.REACT_APP_YT_CHANNEL_ID;
  if (!channelId) {
    return NextResponse.json({ error: 'missing_channel_id' }, { status: 400 });
  }

  const now = Date.now();
  if (cached.videoId && cached.expires > now) {
    return NextResponse.json({ videoId: cached.videoId, cached: true });
  }

  const feedUrl = `https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`;
  try {
    const resp = await fetch(feedUrl, { cache: 'no-store' });
    if (!resp.ok) {
      return NextResponse.json({ error: 'upstream_error', status: resp.status }, { status: 502 });
    }
    const xml = await resp.text();
    const match = xml.match(/<yt:videoId>([^<]+)<\/yt:videoId>/);
    if (!match) {
      return NextResponse.json({ error: 'no_video_found' }, { status: 404 });
    }
    cached = { videoId: match[1], expires: now + TTL_MS };
    return NextResponse.json({ videoId: match[1], cached: false, ttlSeconds: TTL_MS / 1000 });
  } catch (e) {
    // If cache exists, serve stale instead of hard failing
    if (cached.videoId) {
      return NextResponse.json({ videoId: cached.videoId, stale: true });
    }
    return NextResponse.json({ error: 'proxy_failure', message: e.message }, { status: 500 });
  }
}
