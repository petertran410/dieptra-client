'use client';

import Breadcrumb from '../../../components/breadcrumb';
import { IMG_ALT, PX_ALL } from '../../../utils/const';
import { convertSlugURL, convertTimestamp } from '../../../utils/helper-server';
import { AspectRatio, Box, Button, Flex, Grid, Heading, Image, Text, Spinner, VStack } from '@chakra-ui/react';
import Link from 'next/link';
import { Suspense, useEffect, useState } from 'react';
import { API } from '../../../utils/API';

const ArticleItem = ({ item, categorySlug }) => {
  const { id, title, imagesUrl, createdDate, description, titleMeta } = item || {};

  return (
    <Flex direction="column" gap="16px" h="100%">
      <Link href={`/bai-viet/${categorySlug}/${convertSlugURL(title)}`}>
        <AspectRatio ratio={16 / 9} w="full">
          <Image
            src={imagesUrl?.[0]?.replace('http://', 'https://') || '/images/news.webp'}
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
              // h="60px"
              _hover={{ color: '#065FD4' }}
              transition="color 0.2s ease"
            >
              {title}
            </Text>
          </Link>

          {description && (
            <Text mt={1} fontSize={16} color="gray.600" lineHeight="20px" noOfLines={2}>
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

// 🚨 NEW: Pagination Component với Suspense-safe implementation
const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  const getPageNumbers = () => {
    const pages = [];
    const showPages = 5;

    let startPage = Math.max(1, currentPage - Math.floor(showPages / 2));
    let endPage = Math.min(totalPages, startPage + showPages - 1);

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

      {getPageNumbers().map((page) => (
        <Button
          key={page}
          size="sm"
          variant={page === currentPage ? 'solid' : 'outline'}
          bgColor={page === currentPage ? '#065FD4' : 'transparent'}
          color={page === currentPage ? 'white' : '#065FD4'}
          borderColor="#065FD4"
          onClick={() => onPageChange(page)}
          _hover={page !== currentPage ? { bgColor: '#065FD4', color: 'white' } : {}}
        >
          {page}
        </Button>
      ))}

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

const ArticlesContent = ({ articleType, categorySlug }) => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const fetchArticles = async (page = 1) => {
    try {
      setLoading(true);
      const response = await API.request({
        url: '/api/news/client/get-all',
        params: {
          pageSize: 9,
          pageNumber: page - 1,
          type: articleType
        }
      });

      const { content = [], totalElements = 0 } = response || {};
      setArticles(content);
      setTotalPages(Math.ceil(totalElements / 9));
    } catch (error) {
      console.error('Error fetching articles:', error);
      setArticles([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (articleType) {
      fetchArticles(currentPage);
    }
  }, [articleType, currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    // Scroll to top when page changes
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) {
    return (
      <Flex justify="center" py="60px">
        <Spinner size="lg" color="#065FD4" />
      </Flex>
    );
  }

  if (!articles.length) {
    return (
      <Flex justify="center" py="60px">
        <Text fontSize={18} color="gray.500">
          Chưa có bài viết nào trong mục này
        </Text>
      </Flex>
    );
  }

  return (
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

      {totalPages > 1 && (
        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
      )}
    </>
  );
};

const ArticleSubcategoryTemplate = ({ articleType, title, breadcrumbLabel, description, categorySlug }) => {
  const breadcrumbData = [
    { title: 'Trang chủ', href: '/' },
    { title: 'Bài Viết', href: '/bai-viet' },
    { title: breadcrumbLabel, href: '#', isActive: true }
  ];

  return (
    <Flex pt={{ xs: '70px', lg: '162px' }} px={PX_ALL} pb="50px" direction="column">
      <Breadcrumb data={breadcrumbData} />

      <VStack align="start" spacing="16px" mt="20px" mb="40px">
        <Heading as="h1" fontSize={{ xs: '28px', lg: '36px' }} fontWeight={700} color="#003366">
          {title}
        </Heading>
        <Text fontSize={{ xs: '16px', lg: '18px' }} color="gray.600" lineHeight="1.6" maxW="full">
          {description}
        </Text>
      </VStack>

      <Suspense
        fallback={
          <Flex justify="center" py="60px">
            <Spinner size="lg" color="#065FD4" />
          </Flex>
        }
      >
        <ArticlesContent articleType={articleType} categorySlug={categorySlug} />
      </Suspense>
    </Flex>
  );
};

export default ArticleSubcategoryTemplate;
