'use client';

import { Box, Text } from '@chakra-ui/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useTranslation } from '../../../hooks/useTranslation';
import SecHead from './sec-head';
import { HC, FONT_DISPLAY, HOME_PX } from './home-theme';

const Feedback = () => {
  const { t } = useTranslation();

  const LIST = [
    { image: '/images/feedback-1.webp', name: t('home.feedback.customer1'), role: t('home.feedback.position1'), content: t('home.feedback.content1') },
    { image: '/images/feedback-2.webp', name: t('home.feedback.customer2'), role: t('home.feedback.position2'), content: t('home.feedback.content2') },
    { image: '/images/feedback-3.webp', name: t('home.feedback.customer3'), role: t('home.feedback.position3'), content: t('home.feedback.content3') },
    { image: '/images/feedback-4.webp', name: t('home.feedback.customer4'), role: t('home.feedback.position4'), content: t('home.feedback.content4') }
  ];

  const breakpoints = {
    1: { slidesPerView: 1 },
    576: { slidesPerView: 2 },
    992: { slidesPerView: 3 }
  };

  return (
    <Box as="section" px={HOME_PX} py={{ base: '56px', lg: '96px' }} bg={HC.cyanBg}>
      <Box maxW="1200px" mx="auto">
        <SecHead eyebrow={t('home.feedback.eyebrow')} title={t('home.feedback.title')} />

        <Box className="home-feedback-swiper" pt="70px">
          <Swiper
            modules={[Navigation, Autoplay, Pagination]}
            breakpoints={breakpoints}
            spaceBetween={24}
            autoplay={{ delay: 4500, disableOnInteraction: false }}
            navigation
            pagination={{ clickable: true }}
          >
            {LIST.map((item) => (
              <SwiperSlide key={item.name} style={{ height: 'auto' }}>
                <Box
                  pos="relative"
                  bg="#f4f4f5"
                  border="1px solid #e4e7e9"
                  borderRadius="16px"
                  p="84px 26px 30px"
                  mt="60px"
                  mb="20px"
                  textAlign="center"
                  h="calc(100% - 80px)"
                >
                  <Box
                    pos="absolute"
                    top="-60px"
                    left="50%"
                    transform="translateX(-50%)"
                    w="120px"
                    h="120px"
                    borderRadius="18px"
                    border="5px solid #fff"
                    overflow="hidden"
                    boxShadow="0 8px 20px rgba(13,59,66,.2)"
                  >
                    <Box
                      as="img"
                      src={item.image}
                      alt={item.name}
                      loading="lazy"
                      w="100%"
                      h="100%"
                      objectFit="cover"
                    />
                  </Box>
                  <Text color={HC.gold} fontSize="14px" letterSpacing="2px" mb="10px">
                    ★★★★★
                  </Text>
                  <Text fontSize="14px" color={HC.textSecondary} lineHeight={1.6} mb="16px" textAlign="justify">
                    {item.content}
                  </Text>
                  <Text fontFamily={FONT_DISPLAY} fontWeight={800} fontSize="16px" color={HC.primaryDark}>
                    {item.name}
                  </Text>
                  <Text fontSize="12.5px" color="#71717A" mt="2px">
                    {item.role}
                  </Text>
                </Box>
              </SwiperSlide>
            ))}
          </Swiper>
        </Box>
      </Box>
    </Box>
  );
};

export default Feedback;
