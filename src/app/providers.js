'use client';

import { chakraTheme } from '../configs/chakra-theme';
import { ChakraProvider } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RecoilRoot } from 'recoil';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { AuthProvider } from '../contexts/auth-context';

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
        <AuthProvider>
          <ChakraProvider theme={chakraTheme}>
            {children}
            <Analytics />
            <SpeedInsights />
          </ChakraProvider>
        </AuthProvider>
      </RecoilRoot>
    </QueryClientProvider>
  );
}
