// src/services/product.service.js - Updated for dieptra-client
import { API } from '../utils/API';
import { useGetParamsURL } from '../utils/hooks';
import { useMutation, useQuery } from '@tanstack/react-query';

/**
 * Main hook to get products from Lermao and Trà Phượng Hoàng categories (including parent categories)
 * This shows products from both subcategories AND direct parent category assignments
 */
export const useQueryProductList = () => {
  const params = useGetParamsURL();
  const { page: pageNumber = 1, keyword, sort, subCategoryId } = params;
  const queryKey = ['GET_PRODUCT_LIST_CLIENT', pageNumber, keyword, subCategoryId, sort];

  return useQuery({
    queryKey,
    queryFn: () => {
      let sortParams = {};
      if (sort) {
        // Handle sorting if needed
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

      return API.request({
        url: '/api/product/by-categories',
        params: {
          pageNumber: pageNumber - 1,
          pageSize: 12,
          title: keyword, // Search by product title if keyword is provided
          categoryId: subCategoryId, // Filter by specific subcategory if provided
          ...sortParams
        }
      });
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 10 * 60 * 1000 // 10 minutes
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
        url: '/api/product/by-hierarchical-categories',
        params: {
          pageNumber: 0,
          pageSize: 20,
          parentCategoryIds: categoryId ? categoryId.toString() : '2205381,2205374',
          includeChildren: true
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
          // Get products from both parent and subcategories
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
 * Hook to get category hierarchy information
 */
export const useQueryCategoryHierarchyInfo = () => {
  const queryKey = ['GET_CATEGORY_HIERARCHY_INFO'];

  return useQuery({
    queryKey,
    queryFn: () =>
      API.request({
        url: '/api/product/categories/hierarchy-info',
        params: {}
      }),
    staleTime: 10 * 60 * 1000, // 10 minutes - category structure doesn't change often
    cacheTime: 30 * 60 * 1000 // 30 minutes
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
