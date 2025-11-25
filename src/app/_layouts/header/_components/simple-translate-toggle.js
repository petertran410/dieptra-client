'use client';
import { useState, useEffect } from 'react';
import { Button, useToast } from '@chakra-ui/react';

const SimpleTranslateToggle = () => {
  const [currentLang, setCurrentLang] = useState('vi');
  const [isClient, setIsClient] = useState(false);
  const toast = useToast();

  useEffect(() => {
    setIsClient(true);

    // Check saved language
    const savedLang = localStorage.getItem('dieptra_lang') || 'vi';
    setCurrentLang(savedLang);

    // Check if page is already translated (from URL)
    if (
      window.location.hostname.includes('translate.google') ||
      window.location.search.includes('translate') ||
      document.documentElement.lang === 'en'
    ) {
      setCurrentLang('en');
    }
  }, []);

  // Check if current environment is development
  const isDevelopment = () => {
    return window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
  };

  // Get production URL for translation
  const getTranslationUrl = () => {
    const currentUrl = window.location.href;

    if (isDevelopment()) {
      // Replace localhost với production domain
      const productionDomain = process.env.NEXT_PUBLIC_DOMAIN || 'https://www.dieptra.com';
      const currentPath = window.location.pathname + window.location.search;
      return productionDomain + currentPath;
    }

    return currentUrl;
  };

  const handleToggle = () => {
    const targetLang = currentLang === 'vi' ? 'en' : 'vi';

    if (targetLang === 'en') {
      // Check if in development environment
      if (isDevelopment()) {
        toast({
          title: 'Chức năng dịch không khả dụng',
          description: 'Chức năng dịch chỉ hoạt động trên môi trường production',
          status: 'warning',
          duration: 3000
        });
        return;
      }

      // Translate to English using Google Translate URL
      const translationUrl = getTranslationUrl();

      // Clean URL logic (giữ nguyên như trước)
      let cleanUrl = translationUrl;

      try {
        const urlObj = new URL(translationUrl);
        const paramsToRemove = [
          'fbclid',
          'gclid',
          'utm_source',
          'utm_medium',
          'utm_campaign',
          'utm_term',
          'utm_content'
        ];

        paramsToRemove.forEach((param) => {
          urlObj.searchParams.delete(param);
        });

        if (urlObj.hash === '' || urlObj.hash.includes('utm_') || urlObj.hash.includes('fbclid')) {
          urlObj.hash = '';
        }

        cleanUrl = urlObj.toString();
      } catch (error) {
        console.warn('URL parsing error:', error);
        // Fallback to original URL if parsing fails
      }

      toast({
        title: 'Đang chuyển sang tiếng Anh...',
        description: 'Vui lòng đợi trong giây lát',
        status: 'info',
        duration: 2000
      });

      // Redirect to Google Translate with properly encoded URL
      setTimeout(() => {
        const translateUrl = `https://translate.google.com/translate?sl=vi&tl=en&u=${encodeURIComponent(cleanUrl)}`;
        window.location.href = translateUrl;
      }, 500);
    } else {
      // Return to original Vietnamese site
      toast({
        title: 'Đang chuyển về tiếng Việt...',
        description: 'Vui lòng đợi trong giây lát',
        status: 'info',
        duration: 2000
      });

      setTimeout(() => {
        // Get original domain from current URL
        let originalUrl = window.location.href;

        if (originalUrl.includes('translate.google')) {
          // Extract original URL from Google Translate
          const match = originalUrl.match(/u=([^&]+)/);
          if (match) {
            originalUrl = decodeURIComponent(match[1]);
          } else {
            // Fallback to production domain if can't extract original URL
            originalUrl = process.env.NEXT_PUBLIC_DOMAIN || 'https://hisweetievietnam.com';
          }
        }

        // Clean up any translate parameters
        try {
          const urlObj = new URL(originalUrl);
          urlObj.searchParams.delete('translate');
          originalUrl = urlObj.toString();
        } catch (error) {
          console.warn('URL parsing error:', error);
        }

        window.location.href = originalUrl;
      }, 500);
    }

    // Update local state
    setCurrentLang(targetLang);
    localStorage.setItem('dieptra_lang', targetLang);
  };

  if (!isClient) {
    return null;
  }

  return (
    <Button
      onClick={handleToggle}
      variant="ghost"
      size="sm"
      borderRadius="20px"
      border="1px solid"
      borderColor="#065FD4"
      bg="transparent"
      color="#065FD4"
      _hover={{ bg: '#065FD4', color: 'white' }}
      _active={{ bg: '#044ba8' }}
      transition="all 0.2s ease"
      w="60px"
      h="32px"
      fontSize="13px"
      fontWeight={600}
      textTransform="uppercase"
      title={`Chuyển sang ${currentLang === 'vi' ? 'English' : 'Tiếng Việt'}`}
    >
      {currentLang === 'vi' ? 'EN' : 'VI'}
    </Button>
  );
};

export default SimpleTranslateToggle;
