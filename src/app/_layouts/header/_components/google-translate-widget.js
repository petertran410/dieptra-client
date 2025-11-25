'use client';
import { useEffect, useState, useCallback } from 'react';
import { Button, Box, useToast } from '@chakra-ui/react';

const GoogleTranslateWidget = () => {
  const [isClient, setIsClient] = useState(false);
  const [currentLang, setCurrentLang] = useState('vi');
  const [isLoading, setIsLoading] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const toast = useToast();

  // Initialize Google Translate
  const initializeGoogleTranslate = useCallback(() => {
    // Clear any existing initialization
    if (window.googleTranslateElementInit) {
      delete window.googleTranslateElementInit;
    }

    window.googleTranslateElementInit = function () {
      try {
        // Clear existing element first
        const existingElement = document.getElementById('google_translate_element');
        if (existingElement) {
          existingElement.innerHTML = '';
        }

        new window.google.translate.TranslateElement(
          {
            pageLanguage: 'vi',
            includedLanguages: 'vi,en',
            layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
            autoDisplay: false,
            multilanguagePage: true
          },
          'google_translate_element'
        );

        console.log('✅ Google Translate initialized');

        // Wait for select element to be created
        setTimeout(() => {
          const selectElement = document.querySelector('#google_translate_element select');
          console.log('🔍 Select element found:', !!selectElement);

          if (selectElement) {
            console.log(
              '📝 Available options:',
              Array.from(selectElement.options).map((opt) => ({ text: opt.text, value: opt.value }))
            );
            setIsReady(true);
          } else {
            console.warn('⚠️ Select element not found after 1 second');
            // Try again after more time
            setTimeout(() => {
              const retrySelect = document.querySelector('#google_translate_element select');
              if (retrySelect) {
                console.log('✅ Select element found on retry');
                setIsReady(true);
              }
            }, 2000);
          }
        }, 1000);
      } catch (error) {
        console.error('❌ Error initializing Google Translate:', error);
      }
    };
  }, []);

  // Load Google Translate script
  const loadScript = useCallback(() => {
    // Check if script already exists
    if (document.getElementById('google-translate-script')) {
      console.log('🔄 Script already exists');
      if (window.google && window.google.translate) {
        initializeGoogleTranslate();
        if (window.google.translate.TranslateElement) {
          window.googleTranslateElementInit();
        }
      }
      return;
    }

    console.log('📥 Loading Google Translate script...');
    const script = document.createElement('script');
    script.id = 'google-translate-script';
    script.type = 'text/javascript';
    script.async = true;
    script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';

    script.onload = () => {
      console.log('✅ Google Translate script loaded');
    };

    script.onerror = (error) => {
      console.error('❌ Failed to load Google Translate script:', error);
      toast({
        title: 'Lỗi tải script',
        description: 'Không thể tải Google Translate. Vui lòng refresh trang.',
        status: 'error',
        duration: 5000
      });
    };

    document.head.appendChild(script);
  }, [initializeGoogleTranslate, toast]);

  // Get current language from URL or body class
  const detectCurrentLanguage = useCallback(() => {
    // Method 1: Check URL hash
    const urlHash = window.location.hash;
    if (urlHash.includes('googtrans(vi|en)') || urlHash.includes('/en/')) {
      return 'en';
    }

    // Method 2: Check body class
    const bodyClasses = document.body.className;
    if (bodyClasses.includes('translated-ltr') || bodyClasses.includes('translated-rtl')) {
      return 'en';
    }

    // Method 3: Check Google Translate cookie
    const cookies = document.cookie;
    if (cookies.includes('googtrans=/vi/en') || cookies.includes('googtrans=vi|en')) {
      return 'en';
    }

    return 'vi';
  }, []);

  // Trigger translation
  const triggerTranslation = useCallback((targetLang) => {
    console.log(`🔄 Attempting to translate to: ${targetLang}`);

    const selectElement = document.querySelector('#google_translate_element select');

    if (!selectElement) {
      console.error('❌ Select element not found');
      return false;
    }

    console.log('📋 Current select value:', selectElement.value);
    console.log(
      '📋 Available options:',
      Array.from(selectElement.options).map((opt) => `${opt.text}: ${opt.value}`)
    );

    let targetValue = '';

    if (targetLang === 'en') {
      // Find English option - try different possible values
      const possibleValues = ['vi|en', 'auto|en', '|en'];
      for (const value of possibleValues) {
        const option = Array.from(selectElement.options).find((opt) => opt.value === value);
        if (option) {
          targetValue = value;
          console.log(`✅ Found English option: ${value}`);
          break;
        }
      }

      if (!targetValue) {
        // Fallback: find any option containing 'en'
        const enOption = Array.from(selectElement.options).find(
          (opt) => opt.value.includes('en') && opt.value.includes('|')
        );
        if (enOption) {
          targetValue = enOption.value;
          console.log(`✅ Found English option (fallback): ${targetValue}`);
        }
      }
    } else {
      // Vietnamese (reset to original)
      targetValue = '';
      console.log('✅ Setting to Vietnamese (original)');
    }

    if (selectElement.value !== targetValue) {
      console.log(`🔄 Changing from "${selectElement.value}" to "${targetValue}"`);
      selectElement.value = targetValue;

      // Trigger change event
      const changeEvent = new Event('change', { bubbles: true, cancelable: true });
      selectElement.dispatchEvent(changeEvent);

      // Also trigger click event on the select
      selectElement.click();

      return true;
    } else {
      console.log('ℹ️ Already at target language');
      return false;
    }
  }, []);

  // Handle translation toggle
  const handleToggle = useCallback(async () => {
    if (isLoading || !isReady) {
      console.log('⏳ Not ready or already loading');
      return;
    }

    console.log('🔄 Starting translation toggle...');
    setIsLoading(true);

    // Detect current language
    const detectedLang = detectCurrentLanguage();
    console.log('🔍 Detected current language:', detectedLang);
    console.log('🔍 State current language:', currentLang);

    const targetLang = detectedLang === 'vi' ? 'en' : 'vi';
    console.log('🎯 Target language:', targetLang);

    // Add loading state to page
    document.body.style.opacity = '0.8';
    document.body.style.pointerEvents = 'none';

    try {
      const wasTriggered = triggerTranslation(targetLang);

      if (wasTriggered) {
        // Wait for translation to complete
        let attempts = 0;
        const maxAttempts = 20; // 10 seconds max

        const checkTranslation = () => {
          attempts++;
          const newDetectedLang = detectCurrentLanguage();

          console.log(`🔍 Check ${attempts}: Current lang = ${newDetectedLang}, Target = ${targetLang}`);

          if (newDetectedLang === targetLang || attempts >= maxAttempts) {
            // Translation complete or timeout
            setCurrentLang(newDetectedLang);
            localStorage.setItem('dieptra_google_translate_lang', newDetectedLang);

            document.body.style.opacity = '1';
            document.body.style.pointerEvents = 'auto';

            if (newDetectedLang === targetLang) {
              console.log('✅ Translation successful');
              toast({
                title: 'Dịch thành công',
                description: `Đã chuyển sang ${targetLang === 'vi' ? 'Tiếng Việt' : 'English'}`,
                status: 'success',
                duration: 2000,
                position: 'top'
              });
            } else {
              console.log('⚠️ Translation may have failed or timed out');
              toast({
                title: 'Có thể chưa hoàn thành',
                description: 'Dịch có thể mất thêm thời gian. Vui lòng đợi.',
                status: 'warning',
                duration: 3000
              });
            }

            setIsLoading(false);
          } else {
            // Continue checking
            setTimeout(checkTranslation, 500);
          }
        };

        // Start checking after a brief delay
        setTimeout(checkTranslation, 500);
      } else {
        // No change was made
        document.body.style.opacity = '1';
        document.body.style.pointerEvents = 'auto';
        setIsLoading(false);

        toast({
          title: 'Không có thay đổi',
          description: 'Trang đã ở ngôn ngữ được chọn hoặc có lỗi xảy ra',
          status: 'info',
          duration: 2000
        });
      }
    } catch (error) {
      console.error('❌ Translation error:', error);
      document.body.style.opacity = '1';
      document.body.style.pointerEvents = 'auto';
      setIsLoading(false);

      toast({
        title: 'Lỗi dịch',
        description: 'Có lỗi xảy ra khi dịch trang. Vui lòng thử lại.',
        status: 'error',
        duration: 3000
      });
    }
  }, [isLoading, isReady, currentLang, detectCurrentLanguage, triggerTranslation, toast]);

  // Initialize on mount
  useEffect(() => {
    setIsClient(true);

    // Get saved language
    const savedLang = localStorage.getItem('dieptra_google_translate_lang') || 'vi';
    setCurrentLang(savedLang);

    console.log('🚀 Initializing Google Translate Widget');
    initializeGoogleTranslate();

    // Small delay to ensure DOM is ready
    setTimeout(() => {
      loadScript();
    }, 100);

    // Auto-translate if needed
    if (savedLang === 'en') {
      setTimeout(() => {
        console.log('🔄 Auto-translating to English based on saved preference');
        triggerTranslation('en');
      }, 3000);
    }
  }, [initializeGoogleTranslate, loadScript, triggerTranslation]);

  if (!isClient) {
    return <Box w="60px" h="32px" />;
  }

  return (
    <>
      {/* Google Translate Element - visible for debugging */}
      <Box
        id="google_translate_element"
        position="absolute"
        top="-100px"
        left="0"
        visibility="hidden"
        w="1px"
        h="1px"
        overflow="hidden"
      />

      {/* Custom Toggle Button */}
      <Button
        onClick={handleToggle}
        isLoading={isLoading}
        disabled={!isReady}
        variant="ghost"
        size="sm"
        borderRadius="20px"
        border="1px solid"
        borderColor={isReady ? '#065FD4' : '#ccc'}
        bg="transparent"
        color={isReady ? '#065FD4' : '#999'}
        _hover={{
          bg: isReady ? '#065FD4' : '#f5f5f5',
          color: isReady ? 'white' : '#999',
          borderColor: isReady ? '#065FD4' : '#ccc'
        }}
        _disabled={{
          opacity: 0.6,
          cursor: 'not-allowed'
        }}
        transition="all 0.2s ease"
        w="60px"
        h="32px"
        fontSize="13px"
        fontWeight={600}
        textTransform="uppercase"
        title={isReady ? `Chuyển sang ${currentLang === 'vi' ? 'English' : 'Tiếng Việt'}` : 'Đang tải...'}
      >
        {!isReady ? '...' : currentLang === 'vi' ? 'EN' : 'VI'}
      </Button>
    </>
  );
};

export default GoogleTranslateWidget;
