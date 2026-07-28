'use client';

import { Box, Flex, Grid, Text } from '@chakra-ui/react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { HC, FONT_DISPLAY, HOME_PX } from './home-theme';
import SecHead from './sec-head';

import 'swiper/css';
import 'swiper/css/navigation';

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
  ['Đa dạng vị trái cây, dễ phối món.', 'Phù hợp trà trái cây, soda.'],
  ['Cập nhật xu hướng, dễ kết hợp.', 'Tăng độ ngon cho mỗi ly nước.'],
  ['Hương vị ổn định, dễ định lượng.', 'Dùng cho trà, soda, đá xay.'],
  ['Dễ hòa tan, tiện pha chế.', 'Phù hợp trà sữa, đá xay.'],
  ['Tạo vị béo mịn, thơm hài hòa.', 'Dùng cho trà sữa, cà phê.'],
  ['Vị trà đậm, hậu vị êm dịu.', 'Phù hợp trà sữa, trà trái cây.'],
  ['Thanh nhẹ, hương thơm tự nhiên.', 'Dễ phối cùng sữa và trái cây.'],
  ['Hương trà thanh, tầng vị rõ.', 'Phù hợp menu món signature.']
];

const HREFS = [
  '/san-pham/nguyen-lieu-pha-che/mut-trai-cay',
  '/san-pham/nguyen-lieu-pha-che/topping-tra-sua',
  '/san-pham/nguyen-lieu-pha-che/siro-pha-che',
  '/san-pham/nguyen-lieu-pha-che/bot-pha-che',
  '/san-pham/nguyen-lieu-pha-che/bot-pha-che/bot-kem-bot-foam',
  '/san-pham/nguyen-lieu-pha-che/tra-pha-che/hong-tra',
  '/san-pham/nguyen-lieu-pha-che/tra-pha-che/tra-xanh',
  '/san-pham/nguyen-lieu-pha-che/tra-pha-che/tra-huong-hoa'
];

