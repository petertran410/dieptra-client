'use client';

import Breadcrumb from '../../../components/breadcrumb';
import TableOfContents from '../../../components/toc';
import { API } from '../../../utils/API';
import { ARTICLE_SECTIONS } from '../../../utils/article-types';
import { IMG_ALT, PX_ALL } from '../../../utils/const';
import { convertSlugURL, convertTimestamp, META_DESCRIPTION, META_KEYWORDS } from '../../../utils/helper-server';
import { AspectRatio, Box, Button, Flex, Grid, Heading, Image, Text } from '@chakra-ui/react';
import Head from 'next/head';
import Link from 'next/link';
import Script from 'next/script';
import { useEffect, useState } from 'react';

// Component chính NewsDetail
const NewsDetail = ({ params }) => {
  const { slug } = params;
  const id = slug.split('.').pop();
  const [newsDetail, setNewsDetail] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNewsDetail = async () => {
      try {
        const data = await API.request({ url: `/api/news/client/${id}` });
        setNewsDetail(data);
      } catch (error) {
        console.error('Error fetching news detail:', error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchNewsDetail();
    }
  }, [id]);

// Helper function để tạo breadcrumb data dựa trên type của bài viết
const getBreadcrumbData = (articleType, articleTitle) => {
  const section = ARTICLE_SECTIONS.find(s => s.type === articleType);
  
  if (section) {
    return [
      { title: 'Trang chủ', href: '/' },
      { title: 'Bài Viết', href: '/bai-viet' },
      { title: section.label, href: section.href },
      { title: articleTitle, href: '#', isActive: true }
    ];
  }
  
  // Fallback cho những type không có trong ARTICLE_SECTIONS
  return [
    { title: 'Trang chủ', href: '/' },
    { title: 'Bài Viết', href: '/bai-viet' },
    { title: articleTitle, href: '#', isActive: true }
  ];
};

// Component cho sidebar latest articles (2 bài mới nhất cùng type)
const LatestArticlesSidebar = ({ articleType, currentArticleId }) => {
  const [latestArticles, setLatestArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLatestArticles = async () => {
      try {
        const response = await API.request({
          url: '/api/news/client/get-all',
          params: { 
            pageSize: 3, 
            pageNumber: 0,
            type: articleType 
          }
        });
        
        const { content = [] } = response || {};
        // Filter out current article
        const filtered = content.filter(article => article.id !== currentArticleId);
        setLatestArticles(filtered.slice(0, 2));
      } catch (error) {
        console.error('Error fetching latest articles:', error);
      } finally {
        setLoading(false);
      }
    };

    if (articleType) {
      fetchLatestArticles();
    }
  }, [articleType, currentArticleId]);

  if (loading) {
    return (
      <Box p="16px" bg="gray.50" borderRadius="8px">
        <Text fontSize={16} fontWeight={500} mb="16px">Đang tải...</Text>
      </Box>
    );
  }

  if (!latestArticles.length) {
    return (
      <Box p="16px" bg="gray.50" borderRadius="8px">
        <Text fontSize={16} fontWeight={500} mb="16px">Bài viết mới nhất</Text>
        <Text fontSize={14} color="gray.500">Chưa có bài viết mới</Text>
      </Box>
    );
  }

  return (
    <Box>
      <Text fontSize={16} fontWeight={500} mb="16px">
        Bài viết mới nhất
      </Text>
      <Flex direction="column" gap="16px">
        {latestArticles.map((article) => (
          <Flex align="flex-start" gap="12px" key={article.id}>
            <Link href={`/bai-viet/${convertSlugURL(article.title)}.${article.id}`}>
              <Image
                src={article.imagesUrl?.[0]?.replace('https://', 'http://') || '/images/news.webp'}
                alt={IMG_ALT}
                w="80px"
                h="60px"
                objectFit="cover"
                borderRadius={8}
                transition="transform 0.2s"
                _hover={{ transform: 'scale(1.05)' }}
              />
            </Link>
            
            <Flex direction="column" flex={1}>
              <Link href={`/bai-viet/${convertSlugURL(article.title)}.${article.id}`}>
                <Text 
                  fontSize={14} 
                  fontWeight={500} 
                  lineHeight="18px" 
                  noOfLines={2}
                  _hover={{ color: '#065FD4' }}
                  transition="color 0.2s"
                >
                  {article.title}
                </Text>
              </Link>
              <Text mt="4px" fontSize={12} color="#A1A1AA">
                {convertTimestamp(article.createdDate)}
              </Text>
            </Flex>
          </Flex>
        ))}
      </Flex>
    </Box>
  );
};

