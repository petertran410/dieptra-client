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

const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': ['Organization', 'LocalBusiness'],
      '@id': 'https://www.dieptra.com/#org',
      name: 'Diệp Trà',
      legalName: 'Công ty TNHH Xuất Nhập Khẩu Hi Sweetie Việt Nam',
      url: 'https://www.dieptra.com/',
      logo: {
        '@type': 'ImageObject',
        url: 'https://www.dieptra.com/images/logo-black.webp'
      },
      image: 'https://www.dieptra.com/images/logo-black.webp',
      description:
        'Diệp Trà chuyên cung cấp nguyên liệu pha chế nhập khẩu chính hãng tại Việt Nam, phục vụ quán cà phê, trà sữa và chuỗi F&B.',
      foundingDate: '2018',
      email: 'sales@hisweetievietnam.com.vn',
      telephone: '+84 788 339 379',
      contactPoint: [
        {
          '@type': 'ContactPoint',
          contactType: 'sales',
          telephone: '+84 973 123 230',
          availableLanguage: ['vi-VN']
        },
        {
          '@type': 'ContactPoint',
          contactType: 'sales',
          telephone: '+84 788 339 379',
          availableLanguage: ['vi-VN']
        }
      ],
      areaServed: { '@type': 'Country', name: 'Vietnam' },
      sameAs: ['https://www.facebook.com/dieptra.0788339379', 'https://www.youtube.com/@Dieptra_Official'],
      department: [
        {
          '@type': 'LocalBusiness',
          '@id': 'https://www.dieptra.com/#hn',
          name: 'Diệp Trà - Hà Nội',
          parentOrganization: { '@id': 'https://www.dieptra.com/#org' },
          hasMap: 'https://maps.app.goo.gl/KLHjTrcfPfmkwFXP7',
          address: {
            '@type': 'PostalAddress',
            streetAddress: 'B-TT10-4 Him Lam Vạn Phúc, Tố Hữu, Hà Đông',
            addressLocality: 'Hà Nội',
            addressCountry: 'VN'
          },
          openingHoursSpecification: [
            {
              '@type': 'OpeningHoursSpecification',
              dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
              opens: '08:30',
              closes: '17:30'
            }
          ]
        },
        {
          '@type': 'LocalBusiness',
          '@id': 'https://www.dieptra.com/#hcm-office',
          name: 'Diệp Trà - Văn phòng miền Nam',
          parentOrganization: { '@id': 'https://www.dieptra.com/#org' },
          hasMap: 'https://maps.app.goo.gl/2QdJ6f7fRo6hhs7x9',
          address: {
            '@type': 'PostalAddress',
            streetAddress: 'P1.2.24 Diamond Alnata, Block A3, Celadon City, Tân Phú',
            addressLocality: 'TP.HCM',
            addressCountry: 'VN'
          },
          openingHoursSpecification: [
            {
              '@type': 'OpeningHoursSpecification',
              dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
              opens: '08:30',
              closes: '17:30'
            }
          ]
        },
        {
          '@type': 'Store',
          '@id': 'https://www.dieptra.com/#hcm-store',
          name: 'Cửa hàng Diệp Trà - TP.HCM',
          parentOrganization: { '@id': 'https://www.dieptra.com/#org' },
          address: {
            '@type': 'PostalAddress',
            streetAddress: 'Số 42 Đường số 7, Phường 10, Quận Tân Bình',
            addressLocality: 'TP.HCM',
            addressCountry: 'VN'
          },
          openingHoursSpecification: [
            {
              '@type': 'OpeningHoursSpecification',
              dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
              opens: '08:30',
              closes: '17:30'
            }
          ]
        }
      ]
    },
    {
      '@type': 'WebSite',
      '@id': 'https://www.dieptra.com/#website',
      url: 'https://www.dieptra.com/',
      name: 'Diệp Trà',
      publisher: { '@id': 'https://www.dieptra.com/#org' },
      inLanguage: 'vi-VN'
    },
    {
      '@type': 'WebPage',
      '@id': 'https://www.dieptra.com/#webpage',
      url: 'https://www.dieptra.com/',
      name: 'Diệp Trà | Chuyên Cung Cấp Nguyên Liệu Pha Chế',
      isPartOf: { '@id': 'https://www.dieptra.com/#website' },
      about: { '@id': 'https://www.dieptra.com/#org' },
      inLanguage: 'vi-VN',
      primaryImageOfPage: {
        '@type': 'ImageObject',
        url: 'https://www.dieptra.com/images/logo-black.webp'
      }
    }
  ]
};

export default function RootLayout({ children }) {
  return (
    <html lang="vi" className={fontFamily.variable}>
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      </head>
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
