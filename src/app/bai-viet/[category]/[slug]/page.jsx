import Breadcrumb from '../../../../components/breadcrumb';
import TableOfContents from '../../../../components/toc';
import { API } from '../../../../utils/API';
import { ARTICLE_SECTIONS, getArticleTypeBySlug } from '../../../../utils/article-types';
import { IMG_ALT, PX_ALL } from '../../../../utils/const';
import { convertSlugURL, convertTimestamp, META_DESCRIPTION, META_KEYWORDS } from '../../../../utils/helper-server';
import { AspectRatio, Box, Button, Flex, Grid, Heading, Image, Text, VStack, Spinner } from '@chakra-ui/react';
import Head from 'next/head';
import Link from 'next/link';
import Script from 'next/script';
import { notFound } from 'next/navigation';
import { useEffect, useState } from 'react';

// METADATA GENERATION - Server component
export async function generateMetadata({ params }) {
  const { category, slug } = params;

  // Validate category
  const categoryData = getArticleTypeBySlug(category);
  if (!categoryData) {
    return {
      title: 'Không tìm thấy trang | Diệp Trà',
      description: META_DESCRIPTION
    };
  }

  try {
    // Tìm ID từ slug và type
    const idResponse = await fetch(
      `${process.env.NEXT_PUBLIC_API_DOMAIN}/api/news/client/find-id-by-slug?slug=${slug}&type=${categoryData.type}`
    );

    if (!idResponse.ok) {
      throw new Error('ID not found');
    }

    const idData = await idResponse.json();

    if (!idData?.id) {
      throw new Error('Article ID not found');
    }

    // Lấy detail bằng ID
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_DOMAIN}/api/news/client/${idData.id}`);

    if (!response.ok) {
      throw new Error('Article not found');
    }

    const data = await response.json();

    const { title: titleData, imagesUrl, description } = data || {};
    const imageUrl = imagesUrl?.[0]?.replace('https://', 'http://') || '/images/preview.webp';
    const title = `${titleData} | Diệp Trà`;

    return {
      title,
      description: description || META_DESCRIPTION,
      keywords: META_KEYWORDS,
      openGraph: {
        title,
        description: description || META_DESCRIPTION,
        images: [
          {
            url: imageUrl,
            width: 800,
            height: 600,
            alt: title
          }
        ],
        type: 'article',
        siteName: 'Diệp Trà'
      },
      twitter: {
        card: 'summary_large_image',
        title: title,
        description: description || META_DESCRIPTION,
        images: [imageUrl]
      },
      alternates: {
        canonical: `${process.env.NEXT_PUBLIC_DOMAIN}/bai-viet/${category}/${slug}`
      }
    };
  } catch (error) {
    console.error('Metadata generation error:', error);
    return {
      title: 'Bài viết | Diệp Trà',
      description: META_DESCRIPTION
    };
  }
}

// Component cho related articles
const RelatedArticlesSection = ({ articleType, currentArticleId, category }) => {
  const [relatedArticles, setRelatedArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRelatedArticles = async () => {
      try {
        const response = await API.request({
          url: `/api/news/client/related/${currentArticleId}`,
          params: { limit: 4 }
        });

        if (response && Array.isArray(response)) {
          setRelatedArticles(response);
        }
      } catch (error) {
        console.error('Error fetching related articles:', error);
      } finally {
        setLoading(false);
      }
    };

    if (currentArticleId) {
      fetchRelatedArticles();
    }
  }, [currentArticleId]);

  if (loading) {
    return (
      <Box mt="40px">
        <Text fontSize={20} fontWeight={600} mb="20px">
          Bài viết liên quan
        </Text>
        <Flex justify="center" py="20px">
          <Spinner size="md" color="#065FD4" />
        </Flex>
      </Box>
    );
  }

  if (!relatedArticles.length) {
    return null;
  }

  return (
    <Box mt="40px">
      <Text fontSize={20} fontWeight={600} mb="20px">
        Bài viết liên quan
      </Text>
      <Grid templateColumns={{ xs: '1fr', md: 'repeat(2, 1fr)' }} gap="24px">
        {relatedArticles.map((article) => (
          <Flex align="flex-start" gap="12px" key={article.id}>
            <Link href={`/bai-viet/${category}/${convertSlugURL(article.title)}`}>
              <AspectRatio ratio={16 / 9} w="120px">
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
              <Link href={`/bai-viet/${category}/${convertSlugURL(article.title)}`}>
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

              <Link href={`/bai-viet/${category}/${convertSlugURL(article.title)}`}>
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

// Component cho sidebar latest articles
const LatestArticlesSidebar = ({ articleType, currentArticleId, category }) => {
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
        const filtered = content.filter((article) => article.id !== currentArticleId);
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
        <Text fontSize={16} fontWeight={500} mb="16px">
          Đang tải...
        </Text>
      </Box>
    );
  }

  if (!latestArticles.length) {
    return (
      <Box p="16px" bg="gray.50" borderRadius="8px">
        <Text fontSize={16} fontWeight={500} mb="16px">
          Bài viết mới nhất
        </Text>
        <Text fontSize={14} color="gray.500">
          Chưa có bài viết mới
        </Text>
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
            <Link href={`/bai-viet/${category}/${convertSlugURL(article.title)}`}>
              <Image
                src={article.imagesUrl?.[0]?.replace('https://', 'http://') || '/images/news.webp'}
                w="80px"
                h="60px"
                objectFit="cover"
                borderRadius="8px"
                alt={IMG_ALT}
              />
            </Link>

            <Flex direction="column" gap="4px" flex={1}>
              <Link href={`/bai-viet/${category}/${convertSlugURL(article.title)}`}>
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

              <Text fontSize={12} color="#A1A1AA">
                {convertTimestamp(article.createdDate)}
              </Text>
            </Flex>
          </Flex>
        ))}
      </Flex>
    </Box>
  );
};

// Helper function để tạo breadcrumb data
const getBreadcrumbData = (category, articleTitle) => {
  const section = getArticleTypeBySlug(category);

  if (section) {
    return [
      { title: 'Trang chủ', href: '/' },
      { title: 'Bài Viết', href: '/bai-viet' },
      { title: section.label, href: section.href },
      { title: articleTitle, href: '#', isActive: true }
    ];
  }

  // Fallback
  return [
    { title: 'Trang chủ', href: '/' },
    { title: 'Bài Viết', href: '/bai-viet' },
    { title: articleTitle, href: '#', isActive: true }
  ];
};

// Main component - CHUYỂN THÀNH CLIENT COMPONENT
const ArticleDetail = ({ params }) => {
  const { category, slug } = params;
  const [newsDetail, setNewsDetail] = useState(null);
  const [articleId, setArticleId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Validate category
  const categoryData = getArticleTypeBySlug(category);

  useEffect(() => {
    if (!categoryData) {
      setError('Category not found');
      setLoading(false);
      return;
    }

    const fetchArticleDetail = async () => {
      try {
        setLoading(true);

        // Step 1: Tìm ID từ slug và type
        const idResponse = await API.request({
          url: '/api/news/client/find-id-by-slug',
          params: { slug, type: categoryData.type }
        });

        if (!idResponse?.id) {
          setError('Article not found');
          return;
        }

        setArticleId(idResponse.id);

        // Step 2: Lấy detail bằng ID
        const newsDetail = await API.request({
          url: `/api/news/client/${idResponse.id}`
        });

        if (!newsDetail) {
          setError('Article not found');
          return;
        }

        // Verify article belongs to correct category
        if (newsDetail.type !== categoryData.type) {
          setError('Article type mismatch');
          return;
        }

        setNewsDetail(newsDetail);
      } catch (error) {
        console.error('Error fetching article:', error);
        setError('Failed to fetch article');
      } finally {
        setLoading(false);
      }
    };

    fetchArticleDetail();
  }, [category, slug, categoryData]);

  if (loading) {
    return (
      <Flex pt={{ xs: '70px', lg: '162px' }} px={PX_ALL} justify="center" align="center" minH="400px">
        <Spinner size="lg" color="#065FD4" />
      </Flex>
    );
  }

  if (error || !newsDetail) {
    notFound();
    return null;
  }

  const { title, htmlContent, createdDate, imagesUrl, description, type } = newsDetail;

  // Tạo breadcrumb data
  const breadcrumbData = getBreadcrumbData(category, title);

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
    url: `${process.env.NEXT_PUBLIC_API_DOMAIN}/bai-viet/${category}/${slug}`,
    description: description || '',
    disambiguatingDescription: title,
    mainEntityOfPage: `${process.env.NEXT_PUBLIC_API_DOMAIN}/bai-viet/${category}/${slug}`,
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
        <link rel="canonical" href={`${process.env.NEXT_PUBLIC_DOMAIN}/bai-viet/${category}/${slug}`} />
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

          {/* RELATED ARTICLES */}
          {articleId && <RelatedArticlesSection articleType={type} currentArticleId={articleId} category={category} />}
        </Flex>

        {/* SIDEBAR */}
        <Flex flex={1 / 3} direction="column">
          {articleId && <LatestArticlesSidebar articleType={type} currentArticleId={articleId} category={category} />}
        </Flex>
      </Flex>
    </>
  );
};

export default ArticleDetail;
