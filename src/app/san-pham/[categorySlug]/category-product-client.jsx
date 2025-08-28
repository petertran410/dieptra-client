// src/app/san-pham/[categorySlug]/category-product-client.jsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { notFound } from 'next/navigation';
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

import { PX_ALL } from '../../../utils/const';
import Breadcrumb from '../../../components/breadcrumb/breadcrumb';
import ProductItem from '../../../components/product-item/product-item';
import { useQueryProductList, useQueryProductsByCategories } from '../../../services/product.service';
import {
  useQueryTopLevelCategories,
  useQueryCategoryPaths,
  useQueryCategoryHierarchy
} from '../../../services/category.service';
import { API } from '../../../utils/API';

const CategoryProductClient = ({ categorySlug }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // States - COPY từ ProductList gốc
  const currentPage = parseInt(searchParams.get('page')) || 1;
  const keyword = searchParams.get('keyword') || '';
  const sortBy = searchParams.get('sortBy') || 'newest';

  const [searchTerm, setSearchTerm] = useState(keyword);
  const [currentSort, setCurrentSort] = useState(sortBy);
  const [categoryData, setCategoryData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch category data
  useEffect(() => {
    const fetchCategoryData = async () => {
      try {
        setLoading(true);
        const response = await API.request({
          url: `/api/category/client/find-by-slug/${categorySlug}`
        });

        if (!response) {
          setError('Category not found');
          return;
        }

        setCategoryData(response);
      } catch (error) {
        console.error('Error fetching category:', error);
        setError('Failed to fetch category');
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryData();
  }, [categorySlug]);

  // Product queries - COPY logic từ ProductList gốc nhưng dùng categoryData.id
  const { data: categoryIds = [], isLoading: pathsLoading } = useQueryCategoryPaths(
    categoryData?.id ? parseInt(categoryData.id) : null
  );

  const {
    data: categoryProductsData,
    isLoading: categoryProductsLoading,
    error: categoryProductsError
  } = useQueryProductsByCategories(categoryIds, {
    enabled: categoryIds.length > 0
  });

  const isProductsLoading = pathsLoading || categoryProductsLoading;
  const productsData = categoryProductsData;

  // Loading state
  if (loading) {
    return (
      <Flex justify="center" align="center" minH="400px" pt={{ xs: '70px', lg: '162px' }}>
        <Spinner size="lg" color="#065FD4" />
      </Flex>
    );
  }

  if (error || !categoryData) {
    notFound();
    return null;
  }

  // Event handlers - COPY từ ProductList gốc
  const handleSearch = () => {
    const params = new URLSearchParams(searchParams);
    if (searchTerm) {
      params.set('keyword', searchTerm);
    } else {
      params.delete('keyword');
    }
    params.set('page', '1');
    router.push(`/san-pham/${categorySlug}?${params.toString()}`, { scroll: false });
  };

  const handleSortChange = (event) => {
    const newSort = event.target.value;
    setCurrentSort(newSort);

    const params = new URLSearchParams(searchParams);
    params.set('sortBy', newSort);
    params.set('page', '1');
    router.push(`/san-pham/${categorySlug}?${params.toString()}`, { scroll: false });
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  // Breadcrumb - SLUG-based
  const breadcrumbData = [
    { title: 'Trang chủ', href: '/' },
    { title: 'Sản Phẩm', href: '/san-pham' },
    { title: categoryData.name, href: '#', isActive: true }
  ];

  const sortOptions = [
    { value: 'newest', label: 'Mới nhất' },
    { value: 'oldest', label: 'Cũ nhất' },
    { value: 'price-low', label: 'Giá thấp → cao' },
    { value: 'price-high', label: 'Giá cao → thấp' },
    { value: 'name-asc', label: 'Tên A → Z' },
    { value: 'name-desc', label: 'Tên Z → A' }
  ];

  const products = productsData?.content || [];
  const totalProducts = productsData?.totalElements || 0;

  return (
    <Flex pt={{ xs: '70px', lg: '162px' }} px={PX_ALL} pb="50px" direction="column">
      <Breadcrumb data={breadcrumbData} />

      <VStack align="start" spacing="16px" mt="20px" mb="40px">
        <Heading as="h1" fontSize={{ xs: '28px', lg: '36px' }} fontWeight={700} color="#003366">
          {categoryData.name}
        </Heading>
        {categoryData.description && (
          <Text fontSize={{ xs: '16px', lg: '18px' }} color="gray.600" lineHeight="1.6">
            {categoryData.description}
          </Text>
        )}
      </VStack>

      {/* Search và Sort - COPY từ ProductList gốc */}
      <Flex direction={{ base: 'column', md: 'row' }} gap="16px" mb="32px" align={{ md: 'center' }}>
        <HStack spacing="12px" flex={1}>
          <InputGroup maxW="400px">
            <InputLeftElement pointerEvents="none">
              <SearchIcon color="gray.300" />
            </InputLeftElement>
            <Input
              placeholder="Tìm kiếm sản phẩm..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={handleKeyPress}
              bg="white"
              borderColor="gray.200"
              _focus={{ borderColor: '#065FD4', boxShadow: '0 0 0 1px #065FD4' }}
            />
          </InputGroup>
          <Button onClick={handleSearch} colorScheme="blue" bg="#065FD4">
            Tìm
          </Button>
        </HStack>

        <HStack spacing="12px">
          <Text fontSize="sm" color="gray.600" whiteSpace="nowrap">
            Sắp xếp theo:
          </Text>
          <Select
            value={currentSort}
            onChange={handleSortChange}
            size="sm"
            maxW="200px"
            bg="white"
            borderColor="gray.200"
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
        </HStack>
      </Flex>

      {/* Products Count */}
      <Text fontSize="sm" color="gray.600" mb="24px">
        Hiển thị {products.length} của {totalProducts} sản phẩm
      </Text>

      {/* Products Grid - COPY từ ProductList gốc */}
      {isProductsLoading ? (
        <Center py="60px">
          <Spinner size="lg" color="#065FD4" />
        </Center>
      ) : products.length > 0 ? (
        <Grid
          templateColumns={{ base: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)', lg: 'repeat(4, 1fr)' }}
          gap="24px"
        >
          {products.map((product) => (
            <GridItem key={product.id}>
              <ProductItem item={product} />
            </GridItem>
          ))}
        </Grid>
      ) : (
        <Center py="60px">
          <VStack spacing="16px">
            <Text fontSize="lg" color="gray.500">
              Không tìm thấy sản phẩm nào
            </Text>
            {keyword && (
              <Button
                onClick={() => {
                  setSearchTerm('');
                  handleSearch();
                }}
                variant="outline"
              >
                Xóa bộ lọc
              </Button>
            )}
          </VStack>
        </Center>
      )}
    </Flex>
  );
};

export default CategoryProductClient;
