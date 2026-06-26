'use client';

import { Box, Flex, Grid, Text } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { HC, FONT_DISPLAY, HOME_PX } from './home-theme';
import SecHead from './sec-head';

const MotionBox = motion(Box);

const GUIDES = [
  {
    img: '/images/home-v2/guide-cong-thuc.png',
    href: '/bai-viet/cong-thuc-pha-che',
    title: 'Công Thức Pha Chế',
    lis: ['Trà sữa', 'Trà trái cây', 'Matcha'],
    cta: 'Xem công thức ngay'
  },
  {
    img: '/images/home-v2/guide-nguyen-lieu.png',
    href: '/bai-viet/kien-thuc-nguyen-lieu-pha-che',
    title: 'Kiến Thức Nguyên Liệu',
    lis: ['Phân biệt các loại trà', 'Chọn syrup phù hợp', 'Bảo quản nguyên liệu'],
    cta: 'Xem kiến thức ngay'
  },
  {
    img: '/images/home-v2/guide-kinh-doanh.png',
    href: '/bai-viet/kien-thuc-ve-tra',
    title: 'Kinh Doanh Quán',
    lis: ['Tính cost đồ uống', 'Xây dựng menu', 'Xu hướng đồ uống'],
    cta: 'Xem bài viết'
  }
];

const GuideCards = () => {
  return (
    <Box as="section" id="guide" px={HOME_PX} py={{ base: '56px', lg: '96px' }}>
      <SecHead eyebrow={'Cẩm nang pha chế & kinh doanh'} title={'Kiến thức đồng hành cùng người làm F&B'} />

      <Grid templateColumns={{ base: '1fr', md: 'repeat(3, 1fr)' }} gap={{ base: '20px', lg: '26px' }}>
        {GUIDES.map((g, i) => (
          <MotionBox
            key={g.href}
            as={Link}
            href={g.href}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: i * 0.08, ease: [0.4, 0, 0.2, 1] }}
            bg="#FFF"
            border={`1px solid ${HC.border}`}
            borderRadius="18px"
            overflow="hidden"
            display="block"
            transition-property="transform, box-shadow"
            sx={{ transition: 'transform .25s, box-shadow .25s', '&:hover': { transform: 'translateY(-6px)', boxShadow: HC.shadowCard }, '&:hover .guide-img': { transform: 'scale(1.05)' } }}
          >
            <Box sx={{ aspectRatio: '16 / 10' }} overflow="hidden">
              <Image
                className="guide-img"
                src={g.img}
                alt={g.title}
                width={520}
                height={325}
                loading="lazy"
                style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform .4s' }}
              />
            </Box>
            <Box p="26px">
              <Text as="h3" fontFamily={FONT_DISPLAY} fontSize="20px" fontWeight={800} mb="14px" color={HC.textPrimary}>
                {g.title}
              </Text>
              <Flex direction="column" gap="9px" mb="20px">
                {g.lis.map((li) => (
                  <Flex key={li} gap="9px" fontSize="14.5px" color={HC.textSecondary}>
                    <Text as="span" color={HC.primary} fontWeight={900}>
                      ›
                    </Text>
                    {li}
                  </Flex>
                ))}
              </Flex>
              <Box
                display="inline-flex"
                alignItems="center"
                gap="8px"
                fontFamily={FONT_DISPLAY}
                fontWeight={700}
                fontSize="15px"
                borderRadius="12px"
                px="22px"
                py="11px"
                border={`1.5px solid ${HC.primary}`}
                color={HC.primary}
                transition="all .2s"
                _hover={{ bg: HC.primaryDark, borderColor: HC.primaryDark, color: '#FFF' }}
              >
                {g.cta}
              </Box>
            </Box>
          </MotionBox>
        ))}
      </Grid>
    </Box>
  );
};

export default GuideCards;
