'use client';

import { chakraTheme } from '../configs/chakra-theme';
import { ChakraProvider } from '@chakra-ui/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RecoilRoot } from 'recoil';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { useAuth } from '../contexts/auth-context';
import { setAuthFunctions } from '../utils/API';
import { useEffect } from 'react';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false
    }
  }
});

function APIIntegration({ children }) {
  const { getAccessToken, refreshAccessToken, accessToken } = useAuth();

  useEffect(() => {
    console.log('Setting up auth functions in API...');
    setAuthFunctions(getAccessToken, refreshAccessToken);
  }, [getAccessToken, refreshAccessToken]);

  useEffect(() => {
    if (accessToken) {
      console.log('Access token updated:', accessToken.substring(0, 20) + '...');
    } else {
      console.log('Access token cleared');
    }
  }, [accessToken]);

  return <>{children}</>;
}

export function Providers({ children }) {
  return (
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <APIIntegration>
          <ChakraProvider theme={chakraTheme}>
            {children}
            <Analytics />
            <SpeedInsights />
          </ChakraProvider>
        </APIIntegration>
      </RecoilRoot>
    </QueryClientProvider>
  );
}
