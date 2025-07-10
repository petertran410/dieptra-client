'use client';

import Breadcrumb from '../../../components/breadcrumb';
import { useQueryArticlesByType } from '../../../services/article.service';
import { IMG_ALT, PX_ALL } from '../../../utils/const';
import { convertSlugURL, convertTimestamp } from '../../../utils/helper-server';
import { AspectRatio, Box, Button, Flex, Grid, Heading, Image, Text, VStack, Spinner } from '@chakra-ui/react';
import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';

const ArticleItem = ({ item, categorySlug }) => {
  const { id, title, imagesUrl, createdDate, description } = item || {};

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
              noOfLines={3}
              h="72px"
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

// Pagination component
const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  const getPageNumbers = () => {
    const pages = [];
    const showPages = 5; // Hiển thị tối đa 5 trang

    let startPage = Math.max(1, currentPage - Math.floor(showPages / 2));
    let endPage = Math.min(totalPages, startPage + showPages - 1);

    // Điều chỉnh startPage nếu endPage đã đạt giới hạn
    if (endPage - startPage < showPages - 1) {
      startPage = Math.max(1, endPage - showPages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  };

  return (
    <Flex justify="center" mt="40px" gap="8px">
      {/* Previous Button */}
      <Button
        size="sm"
        variant="outline"
        borderColor="#e2e8f0"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        _hover={{ borderColor: '#065FD4', color: '#065FD4' }}
      >
        Trước
      </Button>

      {/* Page Numbers */}
      {getPageNumbers().map((page) => (
        <Button
          key={page}
          size="sm"
          variant={page === currentPage ? 'solid' : 'outline'}
          colorScheme={page === currentPage ? 'blue' : 'gray'}
          onClick={() => onPageChange(page)}
          _hover={page !== currentPage ? { borderColor: '#065FD4', color: '#065FD4' } : {}}
        >
          {page}
        </Button>
      ))}

      {/* Next Button */}
      <Button
        size="sm"
        variant="outline"
        borderColor="#e2e8f0"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        _hover={{ borderColor: '#065FD4', color: '#065FD4' }}
      >
        Tiếp
      </Button>
    </Flex>
  );
};

// Main component
const ArticleSubcategoryTemplate = ({ articleType, title, breadcrumbLabel, description, categorySlug }) => {
  const { data: articlesQuery, isLoading } = useQueryArticlesByType(articleType);
  const { content: articles = [], totalElements = 0, totalPages = 0, number: currentPage = 0 } = articlesQuery || {};

  const [currentPageState, setCurrentPageState] = useState(currentPage + 1); // Convert to 1-based

  const breadcrumbData = [
    { title: 'Trang chủ', href: '/' },
    { title: 'Bài Viết', href: '/bai-viet' },
    { title: breadcrumbLabel, href: '#', isActive: true }
  ];

  const handlePageChange = (page) => {
    setCurrentPageState(page);
    // Update URL params if needed
    const url = new URL(window.location);
    url.searchParams.set('page', page.toString());
    window.history.pushState({}, '', url);

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <Head>
        <link rel="canonical" href={`${process.env.NEXT_PUBLIC_DOMAIN}/bai-viet/${categorySlug}`} />
        <meta name="robots" content="index, follow" />
      </Head>

      <Flex pt={{ xs: '70px', lg: '162px' }} px={PX_ALL} pb="50px" direction="column">
        <Breadcrumb data={breadcrumbData} />

        <VStack align="start" spacing="16px" mt="20px" mb="40px">
          <Heading as="h1" fontSize={{ xs: '28px', lg: '36px' }} fontWeight={700} color="#003366">
            {title}
          </Heading>
          <Text fontSize={{ xs: '16px', lg: '18px' }} color="gray.600" lineHeight="1.6" maxW="800px">
            {description}
          </Text>
          {totalElements > 0 && (
            <Text fontSize={14} color="gray.500">
              Tổng cộng {totalElements} bài viết
            </Text>
          )}
        </VStack>

        {isLoading ? (
          <Flex justify="center" py="60px">
            <Spinner size="lg" color="#065FD4" />
          </Flex>
        ) : articles.length > 0 ? (
          <>
            <Grid
              templateColumns={{
                xs: '1fr',
                md: 'repeat(2, 1fr)',
                lg: 'repeat(3, 1fr)'
              }}
              gap="24px"
            >
              {articles.map((article) => (
                <ArticleItem key={article.id} item={article} categorySlug={categorySlug} />
              ))}
            </Grid>

            {/* Pagination */}
            <Pagination currentPage={currentPageState} totalPages={totalPages} onPageChange={handlePageChange} />
          </>
        ) : (
          <Flex justify="center" py="60px">
            <VStack spacing="16px">
              <Text fontSize={18} color="gray.500">
                Chưa có bài viết nào trong mục này
              </Text>
              <Link href="/bai-viet">
                <Button colorScheme="blue" variant="outline">
                  Xem tất cả bài viết
                </Button>
              </Link>
            </VStack>
          </Flex>
        )}
      </Flex>
    </>
  );
};

export default ArticleSubcategoryTemplate;
