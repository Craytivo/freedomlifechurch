import React from 'react';
import Head from 'next/head';
import SectionHeader from '../src/components/SectionHeader';

const StorePage = () => {
  return (
    <>
      <Head>
        <title>Store - Coming Soon | Freedom Life Church</title>
        <meta name="description" content="The Freedom Life Church store is coming soon! Browse apparel, books, and ministry resources to support your faith journey and our mission." />
        <meta name="keywords" content="church store, apparel, books, Freedom Life Church Edmonton, merchandise, ministry resources" />
        <meta property="og:title" content="Store - Coming Soon | Freedom Life Church" />
        <meta property="og:description" content="The Freedom Life Church store is coming soon! Browse apparel, books, and ministry resources to support your faith journey and our mission." />
        <meta property="og:type" content="website" />
      </Head>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 via-white to-orange-50 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute top-20 right-10 w-40 h-40 bg-amber-500/5 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-32 left-16 w-32 h-32 bg-orange-400/6 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '2s' }} />
          <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-amber-600/4 rounded-full blur-xl animate-pulse" style={{ animationDelay: '4s' }} />
          <div className="absolute top-1/4 left-3/4 w-16 h-16 bg-orange-500/5 rounded-full blur-lg animate-pulse" style={{ animationDelay: '6s' }} />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          {/* Coming Soon Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/10 text-amber-700 rounded-full text-sm font-medium mb-8 backdrop-blur-sm border border-amber-200/30">
            <svg className="w-4 h-4 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
            </svg>
            Coming Soon
          </div>

          <SectionHeader
            title="FLC Store"
            subtitle="We're building an online store featuring church apparel, books, ministry resources, and gifts that celebrate faith and support our mission to transform lives."
            alignment="center"
            size="large"
            className="mb-12"
          />

          {/* Main Illustration */}
          <div className="max-w-md mx-auto mb-12">
            <div className="relative">
              <div className="w-32 h-32 bg-gradient-to-br from-amber-500 to-orange-500 text-white rounded-3xl flex items-center justify-center mx-auto shadow-2xl shadow-amber-500/20 transform -rotate-3 hover:rotate-0 transition-transform duration-500">
                <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"/>
                </svg>
              </div>
              
              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-orange-400 rounded-full animate-bounce" style={{ animationDelay: '1s' }} />
              <div className="absolute -bottom-2 -left-6 w-6 h-6 bg-amber-400 rounded-full animate-bounce" style={{ animationDelay: '2s' }} />
              <div className="absolute top-1/2 -right-8 w-4 h-4 bg-amber-300 rounded-full animate-bounce" style={{ animationDelay: '3s' }} />
            </div>
          </div>

          {/* Product Categories Preview */}
          <div className="max-w-5xl mx-auto mb-12">
            <h3 className="font-heading text-2xl font-bold text-primary-900 mb-8">What We're Stocking</h3>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="p-6 rounded-2xl bg-white/60 backdrop-blur-sm border border-white/30 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="w-12 h-12 bg-amber-500/10 text-amber-600 rounded-xl flex items-center justify-center mb-4">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/>
                  </svg>
                </div>
                <h4 className="font-semibold text-primary-900 mb-2">Apparel</h4>
                <p className="text-neutral-600 text-sm">T-shirts, hoodies, and accessories with inspiring designs</p>
              </div>

              <div className="p-6 rounded-2xl bg-white/60 backdrop-blur-sm border border-white/30 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="w-12 h-12 bg-orange-500/10 text-orange-600 rounded-xl flex items-center justify-center mb-4">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
                  </svg>
                </div>
                <h4 className="font-semibold text-primary-900 mb-2">Books</h4>
                <p className="text-neutral-600 text-sm">Christian literature, devotionals, and study materials</p>
              </div>

              <div className="p-6 rounded-2xl bg-white/60 backdrop-blur-sm border border-white/30 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="w-12 h-12 bg-amber-500/10 text-amber-600 rounded-xl flex items-center justify-center mb-4">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0A2.704 2.704 0 003 15.546V6.454c0-.351.062-.693.18-1.019a2.703 2.703 0 013.821-1.821.708.708 0 01.129.136.702.702 0 01.136.129c.273.4.273.96 0 1.36a.708.708 0 01-.136.129A.702.702 0 017 5.5a.702.702 0 01-.13-.137A2.703 2.703 0 003.546 6.75"/>
                  </svg>
                </div>
                <h4 className="font-semibold text-primary-900 mb-2">Music & Media</h4>
                <p className="text-neutral-600 text-sm">Worship albums, sermon series, and digital downloads</p>
              </div>

              <div className="p-6 rounded-2xl bg-white/60 backdrop-blur-sm border border-white/30 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="w-12 h-12 bg-orange-500/10 text-orange-600 rounded-xl flex items-center justify-center mb-4">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"/>
                  </svg>
                </div>
                <h4 className="font-semibold text-primary-900 mb-2">Gifts</h4>
                <p className="text-neutral-600 text-sm">Inspirational items, home decor, and special occasion gifts</p>
              </div>
            </div>
          </div>

          {/* Featured Products Preview */}
          <div className="max-w-4xl mx-auto mb-12">
            <h3 className="font-heading text-xl font-bold text-primary-900 mb-6">Preview Coming Products</h3>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-amber-100 to-orange-100 p-6 hover:shadow-xl transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-orange-500/5 group-hover:from-amber-500/10 group-hover:to-orange-500/10 transition-colors" />
                <div className="relative">
                  <div className="w-20 h-20 bg-white rounded-xl shadow-md flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <span className="text-2xl font-bold text-amber-600">FLC</span>
                  </div>
                  <h4 className="font-semibold text-primary-900 mb-2">FLC Apparel</h4>
                  <p className="text-neutral-600 text-sm">Premium quality shirts and hoodies with our church logo</p>
                  <div className="mt-4 text-amber-600 font-semibold">Starting at $25</div>
                </div>
              </div>

              <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-100 to-purple-100 p-6 hover:shadow-xl transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 group-hover:from-blue-500/10 group-hover:to-purple-500/10 transition-colors" />
                <div className="relative">
                  <div className="w-20 h-20 bg-white rounded-xl shadow-md flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
                    </svg>
                  </div>
                  <h4 className="font-semibold text-primary-900 mb-2">Study Resources</h4>
                  <p className="text-neutral-600 text-sm">Comprehensive Bible study guides and devotional materials</p>
                  <div className="mt-4 text-blue-600 font-semibold">From $15</div>
                </div>
              </div>

              <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-green-100 to-emerald-100 p-6 hover:shadow-xl transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-emerald-500/5 group-hover:from-green-500/10 group-hover:to-emerald-500/10 transition-colors" />
                <div className="relative">
                  <div className="w-20 h-20 bg-white rounded-xl shadow-md flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"/>
                    </svg>
                  </div>
                  <h4 className="font-semibold text-primary-900 mb-2">Worship Music</h4>
                  <p className="text-neutral-600 text-sm">Original worship albums and instrumental backing tracks</p>
                  <div className="mt-4 text-green-600 font-semibold">From $10</div>
                </div>
              </div>
            </div>
          </div>

          {/* Timeline */}
          <div className="max-w-2xl mx-auto mb-12">
            <div className="p-6 md:p-8 rounded-2xl bg-gradient-to-br from-amber-500/5 via-white/50 to-orange-500/5 border border-amber-200/30 backdrop-blur-sm shadow-xl">
              <h3 className="font-heading text-xl font-bold text-primary-900 mb-4">Store Opening</h3>
              <div className="flex items-center justify-center gap-4 mb-4">
                <div className="text-3xl md:text-4xl font-bold text-amber-600">Spring 2024</div>
              </div>
              <p className="text-neutral-600 leading-relaxed">
                We're carefully curating products that reflect our values and mission. 
                Every purchase will support our ministry and help us continue transforming lives in our community.
              </p>
            </div>
          </div>

          {/* Early Access Signup */}
          <div className="max-w-md mx-auto">
            <h3 className="font-heading text-xl font-bold text-primary-900 mb-4">Get Early Access</h3>
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
              />
              <button className="px-6 py-3 bg-gradient-to-r from-amber-600 to-orange-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 whitespace-nowrap">
                Join Waitlist
              </button>
            </div>
            <p className="text-sm text-neutral-500 mt-3">
              Be the first to know when our store launches and get exclusive early access
            </p>
          </div>

          {/* Benefits */}
          <div className="mt-12 pt-8 border-t border-neutral-200">
            <h4 className="font-heading text-lg font-bold text-primary-900 mb-6">Why Shop with FLC?</h4>
            <div className="grid sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
              <div className="text-center">
                <div className="w-10 h-10 bg-amber-500/10 text-amber-600 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
                  </svg>
                </div>
                <h5 className="font-semibold text-primary-900 mb-1">Mission-Driven</h5>
                <p className="text-neutral-600 text-sm">Every purchase supports our ministry</p>
              </div>

              <div className="text-center">
                <div className="w-10 h-10 bg-orange-500/10 text-orange-600 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"/>
                  </svg>
                </div>
                <h5 className="font-semibold text-primary-900 mb-1">Quality Assured</h5>
                <p className="text-neutral-600 text-sm">Premium products we stand behind</p>
              </div>

              <div className="text-center">
                <div className="w-10 h-10 bg-amber-500/10 text-amber-600 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/>
                  </svg>
                </div>
                <h5 className="font-semibold text-primary-900 mb-1">Community Focus</h5>
                <p className="text-neutral-600 text-sm">Designed by and for our church family</p>
              </div>
            </div>
          </div>

          {/* Alternative Actions */}
          <div className="mt-12 pt-8 border-t border-neutral-200">
            <p className="text-neutral-600 mb-6">While you wait, explore these ways to connect:</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/giving"
                className="inline-flex items-center gap-2 px-6 py-3 bg-amber-500/10 text-amber-700 font-semibold rounded-lg hover:bg-amber-500/20 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
                </svg>
                Support Our Mission
              </a>
              <a
                href="/live"
                className="inline-flex items-center gap-2 px-6 py-3 bg-orange-500/10 text-orange-700 font-semibold rounded-lg hover:bg-orange-500/20 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"/>
                </svg>
                Watch Services
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default StorePage;