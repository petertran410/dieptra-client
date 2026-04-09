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
      imagesUrl,
      kiotviet_images,
      general_description: meta_description,
      title_meta: title_meta
    } = response;

    // Ưu tiên ảnh từ site_config (imagesUrl), fallback về kiotviet_images
    const rawImage =
      (Array.isArray(imagesUrl) ? imagesUrl[0] : null) ||
      (typeof imagesUrl === 'string' ? imagesUrl : null) ||
      kiotviet_images?.[0];
    const imageUrl = rawImage?.replace('http://', 'https://') || '/images/preview.webp';
    const title = title_meta || titleData || 'Sản phẩm';

    return {
      title,
      description: meta_description || META_DESCRIPTION,
      alternates: {
        canonical: `https://dieptra.com/san-pham/diep-tra/${slug}`
      },
      openGraph: {
        title,
        description: meta_description || META_DESCRIPTION,
        images: [{ url: imageUrl, width: 800, height: 600, alt: title }]
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description: meta_description || META_DESCRIPTION,
        images: [imageUrl]
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
