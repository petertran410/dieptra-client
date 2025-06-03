// src/services/payment.service.js - Frontend Payment Service
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
 * Get payment status
 */
export const useQueryPaymentStatus = (orderId, enabled = false) => {
  const queryKey = ['GET_PAYMENT_STATUS', orderId];

  return useQuery({
    queryKey,
    queryFn: async () => {
      console.log('Checking payment status for order:', orderId);

      const response = await API.request({
        url: `/api/payment/status/${orderId}`,
        method: 'GET'
      });

      console.log('Payment status response:', response);
      return response;
    },
    enabled: enabled && !!orderId,
    refetchInterval: (data) => {
      // Stop polling if payment is complete
      if (data?.status === 'SUCCESS' || data?.status === 'FAILED' || data?.status === 'CANCELLED') {
        return false;
      }
      // Poll every 3 seconds for pending payments
      return 3000;
    },
    refetchIntervalInBackground: false,
    staleTime: 0, // Always fetch fresh data
    cacheTime: 0 // Don't cache payment status
  });
};

/**
 * Get available payment methods
 */
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
    staleTime: 5 * 60 * 1000, // Cache for 5 minutes
    cacheTime: 10 * 60 * 1000 // Keep in cache for 10 minutes
  });
};

/**
 * Verify payment
 */
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

/**
 * Cancel payment
 */
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

/**
 * Generate QR code for payment
 */
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

/**
 * Test payment connection
 */
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
    staleTime: 5 * 60 * 1000, // Cache for 5 minutes
    retry: 1 // Only retry once for connection tests
  });
};
