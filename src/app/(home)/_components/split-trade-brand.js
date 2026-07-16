'use client';

import { Box, Flex, Grid, Text } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { HC, FONT_DISPLAY, HOME_PX } from './home-theme';

const MotionBox = motion(Box);

const CheckList = ({ items, ckBg, textColor }) => (
  <Flex as="ul" direction="column" gap="13px" mb="30px" listStyleType="none">
    {items.map((it, i) => (
      <Flex as="li" key={i} gap="11px" align="flex-start" fontSize="15px" fontWeight={500}>
        <Flex flex="none" w="22px" h="22px" borderRadius="50%" align="center" justify="center" fontSize="12px" fontWeight={900} mt="2px" bg={ckBg} color="#FFF">
          ✓
        </Flex>
        <Text as="span" style={{ color: textColor }}>{it}</Text>
      </Flex>
    ))}
  </Flex>
);

const SplitTradeBrand = () => {
  const tradeItems = [
    'Danh mục sản phẩm phong phú',
    'Nhiều phân khúc giá',
    'Dễ thay thế nguyên liệu',
    'Phù hợp nhập sỉ / phân phối'
  ];
  const brandItems = [
    'Sản phẩm chủ lực LerMao, Trà Phượng Hoàng',
    'Chất lượng đồng nhất',
    'Xu hướng mới — sản phẩm khác biệt',
    'Phù hợp xây dựng menu signature'
  ];

  return (
    <Box as="section" px={HOME_PX} pb={{ base: '56px', lg: '96px' }}>
      <Grid templateColumns={{ base: '1fr', lg: '1fr 1fr' }} gap={{ base: '20px', lg: '28px' }}>
        {/* TRADE */}
        <MotionBox
          borderRadius="24px"
          p={{ base: '24px 20px', md: '32px 26px', lg: '48px' }}
          bg={HC.greenSoft}
          color={HC.primaryDark}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
        >
          <Text fontFamily={FONT_DISPLAY} fontSize={{ base: '52px', lg: '64px' }} fontWeight={900} lineHeight={1} letterSpacing="-.03em" color={HC.accentDeep}>
            {'60%'}
          </Text>
          <Text as="h3" fontFamily={FONT_DISPLAY} fontWeight={800} fontSize={{ base: '20px', lg: '24px' }} mt="14px" mb="8px" style={{ color: HC.greenDeep }}>
            {'Hàng thương mại'}
          </Text>
          <Text fontSize="15px" mb="24px" style={{ color: HC.textSecondary }}>
            {'Nguồn hàng đa dạng — Giá tốt — Linh hoạt cho mọi mô hình'}
          </Text>
          <CheckList items={tradeItems} ckBg={HC.greenDeep} textColor={HC.textPrimary} />
          <Box
            as={Link}
            href="/san-pham/nguyen-lieu-pha-che"
            display={{ base: 'flex', sm: 'inline-flex' }}
            w={{ base: '100%', sm: 'auto' }}
            justifyContent="center"
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
            transition="all 0.25s cubic-bezier(0.4, 0, 0.2, 1)"
            _hover={{ bg: HC.primary, borderColor: HC.primary, color: '#FFF', transform: 'translateY(-2px)' }}
            _active={{ transform: 'translateY(0) scale(0.97)' }}
          >
            {'Xem nguyên liệu pha chế →'}
          </Box>
        </MotionBox>

        {/* BRAND */}
        <MotionBox
          borderRadius="24px"
          p={{ base: '24px 20px', md: '32px 26px', lg: '48px' }}
          bgGradient={`linear(160deg, ${HC.primaryDeep}, ${HC.primaryDark})`}
          color="#FFF"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, delay: 0.08, ease: [0.4, 0, 0.2, 1] }}
        >
          <Text fontFamily={FONT_DISPLAY} fontSize={{ base: '52px', lg: '64px' }} fontWeight={900} lineHeight={1} letterSpacing="-.03em" color={HC.accentBright}>
            {'40%'}
          </Text>
          <Text as="h3" fontFamily={FONT_DISPLAY} fontWeight={800} fontSize={{ base: '20px', lg: '24px' }} mt="14px" mb="8px" style={{ color: '#FFF' }}>
            {'Hàng thương hiệu'}
          </Text>
          <Text fontSize="15px" mb="24px" style={{ color: '#E8F4F5' }}>
            {'Sản phẩm chiến lược — Chất lượng ổn định — Hỗ trợ menu'}
          </Text>
          <CheckList items={brandItems} ckBg={HC.accent} textColor="#FFF" />
          <Box
            as={Link}
            href="/san-pham/nguyen-lieu-pha-che/mut-trai-cay/mut-lermao"
            display={{ base: 'flex', sm: 'inline-flex' }}
            w={{ base: '100%', sm: 'auto' }}
            justifyContent="center"
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
            transition="all 0.25s cubic-bezier(0.4, 0, 0.2, 1)"
            _hover={{ bg: HC.accentDeep, transform: 'translateY(-2px)', boxShadow: '0 10px 24px rgba(255,122,26,.4)' }}
            _active={{ transform: 'translateY(0) scale(0.97)' }}
          >
            {'Khám phá mứt LerMao →'}
          </Box>
        </MotionBox>
      </Grid>
    </Box>
  );
};

export default SplitTradeBrand;
