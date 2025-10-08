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

  // Theme script removed: site now uses default light theme without client-side toggling

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
  {/* Theme toggle removed */}
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
        {/* Enforce top-of-page on initial load before hydration */}
        <script
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: `
            try{ if('scrollRestoration' in history){ history.scrollRestoration = 'manual'; } }catch(e){}
            try{ window.addEventListener('pageshow', function(){ try{ window.scrollTo(0,0); }catch(e){} }, { once:true }); }catch(e){}
            try{ document.addEventListener('DOMContentLoaded', function(){ try{ window.scrollTo(0,0); }catch(e){} }, { once:true }); }catch(e){}
          `}}
        />
      </Head>
      <body className="min-h-screen">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
