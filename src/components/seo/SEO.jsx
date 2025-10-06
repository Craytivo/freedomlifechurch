import React from 'react';
import Head from 'next/head';

const defaultMeta = {
  title: 'Freedom Life Church',
  description: 'Freedom Life Church Edmonton — Encounter Jesus, experience freedom, and live the original mandate.',
  siteName: 'Freedom Life Church',
  url: 'https://freedomlifechurch.ca',
  type: 'website',
  image: '/favicon.ico',
};

const SEO = ({ title, description, keywords, type, image, url, noIndex, jsonLd }) => {
  const meta = {
    ...defaultMeta,
    title: title || defaultMeta.title,
    description: description || defaultMeta.description,
    type: type || defaultMeta.type,
    image: image || defaultMeta.image,
    url: url || defaultMeta.url,
  };

  const keywordsContent = Array.isArray(keywords) ? keywords.join(', ') : keywords;

  // Build default Organization schema
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Freedom Life Church',
    url: meta.url,
    logo: `${meta.url}/logo512.png`,
  };

  // Normalize optional jsonLd prop (object | array | stringified)
  const normalizedJsonLd = (() => {
    if (!jsonLd) return [];
    if (typeof jsonLd === 'string') {
      try {
        const parsed = JSON.parse(jsonLd);
        return Array.isArray(parsed) ? parsed : [parsed];
      } catch {
        return [];
      }
    }
    return Array.isArray(jsonLd) ? jsonLd : [jsonLd];
  })();

  return (
    <Head>
      <title>{meta.title}</title>
      <meta name="description" content={meta.description} />
      {keywordsContent ? <meta name="keywords" content={keywordsContent} /> : null}
      {noIndex ? <meta name="robots" content="noindex,nofollow" /> : null}
      <meta property="og:title" content={meta.title} />
      <meta property="og:description" content={meta.description} />
      <meta property="og:type" content={meta.type} />
      <meta property="og:site_name" content={meta.siteName} />
      <meta property="og:url" content={meta.url} />
      <meta property="og:image" content={meta.image} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={meta.title} />
      <meta name="twitter:description" content={meta.description} />
      <meta name="twitter:image" content={meta.image} />
      {/* Default Organization JSON-LD */}
      <script
        key="ld-org"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      {/* Page-level JSON-LD injections */}
      {normalizedJsonLd.map((schema, idx) => (
        <script
          // eslint-disable-next-line react/no-array-index-key
          key={`ld-${idx}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </Head>
  );
};

export default SEO;
