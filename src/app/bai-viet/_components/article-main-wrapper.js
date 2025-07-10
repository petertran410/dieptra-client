// src/app/bai-viet/_components/article-main-wrapper.js - MAIN WRAPPER
'use client';

import Breadcrumb from '../../../components/breadcrumb';
import { API } from '../../../utils/API';
import { ARTICLE_SECTIONS, ARTICLE_TYPE_LABELS } from '../../../utils/article-types';
import { IMG_ALT, PX_ALL } from '../../../utils/const';
import { convertSlugURL, convertTimestamp } from '../../../utils/helper-server';
import { AspectRatio, Box, Button, Flex, Grid, Heading, Image, Text, Spinner, VStack } from '@chakra-ui/react';
import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useState } from 'react';

// Component hiển thị một bài viết
const ArticleCard = ({ article, categorySlug }) => {
  const { id, title, description, imagesUrl, createdDate } = article;

  return (
    <Flex direction="column" gap="16px" h="100%">
      <Link href={`/bai-viet/${categorySlug}/${convertSlugURL(title)}`}>
        <AspectRatio ratio={16 / 9} w="full">
          <Image
            src={imagesUrl?.[0]?.replace('https://', 'http://') || '/images/news.webp'}
            w="full"
            h="full"
            alt={IMG_ALT}
            borderRadius={12}
            transition="transform 0.3s ease"
            _hover={{ transform: 'scale(1.05)' }}
          />
        </AspectRatio>
      </Link>

      <Flex direction="column" justify="space-between" gap="12px" flex={1}>
        <Box>
          <Link href={`/bai-viet/${categorySlug}/${convertSlugURL(title)}`}>
            <Text
              fontSize={18}
              fontWeight={500}
              lineHeight="24px"
              noOfLines={2}
              h="48px"
              _hover={{ color: '#065FD4' }}
              transition="color 0.2s ease"
            >
              {title}
            </Text>
          </Link>

          {description && (
            <Text mt="8px" fontSize={14} color="gray.600" lineHeight="20px" noOfLines={2}>
              {description}
            </Text>
          )}

          <Flex mt="12px" align="center" gap="4px">
            <Image src="/images/clock-outline.webp" w="14px" h="14px" alt={IMG_ALT} />
            <Text color="#A1A1AA" fontSize={14}>
              {convertTimestamp(createdDate)}
            </Text>
          </Flex>
        </Box>

        <Link href={`/bai-viet/${categorySlug}/${convertSlugURL(title)}`}>
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
            w="fit-content"
          >
            Đọc tiếp
          </Button>
        </Link>
      </Flex>
    </Flex>
  );
};

// Component hiển thị một section
const ArticleSection = ({ section, articles, isLoading }) => {
  const { label, slug, href } = section;

  if (isLoading) {
    return (
      <Box mb="50px">
        <Flex justify="space-between" align="center" mb="24px">
          <Heading as="h2" fontSize={24} fontWeight={600} color="#003366">
            {label}
          </Heading>
        </Flex>
        <Flex justify="center" py="40px">
          <Spinner size="lg" color="#065FD4" />
        </Flex>
      </Box>
    );
  }

  if (!articles?.length) {
    return (
      <Box mb="50px">
        <Flex justify="space-between" align="center" mb="24px">
          <Heading as="h2" fontSize={24} fontWeight={600} color="#003366">
            {label}
          </Heading>
          <Link href={href}>
            <Button variant="outline" borderColor="#065FD4" color="#065FD4" size="sm">
              Xem tất cả
            </Button>
          </Link>
        </Flex>
        <Text color="gray.500" textAlign="center" py="20px">
          Chưa có bài viết trong mục này
        </Text>
      </Box>
    );
  }

  return (
    <Box mb="50px">
      {/* Section Header */}
      <Flex justify="space-between" align="center" mb="24px">
        <Heading as="h2" fontSize={24} fontWeight={600} color="#003366">
          {label}
        </Heading>
        <Link href={href}>
          <Button
            variant="outline"
            borderColor="#065FD4"
            color="#065FD4"
            size="sm"
            _hover={{ bgColor: '#065FD4', color: 'white' }}
          >
            Xem tất cả
          </Button>
        </Link>
      </Flex>

      {/* Articles Grid */}
      <Grid
        templateColumns={{
          xs: '1fr',
          md: 'repeat(2, 1fr)',
          lg: 'repeat(3, 1fr)'
        }}
        gap="24px"
      >
        {articles.map((article) => (
          <ArticleCard key={article.id} article={article} categorySlug={slug} />
        ))}
      </Grid>
    </Box>
  );
};

// Main component
const ArticleMainWrapper = () => {
  const [sectionsData, setSectionsData] = useState([]);
  const [loading, setLoading] = useState(true);

  const breadcrumbData = [
    { title: 'Trang chủ', href: '/' },
    { title: 'Bài Viết', href: '/bai-viet', isActive: true }
  ];

  useEffect(() => {
    const fetchArticleSections = async () => {
      try {
        setLoading(true);
        const response = await API.request({ url: '/api/news/client/article-sections' });

        if (response && Array.isArray(response)) {
          setSectionsData(response);
        }
      } catch (error) {
        console.error('Error fetching article sections:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticleSections();
  }, []);

  return (
    <>
      <Head>
        <link rel="canonical" href={`${process.env.NEXT_PUBLIC_DOMAIN}/bai-viet`} />
        <meta name="robots" content="index, follow" />
      </Head>

      <Flex pt={{ xs: '70px', lg: '162px' }} px={PX_ALL} pb="50px" direction="column">
        {/* Breadcrumb */}
        <Breadcrumb data={breadcrumbData} />

        {/* Page Header */}
        <VStack align="start" spacing="16px" mt="20px" mb="40px">
          <Heading as="h1" fontSize={{ xs: '28px', lg: '36px' }} fontWeight={700} color="#003366">
            Bài Viết
          </Heading>
          <Text fontSize={{ xs: '16px', lg: '18px' }} color="gray.600" lineHeight="1.6" maxW="800px">
            Khám phá kho kiến thức phong phú về pha chế, nguyên liệu, xu hướng và những câu chuyện thú vị trong thế giới
            đồ uống. Từ những bí quyết pha chế đến các review sản phẩm chi tiết, tất cả đều được cập nhật liên tục tại
            Diệp Trà.
          </Text>
        </VStack>

        {/* Article Sections */}
        {ARTICLE_SECTIONS.map((section) => {
          const sectionData = sectionsData.find((data) => data.type === section.type);

          return (
            <ArticleSection
              key={section.type}
              section={section}
              articles={sectionData?.articles || []}
              isLoading={loading}
            />
          );
        })}
      </Flex>
    </>
  );
};

export default ArticleMainWrapper;