const Categories = () => {
  const cards = IMAGES.map((img, i) => ({
    img,
    name: NAMES[i],
    desc1: DESCS[i][0],
    desc2: DESCS[i][1],
    href: HREFS[i]
  }));

  return (
    <Box as="section" px={HOME_PX} py={{ base: '56px', lg: '96px' }}>
      <SecHead
        eyebrow={'DANH MỤC'}
        title={
          <>
            {'8 nhóm nguyên liệu được chọn lọc, '}
            <br />
            {'giúp quán dễ dàng xây dựng '}
            <Box as="br" display={{ base: 'none', lg: 'inline' }} />
            {'và phát triển menu'}
          </>
        }
        desc={
          <>
            {'Từ trà nền, mứt, siro đến bột và topping '}
            <Box as="br" display={{ base: 'none', lg: 'inline' }} />
            {'đầy đủ lựa chọn cho mọi công thức pha chế.'}
          </>
        }
      />

      {/* Desktop Grid Layout */}
      <Grid
        display={{ base: 'none', lg: 'grid' }}
        templateColumns="repeat(4, 1fr)"
        gap="22px"
      >
        {cards.map((c, idx) => (
          <MotionBox
            key={idx}
            as={Link}
            href={c.href}
            bg="#FFF"
            border="1px solid"
            borderColor={HC.border}
            borderRadius="18px"
            overflow="hidden"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.5, delay: (idx % 4) * 0.06, ease: [0.4, 0, 0.2, 1] }}
            _hover={{
              transform: 'translateY(-6px)',
              boxShadow: HC.shadowCard,
              '& img': { transform: 'scale(1.06)' },
              '& .arrow-icon': { transform: 'translateX(4px)' }
            }}
            _active={{ transform: 'translateY(-2px) scale(0.98)' }}
            sx={{ transition: 'transform .25s cubic-bezier(0.4, 0, 0.2, 1), box-shadow .25s cubic-bezier(0.4, 0, 0.2, 1)' }}
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
            <Box p="24px">
              <Text as="h3" fontFamily={FONT_DISPLAY} fontWeight={800} fontSize="19px" mb="8px" color={HC.textPrimary}>
                {c.name}
              </Text>
              <Box mb="12px">
                <Text fontSize="13.5px" color={HC.textSecondary} lineHeight={1.4}>
                  {c.desc1}
                </Text>
                <Text fontSize="13.5px" color={HC.textSecondary} lineHeight={1.4} mt="2px">
                  {c.desc2}
                </Text>
              </Box>
              <Text mt="12px" fontFamily={FONT_DISPLAY} fontWeight={700} fontSize="13.5px" color={HC.primary}>
                {'Xem thêm'}{' '}
                <Box as="span" className="arrow-icon" display="inline-block" transition="transform 0.2s">
                  →
                </Box>
              </Text>
            </Box>
          </MotionBox>
        ))}
      </Grid>

      {/* Mobile Swiper Layout */}
      <Box
        display={{ base: 'block', lg: 'none' }}
        className="mobile-categories-swiper"
        pos="relative"
        mb="56px"
      >
        <Swiper
          modules={[Navigation]}
          spaceBetween={16}
          slidesPerView={1}
          navigation={{
            prevEl: '.swiper-btn-prev-categories',
            nextEl: '.swiper-btn-next-categories'
          }}
          style={{ overflow: 'visible' }}
        >
          {cards.map((c, idx) => (
            <SwiperSlide key={idx} style={{ overflow: 'visible', paddingBottom: '8px' }}>
              <Box
                as={Link}
                href={c.href}
                display="block"
                bg="#FFF"
                border="1px solid"
                borderColor={HC.border}
                borderRadius="18px"
                overflow="hidden"
                boxShadow="0 4px 20px rgba(0, 183, 204, 0.04)"
                transition="all 0.25s cubic-bezier(0.4, 0, 0.2, 1)"
                _active={{ transform: 'scale(0.98)' }}
              >
                <Flex aspectRatio="1 / 1" bg={HC.cyanBg} align="center" justify="center" p="14px" overflow="hidden">
                  <Image
                    src={c.img}
                    alt={c.name}
                    width={320}
                    height={320}
                    loading="lazy"
                    style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                  />
                </Flex>
                <Box p="20px">
                  <Text as="h3" fontFamily={FONT_DISPLAY} fontWeight={800} fontSize="17.5px" mb="8px" color={HC.textPrimary}>
                    {c.name}
                  </Text>
                  <Box mb="12px">
                    <Text fontSize="13px" color={HC.textSecondary} lineHeight={1.4}>
                      {c.desc1}
                    </Text>
                    <Text fontSize="13px" color={HC.textSecondary} lineHeight={1.4} mt="2px">
                      {c.desc2}
                    </Text>
                  </Box>
                  <Text mt="12px" fontFamily={FONT_DISPLAY} fontWeight={700} fontSize="13px" color={HC.primary}>
                    {'Xem thêm →'}
                  </Text>
                </Box>
              </Box>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Navigation Buttons for Mobile Swiper */}
        <Flex
          position="absolute"
          bottom="-48px"
          left="50%"
          transform="translateX(-50%)"
          gap="12px"
          zIndex={10}
        >
          <Flex
            className="swiper-btn-prev-categories"
            w="38px"
            h="38px"
            bg="#FFF"
            borderRadius="50%"
            border="1px solid"
            borderColor={HC.border}
            color={HC.primary}
            boxShadow="0 4px 14px rgba(0, 183, 204, 0.12)"
            cursor="pointer"
            align="center"
            justify="center"
            userSelect="none"
            transition="all .2s"
            _hover={{ bg: HC.primary, color: '#FFF', borderColor: HC.primary }}
            _active={{ transform: 'scale(0.95)' }}
            sx={{
              '&.swiper-button-disabled': {
                opacity: 0.35,
                cursor: 'not-allowed',
                pointerEvents: 'none',
                boxShadow: 'none',
                borderColor: HC.border
              }
            }}
          >
            <Text fontSize="18px" fontWeight="bold" transform="translateX(-1px)">‹</Text>
          </Flex>

          <Flex
            className="swiper-btn-next-categories"
            w="38px"
            h="38px"
            bg="#FFF"
            borderRadius="50%"
            border="1px solid"
            borderColor={HC.border}
            color={HC.primary}
            boxShadow="0 4px 14px rgba(0, 183, 204, 0.12)"
            cursor="pointer"
            align="center"
            justify="center"
            userSelect="none"
            transition="all .2s"
            _hover={{ bg: HC.primary, color: '#FFF', borderColor: HC.primary }}
            _active={{ transform: 'scale(0.95)' }}
            sx={{
              '&.swiper-button-disabled': {
                opacity: 0.35,
                cursor: 'not-allowed',
                pointerEvents: 'none',
                boxShadow: 'none',
                borderColor: HC.border
              }
            }}
          >
            <Text fontSize="18px" fontWeight="bold" transform="translateX(1px)">›</Text>
          </Flex>
        </Flex>
      </Box>
    </Box>
  );
};

export default Categories;
