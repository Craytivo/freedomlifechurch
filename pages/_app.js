import '../src/styles/globals.css';
import React from 'react';
import { useRouter } from 'next/router';
import Layout from '../src/components/Layout';
import ErrorBoundary from '../src/components/ErrorBoundary';

export default function MyApp({ Component, pageProps }) {
  const router = useRouter();

  // Scroll to top on first mount (helps mobile that restore scroll on reload)
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
        setTimeout(() => window.scrollTo(0, 0), 0);
      } catch {}
    }
  }, []);

  // Centralized scroll-to-top on route changes (skip hash-only and shallow changes)
  React.useEffect(() => {
    const handleRouteChangeComplete = (url, { shallow }) => {
      if (shallow) return;
      if (typeof url === 'string' && url.includes('#')) return;
      try {
        window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
        setTimeout(() => window.scrollTo(0, 0), 0);
      } catch {}
    };

    router.events.on('routeChangeComplete', handleRouteChangeComplete);
    return () => {
      router.events.off('routeChangeComplete', handleRouteChangeComplete);
    };
  }, [router.events]);

  return (
    <ErrorBoundary>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ErrorBoundary>
  );
}
