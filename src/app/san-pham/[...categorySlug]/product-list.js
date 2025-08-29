'use client';

import { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import CategorySidebar from '../_components/category-sidebar';
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
  Center,
  useQuery
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

const ProductList = ({ categorySlug = [] }) => {
  const router = useRouter();

  // Local state cho pagination và sorting (không còn trong URL)
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentSort, setCurrentSort] = useState('newest');

  // Derived state từ categorySlug
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [subCategoryId, setSubCategoryId] = useState(null);

  const { data: allCategoriesData, isLoading: categoriesLoading } = useQuery({
    queryKey: ['GET_ALL_CATEGORIES_FOR_ROUTING'],
    queryFn: async () => {
      const response = await API.request({
        url: '/api/category/for-cms',
        method: 'GET'
      });
      return response?.data || [];
    },
    staleTime: 10 * 60 * 1000
  });

  const topCategories = allCategoriesData?.filter((cat) => !cat.parent_id) || [];

  useEffect(() => {
    console.log('=== PROCESSING CATEGORY SLUG ===');
    console.log('categorySlug:', categorySlug);
    console.log('allCategoriesData count:', allCategoriesData?.length || 0);

    if (categorySlug.length === 0) {
      setSelectedCategory('all');
      setSubCategoryId(null);
      return;
    }

    if (allCategoriesData && allCategoriesData.length > 0) {
      // SỬA: Tìm category từ slug path với FULL categories
      const findCategoryBySlugPath = (categories, slugPath) => {
        console.log('findCategoryBySlugPath with full categories');
        console.log(
          'Available slugs:',
          categories.map((c) => ({ id: c.id, slug: c.slug, name: c.name, parent_id: c.parent_id }))
        );

        const foundCategories = [];
        for (const slug of slugPath) {
          console.log('Looking for slug:', slug);
          // Tìm trong TẤT CẢ categories, không chỉ root
          const found = categories.find((cat) => cat.slug === slug);
          if (!found) {
            console.log('Slug not found:', slug);
            break;
          }
          console.log('Found category:', { id: found.id, name: found.name, parent_id: found.parent_id });
          foundCategories.push(found);
        }

        console.log(
          'Final foundCategories:',
          foundCategories.map((c) => ({ id: c.id, name: c.name }))
        );
        return foundCategories;
      };

      const foundPath = findCategoryBySlugPath(allCategoriesData, categorySlug);

      if (foundPath.length > 0) {
        const targetCategory = foundPath[foundPath.length - 1]; // Category cuối cùng

        // Tìm top-level parent của target category
        let topLevelParent = targetCategory;
        while (topLevelParent.parent_id) {
          const parent = allCategoriesData.find((cat) => cat.id === topLevelParent.parent_id);
          if (!parent) break;
          topLevelParent = parent;
        }

        console.log('Target category:', { id: targetCategory.id, name: targetCategory.name });
        console.log('Top-level parent:', { id: topLevelParent.id, name: topLevelParent.name });

        setSelectedCategory(topLevelParent.id.toString());

        // Nếu target khác top-level parent thì set subCategoryId
        if (targetCategory.id !== topLevelParent.id) {
          console.log('Setting subCategoryId:', targetCategory.id);
          setSubCategoryId(targetCategory.id.toString());
        } else {
          setSubCategoryId(null);
        }
      } else {
        console.log('No categories found in path');
        setSelectedCategory('all');
        setSubCategoryId(null);
      }
    }
  }, [categorySlug, allCategoriesData]);

  const effectiveCategoryId = subCategoryId || selectedCategory;
  console.log('Logic check:');
  console.log('selectedCategory:', selectedCategory);
  console.log('subCategoryId:', subCategoryId);
  console.log('effectiveCategoryId:', effectiveCategoryId);

  const { data: categoryHierarchy, isLoading: hierarchyLoading } = useQueryCategoryHierarchy(selectedCategory);

  const { data: categoryIds = [], isLoading: pathsLoading } = useQueryCategoryPaths(
    effectiveCategoryId && effectiveCategoryId !== 'all' ? parseInt(effectiveCategoryId) : null
  );
  console.log('useQueryCategoryPaths input:', effectiveCategoryId);
  console.log('categoryIds result:', categoryIds);

  const shouldUseCategoryFilter = effectiveCategoryId && effectiveCategoryId !== 'all' && categoryIds.length > 0;

  const {
    data: allProductsData,
    isLoading: allProductsLoading,
    error: allProductsError
  } = useQueryProductList({
    currentPage,
    enabled: !shouldUseCategoryFilter
  });

  const {
    data: categoryProductsData,
    isLoading: categoryProductsLoading,
    error: categoryProductsError
  } = useQueryProductsByCategories(categoryIds, {
    currentPage,
    enabled: shouldUseCategoryFilter
  });

  const isLoading =
    categoriesLoading || pathsLoading || (shouldUseCategoryFilter ? categoryProductsLoading : allProductsLoading);

  const error = allProductsError || categoryProductsError;

  const productsData = shouldUseCategoryFilter ? categoryProductsData : allProductsData;
  const allProducts = productsData?.content || [];

  const processedProducts = useMemo(() => {
    let filtered = [...allProducts];

    if (searchTerm.trim()) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (product) =>
          (product.title || '').toLowerCase().includes(searchLower) ||
          (product.kiotviet_name || '').toLowerCase().includes(searchLower)
      );
    }

    filtered.sort((a, b) => {
      switch (currentSort) {
        case 'price-low':
          return (a.kiotviet_price || 0) - (b.kiotviet_price || 0);
        case 'price-high':
          return (b.kiotviet_price || 0) - (a.kiotviet_price || 0);
        case 'name':
          return (a.title || '').localeCompare(b.title || '');
        case 'newest':
        default:
          return b.id - a.id;
      }
    });

    return filtered;
  }, [allProducts, searchTerm, currentSort]);

  const totalElements = productsData?.totalElements || 0;
  const totalPages = Math.ceil(totalElements / PRODUCTS_PER_PAGE);
  const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
  const products = processedProducts;

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

  const buildCategoryUrl = (categoryId) => {
    const category = topCategories.find((cat) => cat.id === categoryId || cat.id.toString() === categoryId.toString());

    if (!category || !category.slug) {
      console.error('Category not found or missing slug:', categoryId);
      return '/san-pham';
    }

    return `/san-pham/${category.slug}`;
  };

  const handleSearch = (e) => {
    if (e.key === 'Enter' || e.type === 'click') {
      setCurrentPage(1);
    }
  };

  const handleCategoryChange = (newCategoryId) => {
    if (newCategoryId === 'all') {
      router.push('/san-pham');
    } else {
      const category = topCategories.find(
        (cat) => cat.id === parseInt(newCategoryId) || cat.id.toString() === newCategoryId.toString()
      );

      if (category && category.slug) {
        router.push(`/san-pham/${category.slug}`);
      } else {
        console.error('Category not found:', newCategoryId, 'Available categories:', topCategories);
        router.push('/san-pham'); // Fallback
      }
    }
  };

  const handleSortChange = (newSortBy) => {
    setCurrentSort(newSortBy);
    setCurrentPage(1);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCategorySelect = (urlOrId) => {
    console.log('handleCategorySelect called with:', urlOrId);

    if (typeof urlOrId === 'string' && urlOrId.startsWith('/san-pham/')) {
      router.push(urlOrId);
    } else {
      const url = buildCategoryUrl(urlOrId);
      router.push(url);
    }
  };

  const renderPagination = () => {
    if (totalPages <= 1) {
      return null;
    }

    return (
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
    );
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

    const category = topCategories.find((cat) => cat.id.toString() === selectedCategory);
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
    const baseBreadcrumb = [
      { title: 'Trang chủ', href: '/' },
      { title: 'Sản Phẩm', href: '/san-pham' }
    ];

    if (selectedCategory === 'all' || categorySlug.length === 0) {
      return [...baseBreadcrumb, { title: 'Tất Cả Sản Phẩm', href: '#', isActive: true }];
    }

    // Build breadcrumb từ categorySlug
    let currentPath = '';
    categorySlug.forEach((slug, index) => {
      currentPath += (index === 0 ? '' : '/') + slug;
      const category = topCategories.find((cat) => cat.slug === slug);

      if (category) {
        baseBreadcrumb.push({
          title: category.name,
          href: index === categorySlug.length - 1 ? '#' : `/san-pham/${currentPath}`,
          isActive: index === categorySlug.length - 1
        });
      }
    });

    return baseBreadcrumb;
  };

  const sortOptions = [
    { value: 'newest', label: 'Mới nhất' },
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
              : `Hiển thị ${startIndex + 1}-${Math.min(
                  startIndex + PRODUCTS_PER_PAGE,
                  totalElements
                )} của ${totalElements} kết quả`}
            {selectedCategory !== 'all' && (
              <Text as="span" ml={2} fontWeight="500" color="#003366">
                • {topCategories.find((cat) => cat.id.toString() === selectedCategory)?.name}
              </Text>
            )}
          </Text>
        </VStack>

        <Flex gap={6} align="flex-start" direction={{ base: 'column', lg: 'row' }}>
          {selectedCategory && selectedCategory !== 'all' && (
            <Box display={{ base: 'none', lg: 'block' }} flexShrink={0}>
              <CategorySidebar
                selectedCategory={selectedCategory}
                onSubCategorySelect={handleCategorySelect}
                subCategoryId={subCategoryId}
              />
            </Box>
          )}

          <Box flex={1} w="full">
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
                      lg: selectedCategory !== 'all' ? 'repeat(3, 1fr)' : 'repeat(4, 1fr)',
                      xl: selectedCategory !== 'all' ? 'repeat(4, 1fr)' : 'repeat(5, 1fr)'
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
                          router.push('/san-pham');
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

                {renderPagination()}
              </>
            )}
          </Box>
        </Flex>
      </Container>

      {process.env.NODE_ENV === 'development' && (
        <Box mt={8} p={4} bg="gray.100" fontSize="sm">
          <Text>
            <strong>Debug Info:</strong>
          </Text>
          <Text>Total Products: {totalElements}</Text>
          <Text>Total Pages: {totalPages}</Text>
          <Text>Current Page: {currentPage}</Text>
          <Text>Products on Page: {products.length}</Text>
          <Text>Selected Category: {selectedCategory}</Text>
          <Text>Sub Category: {subCategoryId}</Text>
        </Box>
      )}
    </>
  );
};

export default ProductList;
