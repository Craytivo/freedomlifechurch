import React from 'react';
import Head from 'next/head';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="py-28 text-center px-6">
      <Head>
        <title>Page Not Found – Freedom Life Church</title>
        <meta name="robots" content="noindex" />
      </Head>
      <p className="text-flc-500 font-semibold tracking-wide uppercase text-sm mb-3">404</p>
      <h1 className="font-heading text-3xl md:text-5xl font-bold text-primary-900 mb-6">Page Not Found</h1>
      <p className="text-neutral-600 text-base md:text-lg leading-relaxed max-w-xl mx-auto mb-8">The page you were looking for doesn’t exist or may have been moved. Let’s get you back to the main experience.</p>
      <Link href="/" className="inline-flex items-center gap-2 px-6 py-3 rounded-md bg-flc-500 hover:bg-flc-600 text-white font-medium shadow-sm focus:outline-none focus:ring-2 focus:ring-flc-500/40 transition-colors">
        Go Home
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/></svg>
      </Link>
    </div>
  );
}
