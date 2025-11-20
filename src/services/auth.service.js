import Cookies from 'js-cookie';
import { CK_CLIENT_USER } from '../utils/const';

const BASE_URL = process.env.NEXT_PUBLIC_API_DOMAIN || 'http://localhost:8084';

const clearAuthData = () => {
  Cookies.remove(CK_CLIENT_USER);
};

export const authService = {
  register: async (data) => {
    const response = await fetch(`${BASE_URL}/api/client-auth/register`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        full_name: data.fullName,
        email: data.email,
        phone: data.phone,
        pass_word: data.pass_word
      })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Registration failed');
    }

    return await response.json();
  },

  verifyEmail: async (email, code) => {
    const response = await fetch(`${BASE_URL}/api/client-auth/verify-email`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, code })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Verification failed');
    }

    const data = await response.json();

    if (data.user) {
      Cookies.set(CK_CLIENT_USER, JSON.stringify(data.user), {
        expires: 7,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict'
      });
    }

    return data;
  },

  login: async (credentials) => {
    const response = await fetch(`${BASE_URL}/api/client-auth/login`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Login failed');
    }

    const data = await response.json();

    if (data.user) {
      Cookies.set(CK_CLIENT_USER, JSON.stringify(data.user), {
        expires: 7,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict'
      });
    }

    return data;
  },

  checkAuth: async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/client-auth/check-auth`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const data = await response.json();

        if (data.authenticated && data.access_token) {
          if (data.user) {
            Cookies.set(CK_CLIENT_USER, JSON.stringify(data.user), {
              expires: 7,
              secure: process.env.NODE_ENV === 'production',
              sameSite: 'strict'
            });
          }
          return {
            isAuthenticated: true,
            user: data.user,
            access_token: data.access_token
          };
        }
      }

      clearAuthData();
      return { isAuthenticated: false };
    } catch (error) {
      console.error('Check auth error:', error);
      clearAuthData();
      return { isAuthenticated: false };
    }
  },

  refreshToken: async () => {
    try {
      const response = await fetch(`${BASE_URL}/api/client-auth/refresh`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const data = await response.json();
        return data;
      }

      return null;
    } catch (error) {
      console.error('Refresh token error:', error);
      return null;
    }
  },

  logout: async (accessToken) => {
    try {
      const headers = {
        'Content-Type': 'application/json'
      };

      if (accessToken) {
        headers['Authorization'] = `Bearer ${accessToken}`;
      }

      await fetch(`${BASE_URL}/api/client-auth/logout`, {
        method: 'POST',
        credentials: 'include',
        headers
      });
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      clearAuthData();
    }
  },

  clearAuthData,

  getCurrentUser: () => {
    const user = Cookies.get(CK_CLIENT_USER);
    return user ? JSON.parse(user) : null;
  },

  forgotPasswordRequest: async (email) => {
    const response = await fetch(`${BASE_URL}/api/client-auth/forgot-password/request`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to send OTP');
    }

    return await response.json();
  },

  verifyForgotPasswordOtp: async (email, code) => {
    const response = await fetch(`${BASE_URL}/api/client-auth/forgot-password/verify`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, code })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Verification failed');
    }

    return await response.json();
  },

  resetPassword: async (email, code, newPassword) => {
    const response = await fetch(`${BASE_URL}/api/client-auth/forgot-password/reset`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email,
        code,
        new_password: newPassword
      })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Password reset failed');
    }

    return await response.json();
  }
};
