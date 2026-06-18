'use client';

import { useEffect, useState } from 'react';
import { fetchRootCategories, fetchMenuCategory, PRODUCT_SECTIONS_FALLBACK } from '../utils/product-categories';

export const useProductCategories = () => {
  const [categories, setCategories] = useState(PRODUCT_SECTIONS_FALLBACK);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // Cấu hình menu từ CMS. null = chưa cấu hình -> header giữ hành vi cũ.
  const [menuConfig, setMenuConfig] = useState(null);

  useEffect(() => {
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
