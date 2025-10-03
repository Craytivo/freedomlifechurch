import '../src/styles/globals.css';
import React from 'react';
import Layout from '../src/components/Layout';
import ErrorBoundary from '../src/components/ErrorBoundary';

export default function MyApp({ Component, pageProps }) {
  return (
    <ErrorBoundary>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ErrorBoundary>
  );
}
