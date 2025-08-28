// src/app/san-pham/[categorySlug]/[productSlug]/product-detail-client.jsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Box, Spinner, Flex, Text } from '@chakra-ui/react';
import { notFound } from 'next/navigation';
import Breadcrumb from '../../../../components/breadcrumb/breadcrumb';
import { PX_ALL } from '../../../../utils/const';
import { API } from '../../../../utils/API';

const ProductDetailClient = ({ params }) => {
  const { categorySlug, productSlug } = params;
  const router = useRouter();

  const [productDetail, setProductDetail] = useState(null);
  const [categoryData, setCategoryData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProductDetail = async () => {
      try {
        setLoading(true);

        // Step 1: Tìm product ID từ slug và category slug
        const idResponse = await API.request({
          url: '/api/product/client/find-id-by-slug',
          params: { slug: productSlug, categorySlug }
        });

        if (!idResponse?.id) {
          setError('Product not found');
          return;
        }

        // Step 2: Lấy category data
        const categoryResponse = await API.request({
          url: `/api/category/client/find-by-slug/${categorySlug}`
        });

        setCategoryData(categoryResponse);

        // Step 3: Lấy product detail bằng ID
        const allProductsResponse = await API.request({
          url: '/api/product/client/get-all-product-list'
        });

        const product = allProductsResponse.content?.find((p) => p.id === idResponse.id);

        if (!product) {
          setError('Product not found');
          return;
        }

        // Verify category match
        if (product.category?.id !== categoryResponse.id) {
          setError('Product category mismatch');
          return;
        }

        setProductDetail(product);
      } catch (error) {
        console.error('Error fetching product:', error);
        setError('Failed to fetch product');
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetail();
  }, [categorySlug, productSlug]);

  if (loading) {
    return (
      <Flex pt={{ xs: '70px', lg: '162px' }} px={PX_ALL} justify="center" align="center" minH="400px">
        <Spinner size="lg" color="#065FD4" />
      </Flex>
    );
  }

  if (error || !productDetail) {
    notFound();
    return null;
  }

  // Tạo breadcrumb data
  const breadcrumbData = [
    { title: 'Trang chủ', href: '/' },
    { title: 'Sản Phẩm', href: '/san-pham' },
    { title: categoryData?.name || 'Danh mục', href: `/san-pham?categoryId=${categoryData?.id}` },
    { title: productDetail.title, href: '#', isActive: true }
  ];

  return (
    <Flex pt={{ xs: '70px', lg: '162px' }} px={PX_ALL} pb="50px" direction="column">
      <Breadcrumb data={breadcrumbData} />

      <Box mt="20px">
        <Text fontSize="32px" fontWeight={700} mb="20px">
          {productDetail.title}
        </Text>

        {/* Product detail content */}
        <Box>
          <Text fontSize="18px" color="gray.600" mb="16px">
            Danh mục: {categoryData?.name}
          </Text>

          {productDetail.general_description && (
            <Text fontSize="16px" lineHeight="1.6" mb="16px">
              {productDetail.general_description}
            </Text>
          )}

          {productDetail.description && (
            <Box mt="20px">
              <Text fontSize="18px" fontWeight={600} mb="10px">
                Mô tả chi tiết
              </Text>
              <div dangerouslySetInnerHTML={{ __html: productDetail.description }} />
            </Box>
          )}
        </Box>
      </Box>
    </Flex>
  );
};

export default ProductDetailClient;
