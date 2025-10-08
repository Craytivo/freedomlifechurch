/* global Map Set */
import Head from 'next/head';
import Heading from '../src/components/Heading';
import Link from 'next/link';
import { loadEventsFromICS } from '../src/lib/icsEvents';

const MIN_SECTIONS = [
  {
    id: 'mens',
    name: "Men's",
    color: 'text-blue-600',
    tint: 'bg-blue-50',
    bg: 'bg-blue-500',
    dot: 'bg-blue-600',
    blurb: 'Brotherhood, discipleship, accountability, and serving shoulder-to-shoulder. Build strength and humility together as we follow Jesus in every area of life.'
  },
  {
    id: 'womens',
    name: 'Womens',
    color: 'text-pink-500',
    tint: 'bg-pink-50',
    bg: 'bg-pink-500',
    dot: 'bg-pink-500',
    blurb: 'Sisterhood, prayer, Bible study, and encouragement in all seasons. Find a circle of women who champion your faith and your everyday calling.'
  },
  {
    id: 'children',
    name: 'Children',
    color: 'text-emerald-600',
    tint: 'bg-emerald-50',
    bg: 'bg-emerald-500',
    dot: 'bg-emerald-600',
    blurb: 'Raising the next generation to know Jesus in a safe, fun environment. We partner with families to plant God’s Word and make lasting memories.'
  },
  {
    id: 'volunteer',
    name: 'Volunteer Teams',
    color: 'text-amber-600',
    tint: 'bg-amber-50',
    bg: 'bg-amber-500',
    dot: 'bg-amber-600',
    blurb: 'Use your gifts—hospitality, kids, tech, music, prayer—to build the Church. There’s a meaningful place for your strengths and passion to make impact.'
  },
  {
    id: 'outreach',
    name: 'Outreach',
    color: 'text-violet-600',
    tint: 'bg-violet-50',
    bg: 'bg-violet-500',
    dot: 'bg-violet-600',
    blurb: 'Serving our city together through practical compassion and partnership. Be the hands and feet of Jesus to neighbors, schools, and communities.'
  },
  {
    id: 'music',
    name: 'Music & Production',
    color: 'text-indigo-600',
    tint: 'bg-indigo-50',
    bg: 'bg-indigo-500',
    dot: 'bg-indigo-600',
    blurb: 'Lead our church in worship—vocals, band, audio, video, lighting. Grow as a worshipper and serve with excellence in a creative, faith-filled team.'
  }
];

function classifyTags({ title = '', blurb = '' }) {
  const text = `${title} ${blurb}`.toLowerCase();
  const tags = new Set();
  if (/(men|men's)/.test(text)) tags.add('mens');
  if (/(women|women's|ladies)/.test(text)) tags.add('womens');
  if (/(child|children|kids|youth|vbs|vacation\s*bible)/.test(text)) tags.add('children');
  if (/(volunteer|serve|team)/.test(text)) tags.add('volunteer');
  if (/(outreach|community|city)/.test(text)) tags.add('outreach');
  if (/(music|worship|production)/.test(text)) tags.add('music');
  return Array.from(tags);
}

export default function GroupsPage({ sections }) {
  return (
    <>
      <Head>
        <title>{`Groups – Freedom Life Church`}</title>
        <meta name="description" content="Find your people at Freedom Life Church—Men’s, Womens, Children, Volunteer Teams, Outreach, and Music & Production." />
      </Head>

      <section className="relative py-12 md:py-16 bg-white">
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true" style={{
          background: 'radial-gradient(circle at 12% 8%, rgba(235,167,62,0.06), rgba(235,167,62,0) 55%)'
        }} />
        <div className="relative mx-auto px-4 sm:px-6 lg:px-8" style={{ maxWidth: '88rem' }}>
          <div className="mb-8">
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-flc-500/10 text-flc-700 text-[11px] font-semibold uppercase tracking-wider">Get Connected</span>
            <Heading as="h1" size="md" className="mt-2">Groups</Heading>
            <p className="mt-2 text-neutral-700 max-w-2xl">There’s a place for you here. Explore ministries and find a group where you can grow in faith and friendship.</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-5 sm:gap-6">
            {sections.map((s) => (
              <article key={s.id} id={s.id} className="card card-hover relative overflow-hidden p-5 md:p-6">
                {/* Faint color blob */}
                <span aria-hidden="true" className={`pointer-events-none absolute -top-8 -right-8 w-36 h-36 rounded-full ${s.bg || ''} opacity-15 blur-[42px]`} />
                <div className="flex items-start gap-3">
                  <div className="inline-flex items-center">
                    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider ${s.tint || 'bg-neutral-100'} ${s.color}`}>
                      <span className={`inline-block w-1.5 h-1.5 rounded-full ${s.dot || 'bg-neutral-400'}`} />
                      Ministry
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h2 className="font-heading text-xl md:text-2xl font-bold tracking-tight text-primary-900">{s.name}</h2>
                    <p className="mt-1 text-sm sm:text-[15px] text-neutral-700 leading-relaxed">{s.blurb}</p>
                    <ul className="mt-3 grid sm:grid-cols-2 gap-2 text-sm text-neutral-700">
                      {s.points.map((p, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="mt-1 inline-block w-1.5 h-1.5 rounded-full bg-flc-500" />
                          <span>{p}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="mt-4 flex flex-wrap items-center gap-3">
                      {s.next && (
                        <span className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-neutral-50 border border-neutral-200 text-[12px] text-neutral-700">
                          <svg className="w-4 h-4 text-flc-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
                          <span>Next: {s.next.dateLabel} · {s.next.title}</span>
                        </span>
                      )}
                      <Link href="/events" className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md border border-neutral-300 text-neutral-700 hover:border-flc-500 hover:text-flc-600 text-[13px] font-medium">See Events
                        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/></svg>
                      </Link>
                      <Link href={`/groups/${s.id}`} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-flc-500 hover:bg-flc-600 text-white text-[13px] font-semibold">Explore {s.name}</Link>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export async function getStaticProps() {
  const events = await loadEventsFromICS();
  const today = new Date();
  const bySection = new Map();
  for (const base of MIN_SECTIONS) {
    const points = [
      'Meet new people and grow together',
      'Prayer, Scripture, and encouragement',
      'Opportunities to serve and make a difference'
    ];
    // find next upcoming event for this section
    const next = events
      .filter(e => {
        const tags = classifyTags(e);
        return tags.includes(base.id) && new Date(e.date) >= new Date(today.getFullYear(), today.getMonth(), today.getDate());
      })
      .sort((a,b) => (a.date < b.date ? -1 : a.date > b.date ? 1 : 0))[0];
    const nextInfo = next ? { title: next.title, dateLabel: new Date(next.date).toLocaleDateString(undefined,{ month:'short', day:'numeric'}) } : null;
    bySection.set(base.id, { ...base, points, next: nextInfo });
  }

  const sections = MIN_SECTIONS.map(s => bySection.get(s.id));
  return {
    props: { sections },
    revalidate: 60 * 5
  };
}
