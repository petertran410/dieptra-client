'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  Box,
  Container,
  VStack,
  Heading,
  Flex,
  HStack,
  Select,
  InputGroup,
  InputLeftElement,
  Input,
  Grid,
  GridItem,
  Text,
  Button,
  Spinner,
  Center
} from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import Head from 'next/head';

import { PX_ALL } from '../../../utils/const';
import Breadcrumb from '../../../components/breadcrumb/breadcrumb';
import ProductItem from '../../../components/product-item/product-item';
import { useQueryProductList, useQueryProductsByCategories } from '../../../services/product.service';
import { useQueryTopLevelCategories, useQueryCategoryPaths } from '../../../services/category.service';

const PRODUCTS_PER_PAGE = 15;

const ProductList = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentPage = parseInt(searchParams.get('page')) || 1;
  const keyword = searchParams.get('keyword') || '';
  const categoryId = searchParams.get('categoryId');
  const sortBy = searchParams.get('sortBy') || 'newest';

  const [searchTerm, setSearchTerm] = useState(keyword);
  const [selectedCategory, setSelectedCategory] = useState(categoryId || 'all');
  const [currentSort, setCurrentSort] = useState(sortBy);

  const { data: topCategories = [], isLoading: categoriesLoading } = useQueryTopLevelCategories();

  // const { data: categoryIds = [], isLoading: pathsLoading } = useQueryCategoryPaths(
  //   selectedCategory !== 'all' ? parseInt(selectedCategory) : null
  // );

  const categoryIdNumber = selectedCategory !== 'all' ? parseInt(selectedCategory) : null;
  const { data: categoryIds = [], isLoading: pathsLoading } = useQueryCategoryPaths(categoryIdNumber);
  const shouldUseCategoryFilter = selectedCategory !== 'all';
  const finalCategoryIds = categoryIds.length > 0 ? categoryIds : categoryIdNumber ? [categoryIdNumber] : [];

  console.log('🔍 ProductList Debug:', {
    categoryId: searchParams.get('categoryId'),
    selectedCategory,
    categoryIdNumber,
    categoryIds,
    finalCategoryIds,
    shouldUseCategoryFilter,
    pathsLoading
  });

  // const shouldUseCategoryFilter = selectedCategory !== 'all';

  const {
    data: allProductsData,
    isLoading: allProductsLoading,
    error: allProductsError
  } = useQueryProductList({
    enabled: !shouldUseCategoryFilter
  });

  const {
    data: categoryProductsData,
    isLoading: categoryProductsLoading,
    error: categoryProductsError
  } = useQueryProductsByCategories(finalCategoryIds, {
    enabled: shouldUseCategoryFilter
  });

  console.log('📊 Query Results:', {
    allProductsData: allProductsData?.content?.length || 0,
    categoryProductsData: categoryProductsData?.content?.length || 0,
    isUsingCategoryFilter: shouldUseCategoryFilter,
    finalDataSource: shouldUseCategoryFilter ? 'category' : 'all'
  });

  const isLoading =
    categoriesLoading || pathsLoading || (shouldUseCategoryFilter ? categoryProductsLoading : allProductsLoading);

  const error = allProductsError || categoryProductsError;

  const productsData = shouldUseCategoryFilter ? categoryProductsData : allProductsData;
  const products = productsData?.content || [];
  const totalElements = productsData?.totalElements || 0;
  const totalPages = Math.ceil(totalElements / PRODUCTS_PER_PAGE);

  const updateURL = (newParams = {}) => {
    const params = new URLSearchParams();

    const finalParams = {
      page: currentPage,
      keyword: searchTerm,
      categoryId: selectedCategory === 'all' ? undefined : selectedCategory,
      sortBy: currentSort,
      ...newParams
    };

    Object.entries(finalParams).forEach(([key, value]) => {
      if (value && value !== 'all' && value !== '') {
        params.set(key, value.toString());
      }
    });

    const newURL = `/san-pham${params.toString() ? `?${params.toString()}` : ''}`;
    router.push(newURL, { scroll: false });
  };

  const handleSearch = (e) => {
    if (e.key === 'Enter' || e.type === 'click') {
      updateURL({
        keyword: searchTerm,
        page: 1
      });
    }
  };

  const handleCategoryChange = (newCategoryId) => {
    setSelectedCategory(newCategoryId);
    updateURL({
      categoryId: newCategoryId === 'all' ? undefined : newCategoryId,
      page: 1
    });
  };

  const handleSortChange = (newSortBy) => {
    setCurrentSort(newSortBy);
    updateURL({
      sortBy: newSortBy,
      page: 1
    });
  };

  const handlePageChange = (newPage) => {
    updateURL({ page: newPage });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const breadcrumbData = [
    { title: 'Trang chủ', href: '/' },
    { title: 'Sản Phẩm', href: '/san-pham', isActive: true }
  ];

  const sortOptions = [
    { value: 'newest', label: 'Mới nhất' },
    { value: 'name', label: 'Tên A-Z' },
    { value: 'price-low', label: 'Giá thấp → cao' },
    { value: 'price-high', label: 'Giá cao → thấp' }
  ];

  return (
    <>
      <Head>
        <title>Sản Phẩm | Diệp Trà</title>
        <link rel="canonical" href={`${process.env.NEXT_PUBLIC_DOMAIN}/san-pham`} />
        <meta name="robots" content="index, follow" />
        <meta
          name="description"
          content="Khám phá bộ sưu tập nguyên liệu pha chế cao cấp từ Diệp Trà - Siro, mứt, bột kem và nhiều sản phẩm chất lượng khác."
        />
      </Head>

      <Container maxW="1920px" px={PX_ALL} pt={{ base: '80px', lg: '180px' }}>
        <Breadcrumb data={breadcrumbData} />

        <VStack align="start" spacing="16px" mt="20px" mb="40px">
          <Heading as="h1" fontSize={{ base: '28px', lg: '36px' }} fontWeight={700} color="#003366">
            Sản Phẩm
          </Heading>

          <Flex
            direction={{ base: 'column', md: 'row' }}
            gap={4}
            w="full"
            align={{ base: 'stretch', md: 'center' }}
            justify="space-between"
          >
            <HStack spacing={4} flex={1}>
              <InputGroup maxW="400px">
                <InputLeftElement pointerEvents="none">
                  <SearchIcon color="gray.400" />
                </InputLeftElement>
                <Input
                  placeholder="Tìm kiếm sản phẩm..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyPress={handleSearch}
                  bg="white"
                  border="1px solid #E2E8F0"
                  _focus={{ borderColor: '#003366', boxShadow: '0 0 0 1px #003366' }}
                />
              </InputGroup>

              <Button onClick={handleSearch} colorScheme="blue" bg="#003366" _hover={{ bg: '#002244' }} size="md">
                Tìm
              </Button>
            </HStack>

            <HStack spacing={4}>
              <Select
                value={selectedCategory}
                onChange={(e) => handleCategoryChange(e.target.value)}
                maxW="200px"
                bg="white"
                border="1px solid #E2E8F0"
                _focus={{ borderColor: '#003366', boxShadow: '0 0 0 1px #003366' }}
              >
                <option value="all">Tất cả danh mục</option>
                {topCategories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </Select>

              <Select
                value={currentSort}
                onChange={(e) => handleSortChange(e.target.value)}
                maxW="160px"
                bg="white"
                border="1px solid #E2E8F0"
                _focus={{ borderColor: '#003366', boxShadow: '0 0 0 1px #003366' }}
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Select>
            </HStack>
          </Flex>

          <Text color="gray.600" fontSize="sm">
            {isLoading
              ? 'Đang tải...'
              : `Hiển thị 1-${Math.min(PRODUCTS_PER_PAGE, products.length)} của ${totalElements} kết quả`}
            {selectedCategory !== 'all' && (
              <Text as="span" ml={2} fontWeight="500" color="#003366">
                • {topCategories.find((cat) => cat.id.toString() === selectedCategory)?.name}
              </Text>
            )}
          </Text>
        </VStack>

        {isLoading && (
          <Center py={20}>
            <VStack>
              <Spinner size="xl" color="#003366" />
              <Text color="gray.600">Đang tải sản phẩm...</Text>
            </VStack>
          </Center>
        )}

        {error && (
          <Center py={20}>
            <VStack>
              <Text color="red.500" fontSize="lg" fontWeight="500">
                Có lỗi xảy ra khi tải sản phẩm
              </Text>
              <Text color="gray.600">{error.message || 'Vui lòng thử lại sau'}</Text>
              <Button
                onClick={() => window.location.reload()}
                colorScheme="blue"
                bg="#003366"
                _hover={{ bg: '#002244' }}
                mt={4}
              >
                Tải lại
              </Button>
            </VStack>
          </Center>
        )}

        {!isLoading && !error && (
          <>
            {products.length > 0 ? (
              <Grid
                templateColumns={{
                  base: 'repeat(1, 1fr)',
                  sm: 'repeat(2, 1fr)',
                  md: 'repeat(3, 1fr)',
                  lg: 'repeat(4, 1fr)',
                  xl: 'repeat(5, 1fr)'
                }}
                gap={6}
                mb={10}
              >
                {products.map((product) => (
                  <GridItem key={product.id}>
                    <ProductItem item={product} />
                  </GridItem>
                ))}
              </Grid>
            ) : (
              <Center py={20}>
                <VStack spacing={4}>
                  <Text fontSize="xl" fontWeight="500" color="gray.600">
                    Không tìm thấy sản phẩm nào
                  </Text>
                  <Text color="gray.500">Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm</Text>
                  <Button
                    onClick={() => {
                      setSearchTerm('');
                      setSelectedCategory('all');
                      updateURL({
                        keyword: undefined,
                        categoryId: undefined,
                        page: 1
                      });
                    }}
                    variant="outline"
                    colorScheme="blue"
                    borderColor="#003366"
                    color="#003366"
                    _hover={{ bg: '#003366', color: 'white' }}
                  >
                    Xóa bộ lọc
                  </Button>
                </VStack>
              </Center>
            )}

            {totalPages > 1 && (
              <Flex justify="center" align="center" mt={10} mb={10}>
                <HStack spacing={2}>
                  <Button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage <= 1}
                    variant="outline"
                    size="sm"
                    borderColor="#003366"
                    color="#003366"
                    _hover={{ bg: '#003366', color: 'white' }}
                    _disabled={{ opacity: 0.5, cursor: 'not-allowed' }}
                  >
                    ‹ Trước
                  </Button>

                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let pageNum;
                    if (totalPages <= 5) {
                      pageNum = i + 1;
                    } else if (currentPage <= 3) {
                      pageNum = i + 1;
                    } else if (currentPage >= totalPages - 2) {
                      pageNum = totalPages - 4 + i;
                    } else {
                      pageNum = currentPage - 2 + i;
                    }

                    return (
                      <Button
                        key={pageNum}
                        onClick={() => handlePageChange(pageNum)}
                        variant={currentPage === pageNum ? 'solid' : 'outline'}
                        size="sm"
                        colorScheme="blue"
                        bg={currentPage === pageNum ? '#003366' : 'white'}
                        borderColor="#003366"
                        color={currentPage === pageNum ? 'white' : '#003366'}
                        _hover={{
                          bg: currentPage === pageNum ? '#002244' : '#003366',
                          color: 'white'
                        }}
                      >
                        {pageNum}
                      </Button>
                    );
                  })}

                  <Button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage >= totalPages}
                    variant="outline"
                    size="sm"
                    borderColor="#003366"
                    color="#003366"
                    _hover={{ bg: '#003366', color: 'white' }}
                    _disabled={{ opacity: 0.5, cursor: 'not-allowed' }}
                  >
                    Sau ›
                  </Button>
                </HStack>
              </Flex>
            )}
          </>
        )}
      </Container>
    </>
  );
};

export default ProductList;
