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
  Flex
} from '@chakra-ui/react';
import Head from 'next/head';
import Breadcrumb from '../../../../components/breadcrumb/breadcrumb';
import { API } from '../../../../utils/API';
import { formatCurrency, META_DESCRIPTION } from '../../../../utils/helper-server';
import { PX_ALL } from '../../../../utils/const';
import OtherProduct from '../../diep-tra/[slug]/_components/other-product';
import AddCart from './_components/add-cart';
import ProductImageGallery from './_components/product-image-gallery';
import Link from 'next/link';

export async function generateMetadata({ params }) {
  const { slug } = params;

  let response;

  try {
    response = await API.request({
      url: `/api/product/client/find-by-slug/${slug}`
    });

    const {
      title: titleData,
      kiotviet_images,
      general_description: meta_description,
      title_meta: title_meta
    } = response;

    const imageUrl = kiotviet_images?.[0]?.replace('http://', 'https://') || '/images/preview.webp';
    const title = `${title_meta}`;

    return {
      title,
      description: meta_description,
      openGraph: {
        title,
        description: meta_description,
        images: [{ url: imageUrl, width: 800, height: 600, alt: title }]
      }
    };
  } catch (error) {
    console.error('Metadata generation failed:', error);
    return {
      title: 'Sản phẩm',
      description: META_DESCRIPTION
    };
  }
}

const ProductDetail = async ({ params }) => {
  const { slug } = params;

  let productDetail;
  let relatedProducts = [];

  try {
    productDetail = await API.request({
      url: `/api/product/client/find-by-slug/${slug}`
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
    title_meta,
    description = '',
    instruction = '',
    imagesUrl = [],
    price,
    rate,
    category,
    kiotViet,
    general_description,
    categoryHierarchy = []
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

  const buildBreadcrumbData = () => {
    const baseBreadcrumb = [
      { title: 'Trang chủ', href: '/' },
      { title: 'Sản Phẩm', href: '/san-pham' }
    ];

    if (categoryHierarchy && categoryHierarchy.length > 0) {
      categoryHierarchy.forEach((cat) => {
        baseBreadcrumb.push({
          title: cat.name,
          href: cat.href
        });
      });
    }

    baseBreadcrumb.push({
      title: title,
      href: '#',
      isActive: true
    });

    return baseBreadcrumb;
  };

  const breadcrumbData = buildBreadcrumbData();

  return (
    <>
      <Head>
        <title>{title}</title>
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
                      className="html-content"
                      style={{
                        textAlign: 'justify',
                        lineHeight: '1.6',
                        color: '#4A5568',
                        font: '100px'
                      }}
                      fontSize={{ base: '24px', lg: '32px' }}
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

                  <Flex justify="space-evenly" gap={4}>
                    <AddCart price={price} productId={slug} title={title} />
                    {/* <Button
                      size="lg"
                      w="full"
                      variant="outline"
                      // borderColor="#003366"
                      bgColor="#FAE57C"
                      color="#003366"
                      _hover={{ bg: '#FAE57C', color: '#003366' }}
                      fontWeight="600"
                    >
                      Mua ngay
                    </Button> */}

                    <Link href="/lien-he">
                      <Button
                        size="lg"
                        w="full"
                        variant="outline"
                        bgColor="#3970A7"
                        color="white"
                        _hover={{ bg: '#3970A7', color: 'white' }}
                        fontWeight="600"
                      >
                        Liên Hệ
                      </Button>
                    </Link>
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
                  dangerouslySetInnerHTML={{ __html: instruction }}
                  style={{
                    textAlign: 'justify',
                    lineHeight: '1.6'
                  }}
                  className="html-content"
                />
              </Box>
            )}
          </Box>

          {relatedProducts.length > 0 && <OtherProduct productList={relatedProducts} productId={slug} />}
        </VStack>
      </Container>
    </>
  );
};

export default ProductDetail;
