import Breadcrumb from '../../../../components/breadcrumb';
import { IMG_ALT, PX_ALL } from '../../../../utils/const';
import { convertSlugURL, convertTimestamp } from '../../../../utils/helper-server';
import { Box, Button, Flex, Grid, Heading, Image, Text, VStack } from '@chakra-ui/react';
import Link from 'next/link';

const ArticleItem = ({ item, categorySlug }) => {
  const { title, imagesUrl, createdDate, description } = item || {};
  const href = `/bai-viet/${categorySlug}/${convertSlugURL(title)}`;
  return (
    <Flex direction="column" gap="16px" h="100%">
      <Link href={href}>
        <Box w="full" overflow="hidden" borderRadius={12} sx={{ aspectRatio: '16 / 9' }}>
          <Image
            src={imagesUrl?.[0]?.replace('http://', 'https://') || '/images/news.webp'}
            w="full"
            h="full"
            alt={IMG_ALT}
            objectFit="cover"
          />
        </Box>
      </Link>
      <Flex direction="column" justify="space-between" gap="12px" flex={1}>
        <Box>
          <Link href={href}>
            <Text as="h2" fontSize={18} fontWeight={500} lineHeight="24px" noOfLines={3}>
              {title}
            </Text>
          </Link>
          {description && (
            <Text mt={1} fontSize={18} color="gray.600" lineHeight="20px" noOfLines={2}>
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
        <Link href={href}>
          <Button
            size="sm"
            bgColor="#065FD4"
            color="#FFF"
            fontSize={14}
            fontWeight={500}
            px="16px"
            h="32px"
            borderRadius={8}
            w="fit-content"
          >
            Đọc tiếp
          </Button>
        </Link>
      </Flex>
    </Flex>
  );
};

const Pagination = ({ currentPage, totalPages, basePath }) => {
  if (totalPages <= 1) return null;
  const pages = [];
  const showPages = 5;
  let start = Math.max(1, currentPage - Math.floor(showPages / 2));
  let end = Math.min(totalPages, start + showPages - 1);
  if (end - start < showPages - 1) start = Math.max(1, end - showPages + 1);
  for (let i = start; i <= end; i++) pages.push(i);

  const buildHref = (page) => (page > 1 ? `${basePath}/page/${page}` : basePath);

  return (
    <Flex justify="center" mt="40px" gap="8px">
      {currentPage > 1 && (
        <Link href={buildHref(currentPage - 1)}>
          <Button size="sm" variant="outline" borderColor="#e2e8f0">
            Trước
          </Button>
        </Link>
      )}
      {pages.map((p) => (
        <Link key={p} href={buildHref(p)}>
          <Button
            size="sm"
            bgColor={p === currentPage ? '#065FD4' : 'transparent'}
            color={p === currentPage ? 'white' : '#065FD4'}
            borderColor="#065FD4"
            variant={p === currentPage ? 'solid' : 'outline'}
          >
            {p}
          </Button>
        </Link>
      ))}
      {currentPage < totalPages && (
        <Link href={buildHref(currentPage + 1)}>
          <Button size="sm" variant="outline" borderColor="#e2e8f0">
            Tiếp
          </Button>
        </Link>
      )}
    </Flex>
  );
};

export default function ArticleCategoryView({ section, articles, currentPage, totalPages, basePath }) {
  const breadcrumbData = [
    { title: 'Trang chủ', href: '/' },
    { title: 'Bài viết', href: '/bai-viet' },
    { title: section.name, href: '#', isActive: true }
  ];

  return (
    <Flex pt={{ xs: '70px', lg: '162px' }} px={PX_ALL} pb="50px" direction="column">
      <Breadcrumb data={breadcrumbData} />
      <VStack align="start" spacing="16px" mt="20px" mb="40px">
        <Heading as="h1" fontSize={{ xs: '28px', lg: '36px' }} fontWeight={700} color="#003366">
          {section.name}
        </Heading>
      </VStack>

      {articles.length === 0 ? (
        <Flex justify="center" py="60px">
          <Text fontSize={18} color="gray.500">
            Chưa có bài viết
          </Text>
        </Flex>
      ) : (
        <>
          <Grid templateColumns={{ xs: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }} gap="24px">
            {articles.map((a) => (
              <ArticleItem key={a.id} item={a} categorySlug={section.slug} />
            ))}
          </Grid>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            basePath={basePath || `/bai-viet/${section.slug}`}
          />
        </>
      )}
    </Flex>
  );
}
