'use client';

import { useQueryArticleSections } from '../../../services/article.service';
import { IMG_ALT } from '../../../utils/const';
import { convertSlugURL, convertTimestamp } from '../../../utils/helper-server';
import { AspectRatio, Box, Button, Flex, Grid, Heading, Image, Text } from '@chakra-ui/react';
import Link from 'next/link';

const ArticleItem = ({ item }) => {
  const { id, title, imagesUrl, createdDate } = item || {};

  return (
    <Flex direction="column" gap="16px">
      <Link href={`/bai-viet/${convertSlugURL(title)}.${id}`}>
        <AspectRatio ratio={16 / 9} w="full">
          <Image
            src={imagesUrl?.[0]?.replace('https://', 'http://') || '/images/news.webp'}
            w="full"
            h="full"
            alt={IMG_ALT}
            borderRadius={16}
            transition="transform 0.3s ease"
            _hover={{ transform: 'scale(1.05)' }}
          />
        </AspectRatio>
      </Link>

      <Flex direction="column" justify="space-between" gap="12px">
        <Box>
          <Link href={`/bai-viet/${convertSlugURL(title)}.${id}`}>
            <Text
              fontSize={16}
              fontWeight={500}
              lineHeight="22px"
              noOfLines={2}
              h="44px"
              _hover={{ color: '#065FD4' }}
              transition="color 0.2s ease"
            >
              {title}
            </Text>
          </Link>
          <Flex mt="8px" align="center" gap="4px">
            <Image src="/images/clock-outline.webp" w="14px" h="14px" alt={IMG_ALT} />
            <Text color="#A1A1AA" fontSize={14}>
              {convertTimestamp(createdDate)}
            </Text>
          </Flex>
        </Box>

        <Link href={`/bai-viet/${convertSlugURL(title)}.${id}`}>
          <Button
            size="sm"
            bgColor="#065FD4"
            color="#FFF"
            fontSize={14}
            fontWeight={500}
            px="16px"
            h="32px"
            borderRadius={8}
            transition="all 0.2s ease"
            _hover={{ bgColor: '#5d97e3', transform: 'translateY(-1px)' }}
            _active={{ bgColor: '#5d97e3' }}
          >
            Đọc tiếp
          </Button>
        </Link>
      </Flex>
    </Flex>
  );
};

const SectionBlock = ({ section }) => {
  const { label, articles, slug, totalCount } = section;

  if (!articles || articles.length === 0) {
    return null;
  }

  return (
    <Box>
      {/* Section Header */}
      <Flex justify="space-between" align="center" mb="24px">
        <Heading as="h2" fontSize={{ xs: '20px', lg: '24px' }} fontWeight="600" color="#003366">
          {label}
        </Heading>

        <Link href={`/bai-viet/${slug}`}>
          <Button
            variant="outline"
            size="sm"
            borderColor="#065FD4"
            color="#065FD4"
            fontSize={14}
            fontWeight={500}
            px="20px"
            h="36px"
            borderRadius={8}
            _hover={{
              bgColor: '#065FD4',
              color: 'white',
              transform: 'translateY(-1px)'
            }}
            transition="all 0.2s ease"
          >
            Xem tất cả ({totalCount})
          </Button>
        </Link>
      </Flex>

      {/* Articles Grid */}
      <Grid templateColumns={{ xs: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }} gap="24px" mb="48px">
        {articles.slice(0, 3).map((article) => (
          <ArticleItem key={article.id} item={article} />
        ))}
      </Grid>
    </Box>
  );
};

const ArticleSections = () => {
  const { data: sectionsData, isLoading, error } = useQueryArticleSections();
  const { sections = [] } = sectionsData || {};

  if (isLoading) {
    return (
      <Box textAlign="center" py="40px">
        <Text fontSize={16} color="gray.500">
          Đang tải nội dung...
        </Text>
      </Box>
    );
  }

  if (error) {
    return (
      <Box textAlign="center" py="40px">
        <Text fontSize={16} color="red.500">
          Có lỗi xảy ra khi tải nội dung. Vui lòng thử lại sau.
        </Text>
      </Box>
    );
  }

  if (!sections || sections.length === 0) {
    return (
      <Box textAlign="center" py="40px">
        <Text fontSize={16} color="gray.500">
          Chưa có nội dung nào.
        </Text>
      </Box>
    );
  }

  return (
    <Box>
      {sections.map((section) => (
        <SectionBlock key={section.type} section={section} />
      ))}
    </Box>
  );
};

export default ArticleSections;
