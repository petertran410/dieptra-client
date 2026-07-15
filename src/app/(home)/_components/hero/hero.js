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
      <Flex
        position="absolute"
        top={0}
        left={0}
        w="full"
        h="full"
        align={{ base: 'flex-start', md: 'center' }}
        pt={{ base: '120px', md: 0 }}
        zIndex={2}
        pointerEvents="none"
      >
        <Box w="full" px={{ base: '16px', md: '40px', lg: '64px', xl: '80px', '2xl': '120px' }}>
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
                fontSize={{ base: '17px', md: '24px', lg: '36px' }}
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
                my={{ base: '10px', md: '0.06em' }}
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
              mt={{ base: '10px', md: '8px' }}
            >
              {'Đồng hành cùng quán trà & F&B'}
            </Text>
 
            <Text
              fontFamily="inherit"
              color={HC.textSecondary}
              fontSize={{ base: '11px', sm: '12px', md: '14px', lg: '18px' }}
              lineHeight={1.6}
              fontWeight={500}
              mt={{ base: '20px', md: '28px' }}
              maxW="36em"
              mx={{ base: 'auto', md: 0 }}
              display={{ base: 'none', md: 'block' }}
            >
              <Box as="span" display="block">{'500+ nguyên liệu đa dạng, chất lượng ổn định, giá tốt.'}</Box>
              <Box as="span" display="block" mt="4px">{'Giao nhanh toàn quốc, đáp ứng nhu cầu quán.'}</Box>
              <Box as="span" display="block" mt="4px">{'Đồng hành từ công thức đến tối ưu vận hành.'}</Box>
            </Text>
 
            <Flex
              flexDirection="row"
              alignItems="center"
              gap={{ base: '10px', md: '12px' }}
              mt={{ base: '20px', md: '32px' }}
              pointerEvents="auto"
              justifyContent={{ base: 'center', md: 'flex-start' }}
            >
              <Link href="/san-pham/nguyen-lieu-pha-che">
                <Box
                  as="span"
                  display="inline-flex"
                  alignItems="center"
                  justifyContent="center"
                  bg={HC.accent}
                  color="white"
                  w={{ base: '146px', md: 'auto' }}
                  px={{ base: '16px', md: '24px' }}
                  py={{ base: '10px', md: '14px' }}
                  borderRadius="999px"
                  fontWeight={600}
                  fontSize={{ base: '13px', md: '16px' }}
                  cursor="pointer"
                  transition="all 0.2s"
                  _hover={{ bg: HC.accentDeep, transform: 'translateY(-1px)' }}
                  _active={{ transform: 'translateY(0) scale(0.98)' }}
                >
                  {'Xem sản phẩm →'}
                </Box>
              </Link>
              <Link href="/gioi-thieu-diep-tra">
                <Box
                  as="span"
                  display="inline-flex"
                  alignItems="center"
                  justifyContent="center"
                  border="1.5px solid"
                  borderColor={HC.primaryDark}
                  bg="transparent"
                  color={HC.primaryDark}
                  w={{ base: '146px', md: 'auto' }}
                  px={{ base: '16px', md: '24px' }}
                  py={{ base: '10px', md: '14px' }}
                  borderRadius="999px"
                  fontWeight={600}
                  fontSize={{ base: '13px', md: '16px' }}
                  cursor="pointer"
                  transition="all 0.2s"
                  _hover={{ bg: HC.primaryDark, borderColor: HC.primaryDark, color: '#FFF', transform: 'translateY(-1px)' }}
                  _active={{ transform: 'translateY(0) scale(0.98)' }}
                >
                  {'Về chúng tôi →'}
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
