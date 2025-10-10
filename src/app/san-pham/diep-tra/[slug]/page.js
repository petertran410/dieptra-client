import { notFound } from 'next/navigation';
import { API } from '../../../../utils/API';
import { META_DESCRIPTION } from '../../../../utils/helper-server';
import ProductDetailWrapper from './_components/product-detail-wrapper';

export const revalidate = 0;

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
      console.error('Product not found:', slug);
      notFound();
    }
  } catch (error) {
    console.error('Failed to fetch product details:', error);
    notFound();
  }

  try {
    const categoryId = productDetail?.categoryId;

    if (categoryId) {
      const relatedProductsResponse = await API.request({
        url: '/api/product/client/get-all',
        params: {
          pageSize: 16,
          pageNumber: 0,
          categoryId: categoryId,
          excludeProductId: productDetail.id,
          randomize: 'true',
          is_visible: 'true'
        },
        cache: 'no-store'
      });

      relatedProducts = relatedProductsResponse?.content || [];
    }
  } catch (error) {
    console.error('Failed to fetch related products:', error);
    relatedProducts = [];
  }

  return <ProductDetailWrapper productDetail={productDetail} relatedProducts={relatedProducts} />;
};

export default ProductDetail;
