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

      if (error.message.includes('Service temporarily unavailable')) {
        console.log('🔄 Cart service unavailable, returning empty cart');
        return { items: [], totalItems: 0 };
      }

      throw error;
    }
  },

  addToCart: async (productId, quantity = 1) => {
    try {
      const response = await API.request({
        url: '/api/cart/add',
        method: 'POST',
        params: {
          product_id: productId,
          quantity: quantity
        }
      });
      return response;
    } catch (error) {
      console.error('Add to cart error:', error.message);

      if (
        error.message.includes('authentication') ||
        error.message.includes('401') ||
        error.message.includes('Service temporarily unavailable') ||
        error.message.includes('Access denied')
      ) {
        throw new Error('Vui lòng đăng nhập lại để thêm sản phẩm vào giỏ hàng');
      }

      throw error;
    }
  },

  updateCartItem: async (cartItemId, quantity) => {
    try {
      const response = await API.request({
        url: `/api/cart/${cartItemId}`,
        method: 'PUT',
        params: { quantity }
      });
      return response;
    } catch (error) {
      console.error('Update cart error:', error.message);

      if (
        error.message.includes('authentication') ||
        error.message.includes('401') ||
        error.message.includes('Service temporarily unavailable')
      ) {
        throw new Error('Phiên đăng nhập đã hết hạn, vui lòng đăng nhập lại');
      }

      throw error;
    }
  },

  removeFromCart: async (cartItemId) => {
    try {
      const response = await API.request({
        url: `/api/cart/${cartItemId}`,
        method: 'DELETE'
      });
      return response;
    } catch (error) {
      console.error('Remove from cart error:', error.message);

      if (
        error.message.includes('authentication') ||
        error.message.includes('401') ||
        error.message.includes('Service temporarily unavailable')
      ) {
        throw new Error('Phiên đăng nhập đã hết hạn, vui lòng đăng nhập lại');
      }

      throw error;
    }
  },

  clearCart: async () => {
    try {
      const response = await API.request({
        url: '/api/cart',
        method: 'DELETE'
      });
      return response;
    } catch (error) {
      console.error('Clear cart error:', error.message);

      if (
        error.message.includes('authentication') ||
        error.message.includes('401') ||
        error.message.includes('Service temporarily unavailable')
      ) {
        return { success: true };
      }

      throw error;
    }
  },

  syncCart: async (localCart) => {
    try {
      const response = await API.request({
        url: '/api/cart/sync',
        method: 'POST',
        params: { cart: localCart }
      });
      return response;
    } catch (error) {
      console.error('Sync cart error:', error.message);

      if (
        error.message.includes('authentication') ||
        error.message.includes('401') ||
        error.message.includes('Service temporarily unavailable')
      ) {
        throw new Error('Không thể đồng bộ giỏ hàng, vui lòng đăng nhập lại');
      }

      throw error;
    }
  }
};
