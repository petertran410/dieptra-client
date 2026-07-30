'use client';

import { Box, Text } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { HC, FONT_DISPLAY, HOME_PX } from './home-theme';

const MotionBox = motion(Box);

const LermaoBanner = () => {
  return (
    <Box as="section" id="lermao" px={HOME_PX} pt={{ base: '24px', lg: '36px' }} pb={{ base: '8px', lg: '12px' }}>
      {/* Desktop Banner Container (Mở rộng tràn khung lưới trang chủ + bo góc 20px) */}
      <Box
        display={{ base: 'none', lg: 'block' }}
        pos="relative"
        w="100%"
        aspectRatio="1920 / 942"
        borderRadius="20px"
        overflow="hidden"
        boxShadow="0 10px 30px rgba(0,0,0,0.06)"
      >
        <Image
          src="/images/home-v3/lermao-bg-desktop-v4.webp"
          alt="LerMao Banner Desktop"
          fill
          priority
          sizes="100vw"
          style={{ objectFit: 'contain', width: '100%', height: '100%' }}
        />
        {/* Content Overlay cho Desktop */}
        <Box
          pos="absolute"
          inset={0}
          display="flex"
          alignItems="center"
          px={{ base: '24px', lg: '64px' }}
          py="32px"
          zIndex={2}
        >
          <MotionBox
            maxW="580px"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
          >
            <Text
              as="span"
              display="inline-block"
              fontFamily={FONT_DISPLAY}
              fontWeight={700}
              fontSize="13px"
              letterSpacing=".14em"
              textTransform="uppercase"
              color={HC.cyanSoft}
              mb="12px"
            >
              {'Thương hiệu'}
            </Text>
            <Text
              fontFamily={FONT_DISPLAY}
              fontWeight={900}
              fontSize={{ base: '36px', lg: '64px' }}
              letterSpacing="-.02em"
              mb="16px"
              color="#FFFFFF"
            >
              LERMAO
            </Text>
            <Text color="#E0F7FA" fontSize="16px" maxW="460px" mb="24px" lineHeight={1.6}>
              {'LerMao là thương hiệu nguyên liệu pha chế được nghiên cứu và phát triển bởi Diệp Trà, đáp ứng tiêu chuẩn chất lượng cao, phù hợp với khẩu vị người Việt.'}
            </Text>
            <Box
              as={Link}
              href="/san-pham/nguyen-lieu-pha-che/topping-tra-sua/tran-chau-dong-lanh"
              display="inline-flex"
              alignItems="center"
              gap="9px"
              fontFamily={FONT_DISPLAY}
              fontWeight={700}
              borderRadius="12px"
              px="28px"
              py="13px"
              fontSize="15px"
              bg={HC.accent}
              color="#FFF"
              boxShadow="0 8px 20px rgba(255,122,26,.32)"
              transition="all .2s"
              _hover={{ bg: HC.accentDeep, transform: 'translateY(-2px)' }}
            >
              {'Khám phá ngay'} →
            </Box>
          </MotionBox>
        </Box>
      </Box>

      {/* Mobile Banner Container */}
      <Box
        display={{ base: 'block', lg: 'none' }}
        pos="relative"
        w="100%"
        aspectRatio="700 / 700"
        borderRadius="16px"
        overflow="hidden"
        boxShadow="0 8px 24px rgba(0,0,0,0.06)"
      >
        <Image
          src="/images/home-v3/lermao-bg-mobile.webp"
          alt="LerMao Banner Mobile"
          fill
          priority
          sizes="100vw"
          style={{ objectFit: 'contain', width: '100%', height: '100%' }}
        />
        {/* Content Overlay cho Mobile */}
        <Box
          pos="absolute"
          inset={0}
          display="flex"
          flexDir="column"
          justifyContent="center"
          px="24px"
          py="24px"
          zIndex={2}
        >
          <MotionBox
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
          >
            <Text
              as="span"
              display="inline-block"
              fontFamily={FONT_DISPLAY}
              fontWeight={700}
              fontSize="12px"
              letterSpacing=".12em"
              textTransform="uppercase"
              color={HC.cyanSoft}
              mb="8px"
            >
              {'Thương hiệu'}
            </Text>
            <Text
              fontFamily={FONT_DISPLAY}
              fontWeight={900}
              fontSize="36px"
              letterSpacing="-.02em"
              mb="12px"
              color="#FFFFFF"
            >
              LERMAO
            </Text>
            <Text color="#E0F7FA" fontSize="14px" mb="20px" lineHeight={1.5}>
              {'LerMao là thương hiệu nguyên liệu pha chế được nghiên cứu và phát triển bởi Diệp Trà, đáp ứng tiêu chuẩn chất lượng cao, phù hợp với khẩu vị người Việt.'}
            </Text>
            <Box
              as={Link}
              href="/san-pham/nguyen-lieu-pha-che/topping-tra-sua/tran-chau-dong-lanh"
              display="inline-flex"
              alignItems="center"
              gap="8px"
              fontFamily={FONT_DISPLAY}
              fontWeight={700}
              borderRadius="10px"
              px="22px"
              py="11px"
              fontSize="14px"
              bg={HC.accent}
              color="#FFF"
              boxShadow="0 6px 16px rgba(255,122,26,.32)"
              transition="all .2s"
              _hover={{ bg: HC.accentDeep }}
            >
              {'Khám phá ngay'} →
            </Box>
          </MotionBox>
        </Box>
      </Box>
    </Box>
  );
};

export default LermaoBanner;
