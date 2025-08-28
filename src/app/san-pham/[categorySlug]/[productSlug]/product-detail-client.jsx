'use client';

import { useState, useEffect } from 'react';
import { notFound } from 'next/navigation';
import {
  Box,
  Container,
  Grid,
  GridItem,
  VStack,
  HStack,
  Text,
  Button,
  Heading,
  Image,
  AspectRatio,
  Flex,
  Divider,
  Spinner
} from '@chakra-ui/react';

import Breadcrumb from '../../../../components/breadcrumb/breadcrumb';
import { API } from '../../../../utils/API';
import { formatCurrency } from '../../../../utils/helper-server';
import { PX_ALL } from '../../../../utils/const';
import AddCart from '../../[slug]/_components/add-cart';
import ProductImageGallery from '../../[slug]/_components/product-image-gallery';
import OtherProduct from '../../[slug]/_components/other-product';

const ProductDetailClient = ({ categorySlug, productSlug }) => {
  const [productDetail, setProductDetail] = useState(null);
  const [categoryData, setCategoryData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProductDetail = async () => {
      try {
        setLoading(true);

        // Step 1: Find product ID by slug + category slug
        const idResponse = await API.request({
          url: '/api/product/client/find-id-by-slug',
          params: { slug: productSlug, categorySlug }
        });

        if (!idResponse?.id) {
          setError('Product not found');
          return;
        }

        // Step 2: Get category data
        const categoryResponse = await API.request({
          url: `/api/category/client/find-by-slug/${categorySlug}`
        });
        setCategoryData(categoryResponse);

        // Step 3: Get product detail by ID
        const productResponse = await API.request({
          url: `/api/product/get-by-id/${idResponse.id}`
        });

        if (!productResponse) {
          setError('Product not found');
          return;
        }

        // Verify category match
        if (productResponse.category?.id !== categoryResponse.id) {
          setError('Product category mismatch');
          return;
        }

        setProductDetail(productResponse);
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

  const {
    title,
    description = '',
    instruction = '',
    imagesUrl = [],
    price,
    rate,
    category,
    kiotViet,
    general_description
  } = productDetail;

  // Create breadcrumb with slug-based navigation
  const breadcrumbData = [
    { title: 'Trang chủ', href: '/' },
    { title: 'Sản Phẩm', href: '/san-pham' },
    { title: categoryData?.name || 'Danh mục', href: `/san-pham/${categorySlug}` },
    { title: title, href: '#', isActive: true }
  ];

  const getProductImages = () => {
    const primaryImages = imagesUrl && imagesUrl.length > 0 ? imagesUrl : [];

    const kiotVietImages =
      kiotViet?.images && Array.isArray(kiotViet.images)
        ? kiotViet.images.map((img) => img.replace('http://', 'https://'))
        : [];

    const allImages = [...primaryImages, ...kiotVietImages];
    return allImages.length > 0 ? allImages : ['/images/preview.webp'];
  };

  return (
    <Container maxW="1200px" pt={{ xs: '70px', lg: '162px' }} px={PX_ALL} pb="50px">
      <Breadcrumb data={breadcrumbData} />

      <Grid templateColumns={{ base: '1fr', lg: '1fr 1fr' }} gap={8} mt={8}>
        <GridItem>
          <ProductImageGallery images={getProductImages()} />
        </GridItem>

        <GridItem>
          <VStack align="start" spacing={6}>
            <Box>
              <Heading as="h1" fontSize="2xl" fontWeight={700} color="#003366" mb={2}>
                {title}
              </Heading>
              <Text fontSize="lg" color="gray.600">
                {general_description}
              </Text>
            </Box>

            <Box>
              <Text fontSize="3xl" fontWeight={700} color="#E53E3E">
                {formatCurrency(kiotViet?.price || price || 0)}
              </Text>
            </Box>

            <AddCart product={productDetail} />

            <Divider />

            {description && (
              <Box>
                <Heading as="h3" fontSize="lg" fontWeight={600} mb={3}>
                  Thông Tin Sản Phẩm
                </Heading>
                <div dangerouslySetInnerHTML={{ __html: description }} />
              </Box>
            )}

            {instruction && (
              <Box>
                <Heading as="h3" fontSize="lg" fontWeight={600} mb={3}>
                  Hướng Dẫn Sử Dụng
                </Heading>
                <div dangerouslySetInnerHTML={{ __html: instruction }} />
              </Box>
            )}
          </VStack>
        </GridItem>
      </Grid>

      <Box mt={12}>
        <Heading as="h2" fontSize="xl" fontWeight={600} mb={6}>
          Sản Phẩm Liên Quan
        </Heading>
        <OtherProduct />
      </Box>
    </Container>
  );
};

export default ProductDetailClient;
