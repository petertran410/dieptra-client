'use client';

import { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('vi');
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
    const saved = localStorage.getItem('dieptra_language') || 'vi';
    setLanguage(saved);
  }, []);

  const switchLanguage = (lang) => {
    setLanguage(lang);
    localStorage.setItem('dieptra_language', lang);
  };

  if (!isHydrated) {
    return <>{children}</>; // Render children without context during SSR
  }

  return <LanguageContext.Provider value={{ language, switchLanguage }}>{children}</LanguageContext.Provider>;
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);

  // Return default values if context is not available
  if (!context) {
    return {
      language: 'vi',
      switchLanguage: () => {}
    };
  }

  return context;
};
