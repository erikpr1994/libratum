import { AppProps } from 'next/app';
import Head from 'next/head';

import AppLayout from '../Layout';

import '../styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  const logged = true;
  return (
    <>
      <Head>
        <link rel="shortcut icon" href="favicon.png" />
      </Head>
      <AppLayout logged={logged}>
        <Component {...pageProps} />
      </AppLayout>
    </>
  );
}
