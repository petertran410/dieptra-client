'use client';

import { Box, Grid, Text } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { HC, FONT_DISPLAY, HOME_PX } from './home-theme';

const MotionGrid = motion(Grid);

const UspStats = () => {
  const items = [
    { num: '60+', label: 'Tỉnh thành phủ sóng', desc: 'Giao hàng nhanh chóng trên toàn quốc' },
    { num: '30.000+', label: 'Đối tác đồng hành', desc: 'Quán, chuỗi F&B, đại lý & nhà phân phối' },
    { num: '500+', label: 'Danh mục đa dạng', desc: 'Hơn 500 sản phẩm nguyên liệu pha chế' },
    { num: '1000+', label: 'Công thức & xu hướng', desc: 'Cập nhật trend, menu, công thức mới' },
    { num: '6', label: 'Tiêu chuẩn kiểm định', desc: 'Kiểm soát chất lượng, nguồn uy tín' }
  ];

  return (
    <Box as="section" px={HOME_PX} mt={{ base: '-22px', lg: '-40px' }} mb="28px" position="relative" zIndex={5}>
      <MotionGrid
        templateColumns={{ base: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)', lg: 'repeat(5, 1fr)' }}
        gap={{ base: '14px', lg: '18px' }}
        bg="#FFF"
        border="1px solid"
        borderColor={HC.border}
        borderRadius="20px"
        p={{ base: '20px', lg: '30px' }}
        boxShadow="0 18px 50px rgba(13,59,66,.08)"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
      >
        {items.map((it, idx) => (
          <Box
            key={idx}
            textAlign="center"
            px={{ base: '8px', lg: '12px' }}
            py="8px"
            borderRight={{ lg: idx === items.length - 1 ? 'none' : '1px solid' }}
            borderColor={{ lg: HC.border }}
            gridColumn={{ base: idx === items.length - 1 && items.length % 2 === 1 ? '1 / -1' : 'auto', md: 'auto' }}
          >
            <Text fontFamily={FONT_DISPLAY} fontSize={{ base: '26px', lg: '32px' }} fontWeight={900} color={HC.accent} lineHeight={1}>
              {it.num}
            </Text>
            <Text fontFamily={FONT_DISPLAY} fontWeight={700} fontSize={{ base: '13px', lg: '14.5px' }} color={HC.primaryDark} mt="8px" mb="5px">
              {it.label}
            </Text>
            <Text fontSize={{ base: '11.5px', lg: '12.5px' }} color={HC.textMuted} lineHeight={1.5}>
              {it.desc}
            </Text>
          </Box>
        ))}
      </MotionGrid>
    </Box>
  );
};

export default UspStats;
