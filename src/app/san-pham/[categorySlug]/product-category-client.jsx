// src/app/san-pham/[categorySlug]/product-category-client.jsx
'use client';

import { useState, useEffect } from 'react';
import { Box, Grid, Flex, Text, Spinner } from '@chakra-ui/react';
import Link from 'next/link';
import Breadcrumb from '../../../components/breadcrumb/breadcrumb';
import ProductItem from '../../../components/product-item/product-item';
import { PX_ALL } from '../../../utils/const';
import { convertSlugURL } from '../../../utils/helper-server';
import { API } from '../../../utils/API';

const ProductCategoryClient = ({ categorySlug }) => {
  const [categoryData, setCategoryData] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategoryProducts = async () => {
      try {
        // Lấy category data
        const categoryResponse = await API.request({
          url: `/api/category/client/find-by-slug/${categorySlug}`
        });
        setCategoryData(categoryResponse);

        // Lấy products theo category
        const productsResponse = await API.request({
          url: '/api/product/by-categories',
          params: { categoryId: categoryResponse.id, pageSize: 50 }
        });

        setProducts(productsResponse.content || []);
      } catch (error) {
        console.error('Error fetching category products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryProducts();
  }, [categorySlug]);

  if (loading) {
    return (
      <Flex pt={{ xs: '70px', lg: '162px' }} px={PX_ALL} justify="center" align="center" minH="400px">
        <Spinner size="lg" color="#065FD4" />
      </Flex>
    );
  }

  if (!categoryData) {
    return <div>Category not found</div>;
  }

  const breadcrumbData = [
    { title: 'Trang chủ', href: '/' },
    { title: 'Sản Phẩm', href: '/san-pham' },
    { title: categoryData.name, href: '#', isActive: true }
  ];

  return (
    <Flex pt={{ xs: '70px', lg: '162px' }} px={PX_ALL} pb="50px" direction="column">
      <Breadcrumb data={breadcrumbData} />

      <Box mt="20px" mb="40px">
        <Text fontSize="32px" fontWeight={700} mb="10px">
          {categoryData.name}
        </Text>
        {categoryData.description && (
          <Text fontSize="16px" color="gray.600">
            {categoryData.description}
          </Text>
        )}
      </Box>

      <Grid templateColumns="repeat(auto-fill, minmax(280px, 1fr))" gap="24px">
        {products.map((product) => (
          <Link key={product.id} href={`/san-pham/${categorySlug}/${convertSlugURL(product.title)}`}>
            <ProductItem product={product} />
          </Link>
        ))}
      </Grid>

      {products.length === 0 && (
        <Text textAlign="center" fontSize="18px" color="gray.500" mt="40px">
          Chưa có sản phẩm nào trong danh mục này
        </Text>
      )}
    </Flex>
  );
};

export default ProductCategoryClient;
