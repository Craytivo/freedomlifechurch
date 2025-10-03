import React from 'react';
import Layout from './components/Layout';
import HeroCarousel from './components/HeroCarousel';
import PlanVisitSection from './components/PlanVisitSection';
import SermonLibraryPreview from './components/SermonLibraryPreview';

function App() {
  return (
    <Layout>
      <HeroCarousel />
  <PlanVisitSection />
  <SermonLibraryPreview />
    </Layout>
  );
}

export default App;
