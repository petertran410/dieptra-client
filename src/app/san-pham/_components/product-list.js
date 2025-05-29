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

  // FIXED: Map categoryId to the correct parent category for subcategory lookup
  const getParentCategoryForSubcategories = (catId) => {
    if (catId === '2205374') return '2205374'; // Trà Phượng Hoàng
    if (catId === '2205381') return ['2205420', '2205421', '2205422', '2205423', '2205425']; // Lermao
    return catId; // For other categories, use as-is
  };

  const parentCategoryForSubs = getParentCategoryForSubcategories(categoryId);
  const { data: subCategoryList = [] } = useQueryCategoryListByParent(parentCategoryForSubs);
  const defaultSubCategoryId = subCategoryList?.[0]?.id;
  const [currentCategoryId, setCurrentCategoryId] = useState(subCategoryId || defaultSubCategoryId);

  const { data: productListQuery, isLoading: loadingProduct, error } = useQueryProductList();
  const { content: productList = [], totalElements, pageable } = productListQuery || {};
  const { pageNumber } = pageable || {};

  // FIXED: Handle subcategory selection for Trà Phượng Hoàng and Lermao
  useEffect(() => {
    if (categoryId === '2205374' || categoryId === '2205381') {
      // For KiotViet categories, only set subCategoryId if subcategories exist
      if (subCategoryList.length > 0 && typeof subCategoryId === 'undefined') {
        setParamsURL({ subCategoryId: defaultSubCategoryId });
      }
    } else {
      // For other categories, use the existing logic
      if (typeof subCategoryId === 'undefined') {
        setParamsURL({ subCategoryId: defaultSubCategoryId });
      }
    }
  }, [defaultSubCategoryId, setParamsURL, subCategoryId, categoryId, subCategoryList.length]);

  useEffect(() => {
    if (typeof subCategoryId !== 'undefined') {
      setCurrentCategoryId(subCategoryId);
    }
  }, [subCategoryId]);

  // FIXED: Add debug logging
  useEffect(() => {
    console.log('ProductList Debug:', {
      categoryId,
      subCategoryId,
      currentCategoryId,
      parentCategoryForSubs,
      subCategoryListLength: subCategoryList.length,
      productListLength: productList.length,
      totalElements,
      isLoading: loadingProduct,
      error
    });
  }, [
    categoryId,
    subCategoryId,
    currentCategoryId,
    parentCategoryForSubs,
    subCategoryList.length,
    productList.length,
    totalElements,
    loadingProduct,
    error
  ]);

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
          {/* FIXED: Show subcategories only if they exist */}
          {subCategoryList.length > 0 ? (
            subCategoryList.map((item) => {
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
            })
          ) : (
            // FIXED: Show category name when no subcategories
            <Flex
              h="40px"
              borderRadius={8}
              justify={{ xs: 'center', lg: 'flex-start' }}
              align="center"
              px="16px"
              bgColor="#1E96BC"
            >
              <Text color="#fff">
                {categoryId === '2205374'
                  ? 'Trà Phượng Hoàng'
                  : categoryId === '2205381'
                  ? 'Lermao'
                  : categoryId === '2205422'}
              </Text>
            </Flex>
          )}
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

        {error && !loadingProduct && (
          <Flex direction="column" align="center" mt="80px">
            <Text color="red.500" fontSize={16} mb={4}>
              Lỗi tải sản phẩm: {error.message || 'Không thể tải danh sách sản phẩm'}
            </Text>
            <Text fontSize={14} color="gray.500">
              Vui lòng thử lại sau hoặc liên hệ hỗ trợ kỹ thuật
            </Text>
          </Flex>
        )}

        {!loadingProduct && !error && Array.isArray(productList) && !!productList.length && (
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
              {productList.map((item) => {
                return (
                  <GridItem key={item.id}>
                    <ProductItem item={item} />
                  </GridItem>
                );
              })}
            </Grid>

            <Flex justify="center" mt="36px">
              <Pagination currentPage={(pageNumber || 0) + 1} totalPages={Math.ceil((totalElements || 0) / 12)} />
            </Flex>
          </>
        )}

        {!loadingProduct && !error && (!Array.isArray(productList) || !productList.length) && (
          <Flex direction="column" align="center" mt="80px">
            <Text textAlign="center" fontSize={16} mb={4}>
              Không tìm thấy sản phẩm nào
            </Text>
            <Text fontSize={14} color="gray.500" textAlign="center">
              {categoryId === '2205374'
                ? 'Không có sản phẩm trong danh mục Trà Phượng Hoàng'
                : categoryId === '2205381'
                ? 'Không có sản phẩm trong danh mục Lermao'
                : 'Không có sản phẩm trong danh mục này'}
            </Text>
          </Flex>
        )}
      </Flex>
    </Flex>
  );
};

export default ProductList;
