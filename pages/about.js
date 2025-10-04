import React from 'react';
import Head from 'next/head';
import Image from 'next/image';
import imgHero from '../src/assets/images/IMG_4843webcropped-768x946.jpg';
import imgFamily from '../src/assets/images/IMG_4895webcropped-768x839.jpg';

const Section = ({ children, className = '' }) => (
  <section className={`relative py-16 md:py-20 ${className}`}>
    <div className="absolute inset-0 pointer-events-none" aria-hidden="true" style={{
      background: 'radial-gradient(circle at 12% 8%, rgba(235,167,62,0.06), rgba(235,167,62,0) 55%)'
    }} />
    <div className="relative mx-auto px-4 sm:px-6 lg:px-8" style={{ maxWidth: '88rem' }}>
      {children}
    </div>
  </section>
);

export default function AboutPage() {
  return (
    <>
      <Head>
        <title>About Freedom Life Church</title>
        <meta name="description" content="Learn about Freedom Life Church: mission, story, and how to get connected." />
      </Head>

      {/* Hero */}
      <Section className="bg-white pt-14 md:pt-20">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          <div className="lg:col-span-7">
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-flc-500/10 text-flc-700 text-[11px] font-semibold uppercase tracking-wider">Who we are</span>
            <h1 className="mt-3 font-heading text-4xl md:text-5xl font-extrabold tracking-tight text-primary-900">About Freedom Life Church</h1>
            <p className="mt-4 text-neutral-700 text-base md:text-lg leading-relaxed max-w-2xl">
              We are a church that believes that freedom, life and grace are given and experienced in Jesus Christ alone (John 8:36). Believing the entire Word of Jesus Christ, and that salvation is given only by His grace alone! (Titus 3:5-7).
            </p>
            <p className="mt-4 text-neutral-700 text-base md:text-lg leading-relaxed max-w-2xl">
              Our desire is to see people encounter His presence and be transformed for a life on mission.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href="#mission" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md bg-flc-500 hover:bg-flc-600 text-white text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-flc-500/40">
                Our Mission
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/></svg>
              </a>
              <a href="#get-involved" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md border border-neutral-300 text-neutral-700 hover:border-flc-500 hover:text-flc-600 text-sm font-medium">
                Get Involved
              </a>
            </div>
          </div>
          <div className="lg:col-span-5">
            <div className="relative rounded-xl overflow-hidden border border-neutral-200 bg-neutral-100 aspect-[16/10]">
              <Image src={imgHero} alt="Freedom Life Church community" fill className="object-cover" priority />
            </div>
          </div>
        </div>
      </Section>

      {/* Mission */}
      <Section className="bg-neutral-50" id="mission">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          <div className="lg:col-span-7">
            <h2 className="font-heading text-3xl md:text-4xl font-bold tracking-tight text-primary-900 mb-3">Our Mission</h2>
            <p className="text-neutral-700 text-base md:text-lg leading-relaxed max-w-3xl">
              It is our mission to proclaim the freedom and life that is in Jesus Christ given to humanity by His grace. FLC believes
              that one is justified and made righteous by His grace! Therefore, it is not by works that one obtains salvation, but by
              faith alone! Consequently, FLC will endeavour to unapologetically preach the gospel of Jesus Christ to this generation
              and culture. Freedom and life will not just be a phrase we say, but it will be an identity and culture we live through
              Jesus Christ!
            </p>
          </div>
          <div className="lg:col-span-5">
            <div className="rounded-xl border border-neutral-200 bg-white p-5 md:p-6">
              <h3 className="font-heading text-base font-semibold text-primary-900 mb-2">Core convictions</h3>
              <ul className="space-y-2 text-sm text-neutral-700">
                <li className="flex items-start gap-2"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-flc-500" />Centered on Jesus and His Gospel</li>
                <li className="flex items-start gap-2"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-flc-500" />Built by grace through faith</li>
                <li className="flex items-start gap-2"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-flc-500" />Presence leads to transformation and mission</li>
              </ul>
            </div>
          </div>
        </div>
      </Section>

      {/* Our Story */}
      <Section className="bg-white">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          <div className="lg:col-span-6">
            <h2 className="font-heading text-3xl md:text-4xl font-bold tracking-tight text-primary-900 mb-3">Our Story</h2>
            <p className="text-neutral-700 leading-relaxed">
              Pastor Rohan (Ro) is married to his best friend, the beautiful Jhanelle (Jo) Samuels. Pastor Ro embodies the rare
              balance of spiritual gifts and practical educational experiences that connects pastoral leadership and discipleship
              teaching with prophetic preaching and courageous social action. Pastor Ro and Jo are equipped and poised to initiate
              theological revival, decisive commitment and rededication to the teachings of Jesus the Christ as the foundation for
              personal living, family stability and community development.
            </p>
            <p className="text-neutral-700 leading-relaxed mt-4">
              Pastor Ro earned his Bachelor’s Degree from York University and a Masters of Theological Studies from Taylor Seminary.
              He is currently pursuing his Doctor of Theology at Evangelical Theological Seminary.
            </p>
          </div>
          <div className="lg:col-span-6">
            <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-5 md:p-6">
              <h3 className="font-heading text-base font-semibold text-primary-900 mb-3">What you can expect</h3>
              <ul className="grid sm:grid-cols-2 gap-2 text-sm text-neutral-700">
                <li className="flex items-start gap-2"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-flc-500" />Uplifting worship and Biblical teaching</li>
                <li className="flex items-start gap-2"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-flc-500" />Kids check‑in opens 15 minutes early</li>
                <li className="flex items-start gap-2"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-flc-500" />Friendly team ready to welcome you</li>
                <li className="flex items-start gap-2"><span className="mt-2 w-1.5 h-1.5 rounded-full bg-flc-500" />Opportunities to serve and get connected</li>
              </ul>
            </div>
          </div>
        </div>
      </Section>

      {/* Room For All / Get Involved */}
      <Section className="bg-neutral-50" id="get-involved">
        <div className="text-center max-w-3xl mx-auto">
          <span className="inline-flex items-center px-3 py-1 rounded-full bg-flc-500/10 text-flc-700 text-[11px] font-semibold uppercase tracking-wider">Room for all</span>
          <h2 className="mt-3 font-heading text-3xl md:text-4xl font-extrabold text-primary-900">Find your place to belong</h2>
          <p className="mt-2 text-neutral-600">Whether you’re new to church or have been walking with Jesus for years, there’s a ministry where you can thrive.</p>
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { title: 'Groups', desc: 'Find authentic community and grow your faith together.', href: '#groups' },
            { title: 'Serve', desc: 'Use your gifts to build the church and make a difference.', href: '#volunteer' },
            { title: 'Kids & Youth', desc: 'A safe, fun space to grow in Jesus for every age.', href: '#nextgen' },
            { title: 'Prayer', desc: 'We would love to pray with you and for you.', href: '#prayer' },
          ].map((c) => (
            <a key={c.title} href={c.href} className="group relative rounded-xl overflow-hidden shadow-sm border border-neutral-200 bg-white p-5 md:p-6 hover:border-flc-500/40 hover:shadow-md transition-colors">
              <h3 className="font-heading text-lg font-semibold text-primary-900 mb-1">{c.title}</h3>
              <p className="text-sm text-neutral-600 leading-relaxed">{c.desc}</p>
              <span className="mt-3 inline-flex items-center gap-1 text-[12px] font-semibold uppercase tracking-wide text-flc-600">Learn more
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/></svg>
              </span>
            </a>
          ))}
        </div>
      </Section>

      {/* Family highlight */}
      <Section className="bg-white">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-flc-500/10 text-flc-700 text-[11px] font-semibold uppercase tracking-wider">For your family</span>
            <h2 className="mt-3 font-heading text-3xl md:text-4xl font-extrabold text-primary-900">We’ve got something for everyone</h2>
            <p className="mt-2 text-neutral-700">From kids to youth and young adults—your family will find a place to belong, grow, and serve together.</p>
            <div className="mt-5 flex flex-wrap gap-3">
              <a href="#nextgen" className="inline-flex items-center gap-2 px-4 py-2 rounded-md border border-neutral-300 text-neutral-700 hover:border-flc-500 hover:text-flc-600 text-sm font-medium">NextGen</a>
              <a href="#groups" className="inline-flex items-center gap-2 px-4 py-2 rounded-md border border-neutral-300 text-neutral-700 hover:border-flc-500 hover:text-flc-600 text-sm font-medium">Groups</a>
            </div>
          </div>
          <div>
            <div className="relative rounded-xl overflow-hidden border border-neutral-200 bg-neutral-100 aspect-[16/10]">
              <Image src={imgFamily} alt="Family at Freedom Life Church" fill className="object-cover" />
            </div>
          </div>
        </div>
      </Section>

      {/* CTA removed by request */}
    </>
  );
}
