import React from 'react';
import Image from 'next/image';
import footerLogo from '../assets/logos/cropped-FreedomLifeChurch-site-icon-11.png';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-neutral-50 border-t border-neutral-200">
      {/* Soft background accents */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            'radial-gradient(circle at 10% 20%, rgba(235,167,62,0.06), rgba(235,167,62,0) 55%), radial-gradient(circle at 85% 15%, rgba(235,167,62,0.05), rgba(235,167,62,0) 55%)',
        }}
      />

      <div className="relative mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16" style={{ maxWidth: '88rem' }}>
        {/* Top CTA strip */}
  <div className="mb-10 md:mb-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 md:p-5 card card-hover">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center px-2.5 py-1 rounded-md bg-flc-500/10 text-flc-700 text-xs font-semibold uppercase tracking-wide">Join us Sunday</span>
            <span className="text-sm text-neutral-700">12:00 PM · 14970 114 Ave NW, Edmonton</span>
          </div>
          <div className="flex items-center gap-3">
            <a href="#plan-visit" className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-flc-500 hover:bg-flc-600 text-white text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-flc-500/40">
              Plan Your Visit
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/></svg>
            </a>
            <a href="https://www.google.com/maps/search/?api=1&query=14970+114+Ave+NW+Edmonton+Alberta+T5M+4G4" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-2 rounded-md border border-neutral-300 text-neutral-700 hover:border-flc-500 hover:text-flc-600 text-sm font-medium">
              Get Directions
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/></svg>
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Church Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative w-20 h-20">
                <Image src={footerLogo} alt="Freedom Life Church" fill className="object-contain" />
              </div>
              <div>
                <p className="font-heading text-lg font-bold text-primary-900 leading-tight">Freedom Life Church</p>
                <p className="text-xs text-neutral-500">Edmonton, Alberta</p>
              </div>
            </div>
            <p className="text-neutral-600 text-sm leading-relaxed max-w-sm">
              Leading people into freedom through Jesus Christ. We’re a Jesus‑centered, Spirit‑led community for the whole family.
            </p>
          </div>

          {/* Visit Info */}
          <div className="space-y-3">
            <h3 className="font-heading text-sm font-semibold uppercase tracking-wide text-neutral-500">Visit</h3>
            <div className="space-y-2 text-sm">
              <div>
                <p className="font-semibold text-primary-900">Sunday Service</p>
                <p className="text-neutral-600">12:00 PM MST</p>
              </div>
              <div>
                <p className="font-semibold text-primary-900">Location</p>
                <p className="text-neutral-600">14970 114 Ave NW, Edmonton, AB T5M 4G4</p>
              </div>
              <div>
                <p className="font-semibold text-primary-900">Kids Ministry</p>
                <p className="text-neutral-600">Available · Check‑in opens 15 min early</p>
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-3">
            <h3 className="font-heading text-sm font-semibold uppercase tracking-wide text-neutral-500">Contact</h3>
            <div className="space-y-2 text-sm">
              <div>
                <p className="font-semibold text-primary-900">Address</p>
                <p className="text-neutral-600">14970 114 Ave NW<br/>Edmonton, AB T5M 4G4</p>
              </div>
              <div>
                <p className="font-semibold text-primary-900">Phone</p>
                <p><a href="tel:17807290399" className="text-neutral-600 hover:text-flc-600">780‑729‑0399</a></p>
              </div>
              <div>
                <p className="font-semibold text-primary-900">Email</p>
                <p><a href="mailto:connect@freedomlifechurch.ca" className="text-neutral-600 hover:text-flc-600">connect@freedomlifechurch.ca</a></p>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h3 className="font-heading text-sm font-semibold uppercase tracking-wide text-neutral-500">Quick Links</h3>
            <div className="grid grid-cols-1 gap-2 text-sm">
              <a href="/visit" className="text-neutral-700 hover:text-flc-600 inline-flex items-center">Plan Your Visit</a>
              <a href="#about" className="text-neutral-700 hover:text-flc-600 inline-flex items-center">About Us</a>
              {/* Ministries page removed; keep core links only */}
              <a href="#events" className="text-neutral-700 hover:text-flc-600 inline-flex items-center">Events</a>
              <a href="#prayer" className="text-neutral-700 hover:text-flc-600 inline-flex items-center">Prayer Requests</a>
              <a href="https://freedomlifechurch.netlify.app/giving" target="_blank" rel="noopener noreferrer" className="text-neutral-700 hover:text-flc-600 inline-flex items-center">Give</a>
            </div>
          </div>
        </div>

        {/* Social & Copyright */}
  <div className="mt-10 pt-8 border-t border-neutral-200/80">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Socials */}
            <div className="flex items-center gap-3">
              <a
                href="https://www.facebook.com/FLCedmonton/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-9 h-9 rounded-full border border-neutral-300 text-neutral-600 hover:border-flc-500 hover:text-flc-600 transition-colors"
                aria-label="Facebook"
              >
                <svg className="w-4.5 h-4.5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a
                href="https://www.instagram.com/flcyeg/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-9 h-9 rounded-full border border-neutral-300 text-neutral-600 hover:border-flc-500 hover:text-flc-600 transition-colors"
                aria-label="Instagram"
              >
                <svg className="w-4.5 h-4.5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987s11.987-5.367 11.987-11.987C24.014 5.367 18.648.001 12.017.001zM8.449 16.988c-2.508 0-4.54-2.033-4.54-4.54s2.032-4.54 4.54-4.54c2.508 0 4.54 2.032 4.54 4.54s-2.032 4.54-4.54 4.54zm7.119 0c-2.508 0-4.54-2.033-4.54-4.54s2.032-4.54 4.54-4.54c2.508 0 4.54 2.032 4.54 4.54s-2.032 4.54-4.54 4.54z"/>
                </svg>
              </a>
            </div>

            <div className="text-sm text-neutral-500 text-center md:text-right">
              © {currentYear} Freedom Life Church. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;