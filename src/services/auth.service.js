import { API } from '../utils/API';
import Cookies from 'js-cookie';
import { CK_CLIENT_TOKEN, CK_CLIENT_USER } from '../utils/const';

const clearAuthData = () => {
  Cookies.remove(CK_CLIENT_TOKEN);
  Cookies.remove(CK_CLIENT_USER);
};

export const authService = {
  register: async (data) => {
    const response = await API.request({
      url: '/api/client-auth/register',
      method: 'POST',
      params: {
        full_name: data.fullName,
        email: data.email,
        phone: data.phone,
        pass_word: data.pass_word
      }
    });
    return response;
  },

  verifyEmail: async (email, code) => {
    const response = await API.request({
      url: '/api/client-auth/verify-email',
      method: 'POST',
      params: { email, code }
    });

    if (response.access_token) {
      Cookies.set(CK_CLIENT_TOKEN, response.access_token, { expires: 7 });
      Cookies.set(CK_CLIENT_USER, JSON.stringify(response.user), { expires: 7 });
    }
    return response;
  },

  login: async (data) => {
    const response = await API.request({
      url: '/api/client-auth/login',
      method: 'POST',
      params: data
    });

    if (response.access_token) {
      Cookies.set(CK_CLIENT_TOKEN, response.access_token, { expires: 7 });
      Cookies.set(CK_CLIENT_USER, JSON.stringify(response.user), { expires: 7 });
    }
    return response;
  },

  checkAuth: async () => {
    try {
      const response = await API.request({
        url: '/api/client-auth/check-auth',
        method: 'GET'
      });

      if (response.authenticated && response.access_token) {
        Cookies.set(CK_CLIENT_TOKEN, response.access_token, { expires: 7 });
        Cookies.set(CK_CLIENT_USER, JSON.stringify(response.user), { expires: 7 });
        return { isAuthenticated: true, user: response.user };
      }

      clearAuthData();
      return { isAuthenticated: false };
    } catch (error) {
      clearAuthData();
      return { isAuthenticated: false };
    }
  },

  clearAuthData,

  logout: async () => {
    try {
      await API.request({
        url: '/api/client-auth/logout',
        method: 'POST'
      });
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      clearAuthData();
    }
  },

  getCurrentUser: () => {
    const token = Cookies.get(CK_CLIENT_TOKEN);
    const user = Cookies.get(CK_CLIENT_USER);
    return token && user ? { token, user: JSON.parse(user) } : null;
  }
};
