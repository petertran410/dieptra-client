import { API } from '../utils/API';

export const profileService = {
  getProfile: async () => {
    return await API.request({
      url: '/api/client-auth/profile',
      method: 'GET'
    });
  },

  updateProfile: async (data) => {
    return await API.request({
      url: '/api/client-user/profile',
      method: 'PATCH',
      params: data
    });
  },

  getMyOrders: async (page = 1, limit = 10, status) => {
    const params = { page, limit };
    if (status) params.status = status;

    return await API.request({
      url: '/api/client-user/my-orders',
      method: 'GET',
      params
    });
  },

  cancelOrder: async (orderId) => {
    return await API.request({
      url: `/api/client-user/orders/${orderId}/cancel`,
      method: 'DELETE'
    });
  },

  getOrderDetail: async (orderId) => {
    return await API.request({
      url: `/api/client-user/orders/${orderId}`,
      method: 'GET'
    });
  },

  confirmOrderReceived: async (orderId) => {
    return await API.request({
      url: `/api/client-user/orders/${orderId}/confirm-received`,
      method: 'POST'
    });
  }
};
