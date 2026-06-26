'use client';

import { Box, Flex, Text } from '@chakra-ui/react';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import 'swiper/css';
import 'swiper/css/navigation';
import { Autoplay, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { formatCurrency } from '../../../utils/helper-server';
import { IMG_ALT } from '../../../utils/const';
import SecHead from './sec-head';
import { HC, FONT_DISPLAY, HOME_PX } from './home-theme';

const FALLBACK_IMG = '/images/tra-phuong-hoang.webp';

const getProductImage = (item) => {
  const { imagesUrl, kiotviet_images } = item || {};
  if (Array.isArray(imagesUrl) && imagesUrl.length > 0) {
    return imagesUrl[0]?.replace('http://', 'https://');
  }
  if (Array.isArray(kiotviet_images) && kiotviet_images.length > 0) {
    return kiotviet_images[0]?.replace('http://', 'https://');
  }
  return FALLBACK_IMG;
};

const ProductCard = ({ item }) => {
  const { title, kiotviet_name, price, slug } = item || {};
  const showName = title || kiotviet_name;

  return (
    <Link href={`/san-pham/diep-tra/${slug}`}>
      <Flex
        direction="column"
        bg="#FFF"
        border="1px solid"
        borderColor={HC.border}
        borderRadius="16px"
        overflow="hidden"
        h="100%"
        transition="transform .25s, box-shadow .25s"
        _hover={{ transform: 'translateY(-5px)', boxShadow: HC.shadowCard }}
      >
        <Box
          sx={{ aspectRatio: '1 / 1' }}
          bg={HC.bgSoft}
          position="relative"
          overflow="hidden"
        >
          <Image
            src={getProductImage(item)}
            alt={showName || IMG_ALT}
            fill
            sizes="(max-width: 576px) 80vw, (max-width: 992px) 45vw, 30vw"
            style={{ objectFit: 'contain', padding: '14px' }}
            onError={(e) => {
              e.target.src = FALLBACK_IMG;
            }}
          />
        </Box>
        <Flex direction="column" flex={1} p="14px 16px 18px" textAlign="center" borderTop="1px solid" borderColor={HC.border}>
          <Text fontSize="11px" fontWeight={700} letterSpacing=".08em" textTransform="uppercase" color={HC.primary}>
            LerMao
          </Text>
          <Text
            fontFamily={FONT_DISPLAY}
            fontWeight={700}
            fontSize="15px"
            color={HC.primaryDark}
            m="5px 0 7px"
            minH="2.6em"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            {showName}
          </Text>
          <Text fontFamily={FONT_DISPLAY} fontWeight={900} color={HC.accentDeep} fontSize="16px" mt="auto">
            {!price || price === 0 ? 'Liên hệ' : formatCurrency(price)}
          </Text>
          <Flex
            as="span"
            mt="14px"
            align="center"
            justify="center"
            gap="6px"
            p="10px 18px"
            borderRadius="999px"
            border="1px solid"
            borderColor={HC.primary}
            color={HC.primary}
            fontFamily={FONT_DISPLAY}
            fontWeight={700}
            fontSize="13px"
            transition=".2s"
            _hover={{ bg: HC.primary, color: '#FFF', boxShadow: '0 10px 24px rgba(0,183,204,.28)' }}
          >
            {'Xem chi tiết'} →
          </Flex>
        </Flex>
      </Flex>
    </Link>
  );
};

const FeaturedProductsHome = ({ data = [] }) => {
  const categories = (data || []).filter((c) => c?.products?.length > 0);
  const [active, setActive] = useState(0);

  if (categories.length === 0) return null;

  const current = categories[active] || categories[0];

  const breakpoints = {
    1: { slidesPerView: 1.2 },
    576: { slidesPerView: 2 },
    992: { slidesPerView: 3 }
  };

  return (
    <Box as="section" px={HOME_PX} py={{ base: '56px', lg: '96px' }} bg="#f8f9fa">
      <Box maxW="1200px" mx="auto">
        <SecHead eyebrow={'Sản phẩm nổi bật'} title={'Best-seller được hàng nghìn quán tin dùng'} />

        <Flex gap="10px" justify="center" flexWrap="wrap" mb="42px">
          {categories.map((cat, idx) => (
            <Box
              key={cat.categoryId ?? idx}
              as="button"
              type="button"
              onClick={() => setActive(idx)}
              fontFamily={FONT_DISPLAY}
              fontWeight={700}
              fontSize="14.5px"
              p="11px 24px"
              borderRadius="100px"
              border="1.5px solid"
              borderColor={idx === active ? HC.accent : HC.border}
              bg={idx === active ? HC.accent : '#FFF'}
              color={idx === active ? '#FFF' : HC.textSecondary}
              transition="all .2s"
              _hover={{ borderColor: idx === active ? HC.accent : HC.primary }}
            >
              {cat.categoryName}
            </Box>
          ))}
        </Flex>

        <Box pos="relative" className="home-featured-swiper">
          <Swiper
            key={current.categoryId}
            modules={[Navigation, Autoplay]}
            breakpoints={breakpoints}
            spaceBetween={24}
            autoplay={{ delay: 4500, disableOnInteraction: false }}
            navigation
          >
            {current.products.map((p) => (
              <SwiperSlide key={p.id} style={{ height: 'auto', paddingBottom: '8px' }}>
                <ProductCard item={p} />
              </SwiperSlide>
            ))}
          </Swiper>
        </Box>

        {current.categorySlugPath && (
          <Flex justify="center" mt="32px">
            <Link href={`/san-pham/${current.categorySlugPath}`}>
              <Flex
                as="span"
                align="center"
                gap="9px"
                fontFamily={FONT_DISPLAY}
                fontWeight={700}
                fontSize="15px"
                p="14px 30px"
                borderRadius="12px"
                border="1.5px solid"
                borderColor={HC.primary}
                color={HC.primary}
                transition="all .2s"
                _hover={{ bg: HC.primaryDark, borderColor: HC.primaryDark, color: '#FFF' }}
              >
                {'Xem thêm'} →
              </Flex>
            </Link>
          </Flex>
        )}
      </Box>
    </Box>
  );
};

export default FeaturedProductsHome;
