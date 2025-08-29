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

const ProductList = ({ categorySlug = [] }) => {
  const router = useRouter();

  // Local state cho pagination và sorting (không còn trong URL)
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentSort, setCurrentSort] = useState('newest');

  // Derived state từ categorySlug
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [subCategoryId, setSubCategoryId] = useState(null);

  // Fetch categories và determine selected category từ slug
  const { data: topCategories = [], isLoading: categoriesLoading } = useQueryTopLevelCategories();

  // Process categorySlug để tìm selectedCategory và subCategoryId
  useEffect(() => {
    if (categorySlug.length === 0) {
      setSelectedCategory('all');
      setSubCategoryId(null);
      return;
    }

    if (topCategories.length > 0) {
      // Tìm category từ slug path
      const findCategoryBySlugPath = (categories, slugPath) => {
        // Build category tree first
        const categoryMap = new Map();
        categories.forEach((cat) => {
          categoryMap.set(cat.id, { ...cat, children: [] });
        });

        categories.forEach((cat) => {
          if (cat.parent_id && categoryMap.has(cat.parent_id)) {
            categoryMap.get(cat.parent_id).children.push(categoryMap.get(cat.id));
          }
        });

        // Traverse slug path
        let currentCategories = categories.filter((cat) => !cat.parent_id);
        let foundCategories = [];

        for (const slug of slugPath) {
          const found = currentCategories.find((cat) => cat.slug === slug);
          if (!found) break;

          foundCategories.push(found);
          currentCategories = categories.filter((cat) => cat.parent_id === found.id);
        }

        return foundCategories;
      };

      const foundPath = findCategoryBySlugPath(topCategories, categorySlug);

      if (foundPath.length > 0) {
        const parentCategory = foundPath[0];
        setSelectedCategory(parentCategory.id.toString());

        if (foundPath.length > 1) {
          const subCategory = foundPath[foundPath.length - 1];
          setSubCategoryId(subCategory.id.toString());
        } else {
          setSubCategoryId(null);
        }
      } else {
        setSelectedCategory('all');
        setSubCategoryId(null);
      }
    }
  }, [categorySlug, topCategories]);

  const effectiveCategoryId = subCategoryId || selectedCategory;

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
  const allProducts = productsData?.content || [];

  // Client-side filtering, sorting, and pagination
  const processedProducts = useMemo(() => {
    let filtered = [...allProducts];

    // Apply search filter
    if (searchTerm.trim()) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (product) =>
          (product.title || '').toLowerCase().includes(searchLower) ||
          (product.kiotviet_name || '').toLowerCase().includes(searchLower)
      );
    }

    // Apply sorting
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

  // Pagination
  const totalElements = processedProducts.length;
  const totalPages = Math.ceil(totalElements / PRODUCTS_PER_PAGE);
  const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
  const products = processedProducts.slice(startIndex, startIndex + PRODUCTS_PER_PAGE);

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

  // Build category URL from hierarchy
  const buildCategoryUrl = (categoryId) => {
    const buildHierarchyPath = (categories, targetId) => {
      const category = categories.find((cat) => cat.id === targetId);
      if (!category) return [];

      if (category.parent_id) {
        return [...buildHierarchyPath(categories, category.parent_id), category.slug];
      }
      return [category.slug];
    };

    const slugPath = buildHierarchyPath(topCategories, categoryId);
    return `/san-pham/${slugPath.join('/')}`;
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
      const url = buildCategoryUrl(parseInt(newCategoryId));
      router.push(url);
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

  const handleCategorySelect = (categoryId) => {
    const url = buildCategoryUrl(categoryId);
    router.push(url);
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
              <CategorySidebar selectedCategory={selectedCategory} onSubCategorySelect={handleCategorySelect} />
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
          </Box>
        </Flex>
      </Container>
    </>
  );
};

export default ProductList;
