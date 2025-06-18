// src/app/san-pham/_components/product-list.js - FIXED for both categories + visual prominence
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

  // CRITICAL FIX: Don't set default subcategory - let user choose
  const [currentCategoryId, setCurrentCategoryId] = useState(subCategoryId);
  const { data: productListQuery, isLoading: loadingProduct } = useQueryProductList();
  const { content: productList = [], totalElements, pageable } = productListQuery || {};
  const { pageNumber } = pageable || {};

  // REMOVED: Auto-selection of first subcategory
  // This allows showing all products in the category by default

  useEffect(() => {
    if (typeof subCategoryId !== 'undefined') {
      setCurrentCategoryId(subCategoryId);
    } else {
      // If no subcategory selected, clear the current selection
      setCurrentCategoryId(undefined);
    }
  }, [subCategoryId]);

  // CRITICAL FIX: Handle subcategory click properly for both categories
  const handleSubCategoryClick = (subCatId) => {
    console.log('Clicked subcategory:', subCatId, 'for category:', categoryId);
    setCurrentCategoryId(subCatId);
    setParamsURL({
      subCategoryId: subCatId,
      page: 1 // Reset to first page when changing subcategory
    });
  };

  // Show subcategory sidebar only when a main category is selected
  const showSubcategorySidebar = categoryId && subCategoryList.length > 0;

  return (
    <Flex mt="24px" mb="60px" gap="24px" direction={{ xs: 'column', lg: 'row' }}>
      {/* Subcategory Sidebar - Only show when category is selected */}
      {showSubcategorySidebar && (
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
                  // ENHANCED VISUAL PROMINENCE: More prominent selected state
                  bgColor={isActive ? '#1E96BC' : 'transparent'}
                  boxShadow={isActive ? '0 2px 8px rgba(30, 150, 188, 0.3)' : 'none'}
                  border={isActive ? '2px solid #1E96BC' : '2px solid transparent'}
                  transform={isActive ? 'scale(1.02)' : 'scale(1)'}
                  onClick={() => handleSubCategoryClick(id)}
                  _hover={{
                    bgColor: isActive ? '#1E96BC' : '#d0f2ff',
                    transform: isActive ? 'scale(1.02)' : 'scale(1.01)'
                  }}
                  transition="all 0.2s ease-in-out"
                >
                  <Text
                    color={isActive ? '#fff' : '#1E96BC'}
                    fontWeight={isActive ? '700' : '500'}
                    fontSize={{ xs: '12px', lg: '14px' }}
                    letterSpacing={isActive ? '0.5px' : 'normal'}
                    textShadow={isActive ? '0 1px 2px rgba(0,0,0,0.1)' : 'none'}
                  >
                    {name}
                  </Text>
                  {/* Visual indicator for selected state */}
                  {isActive && (
                    <Flex
                      ml="auto"
                      w="6px"
                      h="6px"
                      borderRadius="50%"
                      bgColor="white"
                      boxShadow="0 1px 3px rgba(0,0,0,0.2)"
                    />
                  )}
                </Flex>
              );
            })}
          </Flex>

          <Image
            // display={{ xs: 'none', lg: 'block' }}
            display={{ xs: 'none', lg: 'hidden', md: 'hidden' }}
            src="/images/bg-category-product.webp"
            alt={IMG_ALT}
            w="full"
            h="auto"
            fit="cover"
            pos="absolute"
            bottom={0}
            left={0}
          />
        </Flex>
      )}

      {/* Product Grid */}
      <Flex flex={showSubcategorySidebar ? 3 / 4 : 1} direction="column" minH="500px">
        {/* Status Message for Default View */}
        {!categoryId && !subCategoryId && (
          <Flex mb="16px" p="12px" bgColor="#f8f9fa" borderRadius="8px" borderLeft="4px solid #1E96BC">
            <Text fontSize="14px" color="#666">
              Hiển thị tất cả sản phẩm từ <strong>Lermao</strong> và <strong>Trà Phượng Hoàng</strong>. Chọn danh mục để
              lọc sản phẩm.
            </Text>
          </Flex>
        )}

        {/* Status Message for Category Selection */}
        {categoryId && !subCategoryId && (
          <Flex mb="16px" p="12px" bgColor="#e3f2fd" borderRadius="8px" borderLeft="4px solid #1E96BC">
            <Text fontSize="14px" color="#666">
              Hiển thị tất cả sản phẩm từ <strong>{categoryId === '2205381' ? 'Lermao' : 'Trà Phượng Hoàng'}</strong>.
              Chọn danh mục con để lọc cụ thể hơn.
            </Text>
          </Flex>
        )}

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
              {subCategoryId ? 'Thử chọn danh mục con khác' : 'Thử chọn danh mục khác hoặc tìm kiếm với từ khóa khác'}
            </Text>
          </Flex>
        )}
      </Flex>
    </Flex>
  );
};

export default ProductList;
