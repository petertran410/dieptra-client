'use client';

import { Button } from '@chakra-ui/react';
import { useLanguage } from '../../contexts/language-context';

const LanguageSwitcher = () => {
  const { language, switchLanguage } = useLanguage();

  const toggleLanguage = () => {
    const newLanguage = language === 'vi' ? 'en' : 'vi';
    switchLanguage(newLanguage);
  };

  const displayText = language === 'vi' ? 'VI' : 'EN';

  return (
    <Button
      onClick={toggleLanguage}
      size="sm"
      variant="outline"
      borderColor="#065FD4"
      color="#065FD4"
      fontWeight={600}
      fontSize="14px"
      h="32px"
      minW="40px"
      borderRadius="6px"
      _hover={{
        bgColor: '#065FD4',
        color: 'white',
        transform: 'translateY(-1px)'
      }}
      _active={{
        bgColor: '#003366',
        borderColor: '#003366'
      }}
      transition="all 0.2s ease"
    >
      {displayText}
    </Button>
  );
};

export default LanguageSwitcher;
