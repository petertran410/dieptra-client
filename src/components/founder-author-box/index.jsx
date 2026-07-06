'use client';

import { Box, Flex, Text, Link, Icon } from '@chakra-ui/react';
import NextImage from 'next/image';
import NextLink from 'next/link';

// Custom SVG Icons matching the original HTML design
const FacebookIcon = (props) => (
  <Icon viewBox="0 0 24 24" {...props}>
    <path
      fill="currentColor"
      d="M15.12 8.02h-2.01c-.7 0-.84.34-.84.82v1.08h2.79l-.36 2.82h-2.43V20H9.36v-7.26H6.92V9.92h2.44V8.67c0-2.41 1.47-3.72 3.62-3.72 1.03 0 1.91.08 2.17.11v2.96z"
    />
  </Icon>
);

const TikTokIcon = (props) => (
  <Icon viewBox="0 0 24 24" {...props}>
    <path
      fill="currentColor"
      d="M16.6 5.82c.74.85 1.67 1.4 2.8 1.56v2.83c-1.25-.04-2.44-.39-3.53-1.06v5.44c0 3.02-2.45 5.47-5.47 5.47a5.47 5.47 0 1 1 0-10.94c.32 0 .63.03.93.08v2.94a2.65 2.65 0 1 0 1.9 2.54V3.94h3.02c.06.7.18 1.31.35 1.88z"
    />
  </Icon>
);

const YoutubeIcon = (props) => (
  <Icon viewBox="0 0 24 24" {...props}>
    <path
      fill="currentColor"
      d="M21.58 7.19a2.72 2.72 0 0 0-1.91-1.93C17.98 4.8 12 4.8 12 4.8s-5.98 0-7.67.46a2.72 2.72 0 0 0-1.91 1.93A28.36 28.36 0 0 0 1.96 12c0 1.61.15 3.22.46 4.81a2.72 2.72 0 0 0 1.91 1.93c1.69.46 7.67.46 7.67.46s5.98 0 7.67-.46a2.72 2.72 0 0 0 1.91-1.93c.31-1.59.46-3.2.46-4.81 0-1.61-.15-3.22-.46-4.81zM10.02 15.27V8.73L15.48 12l-5.46 3.27z"
    />
  </Icon>
);

export default function FounderAuthorBox() {
  return (
    <Box
      w="full"
      border="1px solid #D0E5E8"
      borderRadius="16px"
      p={{ base: '24px 16px', lg: '32px 40px' }}
      bg="white"
      mt="32px"
    >
      {/* Header section (Avatar, Name/Position, Social list) */}
      <Flex
        direction={{ base: 'column', lg: 'row' }}
        align={{ base: 'center', lg: 'start' }}
        justify="space-between"
        gap={{ base: '20px', lg: '24px' }}
      >
        {/* Avatar */}
        <Link
          as={NextLink}
          href="/tac-gia/le-thi-hoang-anh"
          flexShrink={0}
          borderRadius="full"
          overflow="hidden"
          border="2px solid #7AA5A8"
          w={{ base: '100px', lg: '120px' }}
          h={{ base: '100px', lg: '120px' }}
          position="relative"
          display="block"
          target="_blank"
        >
          <NextImage
            src="/images/author/le-thi-hoang-anh.webp"
            alt="Lê Thị Hoàng Anh"
            fill
            sizes="(max-width: 1024px) 100px, 120px"
            style={{ objectFit: 'cover' }}
          />
        </Link>

        {/* Info */}
        <Flex
          direction="column"
          flex={1}
          pl={{ base: 0, lg: '32px' }}
          borderLeft={{ base: 'none', lg: '1px solid #D0E5E8' }}
          minH={{ base: 'auto', lg: '120px' }}
          justify="center"
          align={{ base: 'center', lg: 'start' }}
          textAlign={{ base: 'center', lg: 'left' }}
        >
          <Text
            fontSize="18px"
            fontWeight="700"
            color="#5A8A92"
            letterSpacing="0.05em"
            textTransform="uppercase"
            mb="4px"
          >
            Tác giả
          </Text>
          <Link
            as={NextLink}
            href="/tac-gia/le-thi-hoang-anh"
            fontSize="24px"
            fontWeight="700"
            color="#0D3B42"
            _hover={{ color: '#00B7CC', textDecoration: 'underline', textUnderlineOffset: '3px' }}
            transition="0.25s ease"
            target="_blank"
          >
            Lê Thị Hoàng Anh
          </Link>
          <Text fontSize={{ base: '14px', lg: '18px' }} color="#3A6B74" fontWeight="500" mt="4px">
            Founder Diệp Trà
          </Text>
        </Flex>

        {/* Social Links */}
        <Flex direction="column" align="center" pt={{ base: 0, lg: '12px' }} w={{ base: 'full', lg: '280px' }}>
          <Text
            fontSize="18px"
            fontWeight="700"
            color="#5A8A92"
            letterSpacing="0.05em"
            textTransform="uppercase"
            mb="12px"
            textAlign="center"
          >
            Kết nối với mình qua
          </Text>
          <Flex gap="10px" flexWrap="wrap" justify="center">
            {[
              { href: 'https://www.facebook.com/dieptra.0788339379', label: 'Facebook', icon: FacebookIcon },
              { href: 'https://www.tiktok.com/@founder.dieptra', label: 'TikTok', icon: TikTokIcon },
              { href: 'https://www.youtube.com/@Dieptra_Official', label: 'Youtube', icon: YoutubeIcon }
            ].map((social, index) => (
              <Link
                key={index}
                href={social.href}
                isExternal={social.href !== '#'}
                w="40px"
                h="40px"
                border="1px solid #D0E5E8"
                borderRadius="8px"
                display="flex"
                alignItems="center"
                justifyContent="center"
                color="#0D3B42"
                _hover={{ bg: '#F5FAFB', color: '#00B7CC', borderColor: '#7AA5A8' }}
                transition="0.25s ease"
                aria-label={social.label}
              >
                <social.icon w="18px" h="18px" />
              </Link>
            ))}
          </Flex>
        </Flex>
      </Flex>

      {/* Bio text (Redesigned with Magazine/Editorial Teal theme) */}
      <Box mt="24px" p="20px" bg="#F5FAFB" borderLeft="4px solid #00B7CC" borderRadius="8px" textAlign="left">
        <Text fontSize={{ base: '15px', lg: '20px' }} lineHeight="1.7" color="#3A6B74" mb="12px">
          Tôi là Lê Thị Hoàng Anh, Founder Diệp Trà. Tôi tập trung nghiên cứu nguyên liệu pha chế, phát triển công thức
          đồ uống và tư vấn xây dựng menu cho các mô hình trà sữa, cà phê và đồ uống.
        </Text>
        <Text fontSize={{ base: '15px', lg: '20px' }} lineHeight="1.7" color="#3A6B74" mb={0}>
          Thông qua quá trình đồng hành cùng nhiều thương hiệu F&B trên toàn quốc, tôi chia sẻ kiến thức thực tiễn, xu
          hướng thị trường và các giải pháp giúp tối ưu chi phí, nâng cao chất lượng sản phẩm và cải thiện hiệu quả vận
          hành.
        </Text>
      </Box>
    </Box>
  );
}
