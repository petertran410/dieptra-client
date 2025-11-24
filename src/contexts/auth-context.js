'use client';

import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { authService } from '../services/auth.service';
import { setAuthFunctions } from '../utils/API';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isChecking, setIsChecking] = useState(true);
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [isApiReady, setIsApiReady] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  // Setup auth functions cho API utility
  useEffect(() => {
    setAuthFunctions(
      () => accessToken, // getAuthToken function
      async () => {
        // refreshAuthToken function
        try {
          const result = await authService.refreshToken();
          if (result && result.access_token) {
            setAccessToken(result.access_token);
            return result.access_token;
          }
          return null;
        } catch (error) {
          console.error('Refresh token error:', error);
          clearAuthState();
          return null;
        }
      }
    );
  }, [accessToken]);

  useEffect(() => {
    checkAuth();
  }, [pathname]);

  const checkAuth = useCallback(async () => {
    try {
      const result = await authService.checkAuth();

      if (result.isAuthenticated && result.access_token) {
        setUser(result.user);
        setAccessToken(result.access_token);

        setTimeout(() => {
          setIsApiReady(true);
        }, 100);
      } else {
        clearAuthState();
        setIsApiReady(true);
      }
    } catch (error) {
      console.error('Check auth error:', error);
      clearAuthState();
      setIsApiReady(true);
    } finally {
      setIsChecking(false);
    }
  }, []);

  const login = useCallback(async (credentials) => {
    try {
      const result = await authService.login(credentials);

      if (result.access_token) {
        setUser(result.user);
        setAccessToken(result.access_token);

        setTimeout(() => {
          setIsApiReady(true);
        }, 100);

        return result;
      } else {
        throw new Error('Login failed: No access token');
      }
    } catch (error) {
      clearAuthState();
      throw error;
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      if (accessToken) {
        await authService.logout(accessToken);
      }
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      clearAuthState();
      router.push('/');
    }
  }, [accessToken, router]);

  const refreshAccessToken = useCallback(async () => {
    try {
      const result = await authService.refreshToken();

      if (result && result.access_token) {
        setAccessToken(result.access_token);
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
    setAccessToken(null);
    setIsApiReady(false);
    authService.clearAuthData();
  }, []);

  const getAccessToken = useCallback(() => {
    return accessToken;
  }, [accessToken]);

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
    getAccessToken,
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
