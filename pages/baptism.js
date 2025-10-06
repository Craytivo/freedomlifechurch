import React, { useState } from 'react';
import Head from 'next/head';
import SectionHeader from '../src/components/SectionHeader';

const BaptismPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // For now, just show an alert - you can integrate with your form system later
    alert('Thank you for your interest in baptism! We will contact you soon.');
    setFormData({ name: '', email: '', phone: '', message: '' });
  };

  const baptismSteps = [
    {
      step: 1,
      title: 'Decision',
      description: 'You\'ve made the decision to follow Jesus Christ as your Lord and Savior.',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
        </svg>
      )
    },
    {
      step: 2,
      title: 'Declaration',
      description: 'Baptism is your public declaration of faith and commitment to following Jesus.',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z"/>
        </svg>
      )
    },
    {
      step: 3,
      title: 'Celebration',
      description: 'We celebrate together as you take this important step in your faith journey.',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
        </svg>
      )
    }
  ];

  const faqs = [
    {
      question: 'What is baptism?',
      answer: 'Baptism is a public declaration of your faith in Jesus Christ. It represents the washing away of sin and your new life in Christ. It\'s an act of obedience that Jesus commanded for all believers.'
    },
    {
      question: 'Who can be baptized?',
      answer: 'Anyone who has made a personal decision to follow Jesus Christ as their Lord and Savior can be baptized. We believe in believer\'s baptism - a conscious decision made by someone who understands the commitment they are making.'
    },
    {
      question: 'How do I prepare for baptism?',
      answer: 'We recommend attending our baptism class where we discuss the meaning of baptism, what to expect, and answer any questions you may have. We also encourage you to invite family and friends to witness this special moment.'
    },
    {
      question: 'What should I bring?',
      answer: 'We provide baptism robes, but you should bring a change of clothes and a towel. We also recommend bringing a waterproof bag for your wet clothes. If you wear contacts, consider removing them beforehand.'
    },
    {
      question: 'When does baptism happen?',
      answer: 'We hold baptisms regularly during our Sunday services and also have special baptism services throughout the year. Contact us to find out about upcoming baptism opportunities.'
    }
  ];

  return (
    <>
      <Head>
        <title>Baptism | Freedom Life Church</title>
        <meta name="description" content="Take the next step in your faith journey through baptism at Freedom Life Church. Learn about baptism and register for our next baptism service." />
        <meta name="keywords" content="baptism, water baptism, faith, Freedom Life Church Edmonton, salvation, new life" />
        <meta property="og:title" content="Baptism | Freedom Life Church" />
        <meta property="og:description" content="Take the next step in your faith journey through baptism at Freedom Life Church. Learn about baptism and register for our next baptism service." />
        <meta property="og:type" content="website" />
      </Head>

      {/* Hero Section */}
      <section className="relative py-20 md:py-28 bg-gradient-to-br from-blue-50 via-white to-blue-50 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute top-20 right-10 w-32 h-32 bg-blue-500/5 rounded-full blur-2xl animate-pulse" />
          <div className="absolute bottom-20 left-16 w-24 h-24 bg-blue-400/6 rounded-full blur-xl animate-pulse" style={{ animationDelay: '2s' }} />
          <div className="absolute top-1/2 left-1/3 w-16 h-16 bg-blue-600/4 rounded-full blur-lg animate-pulse" style={{ animationDelay: '4s' }} />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <SectionHeader
            badge="Next Steps"
            title="Baptism"
            subtitle="Your public declaration of faith in Jesus Christ. Take the next step in your spiritual journey and celebrate your new life with our church family."
            alignment="center"
            size="large"
            className="mb-12"
          />

          {/* Biblical Foundation */}
          <div className="max-w-4xl mx-auto">
            <div className="p-6 md:p-8 rounded-2xl bg-gradient-to-br from-blue-500/5 via-white/50 to-blue-500/5 border border-blue-200/30 backdrop-blur-sm shadow-xl">
              <blockquote className="text-xl md:text-2xl font-medium text-primary-800 italic text-center leading-relaxed">
                "Therefore go and make disciples of all nations, baptizing them in the name of the Father and of the Son and of the Holy Spirit."
              </blockquote>
              <cite className="block text-base font-semibold text-blue-600 mt-4 text-center">Matthew 28:19</cite>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-12">
            <a
              href="#register"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 via-blue-500 to-blue-400 text-white font-semibold rounded-xl shadow-lg shadow-blue-500/20 hover:shadow-xl hover:shadow-blue-500/30 transform hover:-translate-y-0.5 transition-all duration-300"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6"/>
              </svg>
              Register for Baptism
            </a>
            <a
              href="#learn-more"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white/80 backdrop-blur-sm border border-blue-200/40 text-blue-700 font-semibold rounded-xl shadow-md hover:shadow-lg hover:bg-white/90 hover:border-blue-300/60 transform hover:-translate-y-0.5 transition-all duration-300"
            >
              Learn More
            </a>
          </div>
        </div>
      </section>

      {/* Steps Section */}
      <section id="learn-more" className="relative py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title="Your Baptism Journey"
            subtitle="Understanding the beautiful significance of this important step"
            alignment="center"
            size="default"
            className="mb-12"
          />

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {baptismSteps.map((step, index) => (
              <div key={index} className="text-center group">
                <div className="relative mb-6">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-400 text-white rounded-2xl shadow-lg group-hover:scale-110 transition-transform duration-300">
                    {step.icon}
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-blue-600 text-white text-sm font-bold rounded-full flex items-center justify-center shadow-md">
                    {step.step}
                  </div>
                </div>
                <h3 className="font-heading text-xl font-bold text-primary-900 mb-3">{step.title}</h3>
                <p className="text-neutral-600 leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What to Expect Section */}
      <section className="relative py-16 md:py-20 bg-neutral-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <div>
              <SectionHeader
                title="What to Expect"
                subtitle="Your baptism will be a meaningful and memorable experience"
                alignment="left"
                size="default"
                className="mb-8"
              />

              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex-none w-10 h-10 bg-blue-500/10 text-blue-600 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3M12 22a10 10 0 110-20 10 10 0 010 20z"/>
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-primary-900 mb-1">Preparation Time</h4>
                    <p className="text-neutral-600 text-sm">We'll meet with you beforehand to answer questions and prepare for the moment.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-none w-10 h-10 bg-blue-500/10 text-blue-600 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/>
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-primary-900 mb-1">Community Support</h4>
                    <p className="text-neutral-600 text-sm">Your church family will be there to celebrate this special moment with you.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-none w-10 h-10 bg-blue-500/10 text-blue-600 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"/>
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-primary-900 mb-1">Special Keepsake</h4>
                    <p className="text-neutral-600 text-sm">You'll receive a baptism certificate to commemorate this milestone in your faith.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-blue-100 to-blue-50 p-8 md:p-12">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-500 text-white rounded-2xl mb-6">
                    <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/>
                    </svg>
                  </div>
                  <h3 className="font-heading text-2xl font-bold text-primary-900 mb-4">Ready to Take the Step?</h3>
                  <p className="text-neutral-600 leading-relaxed mb-6">
                    Baptism is a beautiful outward expression of an inward change. It's your opportunity to publicly declare your faith and commitment to following Jesus.
                  </p>
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 text-blue-700 rounded-full text-sm font-medium">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/>
                    </svg>
                    New Life in Christ
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="relative py-16 md:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title="Frequently Asked Questions"
            subtitle="Common questions about baptism and what it means"
            alignment="center"
            size="default"
            className="mb-12"
          />

          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <details key={index} className="group rounded-xl border border-neutral-200 bg-neutral-50 overflow-hidden">
                <summary className="list-none flex items-center justify-between gap-4 py-4 px-6 cursor-pointer hover:bg-neutral-100">
                  <span className="font-semibold text-primary-900">{faq.question}</span>
                  <svg className="w-5 h-5 text-neutral-400 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"/>
                  </svg>
                </summary>
                <div className="px-6 pb-4">
                  <p className="text-neutral-600 leading-relaxed">{faq.answer}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Registration Form Section */}
      <section id="register" className="relative py-16 md:py-20 bg-gradient-to-br from-blue-50 via-white to-blue-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto">
            <SectionHeader
              title="Register for Baptism"
              subtitle="Let us know about your desire to be baptized and we'll connect with you soon"
              alignment="center"
              size="default"
              className="mb-8"
            />

            <form onSubmit={handleSubmit} className="space-y-6 p-6 md:p-8 rounded-2xl bg-white border border-blue-200/30 shadow-xl">
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-neutral-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="Your full name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-neutral-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-semibold text-neutral-700 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                  placeholder="(555) 123-4567"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-semibold text-neutral-700 mb-2">
                  Tell us about your faith journey (optional)
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-vertical"
                  placeholder="Share your story with us..."
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-gradient-to-r from-blue-600 via-blue-500 to-blue-400 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300"
              >
                Submit Registration
              </button>

              <p className="text-sm text-neutral-600 text-center">
                We'll contact you within 24 hours to discuss next steps and answer any questions.
              </p>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default BaptismPage;