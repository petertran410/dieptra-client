'use client';

import { Box, Flex, Grid, Text } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { HC, FONT_DISPLAY, HOME_PX } from './home-theme';
import SecHead from './sec-head';

const MotionBox = motion(Box);

const IMAGES = [
  '/images/home-v2/cat-mut.webp',
  '/images/home-v2/cat-topping.webp',
  '/images/home-v2/cat-siro.webp',
  '/images/home-v2/cat-bot.webp',
  '/images/home-v2/cat-sua-kem.webp',
  '/images/home-v2/cat-hong-tra.webp',
  '/images/home-v2/cat-tra-xanh.webp',
  '/images/home-v2/cat-o-long.webp'
];

const NAMES = [
  'Mứt Pha Chế',
  'Topping Trà Sữa',
  'Siro Pha Chế',
  'Bột Pha Chế',
  'Sữa / Kem Béo Pha Chế',
  'Hồng Trà',
  'Trà Xanh',
  'Ô Long & Trà Hương Hoa'
];

const DESCS = [
  'Đa dạng hương vị, ngon tự nhiên',
  'Trân châu, thạch, pudding, kem...',
  'Siro trái cây, siro hương vị',
  'Bột sữa, bột kem, bột matcha...',
  'Sữa đặc, kem béo, topping base...',
  'Hồng trà đậm vị, ủ trà sữa',
  'Trà xanh thơm dịu, chát thanh',
  'Ô long, ô nhài, hoa hồng...'
];

const Categories = () => {
  const cards = IMAGES.map((img, i) => ({
    img,
    name: NAMES[i],
    desc: DESCS[i]
  }));

  return (
    <Box as="section" px={HOME_PX} py={{ base: '56px', lg: '96px' }}>
      <SecHead eyebrow={'Danh mục sản phẩm'} title={'Hệ sinh thái nguyên liệu pha chế đầy đủ'} desc={'Từ nguyên liệu nền đến topping và trà chuyên dụng — tất cả trong một nhà cung cấp.'} />

      <Grid templateColumns={{ base: '1fr', sm: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' }} gap={{ base: '16px', lg: '22px' }}>
        {cards.map((c, idx) => (
          <MotionBox
            key={idx}
            as={Link}
            href="/san-pham"
            bg="#FFF"
            border="1px solid"
            borderColor={HC.border}
            borderRadius="18px"
            overflow="hidden"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.5, delay: (idx % 4) * 0.06, ease: [0.4, 0, 0.2, 1] }}
            _hover={{ transform: 'translateY(-6px)', boxShadow: HC.shadowCard, '& img': { transform: 'scale(1.06)' } }}
            sx={{ transition: 'transform .25s, box-shadow .25s' }}
          >
            <Flex aspectRatio="1 / 1" bg={HC.cyanBg} align="center" justify="center" p="14px" overflow="hidden">
              <Image
                src={c.img}
                alt={c.name}
                width={320}
                height={320}
                loading="lazy"
                style={{ width: '100%', height: '100%', objectFit: 'contain', transition: 'transform .4s ease' }}
              />
            </Flex>
            <Box p="20px 22px 24px">
              <Text as="h3" fontFamily={FONT_DISPLAY} fontWeight={800} fontSize="19px" mb="6px" color={HC.textPrimary}>
                {c.name}
              </Text>
              <Text fontSize="13.5px" color={HC.textMuted}>
                {c.desc}
              </Text>
              <Text mt="12px" fontFamily={FONT_DISPLAY} fontWeight={700} fontSize="13.5px" color={HC.primary}>
                {'Xem thêm'} →
              </Text>
            </Box>
          </MotionBox>
        ))}
      </Grid>
    </Box>
  );
};

export default Categories;
