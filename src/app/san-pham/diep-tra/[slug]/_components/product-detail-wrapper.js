'use client';

import {
  Container,
  Grid,
  GridItem,
  VStack,
  Box,
  Text,
  Button,
  Heading,
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
import { useTranslation } from '../../../../../hooks/useTranslation';

const ProductDetailWrapper = ({ productDetail, relatedProducts }) => {
  const { t, getLocalizedText } = useTranslation();
  const [quantity, setQuantity] = useState(1);

  const {
    title,
    title_en,
    description,
    instruction,
    description_en,
    instruction_en,
    imagesUrl = [],
    price,
    kiotViet,
    categoryHierarchy = [],
    slug,
    price_on
  } = productDetail;

  const buildBreadcrumbData = () => {
    const baseBreadcrumb = [
      { title: t('product.breadcrumb.title.home'), href: '/' },
      { title: t('product.breadcrumb.title.product'), href: '/san-pham' }
    ];

    if (categoryHierarchy && categoryHierarchy.length > 0) {
      categoryHierarchy.forEach((cat) => {
        baseBreadcrumb.push({
          title: getLocalizedText(cat.name, cat.name_en),
          href: cat.href
        });
      });
    }

    baseBreadcrumb.push({
      title: getLocalizedText(title, title_en),
      href: '#',
      isActive: true
    });

    return baseBreadcrumb;
  };

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
                  {getLocalizedText(title, title_en)}
                </Heading>

                {description && (
                  <Box>
                    <div
                      dangerouslySetInnerHTML={{ __html: getLocalizedText(description, description_en) }}
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
                  {price ? formatCurrency(price) : t('product.contact')}
                </Text>

                <Flex direction="row" gap={4} align="stretch" w="full">
                  <NumberInput
                    value={quantity}
                    onChange={(valueString, valueNumber) => setQuantity(valueNumber)}
                    min={1}
                    max={999}
                    flex={{ base: '0 0 auto', lg: '0 0 90px' }}
                    maxW={{ base: '20%', lg: '40%' }}
                    size="lg"
                  >
                    <NumberInputField />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                  {price_on === false && (
                    <Box flex="1" maxW="35%">
                      <AddCart
                        price={price}
                        productSlug={slug}
                        productId={productDetail.id}
                        title={title}
                        quantity={quantity}
                      />
                    </Box>
                  )}

                  <Box flex="1" maxW="35%">
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
                        {t('product.contact')}
                      </Button>
                    </Link>
                  </Box>
                </Flex>
              </VStack>
            </GridItem>
          </Grid>

          <Box>
            <Heading as="p" fontSize="24px" fontWeight="600" mb={6} textAlign="center" color="#003366">
              {t('product.information.title')}
            </Heading>

            {instruction && (
              <Box>
                <div
                  dangerouslySetInnerHTML={{ __html: getLocalizedText(instruction, instruction_en) }}
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
