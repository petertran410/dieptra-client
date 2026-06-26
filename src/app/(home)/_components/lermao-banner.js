'use client';

import { Box, Text } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { HC, FONT_DISPLAY, HOME_PX } from './home-theme';

const MotionBox = motion(Box);

const LermaoBanner = () => {

  return (
    <Box
      as="section"
      id="lermao"
      px={HOME_PX}
      py={{ base: '56px', lg: '96px' }}
      position="relative"
      overflow="hidden"
      color="#FFF"
      bgGradient={`linear(135deg, ${HC.greenDeep} 0%, #1F5E22 100%)`}
    >
      <Box pos="absolute" right="-100px" top="-100px" w="400px" h="400px" borderRadius="50%" bg="rgba(255,122,26,.16)" />

      <MotionBox
        maxW="640px"
        pos="relative"
        zIndex={2}
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
      >
        <Text as="span" display="inline-block" fontFamily={FONT_DISPLAY} fontWeight={700} fontSize="13px" letterSpacing=".14em" textTransform="uppercase" color={HC.cyanSoft} mb="14px">
          {'Thương hiệu riêng'}
        </Text>
        <Text
          fontFamily={FONT_DISPLAY}
          fontWeight={900}
          fontSize={{ base: '44px', lg: '72px' }}
          letterSpacing="-.02em"
          mb="20px"
          bgGradient={`linear(120deg, #fff, ${HC.cyanSoft})`}
          bgClip="text"
          sx={{ WebkitTextFillColor: 'transparent' }}
        >
          LERMAO
        </Text>
        <Text color={HC.cyanSoft} fontSize="17px" maxW="480px" mb="28px" lineHeight={1.7}>
          {'LerMao là thương hiệu nguyên liệu pha chế được nghiên cứu và phát triển bởi Diệp Trà, đáp ứng tiêu chuẩn chất lượng cao, phù hợp với khẩu vị người Việt.'}
        </Text>
        <Box
          as={Link}
          href="#featured"
          display="inline-flex"
          alignItems="center"
          gap="9px"
          fontFamily={FONT_DISPLAY}
          fontWeight={700}
          borderRadius="12px"
          px="30px"
          py="14px"
          fontSize="15px"
          bg={HC.accent}
          color="#FFF"
          boxShadow="0 8px 20px rgba(255,122,26,.32)"
          transition="all .2s"
          _hover={{ bg: HC.accentDeep }}
        >
          {'Khám phá ngay'} →
        </Box>
      </MotionBox>
    </Box>
  );
};

export default LermaoBanner;
