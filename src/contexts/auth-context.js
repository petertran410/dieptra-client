'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { authService } from '../services/auth.service';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isChecking, setIsChecking] = useState(true);
  const [user, setUser] = useState(null);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const result = await authService.checkAuth();

        if (result.isAuthenticated) {
          setUser(result.user);
        } else {
          setUser(null);
          authService.clearAuthData();
        }
      } catch (error) {
        setUser(null);
        authService.clearAuthData();
      } finally {
        setIsChecking(false);
      }
    };

    checkAuth();
  }, [pathname]);

  return <AuthContext.Provider value={{ user, isChecking }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
