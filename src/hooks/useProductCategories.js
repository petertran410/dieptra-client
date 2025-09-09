'use client';

import { useEffect, useState } from 'react';
import { fetchRootCategories, PRODUCT_SECTIONS_FALLBACK } from '../utils/product-categories';

export const useProductCategories = () => {
  const [categories, setCategories] = useState(PRODUCT_SECTIONS_FALLBACK);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        setLoading(true);
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

  return { categories, loading, error };
};
