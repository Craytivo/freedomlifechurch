import Head from 'next/head';
import Link from 'next/link';

const MINISTRIES = [
  { slug: 'mens', name: "Men's", color: 'text-blue-600', blurb: 'Brotherhood, discipleship, and serving together.' },
  { slug: 'womens', name: 'Womens', color: 'text-pink-500', blurb: 'Sisterhood, prayer, and community.' },
  { slug: 'children', name: 'Children', color: 'text-emerald-600', blurb: 'Raising the next generation to know Jesus.' },
  { slug: 'volunteer', name: 'Volunteer', color: 'text-amber-600', blurb: 'Join a team and make a difference.' },
  { slug: 'outreach', name: 'Outreach', color: 'text-violet-600', blurb: 'Serve the city and share the love of Jesus.' },
  { slug: 'music', name: 'Music', color: 'text-indigo-600', blurb: 'Worship team and production arts.' },
];

export default function MinistriesPage() {
  return (
    <>
      <Head>
        <title>{`Ministries – Freedom Life Church`}</title>
        <meta name="description" content="Explore ministries at Freedom Life Church and find your place to connect and serve." />
      </Head>
      <section className="relative py-12 md:py-16 bg-white">
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true" style={{
          background: 'radial-gradient(circle at 12% 8%, rgba(235,167,62,0.06), rgba(235,167,62,0) 55%)'
        }} />
        <div className="relative mx-auto px-4 sm:px-6 lg:px-8" style={{ maxWidth: '88rem' }}>
          <div className="mb-8">
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-flc-500/10 text-flc-700 text-[11px] font-semibold uppercase tracking-wider">Get Involved</span>
            <h1 className="mt-2 font-heading text-4xl md:text-5xl font-extrabold tracking-tight text-primary-900">Ministries</h1>
            <p className="mt-2 text-neutral-700 max-w-2xl">Find the ministry that fits you best—connect, grow, and serve with others at FLC.</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {MINISTRIES.map(m => (
              <Link key={m.slug} href={`/groups#${m.slug}`} className="group rounded-2xl border border-neutral-200 bg-white p-5 hover:border-flc-500/40 hover:shadow-sm transition">
                <div className="flex items-start gap-3">
                  <svg className={`w-6 h-6 ${m.color}`} viewBox="0 0 24 24" aria-hidden="true">
                    <circle cx="12" cy="12" r="9" fill="currentColor" />
                  </svg>
                  <div>
                    <h3 className="font-heading text-lg font-semibold text-primary-900 group-hover:text-flc-600">{m.name}</h3>
                    <p className="mt-1 text-sm text-neutral-600">{m.blurb}</p>
                    <div className="mt-3 inline-flex items-center gap-1 text-[12px] font-semibold text-flc-600">Explore groups
                      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/></svg>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-10 rounded-xl border border-neutral-200 bg-neutral-50 p-4 text-sm text-neutral-700">
            Looking for something else? Visit our <Link href="/events" className="text-flc-600 hover:text-flc-700 font-semibold">Events</Link> or <Link href="/about" className="text-flc-600 hover:text-flc-700 font-semibold">About</Link> page.
          </div>
        </div>
      </section>
    </>
  );
}
