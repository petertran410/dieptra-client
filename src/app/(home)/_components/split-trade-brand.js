'use client';

import { Box, Flex, Grid, Text } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { HC, FONT_DISPLAY, HOME_PX } from './home-theme';

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
            {'60%'}
          </Text>
          <Text as="h3" fontFamily={FONT_DISPLAY} fontWeight={800} fontSize="24px" mt="14px" mb="8px" color={HC.greenDeep}>
            {'Hàng thương mại'}
          </Text>
          <Text fontSize="15px" mb="24px">
            {'Nguồn hàng đa dạng — Giá tốt — Linh hoạt cho mọi mô hình'}
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
            {'Xem danh mục thương mại'}
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
            {'40%'}
          </Text>
          <Text as="h3" fontFamily={FONT_DISPLAY} fontWeight={800} fontSize="24px" mt="14px" mb="8px" color="#FFF">
            {'Hàng thương hiệu'}
          </Text>
          <Text fontSize="15px" mb="24px" color={HC.cyanSoft}>
            {'Sản phẩm chiến lược — Chất lượng ổn định — Hỗ trợ menu'}
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
            {'Khám phá thương hiệu'}
          </Box>
        </MotionBox>
      </Grid>
    </Box>
  );
};

export default SplitTradeBrand;
