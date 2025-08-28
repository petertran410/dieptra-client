export const generateProductCategoryUrl = (category, parentCategories = []) => {
  const allCategories = [...parentCategories, category];
  const slugPath = allCategories.map((cat) => cat.slug).filter(Boolean);
  return `/san-pham/${slugPath.join('/')}`;
};

export const generateProductDetailUrl = (product, categoryPath = []) => {
  const basePath = categoryPath.length ? `/san-pham/${categoryPath.join('/')}` : '/san-pham';
  return `${basePath}/${product.slug}`;
};
