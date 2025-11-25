'use client';
import { createContext, useContext, useEffect, useState } from 'react';

const LanguageContext = createContext();

const LANGUAGE_KEY = 'dieptra_language';
const DEFAULT_LANGUAGE = 'vi';

export const LanguageProvider = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState(DEFAULT_LANGUAGE);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const savedLanguage = localStorage.getItem(LANGUAGE_KEY) || DEFAULT_LANGUAGE;
    setCurrentLanguage(savedLanguage);
  }, []);

  const changeLanguage = (language) => {
    setCurrentLanguage(language);
    localStorage.setItem(LANGUAGE_KEY, language);
  };

  const toggleLanguage = () => {
    const newLanguage = currentLanguage === 'vi' ? 'en' : 'vi';
    changeLanguage(newLanguage);
  };

  return (
    <LanguageContext.Provider
      value={{
        currentLanguage,
        changeLanguage,
        toggleLanguage,
        isVietnamese: currentLanguage === 'vi',
        isEnglish: currentLanguage === 'en',
        isClient
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
