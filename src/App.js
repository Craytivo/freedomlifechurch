import React from 'react';
import Layout from './components/Layout';
import HeroCarousel from './components/HeroCarousel';
import PlanVisitSection from './components/PlanVisitSection';

function App() {
  return (
    <Layout>
      <HeroCarousel />
      <PlanVisitSection />
    </Layout>
  );
}

export default App;
