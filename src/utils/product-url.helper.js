import { convertSlugURL } from './helper-server';

export const generateProductDetailUrl = (product) => {
  if (!product.category?.slug) {
    return `/san-pham/${convertSlugURL(product.title)}`;
  }

  return `/san-pham/${product.category.slug}/${convertSlugURL(product.title)}`;
};

export const generateProductCategoryUrl = (categorySlug) => {
  return `/san-pham/${categorySlug}`;
};
