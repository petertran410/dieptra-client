'use client';

import { Flex, Image } from '@chakra-ui/react';
import Link from 'next/link';
import SectionBlockH2 from '../../../components/section-block/section-block-h2';
import { PX_ALL } from '../../../utils/const';

const FeaturedArticle = () => {
  return (
    <Flex pt={{ xs: '70px', lg: '0' }} px={PX_ALL} pb="100px" direction="column" gap={4}>
      <SectionBlockH2 title="Bài Viết" />
      <Flex pt={{ xs: '70px', lg: '10px' }} direction="row" gap={4}>
        <Link href={`/bai-viet/kien-thuc-nguyen-lieu-pha-che`}>
          <Image
            src={'/images/news.webp'}
            w="full"
            h="full"
            alt="Kiến thức pha chế"
            borderRadius={12}
            transition="transform 0.3s ease"
            _hover={{ transform: 'scale(1.05)' }}
          />
        </Link>
        <Link href={`/bai-viet/kien-thuc-ve-tra`}>
          <Image
            src={'/images/news.webp'}
            w="full"
            h="full"
            alt="Kiến thức pha chế"
            borderRadius={12}
            transition="transform 0.3s ease"
            _hover={{ transform: 'scale(1.05)' }}
          />
        </Link>
        <Link href={`/bai-viet/review-danh-gia-san-pham`}>
          <Image
            src={'/images/news.webp'}
            w="full"
            h="full"
            alt="Kiến thức pha chế"
            borderRadius={12}
            transition="transform 0.3s ease"
            _hover={{ transform: 'scale(1.05)' }}
          />
        </Link>
        <Link href={`/bai-viet/cong-thuc-pha-che`}>
          <Image
            src={'/images/news.webp'}
            w="full"
            h="full"
            alt="Kiến thức pha chế"
            borderRadius={12}
            transition="transform 0.3s ease"
            _hover={{ transform: 'scale(1.05)' }}
          />
        </Link>
      </Flex>
    </Flex>
  );
};

export default FeaturedArticle;
