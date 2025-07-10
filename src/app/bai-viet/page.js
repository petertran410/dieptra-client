// src/app/bai-viet/page.js - UPDATED với 6 sections
import SectionBlock from '../../components/section-block';
import { PX_ALL } from '../../utils/const';
import { getMetadata } from '../../utils/helper-server';
import { Flex } from '@chakra-ui/react';
import Head from 'next/head';
import { Suspense } from 'react';
import ArticleSections from './_components/article-sections';

export const metadata = getMetadata({ title: 'Bài Viết | Diệp Trà' });

const Articles = async () => {
  return (
    <>
      <Head>
        <link rel="canonical" href={`${process.env.NEXT_PUBLIC_DOMAIN}/bai-viet`} />
        <meta name="robots" content="index, follow" />
      </Head>
      <Flex direction="column" px={PX_ALL} pt={{ xs: '70px', lg: '162px' }} gap="40px">
        <SectionBlock title="Bài Viết" />
        <Suspense fallback={<div>Đang tải...</div>}>
          <ArticleSections />
        </Suspense>
      </Flex>
    </>
  );
};

export default Articles;
