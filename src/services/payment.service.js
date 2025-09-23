// src/services/payment.service.js - FIXED Frontend Payment Service
import { API } from '../utils/API';
import { useMutation, useQuery } from '@tanstack/react-query';

/**
 * Create payment order
 */
export const useMutateCreatePayment = () => {
  return useMutation({
    mutationFn: async (paymentData) => {
      console.log('Creating payment with data:', paymentData);

      const response = await API.request({
        url: '/api/payment/create',
        method: 'POST',
        params: paymentData
      });

      console.log('Payment creation response:', response);
      return response;
    },
    onError: (error) => {
      console.error('Payment creation error:', error);
    }
  });
};

/**
 * FIXED: Enhanced payment status polling with aggressive intervals
 */
export const useQueryPaymentStatus = (orderId, enabled = false) => {
  const queryKey = ['GET_PAYMENT_STATUS', orderId];

  return useQuery({
    queryKey,
    queryFn: async () => {
      console.log(`🔍 Checking payment status for order: ${orderId}`);

      const response = await API.request({
        url: `/api/payment/status/${orderId}`,
        method: 'GET'
      });

      console.log(`💳 Payment status response for ${orderId}:`, response);
      return response;
    },
    enabled: enabled && !!orderId,

    // CRITICAL: Aggressive polling settings
    refetchInterval: (data) => {
      // Stop polling if payment is complete or failed
      if (
        data?.status === 'SUCCESS' ||
        data?.status === 'PAID' ||
        data?.status === 'FAILED' ||
        data?.status === 'CANCELLED'
      ) {
        console.log(`🛑 Stopping polling for ${orderId} - Final status: ${data.status}`);
        return false;
      }

      console.log(`🔄 Continuing to poll ${orderId} - Current status: ${data?.status || 'UNKNOWN'}`);
      return 2000;
    },

    refetchIntervalInBackground: true, // Keep polling even if window is not focused
    staleTime: 0, // Always fetch fresh data
    cacheTime: 0, // Don't cache payment status
    retry: 3, // Retry failed requests
    retryDelay: 1000, // Wait 1 second between retries

    onSuccess: (data) => {
      console.log(`✅ Payment status poll success for ${orderId}:`, data);

      // Log status changes
      if (data?.status === 'SUCCESS' || data?.status === 'PAID') {
        console.log(`🎉 PAYMENT SUCCESSFUL for order ${orderId}!`);
      }
    },

    onError: (error) => {
      console.error(`❌ Payment status poll error for ${orderId}:`, error);
    }
  });
};

/**
 * Manual payment status check (for debugging)
 */
export const useManualPaymentCheck = () => {
  return useMutation({
    mutationFn: async (orderId) => {
      console.log(`🔍 Manual payment check for: ${orderId}`);

      const response = await API.request({
        url: `/api/payment/status/${orderId}`,
        method: 'GET'
      });

      console.log(`💳 Manual check result:`, response);
      return response;
    }
  });
};

// Other existing hooks remain the same...
export const useQueryPaymentMethods = () => {
  const queryKey = ['GET_PAYMENT_METHODS'];

  return useQuery({
    queryKey,
    queryFn: async () => {
      const response = await API.request({
        url: '/api/payment/methods',
        method: 'GET'
      });

      return response;
    },
    staleTime: 5 * 60 * 1000,
    cacheTime: 10 * 60 * 1000
  });
};

export const useMutateVerifyPayment = () => {
  return useMutation({
    mutationFn: async ({ orderId, transactionId }) => {
      const response = await API.request({
        url: '/api/payment/verify',
        method: 'POST',
        params: {
          orderId,
          transactionId
        }
      });

      return response;
    }
  });
};

export const useMutateCancelPayment = () => {
  return useMutation({
    mutationFn: async (orderId) => {
      const response = await API.request({
        url: `/api/payment/cancel/${orderId}`,
        method: 'POST'
      });

      return response;
    }
  });
};

export const useMutateGenerateQR = () => {
  return useMutation({
    mutationFn: async ({ orderId, amount, bankCode }) => {
      const response = await API.request({
        url: '/api/payment/generate-qr',
        method: 'POST',
        params: {
          orderId,
          amount,
          bankCode
        }
      });

      return response;
    }
  });
};

export const useQueryPaymentConnection = () => {
  const queryKey = ['GET_PAYMENT_CONNECTION'];

  return useQuery({
    queryKey,
    queryFn: async () => {
      const response = await API.request({
        url: '/api/payment/test-connection',
        method: 'GET'
      });

      return response;
    },
    staleTime: 5 * 60 * 1000,
    retry: 1
  });
};
