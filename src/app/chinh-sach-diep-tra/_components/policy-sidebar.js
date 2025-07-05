// src/app/chinh-sach-diep-tra/_components/policy-sidebar.js
'use client';

import { Box, VStack, Text, Button } from '@chakra-ui/react';
import { useState } from 'react';

const PolicySidebar = ({ mainPageData, sidebarPages, currentSlug, onPageChange }) => {
  const [hoveredItem, setHoveredItem] = useState(null);

  // Danh sách các trang đặc biệt (navigate ra ngoài)
  const specialPages = [
    { slug: 'gioi-thieu-diep-tra', title: 'Giới Thiệu Diệp Trà' },
    { slug: 'lien-he', title: 'Liên Hệ' },
    { slug: 'san-pham', title: 'Sản Phẩm' }
  ];

  // Tạo danh sách menu items
  const menuItems = [
    // Trang chính
    ...(mainPageData
      ? [
          {
            slug: mainPageData.slug,
            title: mainPageData.title,
            isMainPage: true
          }
        ]
      : []),

    // Các trang đặc biệt
    ...specialPages,

    // Các trang con (policy pages)
    ...sidebarPages.map((page) => ({
      slug: page.slug,
      title: page.title,
      isMainPage: false
    }))
  ];

  const handleItemClick = (slug) => {
    onPageChange(slug);
  };

  const isActive = (slug) => {
    return currentSlug === slug;
  };

  return (
    <Box
      bg="white"
      borderRadius="16px"
      border="1px solid"
      borderColor="gray.200"
      p={{ xs: '16px', lg: '24px' }}
      shadow="sm"
      position="sticky"
      top="120px"
    >
      <Text fontSize={{ xs: '18px', lg: '20px' }} fontWeight="600" color="main.1" mb="20px" textAlign="center">
        Chính Sách Diệp Trà
      </Text>

      <VStack spacing="8px" align="stretch">
        {menuItems.map((item, index) => {
          const active = isActive(item.slug);
          const isHovered = hoveredItem === item.slug;

          return (
            <Button
              key={item.slug}
              variant="ghost"
              justifyContent="flex-start"
              h="auto"
              p="12px 16px"
              borderRadius="8px"
              fontWeight={active ? '600' : '400'}
              fontSize={{ xs: '14px', lg: '15px' }}
              color={active ? 'white' : 'gray.700'}
              bg={active ? 'main.1' : isHovered ? 'gray.50' : 'transparent'}
              border="1px solid"
              borderColor={active ? 'main.1' : 'transparent'}
              transition="all 0.2s"
              textAlign="left"
              whiteSpace="normal"
              wordWrap="break-word"
              lineHeight="1.4"
              onClick={() => handleItemClick(item.slug)}
              onMouseEnter={() => setHoveredItem(item.slug)}
              onMouseLeave={() => setHoveredItem(null)}
              _hover={{
                bg: active ? 'main.1' : 'gray.50',
                transform: 'translateX(2px)'
              }}
              _active={{
                transform: 'translateX(1px)'
              }}
            >
              <Text as="span" flex={1}>
                {item.title}
              </Text>
            </Button>
          );
        })}
      </VStack>

      {/* Thông tin liên hệ */}
      <Box mt="30px" p="16px" bg="gray.50" borderRadius="8px" fontSize="13px" color="gray.600">
        <Text fontWeight="600" mb="8px">
          Cần hỗ trợ?
        </Text>
        <Text mb="4px">📧 info@dieptra.com</Text>
        <Text>📞 Hotline: 1900 xxxx</Text>
      </Box>
    </Box>
  );
};

export default PolicySidebar;
