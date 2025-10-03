// Generates an RSS 2.0 feed from a YouTube playlist on each request.
// Path: /sermons.xml
// Feed consumers (Apple Podcasts, generic RSS readers) can subscribe to this URL.

const PLAYLIST_ID = process.env.YT_PLAYLIST_ID || 'PLlZYBLQN9I9S7htHsLfnj_v9cwDCHxFp6';
const SITE_URL = process.env.SITE_URL || 'https://www.freedomlifechurch.ca';
const FEED_TITLE = 'Freedom Life Church Sermons';
const FEED_DESCRIPTION = 'Weekly messages from Freedom Life Church.';

// In-memory cache (per server instance)
let cache = { xml: null, expires: 0 };
const TTL_MS = 5 * 60 * 1000; // 5 minutes

async function fetchPlaylistAtom() {
  const url = `https://www.youtube.com/feeds/videos.xml?playlist_id=${PLAYLIST_ID}`;
  const resp = await fetch(url, { cache: 'no-store' });
  if (!resp.ok) {
    throw new Error(`Upstream YouTube feed error: ${resp.status}`);
  }
  return resp.text();
}

function escape(str = '') {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function extractEntries(atomXml) {
  // Split on <entry> blocks
  const entries = [];
  const entryRegex = /<entry>([\s\S]*?)<\/entry>/g;
  let match;
  while ((match = entryRegex.exec(atomXml)) !== null) {
    const block = match[1];
    const videoId = (block.match(/<yt:videoId>([^<]+)<\/yt:videoId>/) || [])[1];
    const title = (block.match(/<title>([^<]+)<\/title>/) || [])[1];
    const published = (block.match(/<published>([^<]+)<\/published>/) || [])[1];
    // media:description can contain newlines
    const desc = (block.match(/<media:description>([\s\S]*?)<\/media:description>/) || [])[1] || '';
    if (videoId) {
      entries.push({
        id: videoId,
        title: title || 'Untitled',
        published,
        description: desc.trim()
      });
    }
  }
  return entries;
}

function buildRss(entries) {
  const updated = new Date().toUTCString();
  const items = entries
    .map(e => {
      const link = `https://www.youtube.com/watch?v=${e.id}`;
      const pubDate = e.published ? new Date(e.published).toUTCString() : updated;
      const descriptionCdata = `<![CDATA[${e.description || ''}]]>`;
      return `\n    <item>\n      <title>${escape(e.title)}</title>\n      <link>${link}</link>\n      <guid isPermaLink="false">yt:${e.id}</guid>\n      <pubDate>${pubDate}</pubDate>\n      <description>${descriptionCdata}</description>\n      <enclosure url="https://img.youtube.com/vi/${e.id}/hqdefault.jpg" type="image/jpeg" />\n    </item>`;
    })
    .join('');

  return `<?xml version="1.0" encoding="UTF-8"?>\n<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">\n  <channel>\n    <title>${escape(FEED_TITLE)}</title>\n    <link>${SITE_URL}</link>\n    <atom:link href="${SITE_URL}/sermons.xml" rel="self" type="application/rss+xml" />\n    <description>${escape(FEED_DESCRIPTION)}</description>\n    <language>en</language>\n    <lastBuildDate>${updated}</lastBuildDate>\n    <ttl>10</ttl>${items}\n  </channel>\n</rss>`;
}

export async function getServerSideProps({ res }) {
  try {
    const now = Date.now();
    if (cache.xml && cache.expires > now) {
      res.setHeader('Content-Type', 'application/rss+xml; charset=UTF-8');
      res.setHeader('Cache-Control', 'public, max-age=300, stale-while-revalidate=600');
      res.write(cache.xml);
      res.end();
      return { props: {} };
    }

    const atom = await fetchPlaylistAtom();
    const entries = extractEntries(atom).slice(0, 30); // keep latest 30
    const xml = buildRss(entries);
    cache = { xml, expires: now + TTL_MS };
    res.setHeader('Content-Type', 'application/rss+xml; charset=UTF-8');
    res.setHeader('Cache-Control', 'public, max-age=300, stale-while-revalidate=600');
    res.write(xml);
    res.end();
  } catch (e) {
    const errorXml = `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>${escape(FEED_TITLE)} (Error)</title><description>${escape(e.message)}</description></channel></rss>`;
    res.statusCode = 500;
    res.setHeader('Content-Type', 'application/rss+xml; charset=UTF-8');
    res.write(errorXml);
    res.end();
  }
  return { props: {} };
}

// This page itself renders nothing; the response is the RSS XML.
export default function SermonsRssFeed() { return null; }
