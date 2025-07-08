import SectionBlock from '../../components/section-block';
import { PX_ALL } from '../../utils/const';
import { getMetadata } from '../../utils/helper-server';
import { Flex } from '@chakra-ui/react';
import Head from 'next/head';
import { Suspense } from 'react';
import ArticlesList from './_components/news-list';

export const metadata = getMetadata({ title: 'Bài Viết | Diệp Trà' });

const Articles = async () => {
  return (
    <>
      <Head>
        <link rel="canonical" href={`${process.env.NEXT_PUBLIC_DOMAIN}/bai-viet`} />
        <meta name="robots" content="index, follow" />
      </Head>
      <Flex direction="column" px={PX_ALL} pt={{ xs: '70px', lg: '162px' }} gap="24px">
        <SectionBlock title="Câu chuyện của Diệp Trà" />
        <Suspense>
          <ArticlesList />
        </Suspense>
      </Flex>
    </>
  );
};

export default Articles;
