import Breadcrumb from '../../../components/breadcrumb';
import TableOfContents from '../../../components/toc';
import { API } from '../../../utils/API';
import { IMG_ALT, PX_ALL } from '../../../utils/const';
import { convertSlugURL, convertTimestamp, META_DESCRIPTION, META_KEYWORDS } from '../../../utils/helper-server';
import { AspectRatio, Box, Flex, Image, Text } from '@chakra-ui/react';
import Head from 'next/head';
import Link from 'next/link';
import Script from 'next/script';

export async function generateMetadata({ params }) {
  const { slug } = params;
  const id = slug.split('.').pop();
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_DOMAIN}/api/news/${id}`);
  const data = await response.json();

  const { title: titleData, imagesUrl } = data || {};
  const imageUrl = imagesUrl?.[0]?.replace('http://', 'https://') || '/images/preview.png';
  const title = `${titleData} | Diệp Trà`;
  const description = META_DESCRIPTION;

  return {
    title,
    description: description || '',
    openGraph: {
      title,
      description: description || '',
      images: [
        {
          url: imageUrl,
          width: 800,
          height: 600,
          alt: title
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title: title,
      description: description || '',
      images: [imageUrl]
    }
  };
}

const NewsDetail = async ({ params }) => {
  const { slug } = params;
  const id = slug.split('.').pop();
  const newsDetail = await API.request({ url: `/api/news/client/${id}` });
  const newsListQuery = await API.request({ url: '/api/news/get-all', params: { pageSize: 6, type: 'NEWS' } });
  const { content: newsList = [] } = newsListQuery || {};

  if (!newsDetail) {
    return null;
  }

  const { title, htmlContent, createdDate, imagesUrl, description } = newsDetail;

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
    url: `${process.env.NEXT_PUBLIC_API_DOMAIN}/tin-tuc/${slug}`,
    description: description || '',
    disambiguatingDescription: title,
    mainEntityOfPage: `${process.env.NEXT_PUBLIC_API_DOMAIN}/tin-tuc/${slug}`,
    image: imagesUrl || [],
    thumbnailUrl: imagesUrl?.[0]?.replace('http://', 'https://') || '',
    articleBody: description || '',
    genre: title,
    creativeWorkStatus: 'Published'
  };

  return (
    <>
      <Head>
        <link rel="canonical" href={`${process.env.NEXT_PUBLIC_DOMAIN}/tin-tuc/${slug}`} />
      </Head>
      <Script
        id="json-ld-tin-tuc"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
      <Flex
        pt={{ xs: '70px', lg: '162px' }}
        px={PX_ALL}
        gap={{ xs: '50px', lg: '24px' }}
        pb="50px"
        direction={{ xs: 'column', lg: 'row' }}
      >
        <Flex flex={2 / 3} direction="column">
          <Breadcrumb
            data={[
              { title: 'Tin tức', href: '/tin-tuc' },
              { title: 'Bài viết', href: `/tin-tuc/${slug}`, isActive: true }
            ]}
          />
          <Text as="h1" fontSize={24} fontWeight={600} mt="20px" lineHeight="30px">
            {title}
          </Text>
          <Text mt="20px" color="#A1A1AA">
            Ngày đăng: {convertTimestamp(createdDate)}
          </Text>
          <Text mt="16px" fontWeight={500} fontSize={16}>
            {description}
          </Text>

          {!!htmlContent?.startsWith('<toc></toc>') && (
            <Box my="24px" className="html-content" borderRadius={8} border="1px solid #CCC" px="16px" py="12px">
              <Text fontWeight={700} fontSize={18}>
                Mục lục
              </Text>
              <TableOfContents html={htmlContent} />
            </Box>
          )}

          <AspectRatio ratio={16 / 9} w="full" mt="20px">
            <Image
              src={imagesUrl?.[0]?.replace('http://', 'https://') || '/images/news.png'}
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
        </Flex>
        <Flex flex={1 / 3} gap="16px" direction="column">
          {Array.isArray(newsList) && !!newsList.length && (
            <>
              <Text fontSize={16} fontWeight={500}>
                Bài viết liên quan
              </Text>
              {newsList
                ?.filter((i) => i.id !== Number(id))
                ?.map((item) => {
                  return (
                    <Flex align="flex-start" gap="16px" key={item?.id}>
                      <Link href={`/tin-tuc/${convertSlugURL(item?.title)}.${item?.id}`}>
                        <Image
                          src={item?.imagesUrl?.[0]?.replace('http://', 'https://') || '/images/news.png'}
                          alt={IMG_ALT}
                          w={{ xs: '120px', lg: '154px' }}
                          h={{ xs: '120px', lg: '154px' }}
                          fit="cover"
                          borderRadius={16}
                        />
                      </Link>

                      <Flex flex={1} direction="column" justify="space-between" h={{ xs: '120px', lg: '154px' }}>
                        <Flex direction="column">
                          <Link href={`/tin-tuc/${convertSlugURL(item?.title)}.${item?.id}`}>
                            <Text noOfLines={4} fontSize={16} fontWeight={500} lineHeight="20px">
                              {item?.title}
                            </Text>
                          </Link>
                          <Text mt="4px" color="#A1A1AA">
                            {convertTimestamp(item?.createdDate)}
                          </Text>
                        </Flex>
                        <Flex justify="flex-end">
                          <Link href={`/tin-tuc/${convertSlugURL(item?.title)}.${item?.id}`}>
                            <Flex
                              align="center"
                              justify="center"
                              bgColor="transparent"
                              border="1px solid"
                              borderColor="#065FD4"
                              color="#065FD4"
                              w="86px"
                              h="32px"
                              gap="4px"
                              fontSize={16}
                              borderRadius={8}
                              fontWeight={500}
                              transitionDuration="250ms"
                              _hover={{ bgColor: '#0f2c3d', borderColor: '#0f2c3d', color: '#FFF' }}
                            >
                              Đọc tiếp
                            </Flex>
                          </Link>
                        </Flex>
                      </Flex>
                    </Flex>
                  );
                })}
            </>
          )}
        </Flex>
      </Flex>
    </>
  );
};

export default NewsDetail;
