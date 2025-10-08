import React from 'react';
import Head from 'next/head';

export default function AdminLogin() {
  return (
    <>
      <Head>
        <title>Admin Login – Freedom Life Church</title>
        <meta name="description" content="Sign in to manage content." />
      </Head>
      <section className="min-h-screen flex items-center justify-center bg-[#0b0b0b] relative overflow-hidden px-4">
        {/* Background glow with pulse animation */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <div className="absolute w-[500px] h-[500px] bg-flc-500/20 rounded-full blur-[150px] top-[-150px] left-[-100px] animate-pulse-slow" />
          <div className="absolute w-[400px] h-[400px] bg-primary-900/40 rounded-full blur-[120px] bottom-[-120px] right-[-80px] animate-pulse-slow" />
        </div>

        {/* Glassmorphism Card with fade-up animation */}
        <div className="relative z-10 max-w-md w-full px-8 py-10 rounded-2xl border border-white/10 shadow-2xl bg-black/40 backdrop-blur-xl animate-fadeUp">
          {/* Logo */}
          <div className="flex justify-center mb-6">
            <img
              src="/logos/cropped-FreedomLifeChurch-Logo-web-04.png"
              alt="Freedom Life Church Logo"
              className="w-20 h-20 md:w-24 md:h-24 object-contain drop-shadow-lg"
            />
          </div>

          {/* Title */}
          <h1 className="text-2xl md:text-3xl font-heading font-extrabold text-white text-center drop-shadow-md">
            Admin Login
          </h1>
          <p className="text-sm md:text-base text-flc-400 text-center mt-2 font-medium">
            Sign in to manage content
          </p>

          {/* Form */}
          <form className="space-y-6 mt-8">
            <div>
              <label className="block text-sm font-semibold text-brand-white mb-2">
                Username or Email Address
              </label>
              <input
                type="email"
                className="w-full rounded-full border border-white/20 focus:border-flc-500 focus:ring-2 focus:ring-flc-500/30 px-5 py-3 bg-white/10 backdrop-blur-md text-white placeholder-neutral-400 font-medium transition"
                placeholder="you@church.org"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-brand-white mb-2">
                Password
              </label>
              <input
                type="password"
                className="w-full rounded-full border border-white/20 focus:border-flc-500 focus:ring-2 focus:ring-flc-500/30 px-5 py-3 bg-white/10 backdrop-blur-md text-white placeholder-neutral-400 font-medium transition"
                placeholder="••••••••"
              />
            </div>

            {/* Options + Button */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-sm text-neutral-300">
                <input type="checkbox" className="rounded border-neutral-400 bg-transparent" />
                Remember Me
              </label>
              <button
                type="submit"
                className="px-7 py-2 rounded-full bg-flc-500 hover:bg-flc-600 text-black font-bold shadow-lg transition"
              >
                Log in
              </button>
            </div>
          </form>

          {/* Links */}
          <div className="mt-6 text-center text-sm">
            <a href="#" className="text-flc-400 hover:text-flc-500 hover:underline font-semibold">
              Lost your password?
            </a>
          </div>
          <div className="mt-2 text-center text-xs text-neutral-400">
            <a href="/" className="hover:underline">
              ← Back to site
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
