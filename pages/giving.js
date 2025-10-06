import React from 'react';
import SEO from '../src/components/seo/SEO';
import Accordion from '../src/components/Accordion';
import Image from 'next/image';

// Premium Giving page - emphasizing the heart and purpose behind giving
const GivingPage = () => {
  const givingPrinciples = [
    {
      title: "Generous Hearts",
      description: "God loves a cheerful giver. When we give, we reflect His generous nature and experience the joy of participating in His work.",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"/>
        </svg>
      )
    },
    {
      title: "Kingdom Investment",
      description: "Your giving advances God's kingdom, supports local ministry, and creates eternal impact in our community and beyond.",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941"/>
        </svg>
      )
    },
    {
      title: "Faithful Stewardship",
      description: "We honor your trust by stewarding every gift with integrity, transparency, and a commitment to excellence in all we do.",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.623 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z"/>
        </svg>
      )
    }
  ];

  const impactAreas = [
    {
      title: "Sunday Services",
      description: "Creating meaningful worship experiences, quality teaching, and pastoral care for our growing community.",
      percentage: "40%"
    },
    {
      title: "Kids & Youth Ministry",
      description: "Investing in the next generation through engaging programs, safe environments, and life-changing relationships.",
      percentage: "25%"
    },
    {
      title: "Community Outreach", 
      description: "Serving our neighbors, supporting local needs, and spreading hope throughout Edmonton and beyond.",
      percentage: "20%"
    },
    {
      title: "Facility & Operations",
      description: "Maintaining our building, technology, and operational excellence to serve our community effectively.",
      percentage: "15%"
    }
  ];

  const givingOptions = [
    {
      title: "One-Time Gift",
      description: "Make a single donation to support our ministry and mission.",
      action: "Give Now"
    },
    {
      title: "Recurring Giving",
      description: "Set up automatic monthly giving to consistently support God's work.",
      action: "Set Up Recurring"
    },
    {
      title: "Special Projects",
      description: "Contribute to specific ministry initiatives and building projects.",
      action: "View Projects"
    }
  ];

  const faqItems = [
    {
      question: 'Is online giving secure?',
      answer: "Yes, absolutely. We use Church Center's secure platform which employs bank-level encryption and security measures to protect your personal and financial information.",
    },
    {
      question: 'How much should I give?',
      answer: "The Bible speaks of the tithe (10%) as a starting point, but ultimately giving should be done cheerfully and according to what God has laid on your heart. We encourage you to pray about what God is calling you to give.",
    },
    {
      question: 'Can I get a tax receipt?',
      answer: 'Yes, Freedom Life Church provides official tax receipts for all donations. Receipts are automatically generated through Church Center and can be accessed in your giving history.',
    },
    {
      question: "What if I'm new to giving?",
      answer: "We're here to help! Start where you feel comfortable, whether that's a small monthly amount or a one-time gift. The important thing is taking the first step in generosity. Our pastoral team is always available to discuss biblical stewardship.",
    },
  ];

  return (
    <>
      <SEO
        title="Giving | Freedom Life Church"
        description="Join us in advancing God's kingdom through generous giving. Discover the heart behind biblical stewardship and make a lasting impact in our community."
        keywords={[ 'giving','tithing','offering','donation','stewardship','Freedom Life Church Edmonton' ]}
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: faqItems.map(q => ({
            '@type': 'Question',
            name: q.question,
            acceptedAnswer: {
              '@type': 'Answer',
              text: q.answer,
            },
          })),
        }}
      />

      {/* Premium Hero Section */}
      <section className="relative py-20 md:py-28 bg-white overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute inset-0" style={{
            background: [
              'radial-gradient(circle at 20% 30%, rgba(235,167,62,0.06), rgba(235,167,62,0) 70%)',
              'radial-gradient(circle at 80% 70%, rgba(235,167,62,0.04), rgba(235,167,62,0) 60%)',
              'linear-gradient(135deg, rgba(235,167,62,0.02) 0%, rgba(235,167,62,0) 50%)'
            ].join(', ')
          }} />
          <div className="absolute top-20 right-10 w-20 h-20 bg-flc-500/3 rounded-full blur-xl animate-pulse" />
          <div className="absolute bottom-32 left-16 w-16 h-16 bg-amber-500/4 rounded-full blur-lg animate-pulse" style={{ animationDelay: '3s' }} />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-flc-500/10 text-flc-700 text-xs font-semibold uppercase tracking-wide mb-6">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"/>
              </svg>
              Generous Living
            </div>
            
            <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-primary-900 via-primary-800 to-primary-700 mb-6 leading-tight">
              Give with Purpose
            </h1>
            
            <p className="text-xl sm:text-2xl text-neutral-600 leading-relaxed font-medium max-w-3xl mx-auto mb-8">
              When we give, we join God in His work of transformation. Every gift makes an eternal difference in lives, families, and our community.
            </p>

            {/* Primary CTA */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <a 
                href="https://flcedmonton.churchcenter.com/giving" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group relative px-8 py-4 bg-gradient-to-r from-flc-600 via-flc-500 to-amber-500 text-white font-semibold rounded-xl shadow-lg shadow-flc-500/20 hover:shadow-xl hover:shadow-flc-500/30 transform hover:-translate-y-0.5 transition-all duration-300 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-flc-700 via-flc-600 to-amber-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="relative z-10 flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"/>
                  </svg>
                  Give Online
                </span>
              </a>
              <button className="group px-8 py-4 bg-white/70 backdrop-blur-sm border border-flc-200/40 text-flc-700 font-semibold rounded-xl shadow-md hover:shadow-lg hover:bg-white/80 hover:border-flc-300/50 transform hover:-translate-y-0.5 transition-all duration-300">
                Learn More
              </button>
            </div>

            {/* Biblical foundation */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-flc-500/5 via-amber-500/3 to-flc-500/5 border border-flc-200/20 backdrop-blur-sm">
              <blockquote className="text-lg font-medium text-primary-800 italic">
                "Each of you should give what you have decided in your heart to give, not reluctantly or under compulsion, for God loves a cheerful giver."
              </blockquote>
              <cite className="block text-sm font-semibold text-flc-600 mt-2">2 Corinthians 9:7</cite>
            </div>
          </div>
        </div>
      </section>

      {/* Why We Give Section */}
      <section className="relative py-16 md:py-20 bg-neutral-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-br from-primary-900 via-primary-800 to-primary-700 mb-4 leading-tight">
              The Heart of Giving
            </h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              Giving isn't about what we can afford to lose, but about what we can joyfully invest in God's kingdom
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {givingPrinciples.map((principle, index) => (
              <div key={index} className="group text-center p-6 rounded-2xl bg-white border border-neutral-200 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-flc-500 to-amber-500 text-white rounded-xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {principle.icon}
                </div>
                <h3 className="font-heading text-xl font-bold text-primary-900 mb-3">{principle.title}</h3>
                <p className="text-neutral-600 leading-relaxed">{principle.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact & Transparency Section */}
      <section className="relative py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-br from-primary-900 via-primary-800 to-primary-700 mb-4 leading-tight">
              Your Impact in Action
            </h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              See how your generous giving creates lasting change in our community and beyond
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {impactAreas.map((area, index) => (
              <div key={index} className="group p-6 rounded-2xl border border-neutral-200 bg-gradient-to-br from-white to-neutral-50/50 hover:shadow-lg transition-all duration-300">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="font-heading text-xl font-bold text-primary-900">{area.title}</h3>
                  <span className="px-3 py-1 bg-flc-500/10 text-flc-700 text-sm font-bold rounded-full">{area.percentage}</span>
                </div>
                <p className="text-neutral-600 leading-relaxed">{area.description}</p>
                
                {/* Progress bar */}
                <div className="mt-4 w-full bg-neutral-200 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-flc-500 to-amber-500 h-2 rounded-full transition-all duration-1000 group-hover:shadow-sm"
                    style={{ width: area.percentage }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Giving Options Section */}
      <section className="relative py-16 md:py-20 bg-neutral-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-br from-primary-900 via-primary-800 to-primary-700 mb-4 leading-tight">
              Ways to Give
            </h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              Choose the giving option that works best for you and your family
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {givingOptions.map((option, index) => (
              <div key={index} className="p-6 rounded-2xl bg-white border border-neutral-200 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                <h3 className="font-heading text-xl font-bold text-primary-900 mb-3">{option.title}</h3>
                <p className="text-neutral-600 leading-relaxed mb-6">{option.description}</p>
                <a 
                  href="https://flcedmonton.churchcenter.com/giving" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-flc-600 to-flc-500 text-white font-semibold rounded-lg hover:shadow-md transform hover:-translate-y-0.5 transition-all duration-300"
                >
                  {option.action}
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"/>
                  </svg>
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="relative py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-br from-primary-900 via-primary-800 to-primary-700 mb-4 leading-tight">
              Questions About Giving
            </h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              Common questions about biblical stewardship and giving
            </p>
          </div>
          <div className="max-w-3xl mx-auto">
            <Accordion tone="neutral" items={faqItems.map(i => ({ title: i.question, content: i.answer }))} />
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="relative py-16 md:py-20 bg-gradient-to-br from-flc-500/5 via-amber-500/3 to-flc-500/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-br from-primary-900 via-primary-800 to-primary-700 mb-4">
            Ready to Make an Impact?
          </h2>
          <p className="text-lg text-neutral-600 max-w-2xl mx-auto mb-8">
            Join us in advancing God's kingdom through generous giving. Every gift, no matter the size, makes an eternal difference.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a 
              href="https://flcedmonton.churchcenter.com/giving" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group relative px-8 py-4 bg-gradient-to-r from-flc-600 via-flc-500 to-amber-500 text-white font-bold rounded-xl shadow-lg shadow-flc-500/20 hover:shadow-xl hover:shadow-flc-500/30 transform hover:-translate-y-0.5 transition-all duration-300 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-flc-700 via-flc-600 to-amber-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="relative z-10 flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"/>
                </svg>
                Give Now
              </span>
            </a>
            
            <div className="text-sm text-neutral-500">
              Questions? Contact us at{' '}
              <a href="mailto:connect@freedomlifechurch.ca" className="text-flc-600 hover:text-flc-700 font-medium">
                connect@freedomlifechurch.ca
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default GivingPage;