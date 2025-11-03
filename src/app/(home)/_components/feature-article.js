'use client';

import { Flex, Image } from '@chakra-ui/react';
import Link from 'next/link';
import { PX_ALL } from '../../../utils/const';
import SectionBlockH3 from '../../../components/section-block/section-block-h3';

const FeaturedArticle = () => {
  return (
    <Flex pt={{ xs: '70px', lg: '0' }} px={PX_ALL} pb="100px" direction="column" gap={4}>
      <SectionBlockH3 title="Bài Viết" />
      <Flex pt={{ xs: '70px', lg: '10px' }} direction={{ xs: 'column', md: 'row' }} gap={{ xs: 6, md: 4 }}>
        <Link href={`/bai-viet/kien-thuc-nguyen-lieu-pha-che`}>
          <Image
            src={'/images/thumbnail-kien-thuc-nguyen-lieu-pha-che.webp'}
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
            src={'/images/thumbnail-kien-thuc-ve-tra.webp'}
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
            src={'/images/thumbnail-danh-gia.webp'}
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
            src={'/images/thumbnail-cong-thuc-pha-che.webp'}
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
