import { NextResponse } from 'next/server';
import fetch from 'node-fetch';

export const dynamic = 'force-dynamic';

export async function GET() {
  const channelId = process.env.YT_CHANNEL_ID || process.env.REACT_APP_YT_CHANNEL_ID;
  if (!channelId) {
    return NextResponse.json({ error: 'missing_channel_id' }, { status: 400 });
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
    return NextResponse.json({ videoId: match[1] });
  } catch (e) {
    return NextResponse.json({ error: 'proxy_failure', message: e.message }, { status: 500 });
  }
}
