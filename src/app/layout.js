import { getMetadata } from '@/utils/helper-server';
import { Box } from '@chakra-ui/react';
import { Afacad } from 'next/font/google';
import Head from 'next/head';
import Contact from './_layouts/contact';
import Footer from './_layouts/footer';
import Header from './_layouts/header';
import './globals.css';
import { Providers } from './providers';

const fontFamily = Afacad({ subsets: ['latin', 'vietnamese'] });

export const metadata = getMetadata();

export default function RootLayout({ children }) {
  return (
    <html lang="vi">
      <Head>
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
      </Head>
      <body className={fontFamily.className}>
        <Providers>
          <Box pos="relative">
            <Contact />
            <Header />
            <Box minH="100vh">{children}</Box>
            <Footer />
          </Box>
        </Providers>
      </body>
    </html>
  );
}
