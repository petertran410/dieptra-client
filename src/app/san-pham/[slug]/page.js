import { notFound } from 'next/navigation';
import {
  Container,
  Grid,
  GridItem,
  VStack,
  HStack,
  Box,
  Text,
  Button,
  Heading,
  Image,
  AspectRatio,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Flex,
  Divider
} from '@chakra-ui/react';
import Head from 'next/head';
import Breadcrumb from '../../../components/breadcrumb/breadcrumb';
import { API } from '../../../utils/API';
import { formatCurrency, META_DESCRIPTION } from '../../../utils/helper-server';
import { PX_ALL } from '../../../utils/const';
import OtherProduct from './_components/other-product';
import AddCart from './_components/add-cart';
import ProductImageGallery from './_components/product-image-gallery';

export async function generateMetadata({ params }) {
  const { slug } = params;

  try {
    // Try slug-first approach
    const response = await API.request({
      url: `/api/product/client/find-by-slug/${slug}`
    });

    if (response && response.title) {
      const { title: titleData, kiotviet_images, general_description: meta_description } = response;
      const imageUrl = kiotviet_images?.[0]?.replace('http://', 'https://') || '/images/preview.webp';
      const title = `${titleData} | Diệp Trà`;

      return {
        title,
        description: meta_description || META_DESCRIPTION,
        openGraph: {
          title,
          description: meta_description || META_DESCRIPTION,
          images: [{ url: imageUrl, width: 800, height: 600, alt: title }]
        }
      };
    }

    // Fallback for old format products (slug contains .ID)
    if (slug.includes('.')) {
      const id = slug.split('.').pop();
      const fallbackResponse = await API.request({
        url: `/api/product/get-by-id/${id}`
      });

      if (fallbackResponse && fallbackResponse.title) {
        const { title: titleData, kiotviet_images, general_description: meta_description } = fallbackResponse;
        const imageUrl = kiotviet_images?.[0]?.replace('http://', 'https://') || '/images/preview.webp';
        const title = `${titleData} | Diệp Trà`;

        return {
          title,
          description: meta_description || META_DESCRIPTION,
          openGraph: {
            title,
            description: meta_description || META_DESCRIPTION,
            images: [{ url: imageUrl, width: 800, height: 600, alt: title }]
          }
        };
      }
    }
  } catch (error) {
    console.error('Metadata generation failed:', error);
  }

  return {
    title: 'Sản phẩm | Diệp Trà',
    description: META_DESCRIPTION
  };
}

const ProductDetail = async ({ params }) => {
  const { slug } = params;
  let productDetail;
  let relatedProducts = [];

  try {
    // Try slug-first approach
    try {
      productDetail = await API.request({
        url: `/api/product/client/find-by-slug/${slug}`
      });
    } catch (slugError) {
      // Fallback for old format products (slug contains .ID)
      if (slug.includes('.')) {
        const id = slug.split('.').pop();
        productDetail = await API.request({
          url: `/api/product/get-by-id/${id}`
        });
      } else {
        throw slugError;
      }
    }

    if (!productDetail) {
      console.error('Product not found:', slug);
      notFound();
    }
  } catch (error) {
    console.error('Failed to fetch product details:', error);
    notFound();
  }

  // Fetch related products
  try {
    const relatedProductsResponse = await API.request({
      url: '/api/product/client/get-all',
      params: {
        pageSize: 8,
        pageNumber: 0,
        is_visible: 'true'
      }
    });

    relatedProducts = relatedProductsResponse?.content || [];
  } catch (error) {
    console.error('Failed to fetch related products:', error);
    relatedProducts = [];
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

  const getProductImages = () => {
    const primaryImages = imagesUrl && imagesUrl.length > 0 ? imagesUrl : [];
    const kiotVietImages = kiotViet?.images || [];

    if (primaryImages.length > 0) {
      return {
        mainImage: primaryImages[0],
        thumbnails: [...primaryImages.slice(1), ...kiotVietImages].slice(0, 4)
      };
    }

    if (kiotVietImages.length > 0) {
      return {
        mainImage: kiotVietImages[0],
        thumbnails: kiotVietImages.slice(1, 7)
      };
    }

    return {
      mainImage: null,
      thumbnails: []
    };
  };

  const breadcrumbData = [
    { title: 'Trang chủ', href: '/' },
    { title: 'Sản Phẩm', href: '/san-pham' },
    ...(category ? [{ title: category.name, href: `/san-pham?categoryId=${category.id}` }] : []),
    { title: title, href: '#', isActive: true }
  ];

  return (
    <>
      <Head>
        <title>{title} | Diệp Trà</title>
        <meta name="description" content={general_description} />
      </Head>

      <Container maxW="full" py={8} px={PX_ALL} pt={{ base: '80px', lg: '120px' }}>
        <VStack spacing={8} align="stretch">
          <Breadcrumb data={breadcrumbData} />

          <Grid templateColumns={{ base: '1fr', lg: '1fr 1fr' }} gap={12}>
            <GridItem>
              <ProductImageGallery title={title} imagesUrl={imagesUrl} kiotViet={kiotViet} />
            </GridItem>

            <GridItem>
              <VStack spacing={6} align="stretch">
                <Heading
                  as="h1"
                  fontSize={{ base: '24px', lg: '32px' }}
                  fontWeight="700"
                  color="#003366"
                  lineHeight="1.3"
                >
                  {title}
                </Heading>

                {description && (
                  <Box>
                    <div
                      dangerouslySetInnerHTML={{ __html: description }}
                      style={{
                        textAlign: 'justify',
                        lineHeight: '1.6',
                        color: '#4A5568'
                      }}
                    />
                  </Box>
                )}

                <Text fontSize="28px" fontWeight="700" color="#d63384">
                  {price ? formatCurrency(price) : 'Liên hệ'}
                </Text>

                <AddCart productDetail={productDetail} />

                {instruction && (
                  <Box>
                    <Text fontSize="18px" fontWeight="600" mb={3} color="#003366">
                      Hướng dẫn sử dụng:
                    </Text>
                    <div
                      dangerouslySetInnerHTML={{ __html: instruction }}
                      style={{
                        textAlign: 'justify',
                        lineHeight: '1.6',
                        color: '#4A5568'
                      }}
                    />
                  </Box>
                )}
              </VStack>
            </GridItem>
          </Grid>

          <Divider />

          <OtherProduct productList={relatedProducts} productId={productDetail.id} />
        </VStack>
      </Container>
    </>
  );
};

export default ProductDetail;
