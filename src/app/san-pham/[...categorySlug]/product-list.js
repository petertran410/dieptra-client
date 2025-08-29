'use client';

import { useState, useEffect } from 'react';
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
import { API } from '../../../utils/API';

const PRODUCTS_PER_PAGE = 15;

const ProductList = ({ categorySlug = [] }) => {
  const router = useRouter();

  // Local state cho pagination và sorting (không còn trong URL)
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentSort, setCurrentSort] = useState('newest');

  // Data states
  const [categories, setCategories] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [currentCategory, setCurrentCategory] = useState(null);
  const [categoryHierarchy, setCategoryHierarchy] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Fetch categories và products song song
        const [categoriesRes, productsRes] = await Promise.all([
          API.request({ url: '/api/category/for-cms' }),
          API.request({ url: '/api/product/client/get-all' })
        ]);

        setCategories(categoriesRes.data || []);
        setAllProducts(productsRes.content || []);

        // Process category slug path
        if (categorySlug.length > 0) {
          const targetCategory = findCategoryBySlugPath(categoriesRes.data || [], categorySlug);
          if (targetCategory) {
            setCurrentCategory(targetCategory);
            const hierarchy = buildCategoryHierarchy(categoriesRes.data || [], categorySlug);
            setCategoryHierarchy(hierarchy);
          } else {
            setError('Category not found');
            return;
          }
        }
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [categorySlug]);

  // Filter products based on current category
  useEffect(() => {
    let filtered = [...allProducts];

    if (currentCategory) {
      // Lấy tất cả products thuộc category này và children categories
      const categoryIds = getAllCategoryIds(categories, currentCategory.id);
      filtered = allProducts.filter((product) => categoryIds.includes(product.category_id));
    }

    // Apply search filter
    if (searchTerm.trim()) {
      filtered = filtered.filter(
        (product) =>
          (product.title || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
          (product.kiotviet_name || '').toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredProducts(filtered);
    setCurrentPage(1); // Reset to first page when filters change
  }, [allProducts, currentCategory, categories, searchTerm]);

  // Helper functions
  const findCategoryBySlugPath = (categories, slugPath) => {
    const categoryMap = {};
    const rootCategories = [];

    categories.forEach((cat) => {
      categoryMap[cat.id] = { ...cat, children: [] };
    });

    categories.forEach((cat) => {
      if (cat.parent_id) {
        categoryMap[cat.parent_id]?.children.push(categoryMap[cat.id]);
      } else {
        rootCategories.push(categoryMap[cat.id]);
      }
    });

    let current = rootCategories;
    let targetCategory = null;

    for (const slug of slugPath) {
      targetCategory = current.find((cat) => cat.slug === slug);
      if (!targetCategory) return null;
      current = targetCategory.children;
    }

    return targetCategory;
  };

  const buildCategoryHierarchy = (categories, slugPath) => {
    const hierarchy = [];
    let currentCategories = categories.filter((cat) => !cat.parent_id);

    for (const slug of slugPath) {
      const category = currentCategories.find((cat) => cat.slug === slug);
      if (!category) break;

      hierarchy.push(category);
      // Get children for next level
      currentCategories = categories.filter((cat) => cat.parent_id === category.id);
    }

    return hierarchy;
  };

  const getAllCategoryIds = (categories, categoryId) => {
    const ids = [categoryId];
    const children = categories.filter((cat) => cat.parent_id === categoryId);

    children.forEach((child) => {
      ids.push(...getAllCategoryIds(categories, child.id));
    });

    return ids;
  };

  const buildCategoryUrl = (category, hierarchy = []) => {
    // Build slug path từ hierarchy + current category
    const slugPath = [...hierarchy.map((h) => h.slug), category.slug];
    return `/san-pham/${slugPath.join('/')}`;
  };

  // Pagination logic
  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);
  const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
  const endIndex = startIndex + PRODUCTS_PER_PAGE;
  let currentProducts = filteredProducts.slice(startIndex, endIndex);

  // Sorting logic
  currentProducts = [...currentProducts].sort((a, b) => {
    switch (currentSort) {
      case 'price-low':
        return (a.kiotviet_price || 0) - (b.kiotviet_price || 0);
      case 'price-high':
        return (b.kiotviet_price || 0) - (a.kiotviet_price || 0);
      case 'name-asc':
        return (a.title || '').localeCompare(b.title || '');
      case 'name-desc':
        return (b.title || '').localeCompare(a.title || '');
      case 'newest':
      default:
        return b.id - a.id;
    }
  });

  const breadcrumbData = [
    { title: 'Trang chủ', href: '/' },
    { title: 'Sản Phẩm', href: '/san-pham' },
    ...categoryHierarchy.map((cat, index) => ({
      title: cat.name,
      href: `/san-pham/${categoryHierarchy
        .slice(0, index + 1)
        .map((c) => c.slug)
        .join('/')}`
    }))
  ];

  // Event handlers
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSortChange = (event) => {
    setCurrentSort(event.target.value);
    setCurrentPage(1);
  };

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

  const handleSearch = (e) => {
    if (e.key === 'Enter') {
      // Search is handled by useEffect, but we can add additional logic here
      e.preventDefault(); // Prevent form submission if inside a form

      // Optional: Blur the input to hide mobile keyboard
      e.target.blur();

      // Optional: Reset to first page when searching
      setCurrentPage(1);

      // Optional: Add analytics tracking
      // trackSearchEvent(searchTerm);
    }

    // Optional: Clear search on Escape key
    if (e.key === 'Escape') {
      setSearchTerm('');
      e.target.blur();
    }
  };

  const handleCategorySelect = (categoryId) => {
    const category = categories.find((cat) => cat.id === categoryId);
    if (category) {
      // Build hierarchy path để tạo URL
      const hierarchy = buildCategoryHierarchyForId(categories, categoryId);
      const url = buildCategoryUrl(category, hierarchy.slice(0, -1));
      router.push(url);
    }
  };

  const buildCategoryHierarchyForId = (categories, categoryId) => {
    const category = categories.find((cat) => cat.id === categoryId);
    if (!category) return [];

    if (category.parent_id) {
      return [...buildCategoryHierarchyForId(categories, category.parent_id), category];
    }

    return [category];
  };

  // if (loading) {
  //   return (
  //     <Center h="400px">
  //       <Spinner size="xl" color="teal.500" />
  //     </Center>
  //   );
  // }

  if (error) {
    return (
      <Center h="400px">
        <Text color="red.500">{error}</Text>
      </Center>
    );
  }

  return (
    <Container maxW="full" py={8} px={PX_ALL} pt={{ base: '80px', lg: '120px' }}>
      <VStack spacing={8} align="stretch">
        <Breadcrumb data={breadcrumbData} />

        <Heading as="h1" fontSize={{ base: '24px', lg: '32px' }} fontWeight="700" color="#003366">
          {currentCategory ? currentCategory.name : 'Tất Cả Sản Phẩm'}
        </Heading>

        <Grid templateColumns={{ base: '1fr', lg: '300px 1fr' }} gap={8}>
          <GridItem>
            <CategorySidebar
              categories={categories}
              selectedCategoryId={currentCategory?.id}
              onCategorySelect={handleCategorySelect}
            />
          </GridItem>

          <GridItem>
            <VStack spacing={6} align="stretch">
              {/* Search and Sort Controls */}
              <Flex direction={{ base: 'column', md: 'row' }} justify="space-between" gap={4}>
                <InputGroup maxW="300px">
                  <InputLeftElement pointerEvents="none">
                    <SearchIcon color="gray.300" />
                  </InputLeftElement>
                  <Input
                    placeholder="Tìm kiếm sản phẩm..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyPress={handleSearch}
                  />
                </InputGroup>

                <Select maxW="200px" value={currentSort} onChange={handleSortChange}>
                  <option value="newest">Mới nhất</option>
                  <option value="price-low">Giá thấp đến cao</option>
                  <option value="price-high">Giá cao đến thấp</option>
                  <option value="name-asc">Tên A-Z</option>
                  <option value="name-desc">Tên Z-A</option>
                </Select>
              </Flex>

              {/* Products Grid */}
              <Grid
                templateColumns={{
                  base: 'repeat(2, 1fr)',
                  md: 'repeat(3, 1fr)',
                  lg: 'repeat(4, 1fr)'
                }}
                gap={6}
              >
                {currentProducts.map((product) => (
                  <GridItem key={product.id}>
                    <ProductItem product={product} />
                  </GridItem>
                ))}
              </Grid>

              {/* No products message */}
              {currentProducts.length === 0 && (
                <Center h="200px">
                  <Text color="gray.500">Không tìm thấy sản phẩm nào</Text>
                </Center>
              )}

              {/* Pagination */}
              {totalPages > 1 && (
                <HStack justify="center" spacing={2} pt={6}>
                  <Button size="sm" onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
                    « Trước
                  </Button>

                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <Button
                      key={page}
                      size="sm"
                      variant={currentPage === page ? 'solid' : 'outline'}
                      colorScheme={currentPage === page ? 'teal' : 'gray'}
                      onClick={() => handlePageChange(page)}
                    >
                      {page}
                    </Button>
                  ))}

                  <Button
                    size="sm"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                  >
                    Sau »
                  </Button>
                </HStack>
              )}

              {/* Results info */}
              <Text fontSize="sm" color="gray.600" textAlign="center">
                Hiển thị {startIndex + 1}-{Math.min(endIndex, filteredProducts.length)} của {filteredProducts.length}{' '}
                sản phẩm
              </Text>
            </VStack>
          </GridItem>
        </Grid>
      </VStack>
    </Container>
  );
};

export default ProductList;
