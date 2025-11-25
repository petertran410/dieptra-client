'use client';
import { useLanguage } from '../../../../contexts/language-context';
import { Box, Button, Flex, Text } from '@chakra-ui/react';

const LanguageToggle = () => {
  const { currentLanguage, toggleLanguage, isClient } = useLanguage();

  if (!isClient) {
    return <Box w="60px" />;
  }

  return (
    <Button
      onClick={toggleLanguage}
      variant="ghost"
      size="sm"
      borderRadius="20px"
      border="1px solid"
      borderColor="#065FD4"
      bg="transparent"
      _hover={{ bg: '#065FD4', color: 'white' }}
      transition="all 0.2s ease"
      w="60px"
      h="32px"
    >
      <Flex align="center" justify="center" gap="4px">
        <Text fontSize="13px" fontWeight={600} textTransform="uppercase">
          {currentLanguage === 'vi' ? 'EN' : 'VI'}
        </Text>
      </Flex>
    </Button>
  );
};

export default LanguageToggle;
