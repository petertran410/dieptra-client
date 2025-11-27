import { API } from './API';

export const fetchRootCategories = async () => {
  try {
    const response = await API.request({
      url: '/api/category/for-cms',
      method: 'GET'
    });

    const allCategories = response?.data || [];

    const rootCategories = allCategories.filter((cat) => !cat.parent_id);

    return rootCategories
      .sort((a, b) => (a.priority || 0) - (b.priority || 0) || a.name.localeCompare(b.name))
      .map((cat) => ({
        id: cat.id,
        name: cat.name,
        name_en: cat.name_en,
        slug: cat.slug,
        href: `/san-pham/${cat.slug}`,
        label: cat.name
      }));
  } catch (error) {
    console.error('Failed to fetch root categories:', error);
    return [];
  }
};

export const PRODUCT_SECTIONS_FALLBACK = [
  {
    id: 'all',
    name: 'Tất cả sản phẩm',
    name_en: 'All Products',
    slug: '',
    href: '/san-pham',
    label: 'Tất cả sản phẩm'
  }
];
