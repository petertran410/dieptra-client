import { API } from './API';

export const fetchRootCategories = async () => {
  try {
    const response = await API.request({
      url: '/api/category/client/list',
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

/**
 * Lấy cấu hình menu sản phẩm (danh mục cha + các con trực tiếp) do CMS cấu hình.
 * Trả null khi chưa cấu hình / lỗi -> caller tự fallback hành vi cũ (root categories).
 */
export const fetchMenuCategory = async () => {
  try {
    const response = await API.request({
      url: '/api/site-config/client/menu-category',
      method: 'GET'
    });

    if (!response?.configured) return null;

    return {
      id: response.id,
      name: response.name,
      name_en: response.name_en,
      slug: response.slug,
      href: response.href || `/san-pham/${response.slug}`,
      items: (response.children || []).map((c) => ({
        id: c.id,
        name: c.name,
        name_en: c.name_en,
        slug: c.slug,
        href: c.href,
        label: c.name,
        children: (c.children || []).map((g) => ({
          id: g.id,
          name: g.name,
          name_en: g.name_en,
          slug: g.slug,
          href: g.href,
          label: g.name
        }))
      }))
    };
  } catch (error) {
    console.error('Failed to fetch menu category config:', error);
    return null;
  }
};
