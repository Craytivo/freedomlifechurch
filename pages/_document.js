import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="preconnect" href="https://img.youtube.com" />
        <meta name="theme-color" content="#eba73e" />
      </Head>
      <body className="min-h-screen bg-white">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
