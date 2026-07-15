'use client';

import { Box, Text } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { HC, FONT_DISPLAY } from './home-theme';

const MotionBox = motion(Box);

const SecHead = ({ eyebrow, title, desc }) => {
  return (
    <MotionBox
      textAlign="center"
      maxW="800px"
      mx="auto"
      mb={{ base: '40px', lg: '56px' }}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
    >
      {eyebrow && (
        <Text
          as="span"
          display="inline-block"
          fontFamily={FONT_DISPLAY}
          fontWeight={700}
          fontSize="13px"
          letterSpacing=".14em"
          textTransform="uppercase"
          color={HC.primary}
          mb="14px"
        >
          {eyebrow}
        </Text>
      )}
      <Text
        as="h2"
        fontFamily={FONT_DISPLAY}
        fontWeight={800}
        fontSize={{ base: '20px', sm: '26px', md: '28px', lg: '40px' }}
        mb="14px"
        color={HC.textPrimary}
        sx={{
          textWrap: 'balance'
        }}
      >
        {title}
      </Text>
      {desc && (
        <Text
          color={HC.textSecondary}
          fontSize={{ base: '12.5px', sm: '13.5px', md: '16px', lg: '18px' }}
          lineHeight={1.5}
          maxW="36em"
          mx="auto"
          display={{ base: 'none', md: 'block' }}
          sx={{
            textWrap: 'balance'
          }}
        >
          {desc}
        </Text>
      )}
    </MotionBox>
  );
};

export default SecHead;
