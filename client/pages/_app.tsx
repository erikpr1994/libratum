import { AppProps } from 'next/app';
import Head from 'next/head';

import AppLayout from '../Layout';

import '../styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  if (!Component) return null;
  return (
    <>
      <Head>
        <link rel="shortcut icon" href="favicon.png" />
        <title>Libratum - Automate your crypto</title>
      </Head>
      <AppLayout>
        <Component {...pageProps} />
      </AppLayout>
    </>
  );
}
