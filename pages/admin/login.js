
import React from 'react';
import Head from 'next/head';

export default function AdminLogin() {
  return (
    <>
      <Head>
        <title>Admin Login – Freedom Life Church</title>
        <meta name="description" content="Login to the church leadership portal to organize and coordinate." />
      </Head>
      <section className="min-h-screen flex items-center justify-center bg-neutral-50 relative overflow-hidden">
        {/* Abstract background shapes */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <svg width="420" height="420" viewBox="0 0 420 420" fill="none" className="absolute left-[-80px] top-[-60px]" style={{zIndex:0}}>
            <circle cx="210" cy="210" r="120" fill="#FDE68A" />
            <circle cx="110" cy="110" r="40" fill="#A5B4FC" />
            <rect x="260" y="60" width="60" height="60" rx="20" fill="#FCA5A5" />
            <polygon points="320,320 370,370 320,370" fill="#6EE7B7" />
            <path d="M60 340 Q120 380 180 340" stroke="#F472B6" strokeWidth="8" fill="none" />
          </svg>
        </div>
        <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 border border-neutral-200 relative z-10">
          <div className="flex flex-col items-center mb-6">
            {/* Logo placeholder, replace with your logo if available */}
            <div className="mb-4">
              <svg className="w-16 h-16 text-flc-500" viewBox="0 0 48 48" fill="none">
                <circle cx="24" cy="24" r="22" stroke="#EBA73E" strokeWidth="4" fill="#FFF" />
                <text x="50%" y="54%" textAnchor="middle" fontSize="22" fill="#7A4B0E" fontFamily="Arial, sans-serif" dy=".3em">FLC</text>
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-primary-900">Admin Login</h1>
            <p className="text-sm text-neutral-600 text-center mt-2">Sign in to access the church leadership portal and coordinate with your team.</p>
          </div>
          <form className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-neutral-700 mb-1">Username or Email Address</label>
              <input type="email" className="w-full rounded-full border border-neutral-300 focus:border-flc-500 focus:ring-2 focus:ring-flc-500/20 px-4 py-2 bg-neutral-50 focus:bg-white" placeholder="you@church.org" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-neutral-700 mb-1">Password</label>
              <input type="password" className="w-full rounded-full border border-neutral-300 focus:border-flc-500 focus:ring-2 focus:ring-flc-500/20 px-4 py-2 bg-neutral-50 focus:bg-white" placeholder="••••••••" />
            </div>
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-sm text-neutral-700">
                <input type="checkbox" className="rounded border-neutral-300" />
                Remember Me
              </label>
              <button type="submit" className="px-6 py-2 rounded-full bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow">Log in</button>
            </div>
          </form>
          <div className="mt-6 text-center text-sm">
            <a href="#" className="text-blue-600 hover:underline">Lost your password?</a>
          </div>
          <div className="mt-2 text-center text-xs text-neutral-400">
            <a href="/" className="hover:underline">← Back to site</a>
          </div>
        </div>
      </section>
    </>
  );
}
