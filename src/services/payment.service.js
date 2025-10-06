import { API } from '../utils/API';
import { useMutation, useQuery } from '@tanstack/react-query';

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

export const useQueryPaymentStatus = (orderId, enabled = false) => {
  const queryKey = ['GET_PAYMENT_STATUS', orderId];

  return useQuery({
    queryKey,
    queryFn: async () => {
      const response = await API.request({
        url: `/api/payment/status/${orderId}`,
        method: 'GET'
      });

      return response;
    },
    enabled: enabled && !!orderId,

    refetchInterval: (query) => {
      const data = query?.state?.data;

      if (
        data?.status === 'SUCCESS' ||
        data?.status === 'PAID' ||
        data?.status === 'FAILED' ||
        data?.status === 'CANCELLED'
      ) {
        return false;
      }

      return 2000;
    },

    refetchIntervalInBackground: true,
    staleTime: 0,
    cacheTime: 0,
    retry: 3,
    retryDelay: 1000,

    onSuccess: (data) => {
      if (data?.status === 'SUCCESS' || data?.status === 'PAID') {
        console.log(`🎉 PAYMENT SUCCESSFUL for order ${orderId}!`);
      }
    },

    onError: (error) => {
      console.error(`❌ Payment status poll error for ${orderId}:`, error);
    }
  });
};

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

export const useMutateCreateCODOrder = () => {
  return useMutation({
    mutationFn: async (orderData) => {
      const response = await API.request({
        url: '/api/payment/create-cod-order',
        method: 'POST',
        params: orderData
      });

      return response;
    }
  });
};
