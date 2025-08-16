'use client';

import { LoadingScreen } from '../../../components/effect-screen';
import Pagination from '../../../components/pagination';
import ProductItem from '../../../components/product-item';
import { useQueryProductList, useQueryAllCategories } from '../../../services/product.service';
import { IMG_ALT } from '../../../utils/const';
import { useParamsURL } from '../../../utils/hooks';
import {
  Box,
  Flex,
  Grid,
  GridItem,
  Text,
  Image,
  Select,
  Input,
  InputGroup,
  InputRightElement,
  Button
} from '@chakra-ui/react';
import { useState, useEffect } from 'react';

const ProductList = () => {
  const [paramsURL, setParamsURL] = useParamsURL();
  const { categoryId, mainCategoryId, keyword = '', sort = '' } = paramsURL;
  const [searchInput, setSearchInput] = useState(keyword || '');

  const { data: productListQuery, isLoading: loadingProduct } = useQueryProductList();
  const { data: allCategories = [] } = useQueryAllCategories();
  const { content: productList = [], totalPages, pageable } = productListQuery || {};
  const { pageNumber } = pageable || {};

  const mainCategories = [
    { id: 'all', name: 'Nguyên Liệu Pha Chế', isActive: !mainCategoryId },
    { id: '2297031', name: 'Trà Phượng Hoàng', isActive: mainCategoryId === '2297031' },
    { id: 'other', name: 'Sản Phẩm Khác', isActive: mainCategoryId === 'other' },
    { id: 'new', name: 'Hàng Mới Về', isActive: mainCategoryId === 'new' }
  ];

  // Handle search
  const handleSearch = () => {
    setParamsURL({ keyword: searchInput, page: 1 });
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  // Handle sort change
  const handleSortChange = (e) => {
    setParamsURL({ sort: e.target.value, page: 1 });
  };

  useEffect(() => {
    setSearchInput(keyword || '');
  }, [keyword]);

  return (
    <Flex mt="24px" mb="60px" gap="24px" direction={{ xs: 'column', lg: 'row' }}>
      {/* Left Sidebar */}
      <Flex
        flex={{ xs: 'none', lg: '1' }}
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
          {allCategories?.map((category) => {
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
                onClick={() => {
                  setParamsURL({
                    categoryId: category.id,
                    mainCategoryId: null,
                    page: 1
                  });
                }}
              >
                <Text>{category.name}</Text>
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

      {/* Right Content */}
      <Flex flex={{ xs: 'none', lg: '3' }} direction="column">
        {/* Search and Filter Bar */}
        <Flex gap="16px" mb="24px" direction={{ xs: 'column', md: 'row' }} align={{ xs: 'stretch', md: 'center' }}>
          {/* Sort Dropdown */}
          <Select
            w={{ xs: 'full', md: '200px' }}
            placeholder="Sắp xếp"
            value={sort}
            onChange={handleSortChange}
            bgColor="white"
            border="1px solid #e2e8f0"
          >
            <option value="az">Sắp xếp A-Z</option>
            <option value="increase">Giá tăng dần</option>
            <option value="decrease">Giá giảm dần</option>
          </Select>

          {/* Search Input */}
          <InputGroup flex={1}>
            <Input
              placeholder="Nhập tên sản phẩm"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              onKeyPress={handleKeyPress}
              bgColor="white"
              border="1px solid #e2e8f0"
            />
            <InputRightElement>
              {/* ← Replace SearchIcon with simple text */}
              <Button
                size="sm"
                h="28px"
                w="28px"
                minW="28px"
                colorScheme="blue"
                onClick={handleSearch}
                fontSize="12px"
                p={0}
              >
                🔍
              </Button>
            </InputRightElement>
          </InputGroup>

          <Button colorScheme="blue" onClick={handleSearch} size="md">
            Tìm kiếm
          </Button>
        </Flex>

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
                onClick={() => {
                  if (category.id === 'all') {
                    setParamsURL({
                      mainCategoryId: null,
                      categoryId: null,
                      page: 1
                    });
                  } else {
                    setParamsURL({
                      mainCategoryId: category.id,
                      categoryId: null,
                      page: 1
                    });
                  }
                }}
              >
                <Text textAlign="center" px="8px">
                  {category.name}
                </Text>
              </Flex>
            );
          })}
        </Flex>

        {/* Products Grid */}
        <Box>
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
                  md: 'repeat(3, 1fr)'
                }}
                gap={{ xs: '16px', lg: '24px' }}
                w="full"
                mb="40px"
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
            <Flex direction="column" align="center" mt="80px">
              <Text textAlign="center" fontSize={18} color="#666" mb="20px">
                Không có sản phẩm nào
              </Text>
              <Text textAlign="center" fontSize={14} color="#999">
                Hãy thử tìm kiếm với từ khóa khác hoặc chọn danh mục khác
              </Text>
            </Flex>
          )}
        </Box>
      </Flex>
    </Flex>
  );
};

export default ProductList;
