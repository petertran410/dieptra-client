import { convertSlugURL } from './helper-server';

export const generateProductDetailUrl = (product) => {
  if (!product || !product.id) {
    return '/san-pham';
  }

  const productTitle = product.title || product.kiotviet_name || 'san-pham';
  const productSlug = convertSlugURL(productTitle);

  // If no valid slug generated, fallback
  if (!productSlug) {
    return `/san-pham/product.${product.id}`;
  }

  // If has category slug, use new pattern
  if (product.category?.slug) {
    return `/san-pham/${product.category.slug}/${productSlug}`;
  }

  // Fallback to old pattern
  return `/san-pham/${productSlug}.${product.id}`;
};

export const generateProductCategoryUrl = (categorySlug) => {
  return `/san-pham/${categorySlug}`;
};
