import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import { InfoModalProvider } from '../lib/context';
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <InfoModalProvider>
        <Component {...pageProps} />
      </InfoModalProvider>
    </SessionProvider>
  );
}

export default MyApp;
