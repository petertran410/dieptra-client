'use client';

import Carousel from '../../../components/carousel';
import SectionBlock from '../../../components/section-block';
import { useQueryVideoList } from '../../../services/video.service';
import { PX_ALL } from '../../../utils/const';
import { AspectRatio, Box, Flex } from '@chakra-ui/react';

const VideoList = () => {
  const { data: dataQuery } = useQueryVideoList();
  const { content: videoList = [] } = dataQuery || {};

  const breakpoints = {
    1: { slidesPerView: 1 },
    576: { slidesPerView: 2 },
    992: { slidesPerView: 3 }
  };

  const VIDEOS = videoList?.map((i) => i?.imagesUrl?.[0]?.replace('https://', 'http://')) || [];

  return (
    <Flex direction="column" mt={{ xs: '32px', lg: '48px' }} gap="24px" px={PX_ALL}>
      <SectionBlock title="Khách hàng nói gì về workshops" />
      <Box display={{ xs: 'none', lg: 'block' }} w="105%" ml="-2.5%">
        <Carousel spaceBetween={24} breakpoints={breakpoints} autoplay={false}>
          {VIDEOS?.map((item, index) => {
            return (
              <AspectRatio ratio={4 / 3} key={index}>
                <iframe
                  width="full"
                  height="auto"
                  src={item}
                  title="YouTube video player"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                ></iframe>
              </AspectRatio>
            );
          })}
        </Carousel>
      </Box>
      <Flex display={{ xs: 'flex', lg: 'none' }} direction="column" gap="16px">
        {VIDEOS.map((item, index) => {
          return (
            <AspectRatio ratio={4 / 3} key={index} w="full">
              <iframe
                width="full"
                height="auto"
                src={item}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              ></iframe>
            </AspectRatio>
          );
        })}
      </Flex>
    </Flex>
  );
};

export default VideoList;
