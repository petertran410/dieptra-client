import { notFound } from 'next/navigation';
import qs from 'qs';
import { META_DESCRIPTION, getBaseUrl } from '../../../../utils/helper-server';
import { serverFetchJSON } from '../../../../utils/server-fetch';
import ProductDetailWrapper from './_components/product-detail-wrapper';

export const revalidate = 300;

const buildQuery = (params) => {
  const qsString = qs.stringify(params || {}, { encode: false });
  return qsString ? `?${qsString}` : '';
};

async function fetchProduct(slug) {
  try {
    return await serverFetchJSON(`/api/product/client/find-by-slug/${slug}`, {
      next: { revalidate: 300 }
    });
  } catch (e) {
    console.error('fetchProduct error', e);
    return null;
  }
}

async function fetchRelated(categoryId, excludeId) {
  if (!categoryId) return [];
  try {
    const query = buildQuery({
      pageSize: 16,
      pageNumber: 0,
      categoryId,
      excludeProductId: excludeId,
      randomize: 'true',
      is_visible: 'true'
    });
    const data = await serverFetchJSON(`/api/product/client/get-all${query}`, {
      next: { revalidate: 300 }
    });
    return data?.content || [];
  } catch {
    return [];
  }
}

async function fetchCategoryPath(categoryId) {
  if (!categoryId) return [];
  try {
    const data = await serverFetchJSON('/api/category/client/list', { next: { revalidate: 600 } });
    const all = data?.data || [];
    const path = [];
    let current = all.find((c) => c.id === categoryId);
    while (current) {
      path.unshift(current);
      current = current.parent_id ? all.find((c) => c.id === current.parent_id) : null;
    }
    return path;
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const response = await fetchProduct(slug);
  if (!response) return { title: 'Sản phẩm', description: META_DESCRIPTION };

  const { title: titleData, imagesUrl, kiotviet_images, general_description, title_meta } = response;
  const rawImage =
    (Array.isArray(imagesUrl) ? imagesUrl[0] : null) ||
    (typeof imagesUrl === 'string' ? imagesUrl : null) ||
    kiotviet_images?.[0];
  const imageUrl = rawImage?.replace('http://', 'https://') || '/images/preview.webp';
  const title = title_meta || titleData || 'Sản phẩm';

  return {
    title,
    description: general_description || META_DESCRIPTION,
    alternates: { canonical: `${getBaseUrl()}/san-pham/diep-tra/${slug}` },
    openGraph: {
      title,
      description: general_description || META_DESCRIPTION,
      images: [{ url: imageUrl, width: 800, height: 600, alt: title }]
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description: general_description || META_DESCRIPTION,
      images: [imageUrl]
    }
  };
}

export default async function ProductDetail({ params }) {
  const { slug } = await params;
  const productDetail = await fetchProduct(slug);
  if (!productDetail) notFound();

  const [relatedProducts, categoryPath] = await Promise.all([
    fetchRelated(productDetail.categoryId, productDetail.id),
    fetchCategoryPath(productDetail.categoryId)
  ]);

  const baseUrl = getBaseUrl();
  const url = `${baseUrl}/san-pham/diep-tra/${slug}`;
  const rawImage =
    (Array.isArray(productDetail.imagesUrl) ? productDetail.imagesUrl[0] : null) || productDetail.kiotviet_images?.[0];
  const imageUrl = rawImage?.replace('http://', 'https://') || `${baseUrl}/images/preview.webp`;

  // Product schema
  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: productDetail.title || productDetail.kiotviet_name,
    description: productDetail.general_description || productDetail.description || '',
    image: [imageUrl],
    sku: productDetail.kiotviet_code || productDetail.id?.toString(),
    brand: { '@type': 'Brand', name: 'Diệp Trà' },
    url,
    ...(productDetail.kiotviet_price > 0 && {
      offers: {
        '@type': 'Offer',
        url,
        priceCurrency: 'VND',
        price: productDetail.kiotviet_price,
        availability: 'https://schema.org/InStock',
        seller: { '@type': 'Organization', name: 'Diệp Trà' }
      }
    })
  };

  // Breadcrumb schema
  const breadcrumbItems = [
    { name: 'Trang chủ', item: baseUrl },
    { name: 'Sản phẩm', item: `${baseUrl}/san-pham` }
  ];
  if (categoryPath.length) {
    let pathAcc = '';
    categoryPath.forEach((cat) => {
      pathAcc += `/${cat.slug}`;
      breadcrumbItems.push({ name: cat.name, item: `${baseUrl}/san-pham${pathAcc}` });
    });
  }
  breadcrumbItems.push({ name: productDetail.title || productDetail.kiotviet_name, item: url });

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbItems.map((b, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: b.name,
      item: b.item
    }))
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <ProductDetailWrapper productDetail={productDetail} relatedProducts={relatedProducts} />
    </>
  );
}
