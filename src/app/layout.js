import { getMetadata } from '../utils/helper-server';
import { Box } from '@chakra-ui/react';
import { Afacad } from 'next/font/google';
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
      <body>
        <Script
          id="meta-pixel"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '1400554598077473');
              fbq('track', 'PageView');
            `
          }}
        />
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: 'none' }}
            src="https://www.facebook.com/tr?id=1400554598077473&ev=PageView&noscript=1"
          />
        </noscript>

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
