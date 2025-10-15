'use client';

import { Box, VStack, Text, Button, Heading } from '@chakra-ui/react';
import Link from 'next/link';
import { useState } from 'react';

const PolicySidebar = ({ mainPageData, sidebarItems, currentSlug, onPageChange }) => {
  const [hoveredItem, setHoveredItem] = useState(null);

  const handleItemClick = (slug, isExternal) => {
    if (isExternal || ['gioi-thieu-diep-tra', 'lien-he', 'san-pham'].includes(slug)) {
      onPageChange(slug);
    }
  };

  const getHref = (slug, isExternal) => {
    if (isExternal || ['gioi-thieu-diep-tra', 'lien-he', 'san-pham'].includes(slug)) {
      return null;
    }

    if (slug === 'chinh-sach-diep-tra') {
      return '/chinh-sach-diep-tra';
    }

    return `/chinh-sach-diep-tra/${slug}`;
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
      p={{ xs: '16px', lg: '32px' }}
      shadow="sm"
      position="sticky"
      top="120px"
    >
      {/* <h1 fontSize={{ xs: '18px', lg: '20px' }} fontWeight="600" color="#003366" mb="20px" textAlign="left">
        Chính Sách Diệp Trà
      </h1> */}

      <Heading
        as="h1"
        fontSize={{ xs: '24px', lg: '28px' }}
        fontWeight="700"
        color="#003366"
        mb={{ xs: '20px', lg: '32px' }}
        lineHeight="1.3"
        textAlign={{ xs: 'center', lg: 'left' }}
      >
        Chính Sách Diệp Trà
      </Heading>

      <VStack spacing="8px" align="stretch">
        {sidebarItems.map((item, index) => {
          const active = isActive(item.slug);
          const isHovered = hoveredItem === item.slug;
          const href = getHref(item.slug, item.isExternal);

          const buttonProps = {
            key: item.slug,
            variant: 'ghost',
            justifyContent: 'flex-start',
            h: 'auto',
            p: '12px 16px',
            borderRadius: '8px',
            fontWeight: active ? '600' : '400',
            fontSize: { xs: '16px', lg: '18px' },
            color: active ? 'white' : 'gray.700',
            bg: active ? 'main.1' : isHovered ? 'gray.300' : 'transparent',
            border: '1px solid',
            borderColor: active ? 'main.1' : 'transparent',
            transition: 'all 0.2s',
            textAlign: 'left',
            whiteSpace: 'normal',
            wordWrap: 'break-word',
            lineHeight: '1.4',
            onMouseEnter: () => setHoveredItem(item.slug),
            onMouseLeave: () => setHoveredItem(null),
            _hover: {
              bg: active ? 'main.1' : 'gray.300',
              transform: 'translateX(2px)'
            },
            _active: {
              transform: 'translateX(1px)'
            }
          };

          const ButtonContent = (
            <Text as="span" flex={1}>
              {item.title}
            </Text>
          );

          // Nếu có href, sử dụng Link với prefetch
          if (href) {
            return (
              <Link
                key={`link-${item.slug}`}
                href={href}
                prefetch={true}
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: 'none' }}
              >
                <Button {...buttonProps} w="full">
                  {ButtonContent}
                </Button>
              </Link>
            );
          }

          // Nếu không có href, sử dụng onClick
          return (
            <Button
              key={`button-${item.slug}`}
              {...buttonProps}
              onClick={() => handleItemClick(item.slug, item.isExternal)}
            >
              {ButtonContent}
            </Button>
          );
        })}
      </VStack>

      {/* Thông tin liên hệ */}
      <Box mt="30px" p="16px" bg="gray.50" borderRadius="8px" fontSize="13px" color="gray.600">
        <Text fontWeight="600" mb="8px">
          Cần hỗ trợ?
        </Text>
        <Text mb="4px">📧 sales@hisweetievietnam.com.vn</Text>
        <Text>📞 Hotline: 078 833 9379</Text>
      </Box>
    </Box>
  );
};

export default PolicySidebar;
