// src/services/product.service.js - Main website service (only visible products)

import { API } from '../utils/API';
import { useGetParamsURL } from '../utils/hooks';
import { useMutation, useQuery } from '@tanstack/react-query';

/**
 * Main hook to get products for main website - ONLY VISIBLE PRODUCTS
 * This endpoint automatically filters for visible products only
 */
export const useQueryProductList = () => {
  const params = useGetParamsURL();
  const { page: pageNumber = 1, keyword, sort, subCategoryId, categoryId } = params;
  const queryKey = ['GET_PRODUCT_LIST_CLIENT', pageNumber, keyword, subCategoryId, sort, categoryId];

  return useQuery({
    queryKey,
    queryFn: () => {
      let sortParams = {};
      if (sort) {
        if (sort === 'az') {
          sortParams.orderBy = 'title';
          sortParams.isDesc = false;
        } else if (sort === 'increase') {
          sortParams.orderBy = 'price';
          sortParams.isDesc = false;
        } else if (sort === 'decrease') {
          sortParams.orderBy = 'price';
          sortParams.isDesc = true;
        }
      }

      // Build API parameters
      const apiParams = {
        pageNumber: pageNumber - 1,
        pageSize: 12,
        ...sortParams
      };

      // Add search keyword if provided
      if (keyword) {
        apiParams.title = keyword;
      }

      // Add category filter if provided (for main category selection)
      if (categoryId) {
        apiParams.categoryId = categoryId;
      }

      // Add subcategory filter if provided (works for both Lermao and Trà Phượng Hoàng)
      if (subCategoryId) {
        apiParams.subCategoryId = subCategoryId;
      }

      console.log('API Params for main website:', apiParams); // Debug log

      // IMPORTANT: This endpoint automatically filters for visible products only
      return API.request({
        url: '/api/product/by-categories', // This endpoint only returns visible products
        params: apiParams
      });
    },
    staleTime: 5 * 60 * 1000,
    cacheTime: 10 * 60 * 1000
  });
};

/**
 * Hook to get products by specific category (for category pages) - ONLY VISIBLE
 */
export const useQueryProductListByCategory = (params) => {
  const { categoryId, isFeatured } = params;
  const queryKey = ['GET_PRODUCT_LIST_CLIENT_BY_CATEGORY', categoryId, isFeatured];

  return useQuery({
    queryKey,
    queryFn: () => {
      const apiParams = {
        pageNumber: 0,
        pageSize: 20
      };

      // Add category filter if provided
      if (categoryId) {
        apiParams.categoryId = categoryId.toString();
      }

      // IMPORTANT: This endpoint automatically filters for visible products only
      return API.request({
        url: '/api/product/by-categories', // This endpoint only returns visible products
        params: apiParams
      });
    },
    enabled: !!categoryId,
    staleTime: 5 * 60 * 1000
  });
};

/**
 * Get featured products for homepage - ONLY VISIBLE AND FEATURED
 */
export const useQueryFeaturedProducts = (limit = 8) => {
  return useQuery({
    queryKey: ['GET_FEATURED_PRODUCTS_CLIENT', limit],
    queryFn: () => {
      return API.request({
        url: '/api/product/by-categories',
        params: {
          pageNumber: 0,
          pageSize: limit
          // Backend will automatically filter for:
          // 1. Visible products only (is_visible = true)
          // 2. Can add additional filtering for featured products if needed
        }
      });
    },
    staleTime: 10 * 60 * 1000 // 10 minutes cache for featured products
  });
};

/**
 * Get single product details for main website
 */
export const useQueryProductDetail = (productId) => {
  return useQuery({
    queryKey: ['GET_PRODUCT_DETAIL_CLIENT', productId],
    queryFn: () => {
      return API.request({
        url: `/api/product/${productId}`
      });
    },
    enabled: !!productId,
    staleTime: 5 * 60 * 1000
  });
};

/**
 * Search products on main website - ONLY VISIBLE
 */
export const useQueryProductSearch = (searchParams) => {
  const { keyword, categoryId, subCategoryId, priceRange, sortBy } = searchParams;
  const queryKey = ['SEARCH_PRODUCTS_CLIENT', keyword, categoryId, subCategoryId, priceRange, sortBy];

  return useQuery({
    queryKey,
    queryFn: () => {
      const apiParams = {
        pageNumber: 0,
        pageSize: 50
      };

      if (keyword) {
        apiParams.title = keyword;
      }

      if (categoryId) {
        apiParams.categoryId = categoryId;
      }

      if (subCategoryId) {
        apiParams.subCategoryId = subCategoryId;
      }

      if (sortBy) {
        if (sortBy === 'price_asc') {
          apiParams.orderBy = 'price';
          apiParams.isDesc = false;
        } else if (sortBy === 'price_desc') {
          apiParams.orderBy = 'price';
          apiParams.isDesc = true;
        } else if (sortBy === 'name_asc') {
          apiParams.orderBy = 'title';
          apiParams.isDesc = false;
        } else if (sortBy === 'name_desc') {
          apiParams.orderBy = 'title';
          apiParams.isDesc = true;
        }
      }

      // IMPORTANT: This endpoint automatically filters for visible products only
      return API.request({
        url: '/api/product/by-categories',
        params: apiParams
      });
    },
    enabled: !!(keyword || categoryId || subCategoryId) // Only run if there are search criteria
  });
};

/**
 * Get related products - ONLY VISIBLE
 */
export const useQueryRelatedProducts = (currentProductId, categoryIds = [], limit = 4) => {
  return useQuery({
    queryKey: ['GET_RELATED_PRODUCTS_CLIENT', currentProductId, categoryIds, limit],
    queryFn: () => {
      return API.request({
        url: '/api/product/by-categories',
        params: {
          pageNumber: 0,
          pageSize: limit + 1, // Get one extra to exclude current product
          categoryId: categoryIds[0] // Use first category for related products
        }
      });
    },
    enabled: !!(currentProductId && categoryIds.length > 0),
    select: (data) => {
      // Filter out the current product and limit results
      const filteredProducts =
        data.content?.filter((product) => product.id !== currentProductId)?.slice(0, limit) || [];

      return {
        ...data,
        content: filteredProducts
      };
    }
  });
};

/**
 * Get product statistics for main website (public stats)
 */
export const useQueryPublicProductStats = () => {
  return useQuery({
    queryKey: ['GET_PUBLIC_PRODUCT_STATS'],
    queryFn: () => {
      return API.request({
        url: '/api/product/public-stats'
      });
    },
    staleTime: 30 * 60 * 1000 // 30 minutes cache
  });
};

// Note for developers:
// All product queries for the main website automatically filter for visible products only.
// The backend '/api/product/by-categories' endpoint has showOnlyVisible=true by default.
// This ensures customers only see products that administrators have made visible in the CMS.
