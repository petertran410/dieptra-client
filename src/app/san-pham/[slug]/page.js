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
  const id = slug.split('.').pop();

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_DOMAIN}/api/product/get-by-id/${id}`);

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const data = await response.json();

    if (!data) {
      throw new Error('No product data');
    }

    const { title: titleData, kiotviet_images, general_description: meta_description } = data;

    const imageUrl = kiotviet_images?.[0]?.replace('http://', 'https://') || '/images/preview.webp';
    const title = `${titleData} | Diệp Trà`;

    console.log({
      title,
      description: meta_description,
      openGraph: {
        title,
        description: meta_description,
        images: [{ url: imageUrl, width: 800, height: 600, alt: title }]
      }
    });

    return {
      title,
      description: META_DESCRIPTION,
      openGraph: {
        title,
        description: META_DESCRIPTION,
        images: [{ url: imageUrl, width: 800, height: 600, alt: title }]
      }
    };
  } catch (error) {
    console.error('Metadata generation failed:', error);
    return {
      title: 'Sản phẩm | Diệp Trà',
      description: META_DESCRIPTION
    };
  }
}

const ProductDetail = async ({ params }) => {
  const { slug } = params;
  const id = slug.split('.').pop();

  let productDetail;
  let relatedProducts = [];

  try {
    productDetail = await API.request({
      url: `/api/product/get-by-id/${id}`
    });

    if (!productDetail) {
      console.error('Product not found:', id);
      notFound();
    }
  } catch (error) {
    console.error('Failed to fetch product details:', error);
    notFound();
  }

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
        thumbnails: kiotVietImages.slice(1, 5)
      };
    }

    return {
      mainImage: null,
      thumbnails: []
    };
  };

  const { mainImage, thumbnails } = getProductImages();

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

                <Flex gap={4}>
                  <HStack spacing={4} align="center">
                    <NumberInput defaultValue={1} min={1} max={999} maxW="120px" size="lg">
                      <NumberInputField />
                      <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                      </NumberInputStepper>
                    </NumberInput>
                  </HStack>

                  <Flex justify="space-between" gap={4}>
                    <AddCart price={price} productId={id} title={title} />
                    <Button
                      size="lg"
                      w="full"
                      variant="outline"
                      borderColor="#003366"
                      color="#003366"
                      _hover={{ bg: '#003366', color: 'white' }}
                      fontWeight="600"
                    >
                      Mua ngay
                    </Button>
                  </Flex>
                </Flex>
              </VStack>
            </GridItem>
          </Grid>

          <Box>
            <Heading as="h2" fontSize="24px" fontWeight="600" mb={6} textAlign="center" color="#003366">
              Thông Tin Sản Phẩm
            </Heading>

            {instruction && (
              <Box>
                <div
                  dangerouslySetInnerHTML={{ __html: description }}
                  style={{
                    textAlign: 'justify',
                    lineHeight: '1.6'
                  }}
                />
              </Box>
            )}
          </Box>

          {relatedProducts.length > 0 && <OtherProduct productList={relatedProducts} productId={id} />}
        </VStack>
      </Container>
    </>
  );
};

export default ProductDetail;
