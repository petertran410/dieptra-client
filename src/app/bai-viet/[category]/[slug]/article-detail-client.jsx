'use client';

import Breadcrumb from '../../../../components/breadcrumb';
import TableOfContents from '../../../../components/toc';
import { API } from '../../../../utils/API';
import { IMG_ALT, PX_ALL } from '../../../../utils/const';
import { convertSlugURL, convertTimestamp } from '../../../../utils/helper-server';
import { AspectRatio, Box, Flex, Heading, Image, Text } from '@chakra-ui/react';
import NextImage from 'next/image';
import Link from 'next/link';
import { useEffect, useRef } from 'react';
import FounderAuthorBox from '../../../../components/founder-author-box';

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
  if (!latestArticles?.length) return null;

  return (
    <Box>
      <Text fontSize={20} fontWeight={500} mb="16px">
        {'Bài viết mới nhất'}
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
                  {article.title}
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

  const { title, htmlContent, createdDate, imagesUrl, description, embedUrl } = newsDetail;

  const localizedTitle = title;
  const localizedDescription = description;
  const localizedHtml = htmlContent;

  const breadcrumbData = [
    { title: 'Trang chủ', href: '/' },
    { title: 'Bài Viết', href: '/bai-viet' },
    {
      title: categoryData.name,
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
          <Link
            href="/tac-gia/le-thi-hoang-anh"
            fontSize="24px"
            fontWeight="700"
            color="#0D3B42"
            _hover={{ color: '#00B7CC', textDecoration: 'underline', textUnderlineOffset: '3px' }}
            transition="0.25s ease"
            target="_blank"
          >
            Lê Thị Hoàng Anh
          </Link>
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
              {'Mục lục'}
            </Text>
            <TableOfContents html={localizedHtml} />
          </Box>
        )}

        {imagesUrl?.[0] && (
          <AspectRatio ratio={16 / 9} mt="20px" borderRadius={12} overflow="hidden">
            <NextImage
              src={imagesUrl[0].replace('http://', 'https://')}
              alt={localizedTitle}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 66vw"
              style={{ objectFit: 'cover' }}
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

        <FounderAuthorBox />
      </Flex>

      <Flex flex={1 / 3} direction="column">
        <LatestArticlesSidebar latestArticles={latestArticles} category={category} />
      </Flex>
    </Flex>
  );
}
