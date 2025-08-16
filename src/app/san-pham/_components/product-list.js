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

  // Main category tabs data
  const mainCategories = [
    { id: 'all', name: 'Nguyên Liệu Pha Chế', isActive: !categoryId },
    { id: '2297031', name: 'Trà Phượng Hoàng', isActive: categoryId === '2297031' },
    { id: 'other', name: 'Sản Phẩm Khác', isActive: categoryId === 'other' },
    { id: 'new', name: 'Hàng Mới Về', isActive: categoryId === 'new' }
  ];

  // Handle navigation
  const handleCategoryClick = (categoryIdValue) => {
    if (categoryIdValue === 'all') {
      router.push('/san-pham');
    } else {
      router.push(`/san-pham?categoryId=${categoryIdValue}`);
    }
  };

  return (
    <Box>
      {/* Main Category Tabs */}
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

      {/* Main Layout with Sidebar and Products */}
      <Flex gap="24px" direction={{ xs: 'column', lg: 'row' }}>
        {/* Left Sidebar */}
        <Flex
          w={{ xs: 'full', lg: '300px' }}
          bgColor="#eff9fd"
          direction="column"
          borderRadius={8}
          pos="relative"
          overflow="hidden"
          minH="500px"
        >
          {/* Category Title */}
          <Box p="20px" borderBottom="1px solid #e0f4fd">
            <Text fontSize="18px" fontWeight="bold" color="#333" mb="4px">
              DANH MỤC SẢN PHẨM
            </Text>
            <Text fontSize="16px" fontWeight="600" color="#1E96BC">
              Nguyên Liệu Pha Chế
            </Text>
          </Box>

          {/* Category List */}
          <Flex direction="column" flex={1}>
            {/* All Products Option */}
            <Flex
              px="20px"
              py="12px"
              cursor="pointer"
              justify="flex-start"
              align="center"
              bgColor={!categoryId ? '#1E96BC' : 'transparent'}
              color={!categoryId ? '#fff' : '#1E96BC'}
              fontSize="14px"
              fontWeight={!categoryId ? '600' : '400'}
              borderBottom="1px solid #e0f4fd"
              _hover={{
                bgColor: !categoryId ? '#1E96BC' : '#d4f1ff',
                color: !categoryId ? '#fff' : '#1E96BC'
              }}
              onClick={() => handleCategoryClick('all')}
            >
              <Text>🍃 Tất cả sản phẩm</Text>
            </Flex>

            {allCategories?.slice(0, 10)?.map((category) => {
              const isActive = categoryId === category.id.toString();

              return (
                <Flex
                  key={category.id}
                  px="20px"
                  py="12px"
                  cursor="pointer"
                  justify="flex-start"
                  align="center"
                  bgColor={isActive ? '#1E96BC' : 'transparent'}
                  color={isActive ? '#fff' : '#1E96BC'}
                  fontSize="14px"
                  fontWeight={isActive ? '600' : '400'}
                  borderBottom="1px solid #e0f4fd"
                  _hover={{
                    bgColor: isActive ? '#1E96BC' : '#d4f1ff',
                    color: isActive ? '#fff' : '#1E96BC'
                  }}
                  onClick={() => handleCategoryClick(category.id)}
                >
                  <Text>• {category.name}</Text>
                </Flex>
              );
            })}
          </Flex>

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
            opacity={0.3}
          />
        </Flex>

        {/* Right Content - Products Grid */}
        <Flex flex={1} direction="column">
          {loadingProduct && (
            <Flex mt="80px" justify="center">
              <LoadingScreen />
            </Flex>
          )}

          {!loadingProduct && Array.isArray(productList) && !!productList.length && (
            <>
              {/* Products Grid - 3 columns */}
              <Grid
                templateColumns={{
                  xs: 'repeat(2, 1fr)', // Mobile: 2 columns
                  md: 'repeat(3, 1fr)' // Desktop: 3 columns
                }}
                gap={{ xs: '16px', lg: '24px' }}
                w="full"
                mb="40px"
              >
                {productList?.map((item) => {
                  // Transform data to match ProductItem expectations
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

              {/* Pagination */}
              <Flex justify="center" mt="36px">
                <Pagination currentPage={pageNumber + 1} totalPages={totalPages} />
              </Flex>
            </>
          )}

          {!loadingProduct && (!Array.isArray(productList) || !productList.length) && (
            <Flex direction="column" align="center" mt="80px">
              <Text textAlign="center" fontSize={18} color="#666" mb="20px">
                Không có sản phẩm nào
              </Text>
              <Text textAlign="center" fontSize={14} color="#999">
                Hãy thử chọn danh mục khác
              </Text>
            </Flex>
          )}
        </Flex>
      </Flex>
    </Box>
  );
};

export default ProductList;
