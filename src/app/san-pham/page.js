import { PX_ALL } from '@/utils/const';
import { getMetadata } from '@/utils/helper-server';
import { Flex } from '@chakra-ui/react';
import Head from 'next/head';
import { Suspense } from 'react';
import Filter from './_components/filter';
import Introduction from './_components/introduction';
import ProductList from './_components/product-list';
import ProductTab from './_components/product-tab';

export const metadata = getMetadata({ title: 'Sản phẩm | Diệp Trà' });

const Product = () => {
  return (
    <Suspense>
      <Head>
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={`${process.env.NEXT_PUBLIC_DOMAIN}/san-pham`} />
      </Head>

      <Flex direction="column" px={PX_ALL} pt={{ xs: '70px', lg: '162px' }}>
        <ProductTab />
        <Introduction />
        <Filter />
        <ProductList />
      </Flex>
    </Suspense>
  );
};

export default Product;
