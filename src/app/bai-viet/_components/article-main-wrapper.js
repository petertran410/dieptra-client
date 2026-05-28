import Breadcrumb from '../../../components/breadcrumb';
import { ARTICLE_SECTIONS } from '../../../utils/article-types';
import { IMG_ALT, PX_ALL } from '../../../utils/const';
import { convertSlugURL } from '../../../utils/helper-server';
import { AspectRatio, Box, Button, Flex, Grid, Heading, Image, Text, VStack } from '@chakra-ui/react';
import Link from 'next/link';

const ArticleCard = ({ article, categorySlug }) => {
  const { title, description, imagesUrl } = article;
  const href = `/bai-viet/${categorySlug}/${convertSlugURL(title)}`;
  return (
    <Flex direction="column" gap="16px" h="100%">
      <Link href={href}>
        <AspectRatio ratio={16 / 9} w="full">
          <Image
            src={imagesUrl?.[0]?.replace('http://', 'https://') || '/images/news.webp'}
            w="full"
            h="full"
            alt={IMG_ALT}
            borderRadius={12}
          />
        </AspectRatio>
      </Link>
      <Flex direction="column" justify="space-between" gap="12px" flex={1}>
        <Box>
          <Link href={href}>
            <Text as="h3" fontSize={19} fontWeight={500} lineHeight="24px" noOfLines={2}>
              {title}
            </Text>
          </Link>
          {description && (
            <Text mt={1} fontSize={19} color="gray.600" lineHeight="20px" noOfLines={2}>
              {description}
            </Text>
          )}
        </Box>
        <Link href={href}>
          <Button
            size="sm"
            bgColor="#065FD4"
            color="#FFF"
            fontSize={15}
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

const ArticleSection = ({ section, articles }) => (
  <Box mb="50px">
    <Flex justify="space-between" align="center" mb="24px">
      <Heading as="h2" fontSize={24} fontWeight={600} color="#003366">
        {section.name}
      </Heading>
      <Link href={section.href}>
        <Button variant="outline" borderColor="#065FD4" color="#065FD4" size="md" fontSize={18}>
          Xem tất cả
        </Button>
      </Link>
    </Flex>

    {articles?.length ? (
      <Grid templateColumns={{ xs: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }} gap="24px">
        {articles.map((a) => (
          <ArticleCard key={a.id} article={a} categorySlug={section.slug} />
        ))}
      </Grid>
    ) : (
      <Text color="gray.500" textAlign="center" py="20px">
        Chưa có bài viết
      </Text>
    )}
  </Box>
);

export default function ArticleMainWrapper({ sectionsData = [] }) {
  const breadcrumbData = [
    { title: 'Trang chủ', href: '/' },
    { title: 'Bài viết', href: '/bai-viet', isActive: true }
  ];

  return (
    <Flex pt={{ xs: '70px', lg: '162px' }} px={PX_ALL} pb="50px" direction="column">
      <Breadcrumb data={breadcrumbData} />
      <VStack align="start" spacing="16px" mt="20px" mb="40px">
        <Heading as="h1" fontSize={{ xs: '28px', lg: '36px' }} fontWeight={700} color="#003366">
          Bài Viết
        </Heading>
        <Text fontSize={{ xs: '16px', lg: '18px' }} color="gray.600" lineHeight="1.6">
          Khám phá kho kiến thức phong phú về pha chế, nguyên liệu, xu hướng và những câu chuyện thú vị trong thế giới
          đồ uống tại Diệp Trà.
        </Text>
      </VStack>

      {ARTICLE_SECTIONS.map((section) => {
        const sectionData = sectionsData.find((d) => d.type === section.type);
        return <ArticleSection key={section.type} section={section} articles={sectionData?.articles || []} />;
      })}
    </Flex>
  );
}
