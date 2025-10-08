import React from 'react';
import Head from 'next/head';

export default function AdminLogin() {
  return (
    <>
      <Head>
        <title>Admin Login – Freedom Life Church</title>
        <meta name="description" content="Login to the church leadership portal to organize and coordinate." />
      </Head>
      <section className="min-h-screen flex items-center justify-center bg-neutral-50">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 border border-neutral-200">
          <div className="flex flex-col items-center mb-6">
            <svg className="w-12 h-12 text-flc-500 mb-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 16v-4m0-4h.01" />
            </svg>
            <h1 className="text-2xl font-bold text-primary-900">Admin Login</h1>
            <p className="text-sm text-neutral-600 text-center mt-2">Sign in to access the church leadership portal and coordinate with your team.</p>
          </div>
          <form className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-neutral-700 mb-1">Email</label>
              <input type="email" className="w-full rounded-lg border border-neutral-300 focus:border-flc-500 focus:ring-2 focus:ring-flc-500/20 px-3 py-2 bg-neutral-50 focus:bg-white" placeholder="you@church.org" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-neutral-700 mb-1">Password</label>
              <input type="password" className="w-full rounded-lg border border-neutral-300 focus:border-flc-500 focus:ring-2 focus:ring-flc-500/20 px-3 py-2 bg-neutral-50 focus:bg-white" placeholder="••••••••" />
            </div>
            <button type="submit" className="w-full py-2 rounded-lg bg-flc-500 hover:bg-flc-600 text-white font-semibold">Sign In</button>
          </form>
        </div>
      </section>
    </>
  );
}
