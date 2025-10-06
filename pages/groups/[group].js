import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { GROUPS } from '../../src/data/groups';
import { loadEventsFromICS } from '../../src/lib/icsEvents';

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

export default function GroupDetail({ group, nextEvent }) {
  const router = useRouter();
  if (!group) return null;

  const heroBg = 'radial-gradient(circle at 12% 8%, rgba(235,167,62,0.08), rgba(235,167,62,0) 55%)';

  return (
    <>
      <Head>
        <title>{`${group.name} – Groups – Freedom Life Church`}</title>
        <meta name="description" content={group.blurb} />
      </Head>

      <section className="relative py-14 md:py-18 bg-white">
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true" style={{ background: heroBg }} />
        <div className="relative mx-auto px-4 sm:px-6 lg:px-8" style={{ maxWidth: '88rem' }}>
          <nav className="text-sm text-neutral-600 mb-3">
            <Link href="/groups" className="hover:text-flc-600">Groups</Link>
            <span className="mx-2 text-neutral-400">/</span>
            <span className="text-primary-900 font-medium">{group.name}</span>
          </nav>
          <h1 className="font-heading text-4xl md:text-5xl font-extrabold tracking-tight text-primary-900">{group.name}</h1>
          <p className="mt-2 text-neutral-700 max-w-2xl">{group.intro || group.blurb}</p>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            {nextEvent && (
              <Link href={`/events/${nextEvent.id}`} className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-neutral-50 border border-neutral-200 text-[12px] text-neutral-700">
                <svg className="w-4 h-4 text-flc-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
                <span>Next: {new Date(nextEvent.date).toLocaleDateString(undefined,{ month:'short', day:'numeric' })} · {nextEvent.title}</span>
              </Link>
            )}
            <Link href="/events" className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md border border-neutral-300 text-neutral-700 hover:border-flc-500 hover:text-flc-600 text-[13px] font-medium">See All Events
              <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/></svg>
            </Link>
            <Link href={`/groups#${group.id}`} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-flc-500 hover:bg-flc-600 text-white text-[13px] font-semibold">Back to Overview</Link>
          </div>
        </div>
      </section>

      <section className="py-8 md:py-10 bg-white">
        <div className="mx-auto px-4 sm:px-6 lg:px-8" style={{ maxWidth: '88rem' }}>
          <div className="grid lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8">
              <div className="rounded-2xl border border-neutral-200 bg-white p-5 md:p-6">
                <h2 className="font-heading text-xl md:text-2xl font-bold tracking-tight text-primary-900">About {group.name}</h2>
                {Array.isArray(group.body) && group.body.length > 0 && (
                  <div className="mt-2 space-y-3 text-sm text-neutral-700">
                    {group.body.map((para, i) => (<p key={i}>{para}</p>))}
                  </div>
                )}
                <ul className="mt-3 grid sm:grid-cols-2 gap-2 text-sm text-neutral-700">
                  {group.points.map((p, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="mt-1 inline-block w-1.5 h-1.5 rounded-full bg-flc-500" />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
                {group.join && (<p className="mt-4 text-sm text-neutral-700">{group.join}</p>)}
                {group.scripture && (
                  <figure className="mt-4 border-l-2 border-flc-500 pl-3 text-sm text-neutral-800">
                    <blockquote className="italic">“{group.scripture.text}”</blockquote>
                    <figcaption className="mt-1 text-neutral-500">— {group.scripture.ref}</figcaption>
                  </figure>
                )}
              </div>
            </div>
            <div className="lg:col-span-4">
              <div className="rounded-2xl border border-neutral-200 bg-white p-5 md:p-6">
                <h3 className="text-sm font-semibold text-primary-900">Quick links</h3>
                <ul className="mt-3 space-y-2 text-sm">
                  <li><Link href={`/groups#${group.id}`} className="text-flc-600 hover:text-flc-700">{group.name} overview section</Link></li>
                  <li><Link href="/events" className="text-flc-600 hover:text-flc-700">Upcoming events</Link></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export async function getStaticPaths() {
  return {
    paths: GROUPS.map(g => ({ params: { group: g.id } })),
    fallback: false
  };
}

export async function getStaticProps({ params }) {
  const group = GROUPS.find(g => g.id === params.group) || null;
  let nextEvent = null;
  try {
    const events = await loadEventsFromICS();
    const today = new Date();
    const upcoming = events
      .filter(e => classifyTags(e).includes(params.group) && new Date(e.date) >= new Date(today.getFullYear(), today.getMonth(), today.getDate()))
      .sort((a, b) => (a.date < b.date ? -1 : a.date > b.date ? 1 : 0));
    nextEvent = upcoming[0] || null;
  } catch {
    nextEvent = null;
  }
  return {
    props: { group, nextEvent },
    revalidate: 60 * 5
  };
}
