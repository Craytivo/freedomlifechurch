

import React from 'react';
import Head from 'next/head';

export default function AdminLogin() {
  return (
    <>
      <Head>
        <title>Admin Login – Freedom Life Church</title>
        <meta name="description" content="Sign in to manage content." />
      </Head>
      <section className="min-h-screen flex items-center justify-center bg-[#FFF8F0] relative overflow-hidden">
        {/* Premium abstract background using only brand colors */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <svg width="520" height="420" viewBox="0 0 520 420" fill="none" className="absolute left-[-100px] top-[-60px]" style={{zIndex:0}}>
            <ellipse cx="220" cy="180" rx="140" ry="90" fill="#EBA73E" opacity="0.13" />
            <ellipse cx="400" cy="320" rx="80" ry="50" fill="#7A4B0E" opacity="0.09" />
            <ellipse cx="120" cy="340" rx="60" ry="30" fill="#FFF" opacity="0.18" />
          </svg>
        </div>
        <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-10 border border-flc-500 relative z-10">
        <div className="max-w-md w-full bg-gradient-to-br from-black via-white to-flc-500 rounded-3xl shadow-2xl p-10 border-2 border-black relative z-10">
            {/* Church logo at top of card - use public folder path for Next.js */}
            <img src="/logos/cropped-FreedomLifeChurch-Logo-web-04.png" alt="Freedom Life Church Logo" className="w-24 h-24 object-contain mb-4 drop-shadow-lg" />
            <h1 className="text-3xl font-extrabold text-black tracking-tight drop-shadow-sm">Admin Login</h1>
            <p className="text-base text-flc-500 text-center mt-2 font-medium">Sign in to manage content.</p>
          </div>
          <form className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-black mb-1">Username or Email Address</label>
              <input type="email" className="w-full rounded-full border border-black focus:border-flc-700 focus:ring-2 focus:ring-black/20 px-5 py-3 bg-[#F3F3F3] focus:bg-white text-black font-medium" placeholder="you@church.org" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-black mb-1">Password</label>
              <input type="password" className="w-full rounded-full border border-black focus:border-flc-700 focus:ring-2 focus:ring-black/20 px-5 py-3 bg-[#F3F3F3] focus:bg-white text-black font-medium" placeholder="••••••••" />
            </div>
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-sm text-black">
                <input type="checkbox" className="rounded border-black" />
                Remember Me
              </label>
              <button type="submit" className="px-7 py-2 rounded-full bg-black hover:bg-flc-700 text-white font-bold shadow-lg transition">Log in</button>
            </div>
          </form>
          <div className="mt-7 text-center text-sm">
            <a href="#" className="text-black hover:text-flc-700 hover:underline font-semibold">Lost your password?</a>
          </div>
          <div className="mt-2 text-center text-xs text-black">
            <a href="/" className="hover:underline">← Back to site</a>
          </div>
        </div>
      </section>
    </>
  );
}
