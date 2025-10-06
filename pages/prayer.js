import React, { useState } from 'react';
import Head from 'next/head';
import SectionHeader from '../src/components/SectionHeader';

const PrayerPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    isPublic: false,
    isUrgent: false,
    category: '',
    prayerRequest: '',
    allowContact: true
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // For now, just show success message - you can integrate with your prayer system later
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        isPublic: false,
        isUrgent: false,
        category: '',
        prayerRequest: '',
        allowContact: true
      });
    }, 3000);
  };

  const prayerCategories = [
    { value: 'health', label: 'Health & Healing', icon: '🙏' },
    { value: 'family', label: 'Family & Relationships', icon: '👨‍👩‍👧‍👦' },
    { value: 'financial', label: 'Financial Needs', icon: '💰' },
    { value: 'guidance', label: 'Wisdom & Guidance', icon: '🧭' },
    { value: 'salvation', label: 'Salvation & Faith', icon: '✝️' },
    { value: 'work', label: 'Work & Career', icon: '💼' },
    { value: 'protection', label: 'Protection & Safety', icon: '🛡️' },
    { value: 'comfort', label: 'Comfort & Peace', icon: '🕊️' },
    { value: 'other', label: 'Other', icon: '💭' }
  ];

  const prayerPromises = [
    {
      verse: "\"And my God will meet all your needs according to the riches of his glory in Christ Jesus.\"",
      reference: "Philippians 4:19",
      theme: "Provision"
    },
    {
      verse: "\"The prayer of a righteous person is powerful and effective.\"",
      reference: "James 5:16",
      theme: "Prayer Power"
    },
    {
      verse: "\"Cast all your anxiety on him because he cares for you.\"",
      reference: "1 Peter 5:7",
      theme: "Peace"
    },
    {
      verse: "\"Call to me and I will answer you and tell you great and unsearchable things you do not know.\"",
      reference: "Jeremiah 33:3",
      theme: "God's Response"
    }
  ];

  if (isSubmitted) {
    return (
      <>
        <Head>
          <title>Prayer Request Submitted | Freedom Life Church</title>
        </Head>
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-white to-green-50 p-4">
          <div className="max-w-md w-full text-center p-8 rounded-2xl bg-white shadow-xl border border-green-200/30">
            <div className="w-16 h-16 bg-green-500 text-white rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/>
              </svg>
            </div>
            <h1 className="font-heading text-2xl font-bold text-primary-900 mb-4">Prayer Request Received</h1>
            <p className="text-neutral-600 leading-relaxed mb-6">
              Thank you for trusting us with your prayer request. Our prayer team will be lifting you up in prayer.
            </p>
            <div className="text-sm text-neutral-500">
              Redirecting you back to the form...
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>Prayer Requests | Freedom Life Church</title>
        <meta name="description" content="Submit your prayer requests to Freedom Life Church. Our prayer team is here to pray with you and support you in your time of need." />
        <meta name="keywords" content="prayer request, prayer team, Freedom Life Church Edmonton, prayer support, faith" />
        <meta property="og:title" content="Prayer Requests | Freedom Life Church" />
        <meta property="og:description" content="Submit your prayer requests to Freedom Life Church. Our prayer team is here to pray with you and support you in your time of need." />
        <meta property="og:type" content="website" />
      </Head>

      {/* Hero Section */}
      <section className="relative py-20 md:py-28 bg-gradient-to-br from-purple-50 via-white to-purple-50 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute top-20 right-10 w-32 h-32 bg-purple-500/5 rounded-full blur-2xl animate-pulse" />
          <div className="absolute bottom-20 left-16 w-24 h-24 bg-purple-400/6 rounded-full blur-xl animate-pulse" style={{ animationDelay: '2s' }} />
          <div className="absolute top-1/2 left-1/3 w-16 h-16 bg-purple-600/4 rounded-full blur-lg animate-pulse" style={{ animationDelay: '4s' }} />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <SectionHeader
            badge="Prayer Support"
            title="Prayer Requests"
            subtitle="We believe in the power of prayer. Share your needs with us and let our prayer team stand with you in faith, trusting God for His perfect will in your life."
            alignment="center"
            size="large"
            className="mb-12"
          />

          {/* Prayer Promise */}
          <div className="max-w-4xl mx-auto">
            <div className="p-6 md:p-8 rounded-2xl bg-gradient-to-br from-purple-500/5 via-white/50 to-purple-500/5 border border-purple-200/30 backdrop-blur-sm shadow-xl">
              <blockquote className="text-xl md:text-2xl font-medium text-primary-800 italic text-center leading-relaxed">
                "Therefore confess your sins to each other and pray for each other so that you may be healed. The prayer of a righteous person is powerful and effective."
              </blockquote>
              <cite className="block text-base font-semibold text-purple-600 mt-4 text-center">James 5:16</cite>
            </div>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-12">
            <a
              href="#prayer-form"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-600 via-purple-500 to-purple-400 text-white font-semibold rounded-xl shadow-lg shadow-purple-500/20 hover:shadow-xl hover:shadow-purple-500/30 transform hover:-translate-y-0.5 transition-all duration-300"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6"/>
              </svg>
              Submit Prayer Request
            </a>
            <a
              href="#prayer-promises"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white/80 backdrop-blur-sm border border-purple-200/40 text-purple-700 font-semibold rounded-xl shadow-md hover:shadow-lg hover:bg-white/90 hover:border-purple-300/60 transform hover:-translate-y-0.5 transition-all duration-300"
            >
              View Prayer Promises
            </a>
          </div>
        </div>
      </section>

      {/* How We Pray Section */}
      <section className="relative py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title="How We Pray Together"
            subtitle="Our approach to prayer support and community intercession"
            alignment="center"
            size="default"
            className="mb-12"
          />

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center group">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-400 text-white rounded-2xl shadow-lg group-hover:scale-110 transition-transform duration-300 mb-6">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
                </svg>
              </div>
              <h3 className="font-heading text-xl font-bold text-primary-900 mb-3">Scripture-Based</h3>
              <p className="text-neutral-600 leading-relaxed">We pray according to God's Word, standing on His promises and aligning with His will.</p>
            </div>

            <div className="text-center group">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-400 text-white rounded-2xl shadow-lg group-hover:scale-110 transition-transform duration-300 mb-6">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                </svg>
              </div>
              <h3 className="font-heading text-xl font-bold text-primary-900 mb-3">Confidential</h3>
              <p className="text-neutral-600 leading-relaxed">Your privacy is important to us. Prayer requests are kept confidential within our prayer team.</p>
            </div>

            <div className="text-center group">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-400 text-white rounded-2xl shadow-lg group-hover:scale-110 transition-transform duration-300 mb-6">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/>
                </svg>
              </div>
              <h3 className="font-heading text-xl font-bold text-primary-900 mb-3">Community Support</h3>
              <p className="text-neutral-600 leading-relaxed">Join a community that cares. We pray together and support each other through life's challenges.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Prayer Promises Section */}
      <section id="prayer-promises" className="relative py-16 md:py-20 bg-neutral-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title="God's Promises in Prayer"
            subtitle="Stand on these powerful promises as we pray together"
            alignment="center"
            size="default"
            className="mb-12"
          />

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {prayerPromises.map((promise, index) => (
              <div key={index} className="p-6 rounded-xl bg-white border border-neutral-200 shadow-md hover:shadow-lg transition-shadow duration-300">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 bg-purple-500/10 text-purple-600 rounded-lg flex items-center justify-center">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
                    </svg>
                  </div>
                  <span className="font-semibold text-purple-600 text-sm">{promise.theme}</span>
                </div>
                <blockquote className="text-neutral-700 italic leading-relaxed mb-3">
                  {promise.verse}
                </blockquote>
                <cite className="text-sm font-medium text-neutral-500">{promise.reference}</cite>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Prayer Request Form */}
      <section id="prayer-form" className="relative py-16 md:py-20 bg-gradient-to-br from-purple-50 via-white to-purple-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto">
            <SectionHeader
              title="Submit Your Prayer Request"
              subtitle="Share your heart with us and let us join you in prayer"
              alignment="center"
              size="default"
              className="mb-8"
            />

            <form onSubmit={handleSubmit} className="space-y-6 p-6 md:p-8 rounded-2xl bg-white border border-purple-200/30 shadow-xl">
              {/* Personal Information */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-neutral-700 mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-neutral-700 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-semibold text-neutral-700 mb-2">
                  Phone Number (optional)
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
                  placeholder="(555) 123-4567"
                />
              </div>

              {/* Prayer Category */}
              <div>
                <label htmlFor="category" className="block text-sm font-semibold text-neutral-700 mb-3">
                  Prayer Category
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {prayerCategories.map((category) => (
                    <label key={category.value} className="relative">
                      <input
                        type="radio"
                        name="category"
                        value={category.value}
                        checked={formData.category === category.value}
                        onChange={handleInputChange}
                        className="sr-only"
                      />
                      <div className={`p-3 rounded-lg border-2 cursor-pointer transition-all duration-200 text-center ${
                        formData.category === category.value
                          ? 'border-purple-500 bg-purple-50 text-purple-700'
                          : 'border-neutral-200 hover:border-purple-300 hover:bg-purple-50/50'
                      }`}>
                        <div className="text-xl mb-1">{category.icon}</div>
                        <div className="text-xs font-medium">{category.label}</div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Prayer Request */}
              <div>
                <label htmlFor="prayerRequest" className="block text-sm font-semibold text-neutral-700 mb-2">
                  Prayer Request *
                </label>
                <textarea
                  id="prayerRequest"
                  name="prayerRequest"
                  rows={6}
                  required
                  value={formData.prayerRequest}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors resize-vertical"
                  placeholder="Please share how we can pray for you..."
                />
              </div>

              {/* Options */}
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="isUrgent"
                    name="isUrgent"
                    checked={formData.isUrgent}
                    onChange={handleInputChange}
                    className="mt-1 rounded border-neutral-300 text-purple-600 focus:ring-purple-500"
                  />
                  <label htmlFor="isUrgent" className="text-sm text-neutral-700">
                    <span className="font-semibold">Urgent Request</span> - Please pray for this immediately
                  </label>
                </div>

                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="isPublic"
                    name="isPublic"
                    checked={formData.isPublic}
                    onChange={handleInputChange}
                    className="mt-1 rounded border-neutral-300 text-purple-600 focus:ring-purple-500"
                  />
                  <label htmlFor="isPublic" className="text-sm text-neutral-700">
                    <span className="font-semibold">Share with prayer team</span> - Allow this request to be shared anonymously with our broader prayer team
                  </label>
                </div>

                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="allowContact"
                    name="allowContact"
                    checked={formData.allowContact}
                    onChange={handleInputChange}
                    className="mt-1 rounded border-neutral-300 text-purple-600 focus:ring-purple-500"
                  />
                  <label htmlFor="allowContact" className="text-sm text-neutral-700">
                    <span className="font-semibold">Allow follow-up contact</span> - It's okay to reach out to check on me or offer additional support
                  </label>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-gradient-to-r from-purple-600 via-purple-500 to-purple-400 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300"
              >
                Submit Prayer Request
              </button>

              <p className="text-sm text-neutral-600 text-center">
                Your prayer request will be handled with care and confidentiality. Our prayer team typically begins praying within 24 hours.
              </p>
            </form>
          </div>
        </div>
      </section>

      {/* Prayer Team Contact */}
      <section className="relative py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-3xl mx-auto">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-500/10 text-purple-600 rounded-2xl mb-6">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
              </svg>
            </div>
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-primary-900 mb-4">
              Need to Talk?
            </h2>
            <p className="text-neutral-600 leading-relaxed mb-8">
              Sometimes you need more than prayer - you need someone to talk to. Our pastoral team is available for confidential conversations, counseling, and spiritual guidance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:prayer@freedomlifechurch.com"
                className="inline-flex items-center gap-2 px-6 py-3 bg-purple-500/10 text-purple-700 font-semibold rounded-lg hover:bg-purple-500/20 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                </svg>
                Email Prayer Team
              </a>
              <a
                href="tel:+1-780-555-0123"
                className="inline-flex items-center gap-2 px-6 py-3 bg-purple-500/10 text-purple-700 font-semibold rounded-lg hover:bg-purple-500/20 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                </svg>
                Call Pastoral Care
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default PrayerPage;