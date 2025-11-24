'use client';

import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { authService, getAccessToken } from '../services/auth.service';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessTokenState] = useState(null);
  const [isChecking, setIsChecking] = useState(true);
  const [isApiReady, setIsApiReady] = useState(false);
  const router = useRouter();

  const checkAuth = useCallback(async () => {
    try {
      setIsChecking(true);
      const result = await authService.checkAuth();

      if (result.isAuthenticated) {
        setUser(result.user);
        setAccessTokenState(result.access_token);
        setIsApiReady(true);
      } else {
        setUser(null);
        setAccessTokenState(null);
        setIsApiReady(false);
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      setUser(null);
      setAccessTokenState(null);
      setIsApiReady(false);
    } finally {
      setIsChecking(false);
    }
  }, []);

  const login = useCallback(async (loginData) => {
    try {
      const result = await authService.login(loginData);

      if (result.user) {
        setUser(result.user);
        setAccessTokenState(result.access_token);
        setIsApiReady(true);
      }

      return result;
    } catch (error) {
      clearAuthState();
      throw error;
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      await authService.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      clearAuthState();
      router.push('/');
    }
  }, [router]);

  const refreshAccessToken = useCallback(async () => {
    try {
      const result = await authService.refreshToken();

      if (result && result.access_token) {
        setAccessTokenState(result.access_token);
        return result.access_token;
      } else {
        clearAuthState();
        return null;
      }
    } catch (error) {
      console.error('Refresh token error:', error);
      clearAuthState();
      return null;
    }
  }, []);

  const clearAuthState = useCallback(() => {
    setUser(null);
    setAccessTokenState(null);
    setIsApiReady(false);
    authService.clearAuthData();
  }, []);

  const getAccessTokenFromMemory = useCallback(() => {
    return getAccessToken(); // Get from in-memory storage
  }, []);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const value = {
    user,
    isChecking,
    accessToken,
    isApiReady,
    isAuthenticated: !!user && !!accessToken,
    isFullyReady: !!user && !!accessToken && isApiReady,
    login,
    logout,
    refreshAccessToken,
    getAccessToken: getAccessTokenFromMemory,
    clearAuthState,
    checkAuth
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
