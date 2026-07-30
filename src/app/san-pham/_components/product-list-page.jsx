import { Box, Center, Container, Flex, Grid, GridItem, Heading, Text, VStack } from '@chakra-ui/react';
import qs from 'qs';
import { PX_ALL } from '../../../utils/const';
import { convertSlugURL, getBaseUrl } from '../../../utils/helper-server';
import { serverFetchJSON } from '../../../utils/server-fetch';
import Breadcrumb from '../../../components/breadcrumb';
import ProductItem from '../../../components/product-item/product-item';
import CategorySidebar from './category-sidebar';
import ProductListControls from './product-list-controls';
import ProductPagination from './product-pagination';

const PAGE_SIZE = 15;

const SORT_MAP = {
  name: { orderBy: 'title', isDesc: false },
  'price-low': { orderBy: 'kiotviet_price', isDesc: false },
  'price-high': { orderBy: 'kiotviet_price', isDesc: true }
};

async function fetchAllCategories() {
  try {
    const data = await serverFetchJSON('/api/category/client/list', { next: { revalidate: 600 } });
    return data?.data || [];
  } catch {
    return [];
  }
}

function findBySlugPath(allCategories, slugPath) {
  if (!slugPath?.length) return null;
  const buildPath = (id) => {
    const cat = allCategories.find((c) => c.id === id);
    if (!cat) return '';
    if (!cat.parent_id) return cat.slug;
    const parent = buildPath(cat.parent_id);
    return parent ? `${parent}/${cat.slug}` : cat.slug;
  };
  const target = slugPath.join('/');
  return allCategories.find((c) => buildPath(c.id) === target) || null;
}

function collectCategoryTree(allCategories, rootId) {
  const ids = [rootId];
  const recurse = (parentId) => {
    allCategories.forEach((c) => {
      if (c.parent_id === parentId && !ids.includes(c.id)) {
        ids.push(c.id);
        recurse(c.id);
      }
    });
  };
  recurse(rootId);
  return ids;
}

async function fetchProducts({ categoryIds, keyword, sort, page }) {
  const sortParams = SORT_MAP[sort] || SORT_MAP.name;
  const params = {
    pageNumber: Math.max(0, page - 1),
    pageSize: PAGE_SIZE,
    is_visible: 'true',
    ...sortParams
  };
  if (categoryIds?.length) params.categoryIds = categoryIds.join(',');
  if (keyword) params.title = keyword;
  try {
    const data = await serverFetchJSON(`/api/product/client/get-all?${qs.stringify(params)}`, {
      next: { revalidate: 60 }
    });
    return data || { content: [], totalElements: 0 };
  } catch (e) {
    console.error('fetchProducts error', e);
    return { content: [], totalElements: 0 };
  }
}

function getBreadcrumb(allCategories, slugPath) {
  const items = [
    { title: 'Trang chủ', href: '/' },
    { title: 'Sản phẩm', href: '/san-pham' }
  ];
  if (!slugPath?.length) return items;
  let path = '';
  slugPath.forEach((slug, i) => {
    path += (i === 0 ? '' : '/') + slug;
    const cat = allCategories.find((c) => c.slug === slug);
    if (cat) {
      items.push({
        title: cat.name,
        href: i === slugPath.length - 1 ? '#' : `/san-pham/${path}`,
        isActive: i === slugPath.length - 1
      });
    }
  });
  return items;
}

