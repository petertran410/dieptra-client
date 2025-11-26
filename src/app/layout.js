import { getMetadata } from '../utils/helper-server';
import { Box } from '@chakra-ui/react';
import { Afacad } from 'next/font/google';
import Head from 'next/head';
import Script from 'next/script';
import Contact from './_layouts/contact';
import Footer from './_layouts/footer';
import Header from './_layouts/header';
import './globals.css';
import { Providers } from './providers';
import { LanguageProvider } from '../contexts/language-context';
import { AuthProvider } from '../contexts/auth-context';

const fontFamily = Afacad({
  subsets: ['latin', 'vietnamese'],
  variable: '--font-afacad',
  display: 'swap',
  fallback: ['system-ui', 'arial'],
  adjustFontFallback: false
});

export const metadata = {
  ...getMetadata(),
  verification: {
    google: '6haq9KVEqmRejNgf3M8FNMpWBmracaACDVEoEQxKq9M'
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={fontFamily.variable}>
      <Head>
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
        <link rel="preconnect" href="https://translate.google.com" />
        <link rel="preconnect" href="https://translate.googleapis.com" />
        <link rel="dns-prefetch" href="//translate.google.com" />
      </Head>
      <body>
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-S515RVWJQQ" strategy="afterInteractive" />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-S515RVWJQQ');
          `}
        </Script>

        <Script id="chatbox-init" strategy="lazyOnload">
          {`
             window.smAsyncInit = function () {
                SM.init({
                page_pid: 'ctm690c1f1074e2da36510a857a',
                trigger_id: '690c2034739613e1d0479941',
                chat_type: 'PLUGIN',
                env: 'prod'
              })
            }
          `}
        </Script>
        <Script src="https://chatbox.smax.ai/sdk.min.js" strategy="lazyOnload" />
        <LanguageProvider>
          <AuthProvider>
            <Providers>
              <Box pos="relative">
                <Contact />
                <Header />
                <Box minH="100vh">{children}</Box>
                <Footer />
              </Box>
            </Providers>
          </AuthProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
