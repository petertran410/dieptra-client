'use client';

import { useQueryCategoryList } from '../../../../services/category.service';
import { PX_ALL } from '../../../../utils/const';
import { Flex } from '@chakra-ui/react';
import Link from 'next/link';
import { Suspense } from 'react';
import ProductList from './product-list';
import SectionBlockH2 from '../../../../components/section-block/section-block-h2';

const TopProduct = () => {
  const { data: categoryList = [] } = useQueryCategoryList();

  return (
    <Flex
      bgColor="#eefbfd"
      direction="column"
      pt={{ xs: '0px', lg: '40px' }}
      pb="40px"
      px={PX_ALL}
      gap={{ xs: '24px', lg: '48px' }}
    >
      <SectionBlockH2 title="Sản phẩm nổi bật" isNormal />

      {categoryList?.slice(0, 2)?.map((item) => {
        const { id } = item;

        return <ProductList key={id} category={item} />;
      })}

      <Flex justify="center">
        <Link href="/san-pham">
          <Flex
            align="center"
            justify="center"
            bgColor="transparent"
            border="1px solid"
            borderColor="#065FD4"
            color="#065FD4"
            w="98px"
            h="40px"
            gap="4px"
            fontSize={16}
            borderRadius={8}
            fontWeight={500}
            transitionDuration="250ms"
            _hover={{ bgColor: '#0f2c3d', borderColor: '#0f2c3d', color: '#FFF' }}
          >
            Xem thêm
          </Flex>
        </Link>
      </Flex>
    </Flex>
  );
};

const TopProductWrap = () => {
  return (
    <Suspense>
      <TopProduct />
    </Suspense>
  );
};

export default TopProductWrap;
