// MODIFY src/app/san-pham/_components/product-list.js
// Replace query-based navigation với slug-based navigation

'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import CategorySidebar from './category-sidebar';
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
import Head from 'next/head';

const PRODUCTS_PER_PAGE = 15;

const ProductList = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentPage = parseInt(searchParams.get('page')) || 1;
  const keyword = searchParams.get('keyword') || '';
  const categoryId = searchParams.get('categoryId');
  const subCategoryId = searchParams.get('subCategoryId');
  const sortBy = searchParams.get('sortBy') || 'newest';

  const [searchTerm, setSearchTerm] = useState(keyword);
  const [selectedCategory, setSelectedCategory] = useState(categoryId || 'all');
  const [currentSort, setCurrentSort] = useState(sortBy);

  const effectiveCategoryId = subCategoryId || categoryId;

  const { data: topCategories = [], isLoading: categoriesLoading } = useQueryTopLevelCategories();
  const { data: categoryHierarchy, isLoading: hierarchyLoading } = useQueryCategoryHierarchy(selectedCategory);
  const { data: categoryIds = [], isLoading: pathsLoading } = useQueryCategoryPaths(
    effectiveCategoryId && effectiveCategoryId !== 'all' ? parseInt(effectiveCategoryId) : null
  );

  const shouldUseCategoryFilter = effectiveCategoryId && effectiveCategoryId !== 'all' && categoryIds.length > 0;

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
  } = useQueryProductsByCategories(categoryIds, {
    enabled: shouldUseCategoryFilter
  });

  const isLoading =
    categoriesLoading || pathsLoading || (shouldUseCategoryFilter ? categoryProductsLoading : allProductsLoading);

  const error = allProductsError || categoryProductsError;
  const productsData = shouldUseCategoryFilter ? categoryProductsData : allProductsData;
  const products = productsData?.content || [];
  const totalElements = productsData?.totalElements || 0;
  const totalPages = Math.ceil(totalElements / PRODUCTS_PER_PAGE);

  const getCategoryDisplayName = () => {
    if (selectedCategory === 'all') {
      return 'Tất Cả Sản Phẩm';
    }

    if (subCategoryId && categoryHierarchy) {
      const findSubCategoryName = (categories, targetId) => {
        if (!categories || !Array.isArray(categories)) return null;

        for (const category of categories) {
          if (category.id.toString() === targetId.toString()) {
            return category.name;
          }

          if (category.children && category.children.length > 0) {
            const found = findSubCategoryName(category.children, targetId);
            if (found) return found;
          }
        }
        return null;
      };

      const subCategoryName = findSubCategoryName(categoryHierarchy.children, subCategoryId);
      if (subCategoryName) {
        return subCategoryName;
      }
    }

    const category = topCategories.find((cat) => cat.id.toString() === selectedCategory.toString());
    return category ? category.name : 'Danh Mục';
  };

  // REPLACE old updateURL logic với slug-based navigation
  const navigateToCategory = async (categoryId) => {
    if (categoryId === 'all') {
      router.push('/san-pham');
      return;
    }

    try {
      // Get category slug path từ API
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_DOMAIN}/api/category/build-path`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ categoryIds: [parseInt(categoryId)] })
      });

      if (response.ok) {
        const slugPath = await response.json();
        if (slugPath && slugPath.length > 0) {
          router.push(`/san-pham/${slugPath.join('/')}`);
        } else {
          // Fallback to query params nếu không có slug
          router.push(`/san-pham?categoryId=${categoryId}`);
        }
      } else {
        // Fallback to query params
        router.push(`/san-pham?categoryId=${categoryId}`);
      }
    } catch (error) {
      console.error('Navigation error:', error);
      // Fallback to query params
      router.push(`/san-pham?categoryId=${categoryId}`);
    }
  };

  const handleSearch = (e) => {
    if (e.key === 'Enter' || e.type === 'click') {
      const params = new URLSearchParams();
      if (searchTerm.trim()) params.set('keyword', searchTerm);
      if (selectedCategory && selectedCategory !== 'all') params.set('categoryId', selectedCategory);

      const newURL = `/san-pham${params.toString() ? `?${params.toString()}` : ''}`;
      router.push(newURL, { scroll: false });
    }
  };

  const handleCategoryChange = (newCategoryId) => {
    setSelectedCategory(newCategoryId);
    navigateToCategory(newCategoryId);
  };

  const handleSortChange = (newSortBy) => {
    setCurrentSort(newSortBy);
    // For now, handle sorting client-side hoặc keep current URL pattern
    const params = new URLSearchParams(searchParams);
    params.set('sortBy', newSortBy);
    router.push(`/san-pham?${params.toString()}`, { scroll: false });
  };

  const handlePageChange = (newPage) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', newPage.toString());
    router.push(`/san-pham?${params.toString()}`, { scroll: false });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getMetadata = () => {
    const defaultDescription =
      'Khám phá bộ sưu tập nguyên liệu pha chế cao cấp từ Diệp Trà - Siro, mứt, bột kem và nhiều sản phẩm chất lượng khác.';

    if (selectedCategory === 'all') {
      return {
        title: 'Sản Phẩm',
        description: defaultDescription
      };
    }

    if (subCategoryId && categoryHierarchy) {
      const findSubCategory = (categories, targetId) => {
        if (!categories || !Array.isArray(categories)) return null;

        for (const category of categories) {
          if (category.id.toString() === targetId.toString()) {
            return category;
          }

          if (category.children && category.children.length > 0) {
            const found = findSubCategory(category.children, targetId);
            if (found) return found;
          }
        }
        return null;
      };

      const subCategory = findSubCategory(categoryHierarchy.children, subCategoryId);
      if (subCategory) {
        return {
          title: subCategory.title_meta || subCategory.name,
          description: subCategory.description || defaultDescription
        };
      }
    }

    if (categoryHierarchy) {
      return {
        title: categoryHierarchy.title_meta || categoryHierarchy.name,
        description: categoryHierarchy.description || defaultDescription
      };
    }

    const category = topCategories.find((cat) => cat.id.toString() === selectedCategory.toString());
    if (category) {
      return {
        title: category.title_meta || category.name,
        description: category.description || defaultDescription
      };
    }

    return {
      title: 'Sản Phẩm',
      description: defaultDescription
    };
  };

  const metadata = getMetadata();

  const getBreadcrumbData = () => {
    const breadcrumbs = [
      { title: 'Trang chủ', href: '/' },
      { title: 'Sản Phẩm', href: '/san-pham' }
    ];

    if (selectedCategory && selectedCategory !== 'all') {
      const category = topCategories.find((cat) => cat.id.toString() === selectedCategory.toString());
      if (category) {
        breadcrumbs.push({ title: category.name, href: '#', isActive: !subCategoryId });

        if (subCategoryId && categoryHierarchy) {
          const findSubCategory = (categories, targetId) => {
            if (!categories || !Array.isArray(categories)) return null;
            for (const cat of categories) {
              if (cat.id.toString() === targetId.toString()) return cat;
              if (cat.children) {
                const found = findSubCategory(cat.children, targetId);
                if (found) return found;
              }
            }
            return null;
          };

          const subCategory = findSubCategory(categoryHierarchy.children, subCategoryId);
          if (subCategory) {
            breadcrumbs.push({ title: subCategory.name, href: '#', isActive: true });
          }
        }
      }
    }

    return breadcrumbs;
  };

  if (isLoading) {
    return (
      <Container maxW="full" py={8} px={PX_ALL}>
        <Center h="400px">
          <VStack spacing={4}>
            <Spinner size="xl" color="primary.500" />
            <Text>Đang tải sản phẩm...</Text>
          </VStack>
        </Center>
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxW="full" py={8} px={PX_ALL}>
        <Center h="400px">
          <Text color="red.500">Có lỗi xảy ra khi tải sản phẩm</Text>
        </Center>
      </Container>
    );
  }

  const sortOptions = [
    { value: 'newest', label: 'Mới nhất' },
    { value: 'oldest', label: 'Cũ nhất' },
    { value: 'name', label: 'Tên A-Z' },
    { value: 'price-low', label: 'Giá thấp → cao' },
    { value: 'price-high', label: 'Giá cao → thấp' }
  ];

  return (
    <>
      <Head>
        <title>{metadata.title} | Diệp Trà</title>
        <meta name="robots" content="index, follow" />
        <meta name="description" content={metadata.description} />
      </Head>

      <Container maxW="full" py={8} px={PX_ALL} pt={{ base: '80px', lg: '180px' }}>
        <VStack align="start" spacing="16px" mt="20px" mb="40px">
          <Breadcrumb data={getBreadcrumbData()} />
          <Heading as="h1" fontSize={{ base: '28px', lg: '36px' }} fontWeight={700} color="#003366">
            {getCategoryDisplayName()}
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
                  _focus={{ borderColor: '#003366' }}
                />
              </InputGroup>

              <Button onClick={handleSearch} colorScheme="blue" minW="100px">
                Tìm kiếm
              </Button>
            </HStack>

            <HStack spacing={4}>
              <Select
                value={currentSort}
                onChange={(e) => handleSortChange(e.target.value)}
                bg="white"
                maxW="200px"
                border="1px solid #E2E8F0"
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Select>
            </HStack>
          </Flex>
        </VStack>

        <Flex gap="32px" align="start">
          <Box minW="280px" display={{ base: 'none', lg: 'block' }}>
            <CategorySidebar
              categories={topCategories}
              selectedCategory={selectedCategory}
              onCategoryChange={handleCategoryChange}
              categoryHierarchy={categoryHierarchy}
              subCategoryId={subCategoryId}
            />
          </Box>

          <Box flex={1}>
            {products.length > 0 ? (
              <>
                <Grid
                  templateColumns={{
                    base: 'repeat(1, 1fr)',
                    sm: 'repeat(2, 1fr)',
                    md: 'repeat(3, 1fr)',
                    lg: 'repeat(4, 1fr)',
                    xl: 'repeat(5, 1fr)'
                  }}
                  gap={6}
                  mb={8}
                >
                  {products.map((product) => (
                    <GridItem key={product.id}>
                      <ProductItem item={product} />
                    </GridItem>
                  ))}
                </Grid>

                {totalPages > 1 && (
                  <Flex justify="center" align="center" gap={2} pt={6}>
                    <Button
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      variant="outline"
                      size="sm"
                    >
                      ‹ Trước
                    </Button>

                    <HStack spacing={1}>
                      {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                        const startPage = Math.max(1, Math.min(currentPage - 2, totalPages - 4));
                        const pageNum = startPage + i;

                        if (pageNum > totalPages) return null;

                        return (
                          <Button
                            key={pageNum}
                            onClick={() => handlePageChange(pageNum)}
                            variant={currentPage === pageNum ? 'solid' : 'outline'}
                            colorScheme={currentPage === pageNum ? 'blue' : 'gray'}
                            size="sm"
                            minW="40px"
                          >
                            {pageNum}
                          </Button>
                        );
                      })}
                    </HStack>

                    <Button
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      variant="outline"
                      size="sm"
                    >
                      Sau ›
                    </Button>

                    <Text fontSize="sm" color="gray.600" ml={4}>
                      Trang {currentPage} / {totalPages}
                    </Text>
                  </Flex>
                )}
              </>
            ) : (
              <Center h="200px">
                <Text fontSize="lg" color="gray.500">
                  Không tìm thấy sản phẩm nào
                </Text>
              </Center>
            )}
          </Box>
        </Flex>
      </Container>
    </>
  );
};

export default ProductList;
