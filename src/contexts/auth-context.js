'use client';

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { authService, getAccessToken } from '../services/auth.service';

const AuthContext = createContext({
  user: null,
  loading: true,
  isAuthenticated: false,
  login: async () => {},
  logout: async () => {},
  register: async () => {},
  verifyEmail: async () => {},
  checkAuth: async () => {},
  refreshToken: async () => {},
  forgotPasswordRequest: async () => {},
  verifyForgotPasswordOtp: async () => {},
  resetPassword: async () => {},
  completeOAuthRegistration: async () => {},
  getSessions: async () => {},
  revokeSession: async () => {},
  logoutAllSessions: async () => {},
  getAccessToken: () => null
});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check authentication status
  const checkAuth = useCallback(async () => {
    try {
      setLoading(true);
      const authResult = await authService.checkAuth();

      if (authResult.isAuthenticated && authResult.user) {
        setUser(authResult.user);
        setIsAuthenticated(true);
      } else {
        setUser(null);
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      setUser(null);
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  }, []);

  // Login function
  const login = useCallback(async (loginData) => {
    try {
      const result = await authService.login(loginData);
      if (result.user) {
        setUser(result.user);
        setIsAuthenticated(true);
      }
      return result;
    } catch (error) {
      console.error('Login failed:', error);
      setUser(null);
      setIsAuthenticated(false);
      throw error;
    }
  }, []);

  // Register function
  const register = useCallback(async (registerData) => {
    try {
      const result = await authService.register(registerData);
      return result;
    } catch (error) {
      console.error('Registration failed:', error);
      throw error;
    }
  }, []);

  // Verify email function
  const verifyEmail = useCallback(async (email, code) => {
    try {
      const result = await authService.verifyEmail(email, code);
      if (result.user) {
        setUser(result.user);
        setIsAuthenticated(true);
      }
      return result;
    } catch (error) {
      console.error('Email verification failed:', error);
      throw error;
    }
  }, []);

  // Logout function
  const logout = useCallback(async () => {
    try {
      await authService.logout();
      setUser(null);
      setIsAuthenticated(false);
    } catch (error) {
      console.error('Logout failed:', error);
      // Even if logout fails on server, clear local state
      setUser(null);
      setIsAuthenticated(false);
    }
  }, []);

  // Refresh token function
  const refreshToken = useCallback(async () => {
    try {
      const result = await authService.refreshToken();
      if (result && result.access_token) {
        return result.access_token;
      }
      return null;
    } catch (error) {
      console.error('Failed to refresh token:', error);
      return null;
    }
  }, []);

  // Forgot password request
  const forgotPasswordRequest = useCallback(async (email) => {
    try {
      return await authService.forgotPasswordRequest(email);
    } catch (error) {
      console.error('Forgot password request failed:', error);
      throw error;
    }
  }, []);

  // Verify forgot password OTP
  const verifyForgotPasswordOtp = useCallback(async (email, code) => {
    try {
      return await authService.verifyForgotPasswordOtp(email, code);
    } catch (error) {
      console.error('OTP verification failed:', error);
      throw error;
    }
  }, []);

  // Reset password
  const resetPassword = useCallback(async (email, code, newPassword) => {
    try {
      const result = await authService.resetPassword(email, code, newPassword);
      // Password reset clears all sessions, so logout locally
      setUser(null);
      setIsAuthenticated(false);
      return result;
    } catch (error) {
      console.error('Password reset failed:', error);
      throw error;
    }
  }, []);

  // Complete OAuth registration
  const completeOAuthRegistration = useCallback(async (tempKey, phone) => {
    try {
      const result = await authService.completeOAuthRegistration(tempKey, phone);
      if (result.user) {
        setUser(result.user);
        setIsAuthenticated(true);
      }
      return result;
    } catch (error) {
      console.error('OAuth registration completion failed:', error);
      throw error;
    }
  }, []);

  // Get user sessions
  const getSessions = useCallback(async () => {
    try {
      return await authService.getSessions();
    } catch (error) {
      console.error('Failed to get sessions:', error);
      return [];
    }
  }, []);

  // Revoke specific session
  const revokeSession = useCallback(async (sessionId) => {
    try {
      return await authService.revokeSession(sessionId);
    } catch (error) {
      console.error('Failed to revoke session:', error);
      throw error;
    }
  }, []);

  // Logout all sessions
  const logoutAllSessions = useCallback(async () => {
    try {
      await authService.logoutAllSessions();
      setUser(null);
      setIsAuthenticated(false);
      return { message: 'All sessions logged out successfully' };
    } catch (error) {
      console.error('Failed to logout all sessions:', error);
      // Even if server call fails, clear local state
      setUser(null);
      setIsAuthenticated(false);
      throw error;
    }
  }, []);

  // Get current access token
  const getCurrentAccessToken = useCallback(() => {
    return getAccessToken();
  }, []);

  // Check auth on mount and when tab becomes visible
  useEffect(() => {
    checkAuth();

    // Check auth when tab becomes visible (user might have logged out in another tab)
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        checkAuth();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [checkAuth]);

  // Auto-refresh token before expiration (optional)
  useEffect(() => {
    if (!isAuthenticated) return;

    const interval = setInterval(async () => {
      try {
        await refreshToken();
      } catch (error) {
        console.error('Auto refresh failed:', error);
      }
    }, 14 * 60 * 1000); // Refresh every 14 minutes (tokens expire in 15 minutes)

    return () => clearInterval(interval);
  }, [isAuthenticated, refreshToken]);

  const contextValue = {
    user,
    loading,
    isAuthenticated,
    login,
    logout,
    register,
    verifyEmail,
    checkAuth,
    refreshToken,
    forgotPasswordRequest,
    verifyForgotPasswordOtp,
    resetPassword,
    completeOAuthRegistration,
    getSessions,
    revokeSession,
    logoutAllSessions,
    getAccessToken: getCurrentAccessToken
  };

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
