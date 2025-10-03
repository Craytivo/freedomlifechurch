import React from 'react';
import Image from 'next/image';
import footerLogo from '../assets/logos/FLC main logo.png';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary-900 text-brand-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Church Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="relative w-40 h-14">
                <Image src={footerLogo} alt="Freedom Life Church" fill className="object-contain" />
              </div>
            </div>
            <p className="font-body text-church-light text-sm leading-relaxed">
              Leading people into freedom through Jesus Christ. Join us every Sunday as we worship together and grow in faith.
            </p>
          </div>

          {/* Service Times */}
          <div className="space-y-4">
            <h3 className="font-heading font-semibold text-lg text-flc-500">Service Times</h3>
            <div className="space-y-2 font-body text-sm">
              <div>
                <p className="font-semibold">Sunday Service</p>
                <p className="text-church-light">12:00 PM MST</p>
              </div>
              <div>
                <p className="font-semibold">Saturday Prayer</p>
                <p className="text-church-light">2nd Saturday @ 10:00 AM</p>
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="font-heading font-semibold text-lg text-flc-500">Contact</h3>
            <div className="space-y-2 font-body text-sm">
              <div>
                <p className="font-semibold">Address</p>
                <p className="text-church-light">
                  14970 114 Ave NW<br />
                  Edmonton, AB T5M 4G4
                </p>
              </div>
              <div>
                <p className="font-semibold">Phone</p>
                <p className="text-church-light">780-729-0399</p>
              </div>
              <div>
                <p className="font-semibold">Email</p>
                <p className="text-church-light">connect@freedomlifechurch.ca</p>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-heading font-semibold text-lg text-flc-500">Quick Links</h3>
            <div className="space-y-2 font-body text-sm">
              <a href="#about" className="block text-church-light hover:text-flc-500 transition-colors duration-200">
                About Us
              </a>
              <a href="#ministries" className="block text-church-light hover:text-flc-500 transition-colors duration-200">
                Ministries
              </a>
              <a href="#events" className="block text-church-light hover:text-flc-500 transition-colors duration-200">
                Events
              </a>
              <a href="#contact" className="block text-church-light hover:text-flc-500 transition-colors duration-200">
                Prayer Requests
              </a>
              <a href="#give" className="block text-church-light hover:text-flc-500 transition-colors duration-200">
                Give
              </a>
            </div>
          </div>
        </div>

        {/* Social Media & Copyright */}
        <div className="mt-8 pt-8 border-t border-primary-800">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Social Media */}
            <div className="flex space-x-6">
              <a 
                href="https://www.facebook.com/FLCedmonton/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-church-light hover:text-flc-500 transition-colors duration-200"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a 
                href="https://www.instagram.com/flcyeg/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-church-light hover:text-flc-500 transition-colors duration-200"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987s11.987-5.367 11.987-11.987C24.014 5.367 18.648.001 12.017.001zM8.449 16.988c-2.508 0-4.54-2.033-4.54-4.54s2.032-4.54 4.54-4.54c2.508 0 4.54 2.032 4.54 4.54s-2.032 4.54-4.54 4.54zm7.119 0c-2.508 0-4.54-2.033-4.54-4.54s2.032-4.54 4.54-4.54c2.508 0 4.54 2.032 4.54 4.54s-2.032 4.54-4.54 4.54z"/>
                </svg>
              </a>
            </div>

            {/* Copyright */}
            <div className="font-body text-sm text-church-light">
              © {currentYear} Freedom Life Church. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;