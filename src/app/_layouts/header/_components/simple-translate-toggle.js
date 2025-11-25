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

  const handleToggle = () => {
    const targetLang = currentLang === 'vi' ? 'en' : 'vi';

    if (targetLang === 'en') {
      // Translate to English using Google Translate URL
      const currentUrl = window.location.href;
      const cleanUrl = currentUrl.split('#')[0].split('?')[0]; // Remove hash and query params

      toast({
        title: 'Đang chuyển sang tiếng Anh...',
        description: 'Vui lòng đợi trong giây lát',
        status: 'info',
        duration: 2000
      });

      // Redirect to Google Translate
      setTimeout(() => {
        window.location.href = `https://translate.google.com/translate?sl=vi&tl=en&u=${encodeURIComponent(cleanUrl)}`;
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
          }
        }

        // Clean up any translate parameters
        originalUrl = originalUrl.replace(/[?&]translate=[^&]*/g, '');

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
