import React from 'react';
import Head from 'next/head';
import SectionHeader from '../src/components/SectionHeader';

const StudyGuidesPage = () => {
  return (
    <>
      <Head>
        <title>Study Guides - Coming Soon | Freedom Life Church</title>
        <meta name="description" content="Bible study guides and resources are coming soon to Freedom Life Church. Get notified when our comprehensive study materials become available." />
        <meta name="keywords" content="bible study, study guides, Freedom Life Church Edmonton, biblical resources, small groups" />
        <meta property="og:title" content="Study Guides - Coming Soon | Freedom Life Church" />
        <meta property="og:description" content="Bible study guides and resources are coming soon to Freedom Life Church. Get notified when our comprehensive study materials become available." />
        <meta property="og:type" content="website" />
      </Head>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 via-white to-teal-50 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute top-20 right-10 w-40 h-40 bg-emerald-500/5 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-32 left-16 w-32 h-32 bg-teal-400/6 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '2s' }} />
          <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-emerald-600/4 rounded-full blur-xl animate-pulse" style={{ animationDelay: '4s' }} />
          <div className="absolute top-1/4 left-3/4 w-16 h-16 bg-teal-500/5 rounded-full blur-lg animate-pulse" style={{ animationDelay: '6s' }} />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          {/* Coming Soon Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 text-emerald-700 rounded-full text-sm font-medium mb-8 backdrop-blur-sm border border-emerald-200/30">
            <svg className="w-4 h-4 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
            </svg>
            Coming Soon
          </div>

          <SectionHeader
            title="Study Guides & Resources"
            subtitle="We're preparing comprehensive Bible study guides, small group materials, and spiritual growth resources to help you dive deeper into God's Word."
            alignment="center"
            size="large"
            className="mb-12"
          />

          {/* Main Illustration */}
          <div className="max-w-md mx-auto mb-12">
            <div className="relative">
              <div className="w-32 h-32 bg-gradient-to-br from-emerald-500 to-teal-500 text-white rounded-3xl flex items-center justify-center mx-auto shadow-2xl shadow-emerald-500/20 transform rotate-3 hover:rotate-0 transition-transform duration-500">
                <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25A8.966 8.966 0 0118 3.75c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0118 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"/>
                </svg>
              </div>
              
              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-teal-400 rounded-full animate-bounce" style={{ animationDelay: '1s' }} />
              <div className="absolute -bottom-2 -left-6 w-6 h-6 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: '2s' }} />
              <div className="absolute top-1/2 -right-8 w-4 h-4 bg-emerald-300 rounded-full animate-bounce" style={{ animationDelay: '3s' }} />
            </div>
          </div>

          {/* What's Coming */}
          <div className="max-w-4xl mx-auto mb-12">
            <h3 className="font-heading text-2xl font-bold text-primary-900 mb-8">What We're Preparing</h3>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="p-6 rounded-2xl bg-white/60 backdrop-blur-sm border border-white/30 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="w-12 h-12 bg-emerald-500/10 text-emerald-600 rounded-xl flex items-center justify-center mb-4">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                  </svg>
                </div>
                <h4 className="font-semibold text-primary-900 mb-2">Sermon Study Guides</h4>
                <p className="text-neutral-600 text-sm">Weekly guides to help you dive deeper into each sermon message</p>
              </div>

              <div className="p-6 rounded-2xl bg-white/60 backdrop-blur-sm border border-white/30 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="w-12 h-12 bg-teal-500/10 text-teal-600 rounded-xl flex items-center justify-center mb-4">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/>
                  </svg>
                </div>
                <h4 className="font-semibold text-primary-900 mb-2">Small Group Materials</h4>
                <p className="text-neutral-600 text-sm">Discussion guides and activities for small group Bible studies</p>
              </div>

              <div className="p-6 rounded-2xl bg-white/60 backdrop-blur-sm border border-white/30 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="w-12 h-12 bg-emerald-500/10 text-emerald-600 rounded-xl flex items-center justify-center mb-4">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
                  </svg>
                </div>
                <h4 className="font-semibold text-primary-900 mb-2">Biblical Resources</h4>
                <p className="text-neutral-600 text-sm">Comprehensive study tools and reference materials</p>
              </div>
            </div>
          </div>

          {/* Timeline */}
          <div className="max-w-2xl mx-auto mb-12">
            <div className="p-6 md:p-8 rounded-2xl bg-gradient-to-br from-emerald-500/5 via-white/50 to-teal-500/5 border border-emerald-200/30 backdrop-blur-sm shadow-xl">
              <h3 className="font-heading text-xl font-bold text-primary-900 mb-4">Expected Launch</h3>
              <div className="flex items-center justify-center gap-4 mb-4">
                <div className="text-3xl md:text-4xl font-bold text-emerald-600">Q2 2024</div>
              </div>
              <p className="text-neutral-600 leading-relaxed">
                We're working hard to create high-quality study materials that will enhance your spiritual growth. 
                Our team is developing content that complements our sermon series and provides practical tools for personal and group study.
              </p>
            </div>
          </div>

          {/* Notification Signup */}
          <div className="max-w-md mx-auto">
            <h3 className="font-heading text-xl font-bold text-primary-900 mb-4">Get Notified</h3>
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              />
              <button className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 whitespace-nowrap">
                Notify Me
              </button>
            </div>
            <p className="text-sm text-neutral-500 mt-3">
              We'll send you an email when study guides become available
            </p>
          </div>

          {/* Alternative Actions */}
          <div className="mt-12 pt-8 border-t border-neutral-200">
            <p className="text-neutral-600 mb-6">In the meantime, check out these resources:</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/sermons"
                className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-500/10 text-emerald-700 font-semibold rounded-lg hover:bg-emerald-500/20 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"/>
                </svg>
                Watch Sermons
              </a>
              <a
                href="/live"
                className="inline-flex items-center gap-2 px-6 py-3 bg-teal-500/10 text-teal-700 font-semibold rounded-lg hover:bg-teal-500/20 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"/>
                </svg>
                Join Live Service
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default StudyGuidesPage;