'use client';

import { LoadingScreen } from '../../../components/effect-screen';
import Pagination from '../../../components/pagination';
import ProductItem from '../../../components/product-item';
import { useQueryProductList, useQueryAllCategories } from '../../../services/product.service';
import { IMG_ALT } from '../../../utils/const';
import { useGetParamsURL } from '../../../utils/hooks';
import { Box, Flex, Grid, GridItem, Text, Image } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';

const ProductList = () => {
  const router = useRouter();
  const params = useGetParamsURL();
  const { categoryId } = params;

  const { data: productListQuery, isLoading: loadingProduct } = useQueryProductList();
  const { data: allCategories = [] } = useQueryAllCategories();
  const { content: productList = [], totalPages, pageable } = productListQuery || {};
  const { pageNumber } = pageable || {};

  const mainCategories = [
    { id: 'all', name: 'Nguyên Liệu Pha Chế', isActive: !categoryId },
    { id: '2297031', name: 'Trà Phượng Hoàng', isActive: categoryId === '2297031' },
    { id: 'other', name: 'Sản Phẩm Khác', isActive: categoryId === 'other' },
    { id: 'new', name: 'Hàng Mới Về', isActive: categoryId === 'new' }
  ];

  const handleCategoryClick = (categoryIdValue) => {
    if (categoryIdValue === 'all') {
      router.push('/san-pham');
    } else {
      router.push(`/san-pham?categoryId=${categoryIdValue}`);
    }
  };

  return (
    <Box w="full">
      <Flex
        justify="center"
        align="center"
        gap="0"
        borderRadius="25px"
        overflow="hidden"
        border="2px solid #E0E0E0"
        mb="24px"
        direction={{ xs: 'column', md: 'row' }}
        maxW="800px"
        mx="auto"
      >
        {mainCategories.map((category, index) => {
          const isActive = category.isActive;
          const isFirst = index === 0;

          return (
            <Flex
              key={category.id}
              flex={1}
              h="50px"
              align="center"
              justify="center"
              cursor="pointer"
              bgColor={isActive ? '#00BCD4' : 'transparent'}
              color={isActive ? '#FFF' : '#666'}
              fontSize="14px"
              fontWeight={isActive ? '600' : '500'}
              borderTopLeftRadius={isFirst ? '23px' : '0'}
              borderBottomLeftRadius={isFirst ? '23px' : '0'}
              borderTopRightRadius={index === mainCategories.length - 1 ? '23px' : '0'}
              borderBottomRightRadius={index === mainCategories.length - 1 ? '23px' : '0'}
              transition="all 0.2s ease"
              minW={{ xs: 'full', md: 'auto' }}
              _hover={{
                bgColor: isActive ? '#00BCD4' : '#F5F5F5',
                color: isActive ? '#FFF' : '#333'
              }}
              onClick={() => handleCategoryClick(category.id)}
            >
              <Text textAlign="center" px="8px">
                {category.name}
              </Text>
            </Flex>
          );
        })}
      </Flex>

      {/* Main Layout */}
      <Flex gap="24px" direction={{ xs: 'column', lg: 'row' }}>
        {/* Left Sidebar */}
        <Box
          w={{ xs: 'full', lg: '280px' }}
          flexShrink={0}
          bgColor="#eff9fd"
          borderRadius={8}
          position="relative"
          overflow="hidden"
          minH="400px"
        >
          {/* Category Title */}
          <Box p="16px" borderBottom="1px solid #e0f4fd">
            <Text fontSize="16px" fontWeight="bold" color="#333" mb="4px">
              DANH MỤC SẢN PHẨM
            </Text>
            <Text fontSize="14px" fontWeight="600" color="#1E96BC">
              Nguyên Liệu Pha Chế
            </Text>
          </Box>

          {/* Category List */}
          <Box>
            {/* All Products */}
            <Flex
              px="16px"
              py="10px"
              cursor="pointer"
              bgColor={!categoryId ? '#1E96BC' : 'transparent'}
              color={!categoryId ? '#fff' : '#1E96BC'}
              fontSize="13px"
              fontWeight={!categoryId ? '600' : '400'}
              borderBottom="1px solid #e0f4fd"
              _hover={{
                bgColor: !categoryId ? '#1E96BC' : '#d4f1ff',
                color: !categoryId ? '#fff' : '#1E96BC'
              }}
              onClick={() => handleCategoryClick('all')}
            >
              <Text>Tất cả sản phẩm</Text>
            </Flex>

            {allCategories?.slice(0, 12)?.map((category) => {
              const isActive = categoryId === category.id.toString();

              return (
                <Flex
                  key={category.id}
                  px="16px"
                  py="10px"
                  cursor="pointer"
                  bgColor={isActive ? '#1E96BC' : 'transparent'}
                  color={isActive ? '#fff' : '#1E96BC'}
                  fontSize="13px"
                  fontWeight={isActive ? '600' : '400'}
                  borderBottom="1px solid #e0f4fd"
                  _hover={{
                    bgColor: isActive ? '#1E96BC' : '#d4f1ff',
                    color: isActive ? '#fff' : '#1E96BC'
                  }}
                  onClick={() => handleCategoryClick(category.id)}
                >
                  <Text>{category.name}</Text>
                </Flex>
              );
            })}
          </Box>

          {/* Background Image */}
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
            opacity={0.2}
          />
        </Box>

        <Box flex={1}>
          {loadingProduct && (
            <Flex justify="center" py="60px">
              <LoadingScreen />
            </Flex>
          )}

          {!loadingProduct && Array.isArray(productList) && !!productList.length && (
            <>
              <Grid
                templateColumns={{
                  xs: 'repeat(2, 1fr)',
                  md: 'repeat(3, 1fr)',
                  lg: 'repeat(3, 1fr)',
                  xl: 'repeat(3, 1fr)'
                }}
                gap={{ xs: '16px', md: '20px', lg: '24px' }}
                w="full"
                mb="40px"
                maxW="none"
              >
                {productList?.map((item) => {
                  const productData = {
                    id: item.id,
                    title: item.kiotViet?.name || item.title || 'Sản phẩm',
                    price: item.kiotViet?.price || 0,
                    imagesUrl: item.kiotViet?.images || item.imagesUrl || [],
                    generalDescription: item.generalDescription,
                    ofCategories: item.kiotViet?.category ? [item.kiotViet.category] : []
                  };

                  return (
                    <GridItem key={item.id}>
                      <ProductItem item={productData} />
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
            <Flex direction="column" align="center" py="60px">
              <Text textAlign="center" fontSize={18} color="#666" mb="20px">
                Không có sản phẩm nào
              </Text>
              <Text textAlign="center" fontSize={14} color="#999">
                Hãy thử chọn danh mục khác
              </Text>
            </Flex>
          )}
        </Box>
      </Flex>
    </Box>
  );
};

export default ProductList;
