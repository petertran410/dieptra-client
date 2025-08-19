'use client';

import { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Grid,
  Heading,
  Flex,
  Select,
  Input,
  InputGroup,
  InputLeftElement,
  Button,
  Text,
  HStack,
  VStack,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink
} from '@chakra-ui/react';
import { SearchIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { PX_ALL } from '../../../utils/const';
import ProductCard from './product-card';
import ProductPagination from './product-pagination';
import { getProductData } from '../../../utils/product-data';
import Head from 'next/head';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [isLoading, setIsLoading] = useState(true);

  const PRODUCTS_PER_PAGE = 12;

  useEffect(() => {
    const loadProducts = async () => {
      setIsLoading(true);
      try {
        const productData = await getProductData();
        setProducts(productData);
        setFilteredProducts(productData);
      } catch (error) {
        console.error('Error loading products:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadProducts();
  }, []);

  useEffect(() => {
    let filtered = [...products];

    if (selectedCategory !== 'all') {
      filtered = filtered.filter((product) => product.category === selectedCategory);
    }

    if (searchTerm) {
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'name':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'newest':
      default:
        filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
    }

    setFilteredProducts(filtered);
    setCurrentPage(1);
  }, [products, selectedCategory, searchTerm, sortBy]);

  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);
  const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
  const currentProducts = filteredProducts.slice(startIndex, startIndex + PRODUCTS_PER_PAGE);
  const breadcrumbData = [
    { title: 'Trang chủ', href: '/' },
    { title: 'Sản Phẩm', href: '/san-pham', isActive: true }
  ];

  return (
    <>
      <Head>
        <title>Sản Phẩm | Diệp Trà</title>
        <link rel="canonical" href={`${process.env.NEXT_PUBLIC_DOMAIN}/bai-viet`} />
        <meta name="robots" content="index, follow" />
      </Head>
      <Flex>
        <Container maxW="1400px" px={PX_ALL} pt={{ base: '80px', lg: '100px' }}>
          <Breadcrumb data={breadcrumbData} />

          <VStack align="start" spacing="16px" mt="20px" mb="40px">
            <Heading as="h1" fontSize={{ xs: '28px', lg: '36px' }} fontWeight={700} color="#003366">
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
                    bg="white"
                    borderColor="gray.300"
                    _hover={{ borderColor: 'gray.400' }}
                    _focus={{ borderColor: '#003366', boxShadow: '0 0 0 1px #003366' }}
                  />
                </InputGroup>
              </HStack>

              <HStack spacing={4} minW="auto">
                <Select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  bg="white"
                  borderColor="gray.300"
                  minW="180px"
                >
                  <option value="all">Tất cả danh mục</option>
                  <option value="syrup">Siro</option>
                  <option value="jam">Mứt</option>
                  <option value="powder">Bột kem</option>
                  <option value="topping">Topping</option>
                </Select>

                <Select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  bg="white"
                  borderColor="gray.300"
                  minW="160px"
                >
                  <option value="newest">Mới nhất</option>
                  <option value="name">Tên A-Z</option>
                  <option value="price-low">Giá thấp đến cao</option>
                  <option value="price-high">Giá cao đến thấp</option>
                </Select>
              </HStack>
            </Flex>

            <Text color="gray.600" fontSize="sm">
              Hiển thị {startIndex + 1}–{Math.min(startIndex + PRODUCTS_PER_PAGE, filteredProducts.length)} của{' '}
              {filteredProducts.length} kết quả
            </Text>
          </VStack>

          {isLoading ? (
            <Grid templateColumns="repeat(auto-fit, minmax(280px, 1fr))" gap={6}>
              {[...Array(12)].map((_, index) => (
                <Box key={index} bg="white" borderRadius="lg" p={4} shadow="sm">
                  <Box bg="gray.200" h="200px" borderRadius="md" mb={4} />
                  <Box bg="gray.200" h="20px" borderRadius="md" mb={2} />
                  <Box bg="gray.200" h="16px" borderRadius="md" w="60%" />
                </Box>
              ))}
            </Grid>
          ) : (
            <Grid templateColumns="repeat(auto-fit, minmax(280px, 1fr))" gap={6} mb={8}>
              {currentProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </Grid>
          )}

          {!isLoading && currentProducts.length === 0 && (
            <Box textAlign="center" py={12}>
              <Text fontSize="lg" color="gray.500" mb={4}>
                Không tìm thấy sản phẩm nào
              </Text>
              <Button
                colorScheme="blue"
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('all');
                }}
              >
                Xóa bộ lọc
              </Button>
            </Box>
          )}

          {totalPages > 1 && (
            <ProductPagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
          )}
        </Container>
      </Flex>
    </>
  );
};

export default ProductList;
