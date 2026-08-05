'use client';

import {
  AspectRatio,
  Container,
  Grid,
  GridItem,
  VStack,
  Box,
  Text,
  Button,
  Heading,
  // NumberInput,
  // NumberInputField,
  // NumberInputStepper,
  // NumberIncrementStepper,
  // NumberDecrementStepper,
  Flex
} from '@chakra-ui/react';
// import { useState } from 'react';
import Link from 'next/link';
import Breadcrumb from '../../../../../components/breadcrumb/breadcrumb';
import HtmlContent from '../../../../../components/html-content';
import { formatCurrency } from '../../../../../utils/helper-server';
import { PX_ALL } from '../../../../../utils/const';
import OtherProduct from './other-product';
// ====== ĐÃ TẠM ẨN THÊM VÀO GIỎ HÀNG ======
// import AddCart from './add-cart';
import ProductImageGallery from './product-image-gallery';
// import { useRecoilState } from 'recoil';
// import { cartAtom } from '../../../../../states/common';
// import { authService } from '../../../../../services/auth.service';
// import { cartService } from '../../../../../services/cart.service';
// import { showToast } from '../../../../../utils/helper';
// import { useEffect } from 'react';

const VideoEmbed = ({ embedUrl }) => {
  if (!embedUrl) return null;
  return (
    <AspectRatio ratio={16 / 9} w="full" mb="8px">
      <iframe
        src={embedUrl}
        title="Video nhúng"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        style={{ borderRadius: '8px' }}
      />
    </AspectRatio>
  );
};

const ProductDetailWrapper = ({ productDetail, relatedProducts }) => {
  const {
    title,
    description,
    instruction,
    imagesUrl = [],
    price,
    kiotViet,
    categoryHierarchy = [],
    slug,
    price_on,
    embedUrl
  } = productDetail;

  // ====== ĐÃ TẠM ẨN SỐ LƯỢNG & GIỎ HÀNG ======
  // const [quantity, setQuantity] = useState(1);
  // const [isAutoAdding, setIsAutoAdding] = useState(false);

  // const [cart, setCart] = useRecoilState(cartAtom);

  const buildBreadcrumbData = () => {
    const baseBreadcrumb = [
      { title: 'Trang chủ', href: '/' },
      { title: 'Sản Phẩm', href: '/san-pham' }
    ];

    if (categoryHierarchy && categoryHierarchy.length > 0) {
      categoryHierarchy.forEach((cat, index) => {
        const slugPath = categoryHierarchy
          .slice(0, index + 1)
          .map((c) => c.slug)
          .join('/');

        baseBreadcrumb.push({
          title: cat.name,
          href: `/san-pham/${slugPath}`
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

  // ====== ĐÃ TẠM ẨN TỰ ĐỘNG THÊM VÀO GIỎ HÀNG SAU ĐĂNG NHẬP ======
  // useEffect(() => {
  //   const handlePendingAddToCart = async () => {
  //     try {
  //       const pendingAddToCart = sessionStorage.getItem('pending_add_to_cart');
  //
  //       if (!pendingAddToCart) return;
  //
  //       const pendingData = JSON.parse(pendingAddToCart);
  //
  //       if (pendingData.productId !== productDetail.id) return;
  //
  //       const authCheck = await authService.checkAuth();
  //       if (!authCheck.isAuthenticated || !authCheck.access_token) return;
  //
  //       setIsAutoAdding(true);
  //
  //       sessionStorage.removeItem('pending_add_to_cart');
  //
  //       await cartService.addToCart(pendingData.productId, pendingData.quantity);
  //
  //       const serverCart = await cartService.getCart();
  //       const formattedCart = serverCart.items.map((item) => ({
  //         slug: item.slug,
  //         id: Number(item.productId),
  //         quantity: item.quantity,
  //         cartId: item.id
  //       }));
  //       setCart(formattedCart);
  //
  //       showToast({
  //         status: 'success',
  //         content: 'Đã thêm vào giỏ hàng'
  //       });
  //     } catch (error) {
  //       console.error('Auto add to cart error:', error);
  //       sessionStorage.removeItem('pending_add_to_cart');
  //
  //       showToast({
  //         status: 'error',
  //         content: 'Không thể thêm sản phẩm vào giỏ hàng. Vui lòng thử lại.'
  //       });
  //     } finally {
  //       setIsAutoAdding(false);
  //     }
  //   };
  //
  //   const timer = setTimeout(handlePendingAddToCart, 1000);
  //   return () => clearTimeout(timer);
  // }, [productDetail.id, setCart, t]);

  return (
    <>
      <Container maxW="auto" py={8} px={PX_ALL} pt={{ base: '80px', lg: '180px' }}>
        {/* ====== ĐÃ TẠM ẨN THÔNG BÁO ĐANG THÊM GIỎ HÀNG ====== */}
        {/* {isAutoAdding && (
          <Box
            position="fixed"
            top="80px"
            left="50%"
            transform="translateX(-50%)"
            zIndex={1000}
            bg="blue.500"
            color="white"
            p={3}
            borderRadius="md"
          >
            Đang thêm sản phẩm vào giỏ hàng...
          </Box>
        )} */}

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
                    <HtmlContent html={description} textAlign="justify" lineHeight="1.6" />
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

                <Flex direction="row" gap={4} align="stretch" w="full">
                  {/* ====== ĐÃ TẠM ẨN SỐ LƯỢNG & THÊM VÀO GIỎ HÀNG ====== */}
                  {/* <NumberInput
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
                  )} */}

                  <Box flex="1">
                    <Link href="https://zalo.me/4415290839928975010" target="_blank" _hover={{ textDecor: 'none' }}>
                      <Button
                        size="lg"
                        w={{ sm: 'full', md: 'full', lg: '35%' }}
                        variant="outline"
                        bgColor="#3970A7"
                        color="white"
                        _hover={{ bg: '#3970A7', color: 'white' }}
                        fontWeight="600"
                      >
                        Liên hệ
                      </Button>
                    </Link>
                  </Box>
                </Flex>
              </VStack>
            </GridItem>
          </Grid>

          <Box>
            <Heading as="p" fontSize="24px" fontWeight="600" mb={6} textAlign="center" color="#003366">
              {'Thông Tin Sản Phẩm'}
            </Heading>

            <VideoEmbed embedUrl={embedUrl} />

            {instruction && (
              <Box>
                <HtmlContent html={instruction} textAlign="justify" lineHeight="1.6" />
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