// Component cho related articles ở cuối trang
const RelatedArticlesSection = ({ articleType, currentArticleId }) => {
  const [relatedArticles, setRelatedArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRelatedArticles = async () => {
      try {
        const response = await API.request({
          url: '/api/news/client/get-all',
          params: { 
            pageSize: 7, 
            pageNumber: 0,
            type: articleType 
          }
        });
        
        const { content = [] } = response || {};
        // Filter out current article
        const filtered = content.filter(article => article.id !== currentArticleId);
        setRelatedArticles(filtered.slice(0, 6));
      } catch (error) {
        console.error('Error fetching related articles:', error);
      } finally {
        setLoading(false);
      }
    };

    if (articleType) {
      fetchRelatedArticles();
    }
  }, [articleType, currentArticleId]);

  if (loading) {
    return (
      <Box mt="48px" textAlign="center">
        <Text>Đang tải bài viết liên quan...</Text>
      </Box>
    );
  }

  if (!relatedArticles.length) {
    return null;
  }

  return (
    <Box mt="48px">
      <Heading as="h2" fontSize={24} fontWeight={600} mb="24px" color="#003366">
        Bài viết liên quan
      </Heading>
      
      <Grid
        templateColumns={{ xs: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }}
        gap="24px"
      >
        {relatedArticles.map((article) => (
          <Flex direction="column" gap="12px" key={article.id}>
            <Link href={`/bai-viet/${convertSlugURL(article.title)}.${article.id}`}>
              <AspectRatio ratio={16 / 9} w="full">
                <Image
                  src={article.imagesUrl?.[0]?.replace('https://', 'http://') || '/images/news.webp'}
                  w="full"
                  h="full"
                  alt={IMG_ALT}
                  borderRadius={12}
                  transition="transform 0.3s ease"
                  _hover={{ transform: 'scale(1.05)' }}
                />
              </AspectRatio>
            </Link>
            
            <Flex direction="column" gap="8px">
              <Link href={`/bai-viet/${convertSlugURL(article.title)}.${article.id}`}>
                <Text 
                  fontSize={16} 
                  fontWeight={500} 
                  lineHeight="22px" 
                  noOfLines={2}
                  _hover={{ color: '#065FD4' }}
                  transition="color 0.2s"
                >
                  {article.title}
                </Text>
              </Link>
              
              <Text fontSize={14} color="#A1A1AA">
                {convertTimestamp(article.createdDate)}
              </Text>
              
              <Link href={`/bai-viet/${convertSlugURL(article.title)}.${article.id}`}>
                <Button
                  size="sm"
                  variant="outline"
                  borderColor="#065FD4"
                  color="#065FD4"
                  fontSize={14}
                  _hover={{ bgColor: '#065FD4', color: 'white' }}
                  w="fit-content"
                >
                  Đọc tiếp
                </Button>
              </Link>
            </Flex>
          </Flex>
        ))}
      </Grid>
    </Box>
  );
};

