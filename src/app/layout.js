import { getMetadata } from '../utils/helper-server';
import { Box } from '@chakra-ui/react';
import { Afacad } from 'next/font/google';
import Head from 'next/head';
import Script from 'next/script';
import Contact from './_layouts/contact';
import Footer from './_layouts/footer';
import Header from './_layouts/header';
import './globals.css';
import './quill-content.css';
import { Providers } from './providers';
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
    <html lang="vi" className={fontFamily.variable}>
      <Head>
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
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
      </body>
    </html>
  );
}
