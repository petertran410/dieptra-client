'use client';

import Carousel from '@/components/carousel';
import { useQueryBlogCultureList } from '@/services/culture.service';
import { IMG_ALT, PX_ALL } from '@/utils/const';
import { convertSlugURL } from '@/utils/helper-server';
import { AspectRatio, Box, Flex, Image, Text } from '@chakra-ui/react';
import dayjs from 'dayjs';
import Link from 'next/link';

const ActivityItem = ({ isMobile, item }) => {
  const { imagesUrl, id, title, description, createdDate } = item;

  return (
    <Link href={`/van-hoa/${convertSlugURL(title)}.${id}`} style={{ display: 'block', width: '100%' }}>
      <Flex direction="column" gap="16px">
        <AspectRatio ratio={16 / 9} w={{ xs: '112%', lg: 'full' }} ml={{ xs: '-6%', lg: 0 }}>
          <Image
            borderRadius={{ xs: 0, lg: 16 }}
            fit="cover"
            w="full"
            h="full"
            src={imagesUrl?.[0]?.replace('http://', 'https://') || '/images/image-recruitment-1.png'}
            alt={IMG_ALT}
          />
        </AspectRatio>

        <Flex direction="column" gap="4px">
          <Text fontSize={{ xs: 24, lg: 18 }} fontWeight={{ xs: 600, lg: 500 }} lineHeight="30px">
            {title}
          </Text>
          {isMobile ? (
            <Box fontSize={16} lineHeight="19px" noOfLines={5} dangerouslySetInnerHTML={{ __html: description }}></Box>
          ) : (
            <Flex align="center" gap="4px">
              <Image w="16px" h="16px" alt={IMG_ALT} src="/images/clock-outline.png" />
              <Text color="#A1A1AA">{dayjs(createdDate).format('HH:mm DD/MM/YYYY')}</Text>
            </Flex>
          )}

          {isMobile && <Box w="full" h="2px" bgColor="#F4F4F5" my="16px" />}
        </Flex>
      </Flex>
    </Link>
  );
};

const Activity = () => {
  const breakpoints = {
    1: { slidesPerView: 1 },
    576: { slidesPerView: 2 },
    992: { slidesPerView: 2 }
  };
  const { data: dataQuery } = useQueryBlogCultureList();
  const { content: blogListQuery = [] } = dataQuery || {};

  const blogList = blogListQuery?.slice(6) || [];

  return (
    <>
      <Box display={{ xs: 'none', lg: 'block' }} mt={{ xs: '16px', lg: '48px' }} px={PX_ALL} w="105%" ml="-2.5%">
        <Carousel breakpoints={breakpoints} spaceBetween={24} autoplay={false}>
          {blogList?.map((item) => {
            return <ActivityItem key={item.id} item={item} />;
          })}
        </Carousel>
      </Box>

      <Flex direction="column" mt={{ xs: '16px', lg: '48px' }} px={PX_ALL} display={{ xs: 'flex', lg: 'none' }}>
        {blogList?.map((item) => {
          return <ActivityItem key={item.id} item={item} isMobile />;
        })}
      </Flex>
    </>
  );
};

export default Activity;
