'use client';

import { Box } from '@chakra-ui/react';
import { Children, cloneElement, useRef } from 'react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { EffectCoverflow, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

const CarouselMobile = (props) => {
  const { children, spaceBetween = 20, showPagination } = props;
  const swiperRef = useRef(null);

  return (
    <Box w="full" mx="auto" pos="relative" className="swipper-mobile" mb={showPagination ? '28px' : undefined}>
      <Swiper
        effect={'coverflow'}
        modules={[Navigation, EffectCoverflow, Pagination]}
        initialSlide={1}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 0,
          modifier: 1,
          slideShadows: false
        }}
        pagination={
          showPagination
            ? {
                el: '.custom-pagination',
                clickable: true
              }
            : false
        }
        centeredSlides
        spaceBetween={spaceBetween}
        slidesPerView="auto"
        onBeforeInit={(swiper) => {
          swiperRef.current = swiper;
        }}
      >
        {Children.map(children, (child) => cloneElement(<SwiperSlide>{child}</SwiperSlide>))}
      </Swiper>
      <div className="custom-pagination"></div>
    </Box>
  );
};

export default CarouselMobile;
