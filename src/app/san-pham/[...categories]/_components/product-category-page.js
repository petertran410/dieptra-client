'use client';

import { useEffect, useState } from 'react';
import Breadcrumb from '../../../../components/breadcrumb/breadcrumb';
import ProductItem from '../../../../components/product-item/product-item';
import { Grid, GridItem, Container, Heading, Spinner, Center, VStack, Text } from '@chakra-ui/react';
import { PX_ALL } from '../../../../utils/const';

const ProductCategoryPage = ({ categoryData }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const finalCategory = categoryData[categoryData.length - 1];

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_DOMAIN}/api/products/by-categories?categoryIds=${finalCategory.id}`
        );

        if (response.ok) {
          const data = await response.json();
          setProducts(data.content || []);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [categoryData]);

  // Build breadcrumb
  const breadcrumbData = [
    { title: 'Trang chủ', href: '/' },
    { title: 'Sản Phẩm', href: '/san-pham' }
  ];

  let currentPath = '/san-pham';
  categoryData.forEach((category, index) => {
    currentPath += `/${category.slug}`;
    breadcrumbData.push({
      title: category.name,
      href: currentPath,
      isActive: index === categoryData.length - 1
    });
  });

  const finalCategory = categoryData[categoryData.length - 1];

  return (
    <Container maxW="full" py={8} px={PX_ALL} pt={{ base: '80px', lg: '120px' }}>
      <VStack spacing={8} align="stretch">
        <Breadcrumb data={breadcrumbData} />

        <Heading as="h1" fontSize="32px" fontWeight="700" color="#003366">
          {finalCategory.name}
        </Heading>

        {finalCategory.description && (
          <Text fontSize="16px" color="gray.600">
            {finalCategory.description}
          </Text>
        )}

        {loading ? (
          <Center py={20}>
            <Spinner size="xl" />
          </Center>
        ) : (
          <Grid templateColumns="repeat(auto-fill, minmax(280px, 1fr))" gap={6}>
            {products.map((product) => (
              <GridItem key={product.id}>
                <ProductItem item={product} />
              </GridItem>
            ))}
          </Grid>
        )}

        {!loading && products.length === 0 && (
          <Center py={20}>
            <Text fontSize="18px" color="gray.500">
              Chưa có sản phẩm trong danh mục này
            </Text>
          </Center>
        )}
      </VStack>
    </Container>
  );
};

export default ProductCategoryPage;
