'use client';

import React from 'react';
import { RecoilRoot } from 'recoil';
import { ToastContainer } from 'react-toastify';
import { AuthProvider } from '../contexts/auth-context';
import 'react-toastify/dist/ReactToastify.css';

// Cart Provider (if needed)
export const CartProvider = ({ children }) => {
  // Cart logic can be implemented here if not using Recoil
  return <>{children}</>;
};

// Theme Provider (if needed)
export const ThemeProvider = ({ children }) => {
  // Theme logic can be implemented here
  return <>{children}</>;
};

// Main Providers component that wraps the entire app
export const Providers = ({ children }) => {
  return (
    <RecoilRoot>
      <AuthProvider>
        <CartProvider>
          <ThemeProvider>
            {children}
            <ToastContainer
              position="top-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
              toastStyle={{
                fontSize: '14px',
                borderRadius: '8px'
              }}
            />
          </ThemeProvider>
        </CartProvider>
      </AuthProvider>
    </RecoilRoot>
  );
};

// Export individual providers for flexibility
export { AuthProvider } from '../contexts/auth-context';

// Default export
export default Providers;
