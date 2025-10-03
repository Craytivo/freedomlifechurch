import React from 'react';
import Layout from './components/Layout';
import HeroCarousel from './components/HeroCarousel';

function App() {
  return (
    <Layout>
      <HeroCarousel />
      {/* Intro / Welcome Section */}
      <section className="bg-brand-light py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-heading text-3xl md:text-5xl font-bold text-primary-900 mb-6">
            Saved By Grace Through Faith
          </h2>
          <p className="font-body text-lg md:text-xl text-neutral-600 mb-8 leading-relaxed max-w-3xl mx-auto">
            Welcome to Freedom Life Church. We exist to lead people into freedom through Jesus Christ. Join us this Sunday and experience powerful worship, Biblical teaching, and a life-giving community ready to walk with you.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-5">
            <a href="#plan-visit" className="bg-flc-500 hover:bg-flc-600 text-white font-semibold px-8 py-3 rounded-lg text-base shadow-sm transition-colors">Plan Your Visit</a>
            <a href="#latest-sermon" className="border border-neutral-300 hover:border-flc-500 hover:text-flc-600 text-neutral-700 font-medium px-8 py-3 rounded-lg text-base transition-colors">Latest Sermon</a>
          </div>
        </div>
      </section>
    </Layout>
  );
}

export default App;
