import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  const orgJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Freedom Life Church',
    url: 'https://www.freedomlifechurch.ca',
    logo: 'https://www.freedomlifechurch.ca/og-image.png',
    sameAs: [
      'https://www.youtube.com/',
      'https://www.facebook.com/'
    ]
  };

  const weeklyEvent = {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: 'Sunday Service',
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    eventStatus: 'https://schema.org/EventScheduled',
    startDate: '2025-01-05T12:00:00-07:00',
    endDate: '2025-01-05T13:45:00-07:00',
    location: {
      '@type': 'Place',
      name: 'Freedom Life Church',
      address: {
        '@type': 'PostalAddress',
        streetAddress: '10130 86 St NW',
        addressLocality: 'Edmonton',
        addressRegion: 'AB',
        postalCode: 'T6A 3K9',
        addressCountry: 'CA'
      }
    },
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'CAD',
      availability: 'https://schema.org/InStock'
    },
    description: 'Weekly Sunday church service at Freedom Life Church Edmonton.'
  };

  // Inline script to set theme before paint
  const setThemeScript = `(() => {
    try {
      const stored = localStorage.getItem('theme');
      const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
      const theme = stored || (prefersDark ? 'dark' : 'light');
      document.documentElement.setAttribute('data-theme', theme);
    } catch(_) {}
  })();`;

  return (
    <Html lang="en">
      <Head>
        {/* Fonts for standardized typography */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Montserrat:wght@600;700;800&display=swap"
          rel="stylesheet"
        />
        <link rel="preconnect" href="https://img.youtube.com" />
        <link rel="preconnect" href="https://www.youtube.com" />
        <link rel="preconnect" href="https://i.ytimg.com" />
        <link rel="preconnect" href="https://yt3.ggpht.com" />
        <link rel="icon" href="/favicon.ico" />
  <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#eba73e" />
        {/* Set initial theme ASAP to avoid flash */}
        <script dangerouslySetInnerHTML={{ __html: setThemeScript }} />
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(weeklyEvent) }}
        />
      </Head>
      <body className="min-h-screen">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
