'use client';

import { Box, Flex, Text } from '@chakra-ui/react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { HC, FONT_DISPLAY, HOME_PX } from '../home-theme';

const MotionBox = motion(Box);

const Hero = () => {

  return (
    <Box
      as="section"
      position="relative"
      overflow="hidden"
      bgGradient="linear(170deg, #DCF0F5 0%, #C5E4E8 40%, #E8F5E4 100%)"
    >
      {/* Banner image */}
      <Box w="full" lineHeight={0} position="relative">
        {/* desktop */}
        <Box display={{ base: 'none', md: 'block' }}>
          <Image
            src="/images/home-v2/hero-desktop.webp"
            alt="Diệp Trà — Nhà cung cấp nguyên liệu pha chế hàng đầu Việt Nam"
            width={1920}
            height={900}
            priority
            sizes="100vw"
            style={{ width: '100%', height: 'auto', display: 'block' }}
          />
        </Box>
        {/* mobile */}
        <Box display={{ base: 'block', md: 'none' }}>
          <Image
            src="/images/home-v2/hero-mobile.webp"
            alt="Diệp Trà — Nhà cung cấp nguyên liệu pha chế hàng đầu Việt Nam"
            width={780}
            height={900}
            priority
            sizes="100vw"
            style={{ width: '100%', height: 'auto', display: 'block' }}
          />
        </Box>
      </Box>

      {/* Copy overlay */}
      <Flex
        position="absolute"
        top={0}
        left={0}
        w="full"
        h="full"
        align={{ base: 'flex-start', md: 'center' }}
        pt={{ base: '100px', md: 0 }}
        zIndex={2}
        pointerEvents="none"
      >
        <Box w="full" px={HOME_PX}>
          <MotionBox
            maxW={{ base: '100%', md: '46%', lg: '40%' }}
            textAlign={{ base: 'center', md: 'left' }}
            mx={{ base: 'auto', md: 0 }}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          >
            <Text
              as="h1"
              fontFamily={FONT_DISPLAY}
              textTransform="uppercase"
              mx={{ base: 'auto', md: 0 }}
            >
              <Text
                as="span"
                display="block"
                fontWeight={800}
                color={HC.textPrimary}
                fontSize={{ base: '15px', md: '22px', lg: '32px' }}
                lineHeight={1.1}
              >
                {'Nguyên liệu pha chế'}
              </Text>
              <Text
                as="span"
                display="block"
                fontWeight={900}
                color={HC.accent}
                sx={{ color: `${HC.accent} !important` }}
                fontSize={{ base: '30px', md: '52px', lg: '72px', xl: '80px' }}
                lineHeight={1}
                my="0.06em"
              >
                {'Diệp Trà'}
              </Text>
            </Text>

            <Text
              fontFamily={FONT_DISPLAY}
              fontWeight={800}
              color={HC.textPrimary}
              fontSize={{ base: '15px', md: '22px', lg: '32px' }}
              textTransform="uppercase"
              lineHeight={1.05}
              mt={{ base: '4px', md: '8px' }}
            >
              {'Đồng hành cùng F&B'}
            </Text>

            <Text
              fontFamily="inherit"
              color={HC.textSecondary}
              fontSize={{ base: '12px', md: '14px', lg: '18px' }}
              lineHeight={1.6}
              fontWeight={500}
              mt={{ base: '20px', md: '28px' }}
              maxW="32em"
              mx={{ base: 'auto', md: 0 }}
            >
              {'500+ nguyên liệu pha chế nhập khẩu — giao nhanh toàn quốc, đồng hành từ công thức đến vận hành.'}
            </Text>

            <Flex 
              gap="12px" 
              mt={{ base: '24px', md: '32px' }} 
              pointerEvents="auto"
              justifyContent={{ base: 'center', md: 'flex-start' }}
            >
              <Link href="/san-pham">
                <Box
                  as="span"
                  display="inline-flex"
                  alignItems="center"
                  bg={HC.accent}
                  color="white"
                  px={{ base: '16px', md: '24px' }}
                  py={{ base: '10px', md: '14px' }}
                  borderRadius="8px"
                  fontWeight={600}
                  fontSize={{ base: '14px', md: '16px' }}
                  cursor="pointer"
                  transition="all 0.2s"
                  _hover={{ bg: HC.accentDeep, transform: 'translateY(-1px)' }}
                  _active={{ transform: 'translateY(0) scale(0.98)' }}
                >
                  {'Xem nguyên liệu →'}
                </Box>
              </Link>
              <Link href="/gioi-thieu-diep-tra">
                <Box
                  as="span"
                  display="inline-flex"
                  alignItems="center"
                  border="1.5px solid"
                  borderColor={HC.primary}
                  color={HC.primary}
                  px={{ base: '16px', md: '24px' }}
                  py={{ base: '10px', md: '14px' }}
                  borderRadius="8px"
                  fontWeight={600}
                  fontSize={{ base: '14px', md: '16px' }}
                  cursor="pointer"
                  transition="all 0.2s"
                  _hover={{ bg: 'rgba(0, 183, 204, 0.06)', transform: 'translateY(-1px)' }}
                  _active={{ transform: 'translateY(0) scale(0.98)' }}
                >
                  {'Xem chi tiết →'}
                </Box>
              </Link>
            </Flex>
          </MotionBox>
        </Box>
      </Flex>
    </Box>
  );
};

export default Hero;