const NewsDetail = ({ params }) => {
  const { slug } = params;
  const id = slug.split('.').pop();
  const [newsDetail, setNewsDetail] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNewsDetail = async () => {
      try {
        const data = await API.request({ url: `/api/news/client/${id}` });
        setNewsDetail(data);
      } catch (error) {
        console.error('Error fetching news detail:', error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchNewsDetail();
    }
  }, [id]);

  if (loading) {
    return (
      <Flex
        pt={{ xs: '70px', lg: '162px' }}
        px={PX_ALL}
        pb="50px"
        justify="center"
        align="center"
        minH="400px"
      >
        <Text fontSize={18}>Đang tải...</Text>
      </Flex>
    );
  }

  if (!newsDetail) {
    return (
      <Flex
        pt={{ xs: '70px', lg: '162px' }}
        px={PX_ALL}
        pb="50px"
        justify="center"
        align="center"
        minH="400px"
      >
        <Text fontSize={18} color="red.500">Không tìm thấy bài viết</Text>
      </Flex>
    );
  }

  const { title, htmlContent, createdDate, imagesUrl, description, type } = newsDetail;

  // Tạo breadcrumb data dựa trên type của bài viết
  const breadcrumbData = getBreadcrumbData(type, title);

  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    inLanguage: 'vi-VN',
    isFamilyFriendly: true,
    isAccessibleForFree: 'true',
    articleSection: ['amusements', 'culture', 'arts', 'lifestyle'],
    copyrightYear: '2025',
    typicalAgeRange: '22-50',
    accessModeSufficient: ['textual', 'visual'],
    accessMode: ['visual'],
    schemaVersion: '10.0',
    additionalType: [
      'https://www.google.com/search?q=Di%E1%BB%87p+Tr%C3%A0',
      'https://www.facebook.com/dieptra.0788339379',
      'https://shopee.vn/nguyenlieu.royaltea'
    ],
    keywords: META_KEYWORDS,
    backstory: description || '',
    exampleOfWork: META_KEYWORDS,
    sameAs: [
      'https://www.google.com/search?q=Di%E1%BB%87p+Tr%C3%A0',
      'https://www.facebook.com/dieptra.0788339379',
      'https://shopee.vn/nguyenlieu.royaltea'
    ],
    abstract: title,
    name: title,
    alternativeHeadline: title,
    headline: title,
    url: `${process.env.NEXT_PUBLIC_API_DOMAIN}/bai-viet/${slug}`,
    description: description || '',
    disambiguatingDescription: title,
    mainEntityOfPage: `${process.env.NEXT_PUBLIC_API_DOMAIN}/bai-viet/${slug}`,
    image: imagesUrl || [],
    thumbnailUrl: imagesUrl?.[0]?.replace('https://', 'http://') || '',
    articleBody: description || '',
    genre: title,
    creativeWorkStatus: 'Published'
  };

  return (
    <>
      <Head>
        <title>{title} | Diệp Trà</title>
        <meta name="description" content={description || META_DESCRIPTION} />
        <link rel="canonical" href={`${process.env.NEXT_PUBLIC_DOMAIN}/bai-viet/${slug}`} />
      </Head>
      <Script
        id="json-ld-bai-viet"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
      <Flex
        pt={{ xs: '70px', lg: '162px' }}
        px={PX_ALL}
        gap={{ xs: '32px', lg: '24px' }}
        pb="50px"
        direction={{ xs: 'column', lg: 'row' }}
      >
        {/* MAIN CONTENT */}
        <Flex flex={2 / 3} direction="column">
          <Breadcrumb data={breadcrumbData} />
          
          <Text as="h1" fontSize={24} fontWeight={600} mt="20px" lineHeight="30px">
            {title}
          </Text>
          <Text mt="20px" color="#A1A1AA">
            Ngày đăng: {convertTimestamp(createdDate)}
          </Text>
          <Text mt="16px" fontWeight={500} fontSize={16}>
            {description}
          </Text>

          {htmlContent && !htmlContent.startsWith('<toc></toc>') && (
            <Box my="24px" className="html-content" borderRadius={8} border="1px solid #CCC" px="16px" py="12px">
              <Text fontWeight={700} fontSize={18}>
                Mục lục
              </Text>
              <TableOfContents html={htmlContent} />
            </Box>
          )}

          <AspectRatio ratio={16 / 9} w="full" mt="20px">
            <Image
              src={imagesUrl?.[0]?.replace('https://', 'http://') || '/images/news.webp'}
              w="full"
              h="full"
              alt={IMG_ALT}
            />
          </AspectRatio>

          <Box
            mt="20px"
            className="html-content"
            fontSize={16}
            lineHeight="20px"
            dangerouslySetInnerHTML={{
              __html: htmlContent
            }}
          />

          {/* RELATED ARTICLES - DI CHUYỂN XUỐNG CUỐI */}
          <RelatedArticlesSection 
            articleType={type} 
            currentArticleId={id}
          />
        </Flex>

        {/* SIDEBAR - LATEST ARTICLES */}
        <Flex flex={1 / 3} direction="column">
          <LatestArticlesSidebar 
            articleType={type} 
            currentArticleId={id}
          />
        </Flex>
      </Flex>
    </>
  );
};

export default NewsDetail;