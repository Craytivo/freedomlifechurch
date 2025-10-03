import React from 'react';
import HeroCarousel from '../src/components/HeroCarousel';
import PlanVisitSection from '../src/components/PlanVisitSection';
import SermonLibraryPreview from '../src/components/SermonLibraryPreview';

export default function HomePage() {
  return (
    <>
      <HeroCarousel />
      <PlanVisitSection />
      <SermonLibraryPreview />
    </>
  );
}
