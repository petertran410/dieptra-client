'use client';

import { Box, Flex, Text } from '@chakra-ui/react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { HC, FONT_DISPLAY, HOME_PX } from '../home-theme';
import { useTranslation } from '../../../../hooks/useTranslation';

const MotionBox = motion(Box);

const Hero = () => {
  const { t } = useTranslation();

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
        pt={{ base: '70px', md: 0 }}
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
              fontFamily={FONT_DISPLAY}
              fontWeight={800}
              color={HC.textPrimary}
              fontSize={{ base: '15px', md: '22px', lg: '32px' }}
              textTransform="uppercase"
              lineHeight={1.1}
            >
              {t('home.hero.eyebrow')}
            </Text>
            <Text
              as="h1"
              fontFamily={FONT_DISPLAY}
              fontWeight={900}
              color={HC.accent}
              sx={{ color: `${HC.accent} !important` }}
              fontSize={{ base: '30px', md: '52px', lg: '72px', xl: '80px' }}
              textTransform="uppercase"
              lineHeight={1}
              my="0.06em"
            >
              {t('home.hero.brand')}
            </Text>
            <Text
              fontFamily={FONT_DISPLAY}
              fontWeight={800}
              color={HC.textPrimary}
              fontSize={{ base: '15px', md: '22px', lg: '32px' }}
              textTransform="uppercase"
              lineHeight={1.05}
            >
              {t('home.hero.sub')}
            </Text>
            <Text
              fontFamily="inherit"
              color={HC.textSecondary}
              fontSize={{ base: '11.5px', md: '14px', lg: '18px' }}
              lineHeight={1.6}
              fontWeight={500}
              mt={{ base: '0.6em', lg: '1em' }}
              maxW="30em"
              mx={{ base: 'auto', md: 0 }}
            >
              {t('home.hero.desc')}
            </Text>
          </MotionBox>
        </Box>
      </Flex>
    </Box>
  );
};

export default Hero;
