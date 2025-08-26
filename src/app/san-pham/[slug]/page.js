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

export async function generateMetadata({ params }) {
  const { slug } = params;
  const id = slug.split('.').pop();

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_DOMAIN}/api/product/get-by-id/${id}`);
    const data = await response.json();

    const { title: titleData, imagesUrl } = data || {};
    const imageUrl = imagesUrl?.[0]?.replace('http://', 'https://') || '/images/preview.webp';
    const title = `${titleData} | Diệp Trà`;
    const description = META_DESCRIPTION;

    return {
      title,
      description,
      openGraph: {
        title,
        description,
        images: [{ url: imageUrl, width: 800, height: 600, alt: title }]
      }
    };
  } catch (error) {
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
    [productDetail, relatedProductsResponse] = await Promise.all([
      API.request({ url: `/api/product/get-by-id/${id}` }),
      API.request({
        url: '/api/product/search',
        params: { pageSize: 8, type: 'SAN_PHAM' }
      })
    ]);

    relatedProducts = relatedProductsResponse?.content || [];
  } catch (error) {
    console.error('Failed to fetch product details:', error);
    notFound();
  }

  if (!productDetail) {
    notFound();
  }

  const {
    title,
    description = '',
    instruction = '',
    imagesUrl = [],
    kiotviet_price: price,
    rate,
    category
  } = productDetail;

  // Breadcrumb data
  const breadcrumbData = [
    { title: 'Trang chủ', href: '/' },
    { title: 'Sản Phẩm', href: '/san-pham' },
    ...(category ? [{ title: category.name, href: `/san-pham?categoryId=${category.id}` }] : []),
    { title: title, isActive: true }
  ];

  return (
    <>
      <Head>
        <title>{title} | Diệp Trà</title>
        <meta name="description" content={description || META_DESCRIPTION} />
      </Head>

      <Container maxW="1200px" py={8} px={PX_ALL} pt={{ base: '80px', lg: '120px' }}>
        <VStack spacing={8} align="stretch">
          {/* Breadcrumb */}
          <Breadcrumb data={breadcrumbData} />

          {/* Main Product Section */}
          <Grid templateColumns={{ base: '1fr', lg: '1fr 1fr' }} gap={12}>
            {/* Left Column - Product Images */}
            <GridItem>
              <VStack spacing={4}>
                {/* Main Product Image */}
                <AspectRatio ratio={1} w="full" maxW="500px">
                  <Box bg="gray.100" borderRadius="lg" overflow="hidden" border="1px solid #E2E8F0">
                    {imagesUrl.length > 0 ? (
                      <Image src={imagesUrl[0]} alt={title} w="full" h="full" objectFit="cover" />
                    ) : (
                      <Flex align="center" justify="center" h="full" color="gray.500" fontSize="lg" fontWeight="500">
                        Ảnh đại diện [vuông]
                      </Flex>
                    )}
                  </Box>
                </AspectRatio>

                {/* Thumbnail Images */}
                <HStack spacing={3} justify="center">
                  {[0, 1, 2].map((index) => (
                    <AspectRatio key={index} ratio={1} w="80px">
                      <Box
                        bg="gray.50"
                        border="1px solid #E2E8F0"
                        borderRadius="md"
                        cursor="pointer"
                        _hover={{ borderColor: '#003366' }}
                      >
                        {imagesUrl[index] ? (
                          <Image
                            src={imagesUrl[index]}
                            alt={`${title} - Ảnh ${index + 1}`}
                            w="full"
                            h="full"
                            objectFit="cover"
                          />
                        ) : (
                          <Flex align="center" justify="center" fontSize="xs" color="gray.500" fontWeight="500">
                            Ảnh {index + 1}
                          </Flex>
                        )}
                      </Box>
                    </AspectRatio>
                  ))}
                </HStack>
              </VStack>
            </GridItem>

            {/* Right Column - Product Info */}
            <GridItem>
              <VStack spacing={6} align="stretch">
                {/* Product Title */}
                <Heading
                  as="h1"
                  fontSize={{ base: '24px', lg: '32px' }}
                  fontWeight="700"
                  color="#003366"
                  lineHeight="1.3"
                >
                  {title}
                </Heading>

                {/* Price */}
                <Text fontSize="28px" fontWeight="700" color="#d63384">
                  {price ? formatCurrency(price) : 'Liên hệ'}
                </Text>

                {/* Quantity Controls */}
                <HStack spacing={4} align="center">
                  <NumberInput defaultValue={1} min={1} max={999} maxW="120px" size="lg">
                    <NumberInputField />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                  <Text color="gray.600" fontSize="sm">
                    số lượng
                  </Text>
                </HStack>

                {/* Action Buttons */}
                <VStack spacing={3} w="full">
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
                </VStack>

                {/* Additional Product Info */}
                {category && (
                  <Box>
                    <Text fontSize="sm" color="gray.600">
                      <Text as="span" fontWeight="600">
                        Danh mục:
                      </Text>{' '}
                      {category.name}
                    </Text>
                  </Box>
                )}
              </VStack>
            </GridItem>
          </Grid>

          {/* Product Information Section */}
          <Box>
            <Heading as="h2" fontSize="24px" fontWeight="600" mb={6} textAlign="center" color="#003366">
              Thông Tin Sản Phẩm
            </Heading>

            <Box border="2px solid #333" borderRadius="lg" p={8} bg="white" minH="300px">
              {description ? (
                <div dangerouslySetInnerHTML={{ __html: description }} />
              ) : (
                <Text color="gray.500" fontStyle="italic" textAlign="center">
                  Thông tin sản phẩm đang được cập nhật...
                </Text>
              )}

              {instruction && (
                <>
                  <Divider my={6} />
                  <Heading as="h3" fontSize="lg" mb={4} color="#003366">
                    Hướng dẫn sử dụng
                  </Heading>
                  <div dangerouslySetInnerHTML={{ __html: instruction }} />
                </>
              )}
            </Box>
          </Box>

          {/* Related Products Section */}
          <OtherProduct productList={relatedProducts} productId={id} />
        </VStack>
      </Container>
    </>
  );
};

export default ProductDetail;
