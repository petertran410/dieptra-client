// src/services/product.service.js - FIXED for default behavior and both categories
import { API } from '../utils/API';
import { useGetParamsURL } from '../utils/hooks';
import { useMutation, useQuery } from '@tanstack/react-query';

/**
 * Main hook to get products - works for both categories and default view
 * CRITICAL FIX: Default shows ALL products, subcategory filtering works for both categories
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

      // CRITICAL FIX: If no filters, don't add categoryId - backend will show ALL products
      console.log('API Params:', apiParams); // Debug log

      return API.request({
        url: '/api/product/by-categories',
        params: apiParams
      });
    },
    staleTime: 5 * 60 * 1000,
    cacheTime: 10 * 60 * 1000
  });
};

/**
 * Hook to get products by specific category (for category pages)
 */
export const useQueryProductListByCategory = (params) => {
  const { categoryId, isFeatured } = params;
  const queryKey = ['GET_PRODUCT_LIST_CLIENT_BY_CATEGORY', categoryId, isFeatured];

  return useQuery({
    queryKey,
    queryFn: () => {
      return API.request({
        url: '/api/product/by-categories',
        params: {
          pageNumber: 0,
          pageSize: 20,
          categoryId: categoryId ? categoryId.toString() : undefined
        }
      });
    },
    enabled: !!categoryId || categoryId === 0,
    staleTime: 5 * 60 * 1000,
    cacheTime: 10 * 60 * 1000
  });
};

/**
 * Hook to get featured products for homepage
 */
export const useQueryProductListOther = () => {
  const queryKey = ['GET_PRODUCT_LIST_CLIENT_OTHER'];

  return useQuery({
    queryKey,
    queryFn: () => {
      return API.request({
        url: '/api/product/by-categories',
        params: {
          pageNumber: 0,
          pageSize: 10
        }
      }).then((res) => res?.content);
    },
    staleTime: 5 * 60 * 1000,
    cacheTime: 10 * 60 * 1000
  });
};

/**
 * Hook to get products by specific IDs (for cart, etc.)
 */
export const useQueryProductByIds = (productIds = []) => {
  const queryKey = ['GET_PRODUCT_LIST_BY_IDS_CLIENT', ...productIds];

  return useQuery({
    queryKey,
    queryFn: () =>
      API.request({
        url: '/api/product/cache-list-products',
        params: { productIds: productIds.join(',') }
      }),
    enabled: Array.isArray(productIds) && !!productIds.length,
    staleTime: 5 * 60 * 1000,
    cacheTime: 10 * 60 * 1000
  });
};

/**
 * Hook to get product details by ID
 */
export const useQueryProductDetail = (id) => {
  const queryKey = ['GET_PRODUCT_DETAIL_CLIENT', id];

  return useQuery({
    queryKey,
    queryFn: () =>
      API.request({
        url: `/api/product/get-by-id/${id}`
      }),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
    cacheTime: 10 * 60 * 1000
  });
};

/**
 * Hook for rating/review functionality
 */
export const useMutateRating = () => {
  return useMutation({
    mutationFn: (params) =>
      API.request({
        url: '/api/user/review',
        params,
        method: 'POST'
      })
  });
};

export const useQueryRatingList = (productId) => {
  const params = useGetParamsURL();
  const { page: pageNumber = 1 } = params;
  const queryKey = ['GET_RATING_LIST_CLIENT', pageNumber, productId];

  return useQuery({
    queryKey,
    queryFn: () => {
      return API.request({
        url: `/api/product/review/${productId}`,
        params: {
          pageNumber: pageNumber - 1,
          pageSize: 100
        }
      });
    },
    enabled: productId === 0 || !!productId
  });
};

/**
 * Filter options for product sorting
 */
export const FILTER_OPTIONS = [
  {
    label: 'Sắp xếp A-Z',
    value: 'az',
    objectParams: { orderBy: 'title', isDesc: false }
  },
  {
    label: 'Giá tăng dần',
    value: 'increase',
    objectParams: { orderBy: 'price', isDesc: false }
  },
  {
    label: 'Giá giảm dần',
    value: 'decrease',
    objectParams: { orderBy: 'price', isDesc: true }
  }
];
