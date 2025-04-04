'use client';

import { Box, Flex, Text } from '@chakra-ui/react';
import { Children, cloneElement, useRef, useState } from 'react';
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/navigation';
import { Autoplay, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

const Carousel = (props) => {
  const { children, breakpoints, spaceBetween = 20, slidesPerView = 2, autoplay = true } = props;
  const swiperRef = useRef(null);
  const [disablePrev, setDisablePrev] = useState(true);
  const [disableNext, setDisableNext] = useState(false);

  const defaultBreakpoints = {
    1: { slidesPerView: 1 },
    576: { slidesPerView: 2 }
  };

  return (
    <Box w={{ xs: '85%', md: '95%' }} mx="auto" pos="relative">
      <Swiper
        modules={[Navigation, Autoplay]}
        breakpoints={breakpoints || defaultBreakpoints}
        autoplay={autoplay}
        spaceBetween={spaceBetween}
        slidesPerView={slidesPerView}
        onBeforeInit={(swiper) => {
          swiperRef.current = swiper;
        }}
      >
        {Children.map(children, (child) => cloneElement(<SwiperSlide>{child}</SwiperSlide>))}
      </Swiper>

      <Flex
        align="center"
        justify="center"
        pos="absolute"
        w="40px"
        h="40px"
        p={0}
        onClick={() => {
          if (disablePrev) {
            return;
          }
          swiperRef.current?.slidePrev();
          setDisableNext(swiperRef.current?.isEnd);
          setDisablePrev(swiperRef.current?.isBeginning);
        }}
        bgColor="#FFF"
        top="calc(50% - 10px)"
        left={{ xs: '-45px', lg: '-60px' }}
        borderRadius="full"
        zIndex={100}
        cursor="pointer"
        boxShadow="0px 4px 16px 0px #0000000D"
        // opacity={disablePrev ? 0.4 : 1}
      >
        <Flex
          w="40px"
          h="40px"
          borderRadius="full"
          bgColor="#F4F4F5"
          align="center"
          justify="center"
          transitionDuration="250ms"
          _hover={{ bgColor: '#5d97e3' }}
          data-group
        >
          <Text as="span" color="#71717A" transitionDuration="250ms" _groupHover={{ color: '#FFF' }}>
            <svg viewBox="0 0 16 16" fill="currentColor" height="24px" width="24px">
              <path
                fillRule="evenodd"
                d="M9.78 12.78a.75.75 0 01-1.06 0L4.47 8.53a.75.75 0 010-1.06l4.25-4.25a.75.75 0 011.06 1.06L6.06 8l3.72 3.72a.75.75 0 010 1.06z"
              />
            </svg>
          </Text>
        </Flex>
      </Flex>

      <Flex
        align="center"
        justify="center"
        pos="absolute"
        w="40px"
        h="40px"
        p={0}
        onClick={() => {
          if (disableNext) {
            return;
          }
          swiperRef.current?.slideNext();
          setDisableNext(swiperRef.current?.isEnd);
          setDisablePrev(swiperRef.current?.isBeginning);
        }}
        bgColor="#FFF"
        top="calc(50% - 10px)"
        right={{ xs: '-45px', lg: '-60px' }}
        borderRadius="full"
        zIndex={100}
        cursor="pointer"
        boxShadow="0px 4px 16px 0px #0000000D"
        // opacity={disableNext ? 0.4 : 1}
      >
        <Flex
          w="40px"
          h="40px"
          borderRadius="full"
          bgColor="#F4F4F5"
          align="center"
          justify="center"
          transitionDuration="250ms"
          _hover={{ bgColor: '#5d97e3' }}
          data-group
        >
          <Text as="span" color="#71717A" transitionDuration="250ms" _groupHover={{ color: '#FFF' }}>
            <svg viewBox="0 0 16 16" fill="currentColor" height="24px" width="24px">
              <path
                fillRule="evenodd"
                d="M6.22 3.22a.75.75 0 011.06 0l4.25 4.25a.75.75 0 010 1.06l-4.25 4.25a.75.75 0 01-1.06-1.06L9.94 8 6.22 4.28a.75.75 0 010-1.06z"
              />
            </svg>
          </Text>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Carousel;
