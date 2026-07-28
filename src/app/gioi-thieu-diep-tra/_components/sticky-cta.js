'use client';

import { Box, Link as ChakraLink } from '@chakra-ui/react';
import Link from 'next/link';

const StickyCta = () => {
  return (
    <Box
      as="nav"
      aria-label="Hành động nhanh trên di động"
      display={{ base: 'grid', md: 'none' }}
      position="fixed"
      left="12px"
      right="12px"
      bottom="12px"
      zIndex={60}
      gridTemplateColumns="1fr 1fr"
      gap="8px"
      p="8px"
      border="1px solid rgba(5, 96, 161, 0.16)"
      borderRadius="999px"
      bg="rgba(255, 255, 255, 0.92)"
      boxShadow="0 18px 46px rgba(15, 44, 61, 0.18)"
      backdropFilter="blur(14px)"
    >
      <Link href="/san-pham" passHref legacyBehavior>
        <ChakraLink
          display="inline-flex"
          alignItems="center"
          justifyContent="center"
          minH="42px"
          borderRadius="999px"
          bg="#005a9f"
          color="#fff"
          fontSize="13.5px"
          fontWeight={900}
          border="1px solid #005a9f"
          _hover={{ textDecoration: 'none' }}
        >
          Xem sản phẩm
        </ChakraLink>
      </Link>
      <ChakraLink
        href="https://zalo.me/4415290839928975010"
        isExternal
        display="inline-flex"
        alignItems="center"
        justifyContent="center"
        minH="42px"
        borderRadius="999px"
        bg="#fff"
        color="#005a9f"
        fontSize="13.5px"
        fontWeight={900}
        border="1px solid rgba(5, 96, 161, 0.20)"
        _hover={{ textDecoration: 'none' }}
      >
        Liên hệ Zalo
      </ChakraLink>
    </Box>
  );
};

export default StickyCta;
