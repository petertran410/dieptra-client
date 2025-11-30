'use client';

import Breadcrumb from '../../../../components/breadcrumb';
import TableOfContents from '../../../../components/toc';
import { API } from '../../../../utils/API';
import { IMG_ALT, PX_ALL } from '../../../../utils/const';
import { convertSlugURL, convertTimestamp, META_DESCRIPTION, META_KEYWORDS } from '../../../../utils/helper-server';
import { AspectRatio, Box, Button, Flex, Grid, Heading, Image, Text, Spinner } from '@chakra-ui/react';
import Head from 'next/head';
import Link from 'next/link';
import Script from 'next/script';
import { notFound } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from '../../../../hooks/useTranslation';

const VideoEmbed = ({ embedUrl }) => {
  if (!embedUrl) return null;

  return (
    <AspectRatio ratio={16 / 9} w="full" mt="20px" mb="20px">
      <iframe
        src={embedUrl}
        title="Video nhúng"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        style={{ borderRadius: '8px' }}
      />
    </AspectRatio>
  );
};

const LatestArticlesSidebar = ({ articleType, currentArticleId, category }) => {
  const [latestArticles, setLatestArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const { t, getLocalizedText } = useTranslation();

  useEffect(() => {
    const fetchLatestArticles = async () => {
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
        const filtered = content.filter((article) => article.id !== currentArticleId);
        setLatestArticles(filtered.slice(0, 6));
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
        <Text fontSize={18} fontWeight={500} mb="16px">
          {t('article.loading')}
        </Text>
      </Box>
    );
  }

  if (!latestArticles.length) {
    return (
      <Box p="16px" bg="gray.50" borderRadius="8px">
        <Text fontSize={18} fontWeight={500} mb="16px">
          {t('article.newest')}
        </Text>
        <Text fontSize={14} color="gray.500">
          {t('article.no.newest')}
        </Text>
      </Box>
    );
  }

  return (
    <Box>
      <Text fontSize={20} fontWeight={500} mb="16px">
        {t('article.newest')}
      </Text>
      <Flex direction="column" gap="16px">
        {latestArticles.map((article) => (
          <Flex align="flex-start" gap="12px" key={article.id}>
            <Link href={`/bai-viet/${category}/${convertSlugURL(article.title)}`}>
              <Image
                src={article.imagesUrl?.[0]?.replace('http://', 'https://') || '/images/news.webp'}
                w="150px"
                h="100px"
                objectFit="fit"
                borderRadius="8px"
                alt={IMG_ALT}
              />
            </Link>

            <Flex direction="column" gap="4px" flex={1}>
              <Link href={`/bai-viet/${category}/${convertSlugURL(article.title)}`}>
                <Text
                  fontSize={17}
                  fontWeight={500}
                  lineHeight="18px"
                  noOfLines={2}
                  _hover={{ color: '#065FD4' }}
                  transition="color 0.2s"
                >
                  {getLocalizedText(article.title, article.title_en)}
                </Text>
              </Link>

              <Text fontSize={15} color="#A1A1AA">
                {convertTimestamp(article.createdDate)}
              </Text>
            </Flex>
          </Flex>
        ))}
      </Flex>
    </Box>
  );
};

const getBreadcrumbData = (categoryData, articleTitle) => {
  const { t, getLocalizedText } = useTranslation();

  if (categoryData) {
    return [
      { title: t('article.breadcrumb.title.home'), href: '/' },
      { title: t('article.breadcrumb.title.article'), href: '/bai-viet' },
      { title: getLocalizedText(categoryData.name, categoryData.name_en), href: categoryData.href },
      { title: articleTitle, href: '#', isActive: true }
    ];
  }

  return [
    { title: t('article.breadcrumb.title.home'), href: '/' },
    { title: t('article.breadcrumb.title.article'), href: '/bai-viet' },
    { title: articleTitle, href: '#', isActive: true }
  ];
};

const ArticleDetailClient = ({ params, categoryData }) => {
  const { category, slug } = params;
  const [newsDetail, setNewsDetail] = useState(null);
  const [articleId, setArticleId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const hasIncrementedRef = useRef(false);
  const { t, getLocalizedText } = useTranslation();

  useEffect(() => {
    hasIncrementedRef.current = false;
  }, [slug]);

  useEffect(() => {
    const fetchArticleDetail = async () => {
      try {
        setLoading(true);

        const idResponse = await API.request({
          url: '/api/news/client/find-id-by-slug',
          params: { slug, type: categoryData.type }
        });

        if (!idResponse?.id) {
          setError('Article not found');
          return;
        }

        setArticleId(idResponse.id);

        const newsDetail = await API.request({
          url: `/api/news/client/${idResponse.id}`
        });

        if (!newsDetail) {
          setError('Article not found');
          return;
        }

        if (newsDetail.type !== categoryData.type) {
          setError('Article type mismatch');
          return;
        }

        setNewsDetail(newsDetail);

        if (!hasIncrementedRef.current) {
          hasIncrementedRef.current = true;

          const incrementResult = await API.request({
            url: `/api/news/client/increment-view/${idResponse.id}`,
            method: 'POST'
          });

          if (incrementResult?.newView !== undefined) {
            setNewsDetail((prev) => ({
              ...prev,
              viewCount: incrementResult.newView
            }));
          }
        } else {
        }
      } catch (error) {
        console.error('❌ Error:', error);
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

  const {
    title,
    title_en,
    htmlContent,
    html_content_en,
    createdDate,
    imagesUrl,
    description,
    description_en,
    type,
    embedUrl,
    titleMeta
  } = newsDetail;

  console.log(newsDetail);

  const breadcrumbData = getBreadcrumbData(categoryData, getLocalizedText(title, title_en));

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
    name: getLocalizedText(title, title_en),
    alternativeHeadline: title,
    headline: title,
    url: `${process.env.NEXT_PUBLIC_API_DOMAIN}/bai-viet/${category}/${slug}`,
    description: getLocalizedText(description, description_en) || '',
    disambiguatingDescription: title,
    mainEntityOfPage: `${process.env.NEXT_PUBLIC_API_DOMAIN}/bai-viet/${category}/${slug}`,
    image: imagesUrl || [],
    thumbnailUrl: imagesUrl?.[0]?.replace('http://', 'https://') || '',
    datePublished: createdDate || new Date().toISOString(),
    dateModified: createdDate || new Date().toISOString(),
    author: {
      '@type': 'Organization',
      name: 'Diệp Trà',
      url: process.env.NEXT_PUBLIC_DOMAIN
    },
    publisher: {
      '@type': 'Organization',
      name: 'Diệp Trà',
      logo: {
        '@type': 'ImageObject',
        url: `${process.env.NEXT_PUBLIC_DOMAIN}/images/logo.png`
      }
    },
    articleBody: description || '',
    genre: title,
    creativeWorkStatus: 'Published'
  };

  return (
    <>
      <Head>
        <title>{titleMeta}</title>
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
        <Flex flex={2 / 3} direction="column">
          <Breadcrumb data={breadcrumbData} />

          <Text as="h1" fontSize={28} fontWeight={600} mt="20px" lineHeight="30px">
            {getLocalizedText(title, title_en)}
          </Text>
          <Text mt="12px" color="#A1A1AA" fontSize={18}>
            {t('article.time.article')}: {convertTimestamp(createdDate)}
          </Text>
          <Text mt="16px" fontWeight={500} fontSize={20}>
            {getLocalizedText(description, description_en)}
          </Text>

          {htmlContent && !htmlContent.startsWith('<toc></toc>') && (
            <Box my="24px" borderRadius={8} border="1px solid #CCC" px="16px" py="12px">
              <Text fontWeight={700} fontSize={20}>
                {t('article.catalogue')}
              </Text>
              <TableOfContents html={getLocalizedText(htmlContent, html_content_en)} />
            </Box>
          )}

          <AspectRatio ratio={16 / 9} w="full" mt="20px">
            <Image
              src={imagesUrl?.[0]?.replace('http://', 'https://') || '/images/news.webp'}
              w="full"
              h="full"
              alt={IMG_ALT}
            />
          </AspectRatio>

          <VideoEmbed embedUrl={embedUrl} />

          <div
            className="html-content"
            style={{ marginTop: '20px', fontSize: '18px', lineHeight: '20px' }}
            dangerouslySetInnerHTML={{ __html: getLocalizedText(htmlContent, html_content_en) }}
          />
        </Flex>

        <Flex flex={1 / 3} direction="column">
          {articleId && <LatestArticlesSidebar articleType={type} currentArticleId={articleId} category={category} />}
        </Flex>
      </Flex>
    </>
  );
};

export default ArticleDetailClient;
