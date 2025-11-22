import Cookies from 'js-cookie';
import { CK_CLIENT_USER } from '../utils/const';

const BASE_URL = process.env.NEXT_PUBLIC_API_DOMAIN || 'http://localhost:8084';

const safeGetLocalStorage = (key) => {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      return localStorage.getItem(key);
    }
    return null;
  } catch (error) {
    return null;
  }
};

const safeSetLocalStorage = (key, value) => {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem(key, value);
      return true;
    }
    return false;
  } catch (error) {
    return false;
  }
};

const safeRemoveLocalStorage = (key) => {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.removeItem(key);
      return true;
    }
    return false;
  } catch (error) {
    return false;
  }
};

const COOKIE_CONFIG = {
  expires: 7,
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'strict',
  domain: process.env.NODE_ENV === 'production' ? '.hisweetievietnam.com' : undefined
};

const clearAuthData = () => {
  Cookies.remove(CK_CLIENT_USER, COOKIE_CONFIG);
  Cookies.remove('csrf_public', COOKIE_CONFIG);
  safeRemoveLocalStorage('temp_token');
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
      if (process.env.NODE_ENV === 'development') {
        console.log('🔍 Checking authentication...');
      }

      const response = await fetch(`${BASE_URL}/api/client-auth/check-auth`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
          Accept: 'application/json'
        }
      });

      if (process.env.NODE_ENV === 'development') {
        console.log('📥 Auth check response:', response.status, response.ok);
      }

      if (response.ok) {
        const data = await response.json();

        if (process.env.NODE_ENV === 'development') {
          console.log('✅ Auth data received:', Object.keys(data));
        }

        if (data.authenticated && data.access_token) {
          if (data.user && (!data.user.email || typeof data.user.email !== 'string')) {
            if (process.env.NODE_ENV === 'development') {
              console.warn('⚠️ Invalid user data received');
            }
            clearAuthData();
            return { isAuthenticated: false };
          }

          if (data.access_token && typeof data.access_token === 'string') {
            safeSetLocalStorage('temp_token', data.access_token);
            if (process.env.NODE_ENV === 'development') {
              console.log('💾 Token stored in localStorage');
            }
          }

          if (data.user && data.user.email) {
            const sanitizedUser = {
              client_id: data.user.client_id,
              full_name: (data.user.full_name || '').replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, ''),
              email: data.user.email.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, ''),
              phone: (data.user.phone || '').replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, ''),
              detailed_address: (data.user.detailed_address || '').replace(
                /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
                ''
              ),
              province: (data.user.province || '').replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, ''),
              district: (data.user.district || '').replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, ''),
              ward: (data.user.ward || '').replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
            };

            Cookies.set(CK_CLIENT_USER, JSON.stringify(sanitizedUser), COOKIE_CONFIG);
            if (process.env.NODE_ENV === 'development') {
              console.log('💾 User data stored in cookies');
            }
          }

          return {
            isAuthenticated: true,
            user: data.user,
            access_token: data.access_token
          };
        }
      }

      if (process.env.NODE_ENV === 'development') {
        console.log('❌ Authentication check failed');
      }
      clearAuthData();
      return { isAuthenticated: false };
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error('💥 Check auth error:', error);
      }
      clearAuthData();
      return { isAuthenticated: false };
    }
  },

  getCurrentToken: () => {
    const token = safeGetLocalStorage('temp_token');
    if (token && typeof token === 'string' && token.length > 10) {
      return token;
    }
    return null;
  },

  clearCurrentToken: () => {
    safeRemoveLocalStorage('temp_token');
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

  logout: async () => {
    try {
      const checkAuthResponse = await fetch(`${BASE_URL}/api/client-auth/check-auth`, {
        method: 'GET',
        credentials: 'include'
      });

      let accessToken = null;
      if (checkAuthResponse.ok) {
        const authData = await checkAuthResponse.json();
        if (authData.authenticated) {
          accessToken = authData.access_token;
        }
      }

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
    const response = await fetch(`${BASE_URL}/api/client-auth/forgot-password/verify-otp`, {
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
