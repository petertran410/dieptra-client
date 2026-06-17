'use client';

import { Box, Flex, Grid, Text } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { HC, FONT_DISPLAY, HOME_PX } from './home-theme';
import { useTranslation } from '../../../hooks/useTranslation';

const MotionBox = motion(Box);

const CheckList = ({ items, ckBg }) => (
  <Flex as="ul" direction="column" gap="13px" mb="30px" listStyleType="none">
    {items.map((it, i) => (
      <Flex as="li" key={i} gap="11px" align="flex-start" fontSize="15px" fontWeight={500}>
        <Flex flex="none" w="22px" h="22px" borderRadius="50%" align="center" justify="center" fontSize="12px" fontWeight={900} mt="2px" bg={ckBg} color="#FFF">
          ✓
        </Flex>
        <Text as="span">{it}</Text>
      </Flex>
    ))}
  </Flex>
);

const SplitTradeBrand = () => {
  const { t } = useTranslation();

  const tradeItems = [1, 2, 3, 4].map((i) => t(`home.split.trade.li${i}`));
  const brandItems = [1, 2, 3, 4].map((i) => t(`home.split.brand.li${i}`));

  return (
    <Box as="section" px={HOME_PX} pb={{ base: '56px', lg: '96px' }}>
      <Grid templateColumns={{ base: '1fr', lg: '1fr 1fr' }} gap="28px">
        {/* TRADE */}
        <MotionBox
          borderRadius="24px"
          p={{ base: '32px 26px', lg: '48px' }}
          bg={HC.greenSoft}
          color={HC.primaryDark}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
        >
          <Text fontFamily={FONT_DISPLAY} fontSize="64px" fontWeight={900} lineHeight={1} letterSpacing="-.03em" color={HC.accentDeep}>
            {t('home.split.trade.pct')}
          </Text>
          <Text as="h3" fontFamily={FONT_DISPLAY} fontWeight={800} fontSize="24px" mt="14px" mb="8px" color={HC.greenDeep}>
            {t('home.split.trade.title')}
          </Text>
          <Text fontSize="15px" mb="24px">
            {t('home.split.trade.sub')}
          </Text>
          <CheckList items={tradeItems} ckBg={HC.greenDeep} />
          <Box
            as={Link}
            href="/san-pham"
            display="inline-flex"
            alignItems="center"
            gap="9px"
            fontFamily={FONT_DISPLAY}
            fontWeight={700}
            borderRadius="12px"
            px="30px"
            py="14px"
            fontSize="15px"
            border="1.5px solid"
            borderColor={HC.primary}
            color={HC.primary}
            transition="all .2s"
            _hover={{ bg: HC.primaryDark, borderColor: HC.primaryDark, color: '#FFF' }}
          >
            {t('home.split.trade.cta')}
          </Box>
        </MotionBox>

        {/* BRAND */}
        <MotionBox
          borderRadius="24px"
          p={{ base: '32px 26px', lg: '48px' }}
          bgGradient={`linear(160deg, ${HC.primaryDeep}, ${HC.primaryDark})`}
          color="#FFF"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, delay: 0.08, ease: [0.4, 0, 0.2, 1] }}
        >
          <Text fontFamily={FONT_DISPLAY} fontSize="64px" fontWeight={900} lineHeight={1} letterSpacing="-.03em" color={HC.accentBright}>
            {t('home.split.brand.pct')}
          </Text>
          <Text as="h3" fontFamily={FONT_DISPLAY} fontWeight={800} fontSize="24px" mt="14px" mb="8px" color="#FFF">
            {t('home.split.brand.title')}
          </Text>
          <Text fontSize="15px" mb="24px" color={HC.cyanSoft}>
            {t('home.split.brand.sub')}
          </Text>
          <CheckList items={brandItems} ckBg={HC.accent} />
          <Box
            as={Link}
            href="#lermao"
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
            {t('home.split.brand.cta')}
          </Box>
        </MotionBox>
      </Grid>
    </Box>
  );
};

export default SplitTradeBrand;
