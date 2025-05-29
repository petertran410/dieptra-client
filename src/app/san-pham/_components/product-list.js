// src/app/san-pham/_components/product-list.js - Updated to show products from both parent and subcategories
'use client';

import { LoadingScreen } from '../../../components/effect-screen';
import Pagination from '../../../components/pagination';
import ProductItem from '../../../components/product-item';
import { useQueryCategoryListByParent } from '../../../services/category.service';
import { useQueryProductList } from '../../../services/product.service';
import { IMG_ALT } from '../../../utils/const';
import { useParamsURL } from '../../../utils/hooks';
import { Flex, Grid, GridItem, Image, Text, Box, Tag, Alert } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

const ProductList = () => {
  const [paramsURL, setParamsURL] = useParamsURL();
  const { categoryId, subCategoryId } = paramsURL;
  const { data: subCategoryList = [] } = useQueryCategoryListByParent(categoryId);
  const defaultSubCategoryId = subCategoryList?.[0]?.id;
  const [currentCategoryId, setCurrentCategoryId] = useState(subCategoryId || defaultSubCategoryId);
  const { data: productListQuery, isLoading: loadingProduct } = useQueryProductList();
  const { content: productList = [], totalElements, pageable, categoryInfo } = productListQuery || {};
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

  // Show category information
  const renderCategoryInfo = () => {
    if (!categoryInfo) return null;

    return (
      <Box mb="24px" p="16px" bgColor="#f8f9fa" borderRadius="8px">
        <Text fontSize="16px" fontWeight="600" mb="8px" color="#1E96BC">
          Thông tin danh mục sản phẩm
        </Text>
        <Flex direction="column" gap="4px" fontSize="14px" color="#6c757d">
          <Text>
            Hiển thị sản phẩm từ: <strong>Lermao</strong> và <strong>Trà Phượng Hoàng</strong>
          </Text>
          <Text>
            Tổng danh mục được tìm kiếm: <strong>{categoryInfo.totalCategoriesSearched || 0}</strong>
          </Text>
          {categoryInfo.productsInParentCategories !== undefined && (
            <Text>
              Sản phẩm thuộc danh mục cha: <strong>{categoryInfo.productsInParentCategories}</strong>
            </Text>
          )}
          {categoryInfo.productsInSubcategories !== undefined && (
            <Text>
              Sản phẩm thuộc danh mục con: <strong>{categoryInfo.productsInSubcategories}</strong>
            </Text>
          )}
        </Flex>
      </Box>
    );
  };

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
        {/* Category Information */}
        {renderCategoryInfo()}

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
                    <ProductItem item={item} showCategoryTags={true} />
                  </GridItem>
                );
              })}
            </Grid>

            <Flex justify="center" mt="36px">
              <Pagination currentPage={pageNumber + 1} totalPages={Math.ceil(totalElements / 12)} />
            </Flex>
          </>
        )}

        {!loadingProduct && (!Array.isArray(productList) || !productList.length) && (
          <Flex direction="column" align="center" mt="80px">
            <Text textAlign="center" fontSize={16} mb="16px">
              Không có sản phẩm nào trong danh mục này
            </Text>
            <Text textAlign="center" fontSize={14} color="gray.600">
              Vui lòng thử tìm kiếm với từ khóa khác hoặc chọn danh mục khác
            </Text>
          </Flex>
        )}
      </Flex>
    </Flex>
  );
};

export default ProductList;
