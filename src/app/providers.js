'use client';

import { chakraTheme } from '../configs/chakra-theme';
import { EmotionRegistry } from './emotion-cache-provider';
import { ChakraProvider } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RecoilRoot } from 'recoil';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';

import { WebpDownloadProvider } from '../components/webp-download-provider';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false
    }
  }
});

export function Providers({ children }) {
  return (
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <EmotionRegistry>
          <ChakraProvider theme={chakraTheme}>
            <WebpDownloadProvider>
              {children}
              <Analytics />
              <SpeedInsights />
            </WebpDownloadProvider>
          </ChakraProvider>
        </EmotionRegistry>
      </RecoilRoot>
    </QueryClientProvider>
  );
}
