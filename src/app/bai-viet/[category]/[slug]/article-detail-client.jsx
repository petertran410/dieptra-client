'use client';

import Breadcrumb from '../../../../components/breadcrumb';
import TableOfContents from '../../../../components/toc';
import { API } from '../../../../utils/API';
import { IMG_ALT, PX_ALL } from '../../../../utils/const';
import { convertSlugURL, convertTimestamp } from '../../../../utils/helper-server';
import { AspectRatio, Box, Flex, Heading, Image, Text } from '@chakra-ui/react';
import Link from 'next/link';
import { useEffect, useRef } from 'react';
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

const LatestArticlesSidebar = ({ latestArticles, category }) => {
  const { t, getLocalizedText } = useTranslation();

  if (!latestArticles?.length) return null;

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
                objectFit="cover"
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

export default function ArticleDetailClient({ params, categoryData, newsDetail, articleId, latestArticles }) {
  const { category, slug } = params;
  const { t, getLocalizedText } = useTranslation();
  const incrementedRef = useRef(false);

  // increment view 1 lần
  useEffect(() => {
    if (incrementedRef.current || !articleId) return;
    incrementedRef.current = true;
    API.request({
      url: `/api/news/client/increment-view/${articleId}`,
      method: 'POST'
    }).catch(() => {});
  }, [articleId]);

  const {
    title,
    title_en,
    htmlContent,
    html_content_en,
    createdDate,
    imagesUrl,
    description,
    description_en,
    embedUrl
  } = newsDetail;

  const localizedTitle = getLocalizedText(title, title_en);
  const localizedDescription = getLocalizedText(description, description_en);
  const localizedHtml = getLocalizedText(htmlContent, html_content_en);

  const breadcrumbData = [
    { title: t('article.breadcrumb.title.home'), href: '/' },
    { title: t('article.breadcrumb.title.article'), href: '/bai-viet' },
    {
      title: getLocalizedText(categoryData.name, categoryData.name_en),
      href: `/bai-viet/${categoryData.slug}`
    },
    { title: localizedTitle, href: '#', isActive: true }
  ];

  return (
    <Flex
      pt={{ xs: '70px', lg: '162px' }}
      px={PX_ALL}
      gap={{ xs: '32px', lg: '24px' }}
      pb="50px"
      direction={{ xs: 'column', lg: 'row' }}
    >
      <Flex flex={2 / 3} direction="column">
        <Breadcrumb data={breadcrumbData} />

        <Heading as="h1" fontSize={28} fontWeight={600} mt="20px" lineHeight="34px">
          {localizedTitle}
        </Heading>

        <Flex align="center" mt="12px" gap="8px">
          <Image src="/images/clock-outline.webp" w="16px" h="16px" alt={IMG_ALT} />
          <Text color="#A1A1AA" fontSize={14}>
            {convertTimestamp(createdDate)}
          </Text>
          {newsDetail.viewCount != null && (
            <Text as="span" color="#A1A1AA" fontSize={14}>
              · {newsDetail.viewCount} views
            </Text>
          )}
        </Flex>

        {localizedDescription && (
          <Text mt="16px" fontWeight={500} fontSize={20}>
            {localizedDescription}
          </Text>
        )}

        {localizedHtml && !localizedHtml.startsWith('<toc></toc>') && (
          <Box my="24px" borderRadius={8} border="1px solid #CCC" px="16px" py="12px">
            <Text fontWeight={700} fontSize={20}>
              {t('article.catalogue')}
            </Text>
            <TableOfContents html={localizedHtml} />
          </Box>
        )}

        {imagesUrl?.[0] && (
          <AspectRatio ratio={16 / 9} mt="20px">
            <Image
              src={imagesUrl[0].replace('http://', 'https://')}
              alt={localizedTitle}
              borderRadius={12}
              objectFit="cover"
            />
          </AspectRatio>
        )}

        <VideoEmbed embedUrl={embedUrl} />

        {localizedHtml && (
          <Box
            mt="24px"
            lineHeight="20px"
            className="html-content"
            dangerouslySetInnerHTML={{ __html: localizedHtml }}
          />
        )}
      </Flex>

      <Flex flex={1 / 3} direction="column">
        <LatestArticlesSidebar latestArticles={latestArticles} category={category} />
      </Flex>
    </Flex>
  );
}
