/** @type {import('next').NextConfig} */
const path = require('path');

const nextConfig = {
  reactStrictMode: true,
  // Help Next.js resolve the correct workspace root when multiple lockfiles exist
  outputFileTracingRoot: path.join(__dirname),
  // Stabilize development rebuilds for large workspaces
  onDemandEntries: {
    maxInactiveAge: 60 * 1000,
    pagesBufferLength: 5
  },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'img.youtube.com' },
      { protocol: 'https', hostname: 'staticmap.openstreetmap.de' }
    ]
  }
};

module.exports = nextConfig;
