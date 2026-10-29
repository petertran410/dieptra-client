'use client';

import { useEffect, useState } from 'react';
import { fetchRootCategories, fetchMenuCategory, PRODUCT_SECTIONS_FALLBACK } from '../utils/product-categories';

// initialMenu: cấu hình menu đã lấy trên server (layout). Có thì dùng luôn, không fetch lại.
export const useProductCategories = (initialMenu = null) => {
  const [categories, setCategories] = useState(
    initialMenu?.items?.length ? initialMenu.items : PRODUCT_SECTIONS_FALLBACK
  );
  const [loading, setLoading] = useState(!initialMenu);
  const [error, setError] = useState(null);
  // Cấu hình menu từ CMS. null = chưa cấu hình -> header giữ hành vi cũ.
  const [menuConfig, setMenuConfig] = useState(initialMenu);

  useEffect(() => {
    if (initialMenu) return;

    const loadCategories = async () => {
      try {
        setLoading(true);

        // Ưu tiên cấu hình CMS (danh mục cha cố định + con trực tiếp).
        const menu = await fetchMenuCategory();
        if (menu) {
          setMenuConfig(menu);
          setCategories(menu.items?.length ? menu.items : PRODUCT_SECTIONS_FALLBACK);
          return;
        }

        // Fallback: hành vi cũ - đổ các danh mục cha (root).
        const rootCategories = await fetchRootCategories();
        if (rootCategories && rootCategories.length > 0) {
          setCategories(rootCategories);
        } else {
          setCategories(PRODUCT_SECTIONS_FALLBACK);
        }
      } catch (err) {
        console.error('Error loading categories:', err);
        setError(err);
        setCategories(PRODUCT_SECTIONS_FALLBACK);
      } finally {
        setLoading(false);
      }
    };

    loadCategories();
  }, []);

  return { categories, loading, error, menuConfig };
};
