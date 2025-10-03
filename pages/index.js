import React from 'react';
import Head from 'next/head';
import HeroCarousel from '../src/components/HeroCarousel';
import PlanVisitSection from '../src/components/PlanVisitSection';
import SermonLibraryPreview from '../src/components/SermonLibraryPreview';

export default function HomePage() {
  return (
    <>
      <Head>
        <title>Freedom Life Church – Presence · Transformation · Mission</title>
        <meta name="description" content="Freedom Life Church Edmonton: A growing community pursuing presence, transformation, and mission." />
        <meta property="og:title" content="Freedom Life Church" />
        <meta property="og:description" content="Join us Sundays at 12:00 PM MST. Plan a visit and encounter Jesus." />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/og-image.png" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <HeroCarousel />
      <PlanVisitSection />
      <SermonLibraryPreview />
    </>
  );
}
