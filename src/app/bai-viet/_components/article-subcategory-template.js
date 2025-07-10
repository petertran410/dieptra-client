// src/app/bai-viet/_components/article-subcategory-template.js - MỚI
'use client';

import Breadcrumb from '../../../components/breadcrumb';
import { useQueryArticlesByType } from '../../../services/article.service';
import { IMG_ALT, PX_ALL } from '../../../utils/const';
import { convertSlugURL, convertTimestamp } from '../../../utils/helper-server';
import { AspectRatio, Box, Button, Flex, Grid, Heading, Image, Text } from '@chakra-ui/react';
import Link from 'next/link';

const ArticleItem = ({ item, categorySlug }) => {
  const { id, title, imagesUrl, createdDate, description } = item || {};

  return (
    <Flex direction="column" gap="16px" h="100%">
      <Link href={`/bai-viet/${categorySlug}/${convertSlugURL(title)}-${id}`}>
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

      <Flex direction="column" justify="space-between" gap="12px" flex={1}>
        <Box>
          <Link href={`/bai-viet/${categorySlug}/${convertSlugURL(title)}-${id}`}>
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

        <Link href={`/bai-viet/${categorySlug}/${convertSlugURL(title)}-${id}`}>
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
          bgColor={page === currentPage ? '#065FD4' : 'transparent'}
          color={page === currentPage ? 'white' : 'gray.700'}
          borderColor="#e2e8f0"
          onClick={() => onPageChange(page)}
          _hover={{
            borderColor: '#065FD4',
            color: page === currentPage ? 'white' : '#065FD4'
          }}
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

const ArticleSubcategoryTemplate = ({ articleType, title, breadcrumbLabel, description, categorySlug }) => {
  const { data: articlesData, isLoading, error } = useQueryArticlesByType(articleType);
  const { content: articles = [], totalElements = 0, pageable = {} } = articlesData || {};
  const { pageNumber = 0, pageSize = 12 } = pageable;

  const currentPage = pageNumber + 1;
  const totalPages = Math.ceil(totalElements / pageSize);

  const handlePageChange = (page) => {
    const url = new URL(window.location);
    url.searchParams.set('page', page.toString());
    window.history.pushState({}, '', url);
    window.location.reload();
  };

  if (isLoading) {
    return (
      <Flex direction="column" px={PX_ALL} pt={{ xs: '70px', lg: '162px' }} gap="24px">
        <Box textAlign="center" py="40px">
          <Text fontSize={16} color="gray.500">
            Đang tải nội dung...
          </Text>
        </Box>
      </Flex>
    );
  }

  if (error) {
    return (
      <Flex direction="column" px={PX_ALL} pt={{ xs: '70px', lg: '162px' }} gap="24px">
        <Box textAlign="center" py="40px">
          <Text fontSize={16} color="red.500">
            Có lỗi xảy ra khi tải nội dung. Vui lòng thử lại sau.
          </Text>
        </Box>
      </Flex>
    );
  }

  return (
    <Flex direction="column" px={PX_ALL} pt={{ xs: '70px', lg: '162px' }} gap="32px">
      {/* Breadcrumb */}
      <Breadcrumb
        data={[
          { title: 'Trang chủ', href: '/' },
          { title: 'Bài Viết', href: '/bai-viet' },
          { title: breadcrumbLabel, href: '#', isActive: true }
        ]}
      />

      {/* Page Header */}
      <Box>
        <Heading as="h1" fontSize={{ xs: '24px', lg: '32px' }} fontWeight="600" color="#003366" mb="16px">
          {title}
        </Heading>

        {description && (
          <Text fontSize={16} color="gray.600" lineHeight="24px" maxW="800px">
            {description}
          </Text>
        )}

        <Text mt="12px" fontSize={14} color="gray.500">
          Tổng cộng: {totalElements} bài viết
        </Text>
      </Box>

      {/* Articles Grid */}
      {articles && articles.length > 0 ? (
        <>
          <Grid templateColumns={{ xs: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }} gap="32px">
            {articles.map((article) => (
              <ArticleItem key={article.id} item={article} categorySlug={categorySlug} />
            ))}
          </Grid>

          {/* Pagination */}
          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
        </>
      ) : (
        <Box textAlign="center" py="60px">
          <Text fontSize={18} color="gray.500" mb="8px">
            Chưa có bài viết nào trong danh mục này
          </Text>
          <Text fontSize={14} color="gray.400">
            Vui lòng quay lại sau để xem nội dung mới
          </Text>
        </Box>
      )}
    </Flex>
  );
};

export default ArticleSubcategoryTemplate;
