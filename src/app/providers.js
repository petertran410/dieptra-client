'use client';

import { chakraTheme } from '../configs/chakra-theme';
import { ChakraProvider } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RecoilRoot } from 'recoil';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { AuthProvider } from '../contexts/auth-context';
import { Afacad } from 'next/font/google';
import { useEffect } from 'react';

const fontFamily = Afacad({
  subsets: ['latin', 'vietnamese'],
  variable: '--font-afacad',
  display: 'swap',
  fallback: ['system-ui', 'arial'],
  adjustFontFallback: false
});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false
    }
  }
});

function FontProvider({ children }) {
  useEffect(() => {
    document.documentElement.className = fontFamily.variable;
  }, []);

  return <>{children}</>;
}

export function Providers({ children }) {
  return (
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <AuthProvider>
          <ChakraProvider theme={chakraTheme}>
            <FontProvider>
              {children}
              <Analytics />
              <SpeedInsights />
            </FontProvider>
          </ChakraProvider>
        </AuthProvider>
      </RecoilRoot>
    </QueryClientProvider>
  );
}
