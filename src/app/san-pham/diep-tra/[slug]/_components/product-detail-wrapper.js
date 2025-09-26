'use client';

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
import { useState } from 'react';
import Link from 'next/link';
import Breadcrumb from '../../../../../components/breadcrumb/breadcrumb';
import { formatCurrency } from '../../../../../utils/helper-server';
import { PX_ALL } from '../../../../../utils/const';
import OtherProduct from './other-product';
import AddCart from './add-cart';
import ProductImageGallery from './product-image-gallery';

const ProductDetailWrapper = ({ productDetail, relatedProducts }) => {
  const [quantity, setQuantity] = useState(1);

  const {
    title,
    title_meta,
    description,
    instruction,
    imagesUrl = [],
    price,
    rate,
    category,
    kiotViet,
    general_description,
    categoryHierarchy = [],
    slug
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

  const productImages = getProductImages();
  console.log(productImages);
  const breadcrumbData = buildBreadcrumbData();

  return (
    <>
      <Container maxW="auto" py={8} px={PX_ALL} pt={{ base: '80px', lg: '180px' }}>
        <VStack spacing={8} align="stretch">
          <Box>
            <Breadcrumb data={breadcrumbData} />
          </Box>

          <Grid templateColumns={{ base: '1fr', lg: '1fr 1fr' }} gap={8}>
            <GridItem>
              <ProductImageGallery title={title} imagesUrl={imagesUrl} kiotViet={kiotViet} />
            </GridItem>

            <GridItem>
              <VStack align="start" spacing={6}>
                <Heading as="h1" fontSize="28px" fontWeight="600" color="#003366">
                  {title}
                </Heading>

                {description && (
                  <Box>
                    <div
                      dangerouslySetInnerHTML={{ __html: description }}
                      style={{
                        textAlign: 'justify',
                        lineHeight: '1.6'
                      }}
                      className="html-content"
                    />
                  </Box>
                )}

                {/* {rate && (
                  <HStack spacing={2}>
                    <Text fontSize="sm" color="gray.600">
                      Đánh giá:
                    </Text>
                    <Text fontSize="sm" fontWeight="600">
                      {rate}/5
                    </Text>
                  </HStack>
                )} */}

                <Text fontSize="32px" fontWeight="700" color="#d63384">
                  {price ? formatCurrency(price) : 'Liên hệ'}
                </Text>

                <Flex gap={4}>
                  <HStack spacing={4} align="center">
                    <NumberInput
                      value={quantity}
                      onChange={(valueString, valueNumber) => setQuantity(valueNumber)}
                      min={1}
                      max={999}
                      maxW="90px"
                      size="lg"
                    >
                      <NumberInputField />
                      <NumberInputStepper>
                        <NumberIncrementStepper />
                        <NumberDecrementStepper />
                      </NumberInputStepper>
                    </NumberInput>
                  </HStack>

                  <Flex justify="space-evenly" gap={4}>
                    <AddCart
                      price={price}
                      productSlug={slug}
                      productId={productDetail.id}
                      title={title}
                      quantity={quantity}
                    />
                    {/* <Button
                      size="lg"
                      // w="full"
                      variant="outline"
                      bgColor="yellow.300"
                      color="black"
                      _hover={{ bg: 'green', color: 'white' }}
                      fontWeight="600"
                    >
                      Mua Hàng
                    </Button> */}

                    <Link href="/lien-he">
                      <Button
                        size="lg"
                        // w="full"
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

export default ProductDetailWrapper;
