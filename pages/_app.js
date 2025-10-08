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
        if ('scrollRestoration' in window.history) {
          window.history.scrollRestoration = 'manual';
        }
        window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
        setTimeout(() => window.scrollTo(0, 0), 0);
        const onPop = () => {
          window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
        };
        window.addEventListener('popstate', onPop);
        return () => window.removeEventListener('popstate', onPop);
      } catch {}
    }
  }, []);

  // Centralized scroll-to-top on route changes (skip hash-only and shallow changes)
  React.useEffect(() => {
    const shouldSkip = (url) => typeof url === 'string' && url.includes('#');
    const toTop = () => {
      try {
        const html = document.documentElement;
        const prev = html.style.scrollBehavior;
        html.style.scrollBehavior = 'auto';
        window.scrollTo(0, 0);
        setTimeout(() => {
          window.scrollTo(0, 0);
          html.style.scrollBehavior = prev || '';
        }, 0);
      } catch {}
    };
    const handleRouteChangeStart = (url, { shallow }) => {
      if (shallow) return;
      if (shouldSkip(url)) return;
      toTop();
    };
    const handleRouteChangeComplete = (url, { shallow }) => {
      if (shallow) return;
      if (shouldSkip(url)) return;
      toTop();
    };

    router.events.on('routeChangeStart', handleRouteChangeStart);
    router.events.on('routeChangeComplete', handleRouteChangeComplete);
    return () => {
      router.events.off('routeChangeStart', handleRouteChangeStart);
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
