import HomeContact from '../../../app/(home)/_components/contact';
import Breadcrumb from '../../../components/breadcrumb';
import { API } from '../../../utils/API';
import { PX_ALL } from '../../../utils/const';
import { formatCurrency, META_DESCRIPTION } from '../../../utils/helper-server';
import { Box, Flex, Text } from '@chakra-ui/react';
import Head from 'next/head';
import Script from 'next/script';
import AddCart from './_components/add-cart';
import GuideList from './_components/guide-list';
import GuideListMobile from './_components/guide-list-mobile';
import OtherProduct from './_components/other-product';
import ProductImage from './_components/product-image';
import Rating from './_components/rating';

export async function generateMetadata({ params }) {
  const { slug } = params;
  const id = slug.split('.').pop();
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
      images: [
        {
          url: imageUrl,
          width: 800,
          height: 600,
          alt: title
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title: title,
      description: description,
      images: [imageUrl]
    }
  };
}

const ProductDetail = async ({ params }) => {
  const { slug } = params;
  const id = slug.split('.').pop();
  const productDetail = await API.request({ url: `/api/product/get-by-id/${id}` });
  const productList = await API.request({
    url: '/api/product/search',
    params: { pageSize: 10, type: 'SAN_PHAM' }
  }).then((res) => res?.content);

  if (!productDetail) {
    return null;
  }

  const { title, description = '', instruction = '', imagesUrl, price, rate } = productDetail;

  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    headline: title,
    author: {
      '@type': 'Person',
      name: 'Diep Tra'
    },
    publisher: {
      '@type': 'Organization',
      name: 'dieptra.com',
      logo: {
        '@type': 'ImageObject',
        url: 'https://dieptra.com/images/logo.webp'
      }
    },
    datePublished: '2025-01-03',
    dateModified: '2025-01-03',
    name: title,
    image: imagesUrl || [],
    description: description || '',
    brand: {
      '@type': 'Brand',
      name: 'DiepTra'
    },
    sku: id,
    offers: {
      '@type': 'Offer',
      url: `${process.env.NEXT_PUBLIC_DOMAIN}/san-pham/${slug}`,
      priceCurrency: 'VND',
      price: price || 0,
      itemCondition: 'https://schema.org/NewCondition',
      availability: 'https://schema.org/InStock',
      seller: {
        '@type': 'Organization',
        name: 'Diep Tra',
        url: process.env.NEXT_PUBLIC_DOMAIN
      }
    },
    additionalType: [
      'https://www.google.com/search?q=Di%E1%BB%87p+Tr%C3%A0',
      'https://www.facebook.com/dieptra.0788339379',
      'https://shopee.vn/nguyenlieu.royaltea'
    ],
    sameAs: [
      'https://www.google.com/search?q=Di%E1%BB%87p+Tr%C3%A0',
      'https://www.facebook.com/dieptra.0788339379',
      'https://shopee.vn/nguyenlieu.royaltea'
    ],
    brand: {
      '@context': 'http://schema.org',
      '@type': 'Organization',
      url: process.env.NEXT_PUBLIC_DOMAIN,
      '@id': 'DiepTra',
      name: 'DiepTra',
      address:
        'B-TT10-4 thuộc dự án Him Lam Vạn Phúc, đường Tố Hữu, Phường Vạn Phúc, Quận Hà Đông, Thành phố Hà Nội, Việt Nam',
      telephone: '+84931566676'
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      bestRating: '5',
      ratingCount: '50',
      ratingValue: '5'
    },
    review: [
      {
        '@type': 'Review',
        reviewRating: {
          '@type': 'Rating',
          ratingValue: '5'
        },
        author: {
          '@type': 'Person',
          name: 'Kim Dung'
        },
        reviewBody:
          'Tôi vô cùng ấn tượng với sản phẩm Khoai Môn tươi Nghiền thuộc Dòng Sản phẩm Đông lạnh của Thương hiệu Gấu LerMao. Với vị ngọt, béo, ngậy, mình cảm thấy rất phù hợp với các món trà sữa, và tôi tin sẽ trở thành xu hướng mới trong mùa thu đông năm nay'
      },
      {
        '@type': 'Review',
        reviewRating: {
          '@type': 'Rating',
          ratingValue: '5'
        },
        author: {
          '@type': 'Person',
          name: 'Thùy Linh'
        },
        reviewBody:
          'Sản phẩm của thương hiệu Gấu LerMao vô cùng đa dạng, với các khẩu vị vô cùng mới lạ, tươi ngon, đặc biệt hấp dẫn”. Hiện nay thị trường Việt Nam có rất nhiều sản phẩm, tuy nhiên để được đa dạng và chất lượng như sản phẩm của công ty HI SWEETIE VIỆT NAM hiếm bên nào có thể làm được'
      }
    ]
  };

  return (
    <>
      <Head>
        <link rel="canonical" href={`${process.env.NEXT_PUBLIC_DOMAIN}/san-pham/${slug}`} />
        <meta name="robots" content="index, follow" />
      </Head>

      <Script
        id="json-ld-san-pham"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      <Flex direction="column" pt={{ xs: '70px', lg: '162px' }}>
        <Box px={PX_ALL}>
          <Breadcrumb
            data={[
              { title: 'Sản phẩm', href: '/san-pham' },
              { title: 'Chi tiết sản phẩm', href: `/san-pham/${slug}`, isActive: true }
            ]}
          />
        </Box>

        <Flex gap="24px" mt="24px" mb="64px" px={PX_ALL} direction={{ xs: 'column', md: 'row' }}>
          <ProductImage imagesUrl={imagesUrl} />
          <Flex flex={1} gap="16px" direction="column" h={{ xs: 'auto', md: '438px', lg: '636px' }}>
            <Box borderBottom="2px solid #F4F4F5" pb="16px">
              <Flex
                gap={{ xs: '4px', lg: '16px' }}
                align="flex-start"
                justify="space-between"
                pr="24px"
                direction={{ xs: 'column', lg: 'row' }}
              >
                <Text as="h1" fontSize={24} fontWeight={600}>
                  {title}
                </Text>
                {!!price && (
                  <Text color="#3AB3D6" fontSize={24}>
                    {formatCurrency(price)}
                  </Text>
                )}
              </Flex>
              <Rating productId={id} rate={rate} />
            </Box>
            <Flex
              direction="column"
              gap="12px"
              mt="-4px"
              flex={1}
              overflowY="auto"
              overflowX="hidden"
              className="small-scrollbar"
            >
              <Text fontSize={16} fontWeight={500}>
                Thành phần nguyên liệu:
              </Text>
              <Box
                fontSize={16}
                className="html-content"
                dangerouslySetInnerHTML={{
                  __html: description
                }}
              />
              <Text fontSize={16} fontWeight={500}>
                Hướng dẫn sử dụng:
              </Text>
              <Box
                fontSize={16}
                className="html-content"
                dangerouslySetInnerHTML={{
                  __html: instruction
                }}
              />
              <GuideList />

              <Box display={{ xs: 'block', lg: 'none' }}>
                <GuideListMobile />
              </Box>
            </Flex>
            <AddCart price={price} productId={id} title={title} />
          </Flex>
        </Flex>

        {Array.isArray(productList) && !!productList.length && (
          <Box px={PX_ALL}>
            <OtherProduct productList={productList} productId={id} />
          </Box>
        )}

        <Box mt={{ xs: '24px', lg: '68px' }}>
          <HomeContact />
        </Box>
      </Flex>
    </>
  );
};

export default ProductDetail;