export default async function ProductListPage({ slugPath = [], pageNumber = 1, searchParams = {} }) {
  const allCategories = await fetchAllCategories();
  const topCategories = allCategories
    .filter((c) => !c.parent_id)
    .sort((a, b) => (a.priority || 0) - (b.priority || 0) || a.name.localeCompare(b.name));

  const targetCategory = findBySlugPath(allCategories, slugPath);
  let rootCategory = targetCategory;
  while (rootCategory?.parent_id) {
    rootCategory = allCategories.find((c) => c.id === rootCategory.parent_id);
  }

  const categoryIds = targetCategory ? collectCategoryTree(allCategories, targetCategory.id) : [];

  const keyword = searchParams.keyword || '';
  const sort = searchParams.sort || 'name';
  const page = Math.max(1, pageNumber);

  const productsData = await fetchProducts({ categoryIds, keyword, sort, page });
  const products = productsData.content || [];
  const totalElements = productsData.totalElements || 0;
  const totalPages = Math.ceil(totalElements / PAGE_SIZE);

  const breadcrumbData = getBreadcrumb(allCategories, slugPath);
  const heading = targetCategory?.name || 'Sản Phẩm';

  const baseUrl = getBaseUrl();
  const basePath = slugPath.length ? `/san-pham/${slugPath.join('/')}` : '/san-pham';

  // ItemList JSON-LD
  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: products.map((p, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      url: `${baseUrl}/san-pham/diep-tra/${p.slug || convertSlugURL(p.title || p.kiotviet_name || '')}`,
      name: p.title || p.kiotviet_name
    }))
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbData.map((b, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: b.title,
      item: b.href === '#' ? `${baseUrl}${basePath}` : `${baseUrl}${b.href}`
    }))
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <Container maxW="auto" py={8} px={PX_ALL} pt={{ base: '80px', lg: '180px' }}>
        <VStack align="start" spacing="16px" mt="20px" mb="40px">
          <Breadcrumb data={breadcrumbData} />
          <Heading as="h1" fontSize={{ base: '28px', lg: '36px' }} fontWeight={700} color="#003366">
            {heading}
          </Heading>

          {targetCategory?.top_text && (
            <Box
              className="html-content"
              w="full"
              mt="8px"
              p="16px"
              bg="#F8F9FA"
              borderRadius="8px"
              lineHeight="1.6"
              dangerouslySetInnerHTML={{ __html: targetCategory.top_text }}
            />
          )}

          <ProductListControls
            topCategories={topCategories}
            selectedCategoryId={rootCategory?.id?.toString()}
            currentSort={sort}
            currentKeyword={keyword}
            basePath={basePath}
          />
        </VStack>

        <Flex gap={6} align="flex-start" direction={{ base: 'column', lg: 'row' }}>
          {rootCategory && (
            <Box flexShrink={0} w={{ base: '100%', md: 'auto' }}>
              <CategorySidebar
                rootCategory={rootCategory}
                allCategories={allCategories}
                activeCategoryId={targetCategory?.id}
                slugPath={slugPath}
              />
            </Box>
          )}

          <Box flex={1} w="full">
            {products.length > 0 ? (
              <Grid
                templateColumns={{
                  base: 'repeat(1, 1fr)',
                  sm: 'repeat(2, 1fr)',
                  md: 'repeat(3, 1fr)',
                  '2xl': 'repeat(5, 1fr)'
                }}
                gap={6}
                mb={10}
              >
                {products.map((p) => (
                  <GridItem key={p.id}>
                    <ProductItem item={p} />
                  </GridItem>
                ))}
              </Grid>
            ) : (
              <Center py={20}>
                <VStack>
                  <Text fontSize="xl" color="gray.600">
                    Không tìm thấy sản phẩm
                  </Text>
                </VStack>
              </Center>
            )}

            <ProductPagination
              currentPage={page}
              totalPages={totalPages}
              basePath={basePath}
              searchParams={{
                ...(keyword && { keyword }),
                ...(sort && sort !== 'name' && { sort })
              }}
            />

            {targetCategory?.bottom_content && (
              <Box
                className="html-content"
                mt="40px"
                p="20px"
                bg="#F8F9FA"
                borderRadius="8px"
                lineHeight="1.6"
                dangerouslySetInnerHTML={{ __html: targetCategory.bottom_content }}
              />
            )}
          </Box>
        </Flex>
      </Container>
    </>
  );
}
