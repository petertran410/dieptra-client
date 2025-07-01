'use client';

import { LoadingScreen } from '../../../components/effect-screen';
import Pagination from '../../../components/pagination';
import ProductItem from '../../../components/product-item';
import { useQueryCategoryListByParent } from '../../../services/category.service';
import { useQueryProductList } from '../../../services/product.service';
import { IMG_ALT } from '../../../utils/const';
import { useParamsURL } from '../../../utils/hooks';
import { Flex, Grid, GridItem, Image, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

const ProductList = () => {
  const [paramsURL, setParamsURL] = useParamsURL();
  const { categoryId, subCategoryId } = paramsURL;
  const { data: subCategoryList = [] } = useQueryCategoryListByParent(categoryId);
  const defaultSubCategoryId = subCategoryList?.[0]?.id;
  const [currentCategoryId, setCurrentCategoryId] = useState(subCategoryId || defaultSubCategoryId);
  const { data: productListQuery, isLoading: loadingProduct } = useQueryProductList();
  const { content: productList = [], totalPages, pageable } = productListQuery || {};
  const { pageNumber } = pageable || {};

  useEffect(() => {
    if (typeof subCategoryId === 'undefined') {
      setParamsURL({ subCategoryId: defaultSubCategoryId });
    }
  }, [defaultSubCategoryId, setParamsURL, subCategoryId]);

  useEffect(() => {
    if (typeof subCategoryId !== 'undefined') {
      setCurrentCategoryId(subCategoryId);
    }
  }, [subCategoryId]);

  return (
    <Flex mt="24px" mb="60px" gap="24px" direction={{ xs: 'column', lg: 'row' }}>
      <Flex
        flex={{ xs: 'none', lg: 1 / 4 }}
        w="full"
        bgColor="#eff9fd"
        direction="column"
        borderRadius={8}
        pos="relative"
        overflow="hidden"
      >
        <Flex direction={{ xs: 'row', lg: 'column' }}>
          {subCategoryList?.map((item) => {
            const { id, name } = item;
            const isActive = id === Number(currentCategoryId);

            return (
              <Flex
                flex={{ xs: 1, lg: 'none' }}
                key={id}
                h="40px"
                borderRadius={8}
                cursor="pointer"
                justify={{ xs: 'center', lg: 'flex-start' }}
                align="center"
                px="16px"
                bgColor={isActive ? '#1E96BC' : 'transparent'}
                onClick={() => {
                  setCurrentCategoryId(id);
                  setParamsURL({ subCategoryId: id });
                }}
              >
                <Text color={isActive ? '#fff' : '#1E96BC'}>{name}</Text>
              </Flex>
            );
          })}
        </Flex>

        <Image
          display={{ xs: 'none', lg: 'block' }}
          src="/images/bg-category-product.png"
          alt={IMG_ALT}
          w="full"
          h="auto"
          fit="cover"
          pos="absolute"
          bottom={0}
          left={0}
        />
      </Flex>

      <Flex flex={3 / 4} direction="column" minH="500px">
        {loadingProduct && (
          <Flex mt="80px" justify="center">
            <LoadingScreen />
          </Flex>
        )}

        {!loadingProduct && Array.isArray(productList) && !!productList.length && (
          <>
            <Grid
              templateColumns={{
                xs: 'repeat(2, 1fr)',
                md: 'repeat(2, 1fr)',
                lg: 'repeat(3, 1fr)',
                xl: 'repeat(4, 1fr)'
              }}
              gap={{ xs: '16px', lg: '24px' }}
              w="full"
            >
              {productList?.map((item) => {
                return (
                  <GridItem key={item.id}>
                    <ProductItem item={item} />
                  </GridItem>
                );
              })}
            </Grid>

            <Flex justify="center" mt="36px">
              <Pagination currentPage={pageNumber + 1} totalPages={totalPages} />
            </Flex>
          </>
        )}

        {!loadingProduct && (!Array.isArray(productList) || !productList.length) && (
          <Text textAlign="center" fontSize={16} mt="80px">
            Không có dữ liệu
          </Text>
        )}
      </Flex>
    </Flex>
  );
};

export default ProductList;
