'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { API } from '../../../utils/API';
import { IMG_ALT, PX_ALL } from '../../../utils/const';
import Head from 'next/head';
import { AspectRatio, Box, Flex, Heading, Spinner, Text, VStack } from '@chakra-ui/react';
import Breadcrumb from '../../..//components/breadcrumb';
import Link from 'next/link';
import { convertSlugURL } from '../../..//utils/helper-server';

const ProductList = () => {
  const fetchProductSections = async () => {
    try {
      const response = await API.request({ url: '/api/product/client/get-all' });

      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  fetchProductSections();

  const breadcrumbData = [
    { title: 'Trang chủ', href: '/' },
    {
      title: 'Sản Phẩm',
      href: '/san-pham',
      isActive: true
    }
  ];
  return (
    <>
      <Head>
        <title>Sản Phẩm | Diệp Trà</title>
        <link rel="canonical" href={`${process.env.NEXT_PUBLIC_DOMAIN}/san-pham`} />
        <meta name="robots" content="index, follow" />
      </Head>

      <Flex pt={{ xs: '70px', lg: '162px' }} px={PX_ALL} pb="50px" direction="column">
        <Breadcrumb data={breadcrumbData} />

        <VStack align="start" spacing="16px" mt="20px" mb="40px">
          <Heading as="h1" fontSize={{ xs: '28px', lg: '36px' }} fontWeight={700} color="#003366">
            Sản Phẩm
          </Heading>
          <Text fontSize={{ xs: '16px', lg: '18px' }} color="gray.600" lineHeight="1.6" maxW="full">
            Khám phá đa dạng sản phẩm nguyên liệu pha chế chất lượng cao tại Diệp Trà.
          </Text>
        </VStack>

        <Suspense
          fallback={
            <Flex justify="center" py="60px">
              <Spinner size="lg" color="#065FD4" />
            </Flex>
          }
        >
          text
          {/* <ProductContent /> */}
        </Suspense>
      </Flex>
    </>
  );
};

export default ProductList;
