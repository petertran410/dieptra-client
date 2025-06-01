'use client';

import Carousel from '../../../components/carousel';
import { useQueryNewsList } from '../../../services/news.service';
import { IMG_ALT } from '../../../utils/const';
import { convertSlugURL, convertTimestamp } from '../../../utils/helper-server';
import { AspectRatio, Box, Flex, Image, Text } from '@chakra-ui/react';
import Link from 'next/link';

const NewsItem = ({ item }) => {
  const { id, title, imagesUrl, createdDate } = item || {};

  return (
    <Flex direction="column" gap="16px">
      <Link href={`/tin-tuc/${convertSlugURL(title)}.${id}`}>
        <AspectRatio ratio={16 / 9} w="full">
          <Image
            src={imagesUrl?.[0]?.replace('http://', 'https://') || 'images/news.png'}
            w="full"
            h="full"
            alt={IMG_ALT}
            borderRadius={16}
          />
        </AspectRatio>
      </Link>
      <Flex direction="column" justify="space-between" gap="16px">
        <Box>
          <Link href={`/tin-tuc/${convertSlugURL(title)}.${id}`}>
            <Text fontSize={18} fontWeight={500} lineHeight="22px" noOfLines={3} h="66px">
              {title}
            </Text>
          </Link>
          <Flex mt="4px" align="center" gap="4px">
            <Image src="/images/clock-outline.png" w="16px" h="16px" alt={IMG_ALT} />
            <Text color="#A1A1AA">{convertTimestamp(createdDate)}</Text>
          </Flex>
        </Box>
        <Link href={`/tin-tuc/${convertSlugURL(title)}.${id}`}>
          <Flex
            align="center"
            justify="center"
            bgColor="#065FD4"
            color="#FFF"
            w="86px"
            h="32px"
            gap="4px"
            fontSize={16}
            borderRadius={8}
            fontWeight={500}
            transitionDuration="250ms"
            _hover={{ bgColor: '#5d97e3' }}
            _active={{ bgColor: '#5d97e3' }}
          >
            Đọc tiếp
          </Flex>
        </Link>
      </Flex>
    </Flex>
  );
};

const NewsList = () => {
  const { data: newsListQuery } = useQueryNewsList();
  const { content: newsList = [] } = newsListQuery || {};

  const breakpoints = {
    1: { slidesPerView: 1 },
    576: { slidesPerView: 2 },
    992: { slidesPerView: 3 }
  };

  return (
    <>
      <Box display={{ xs: 'none', lg: 'block' }}>
        <Carousel breakpoints={breakpoints} spaceBetween={24} autoplay={false}>
          {newsList?.map((item) => {
            return <NewsItem key={item.id} item={item} />;
          })}
        </Carousel>
      </Box>
      <Flex direction="column" gap="36px" display={{ xs: 'flex', lg: 'none' }}>
        {newsList?.map((item) => {
          return <NewsItem key={item.id} item={item} />;
        })}
      </Flex>
    </>
  );
};

export default NewsList;
