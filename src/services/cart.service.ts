import { API } from '../utils/API';

export const cartService = {
  getCart: async () => {
    try {
      const response = await API.request({
        url: '/api/cart',
        method: 'GET'
      });
      return response;
    } catch (error) {
      console.error('Cart service error:', error.message);

      if (
        error.message.includes('authentication') ||
        error.message.includes('401') ||
        error.message.includes('Internal server error')
      ) {
        return { items: [], totalItems: 0 };
      }

      throw error;
    }
  },

  addToCart: async (productId, quantity = 1) => {
    const response = await API.request({
      url: '/api/cart/add',
      method: 'POST',
      params: {
        product_id: productId,
        quantity: quantity
      }
    });
    return response;
  },

  updateCartItem: async (cartItemId, quantity) => {
    const response = await API.request({
      url: `/api/cart/${cartItemId}`,
      method: 'PUT',
      params: { quantity }
    });
    return response;
  },

  removeFromCart: async (cartItemId) => {
    const response = await API.request({
      url: `/api/cart/${cartItemId}`,
      method: 'DELETE'
    });
    return response;
  },

  clearCart: async () => {
    const response = await API.request({
      url: '/api/cart',
      method: 'DELETE'
    });
    return response;
  },

  syncCart: async (localCart) => {
    const response = await API.request({
      url: '/api/cart/sync',
      method: 'POST',
      params: { cart: localCart }
    });
    return response;
  }
};
