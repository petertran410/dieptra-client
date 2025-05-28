import { API } from '../utils/API';
import { useGetParamsURL } from '../utils/hooks';
import { useMutation, useQuery } from '@tanstack/react-query';

export const FILTER_OPTIONS = [
  {
    label: 'Sắp xếp A-Z',
    value: 'az'
  },
  {
    label: 'Giá tăng dần',
    value: 'increase'
  },
  {
    label: 'Giá giảm dần',
    value: 'decrease'
  }
];

// FIXED: Updated to properly handle subcategory filtering
export const useQueryProductList = () => {
  const params = useGetParamsURL();
  const { page: pageNumber = 1, keyword, sort, categoryId, subCategoryId } = params;
  const queryKey = ['GET_PRODUCT_LIST_CLIENT', pageNumber, keyword, categoryId, subCategoryId, sort];

  return useQuery({
    queryKey,
    queryFn: () => {
      let sortParams = {};
      if (sort) {
        const currentSort = FILTER_OPTIONS.find((i) => i.value === sort);
        if (currentSort && currentSort.objectParams) {
          sortParams = currentSort.objectParams;
        }
      }

      // FIXED: Determine which endpoint and parameters to use based on filtering needs
      const getApiParams = () => {
        // If we have a specific subcategory selected, use it as the main filter
        if (subCategoryId && subCategoryId !== 'undefined') {
          console.log('Filtering by subcategory:', subCategoryId);
          return {
            url: '/api/product/by-hierarchical-categories',
            params: {
              pageNumber: pageNumber - 1,
              pageSize: 12,
              title: keyword,
              parentCategoryIds: subCategoryId, // Use subcategory as the filter
              ...sortParams
            }
          };
        }

        // If we have a main category but no subcategory, filter by main category
        if (categoryId) {
          const parentCategoryIds = getParentCategoryIds(categoryId);
          console.log('Filtering by main category:', categoryId, 'mapped to:', parentCategoryIds);
          return {
            url: '/api/product/by-hierarchical-categories',
            params: {
              pageNumber: pageNumber - 1,
              pageSize: 12,
              title: keyword,
              parentCategoryIds: parentCategoryIds,
              ...sortParams
            }
          };
        }

        // Default: show all products from main categories
        console.log('Showing all products from main categories');
        return {
          url: '/api/product/by-hierarchical-categories',
          params: {
            pageNumber: pageNumber - 1,
            pageSize: 12,
            title: keyword,
            parentCategoryIds: '2205374,2205381', // Both main categories
            ...sortParams
          }
        };
      };

      const getParentCategoryIds = (catId) => {
        if (catId === '2205374') return '2205374'; // Trà Phượng Hoàng
        if (catId === '2205381') return '2205381'; // Lermao
        return catId; // For other categories, use as-is
      };

      const apiConfig = getApiParams();

      console.log('Product API Call Debug:', {
        categoryId,
        subCategoryId,
        apiUrl: apiConfig.url,
        apiParams: apiConfig.params,
        pageNumber: pageNumber - 1,
        keyword
      });

      return API.request(apiConfig);
    }
  });
};

export const useQueryProductListByCategory = (params) => {
  const { categoryId, isFeatured } = params;
  const queryKey = ['GET_PRODUCT_LIST_CLIENT_BY_CATEGORY', categoryId, isFeatured];

  return useQuery({
    queryKey,
    queryFn: () => {
      let parentCategoryIds;
      if (categoryId === '2205374') {
        parentCategoryIds = '2205374';
      } else if (categoryId === '2205381') {
        parentCategoryIds = '2205381';
      } else {
        parentCategoryIds = categoryId ? categoryId.toString() : '2205374,2205381';
      }

      return API.request({
        url: '/api/product/by-hierarchical-categories',
        params: {
          pageNumber: 0,
          pageSize: 20,
          parentCategoryIds: parentCategoryIds
        }
      });
    }
  });
};

export const useQueryProductListOther = () => {
  const queryKey = ['GET_PRODUCT_LIST_CLIENT_OTHER'];

  return useQuery({
    queryKey,
    queryFn: () => {
      return API.request({
        url: '/api/product/search',
        params: {
          pageNumber: 0,
          pageSize: 10
        }
      });
    }
  });
};

export const useQueryProductByIds = (productIds = []) => {
  const queryKey = ['GET_PRODUCT_LIST_BY_IDS_CLIENT', ...productIds];

  return useQuery({
    queryKey,
    queryFn: () =>
      API.request({
        url: '/api/product/by-ids',
        params: { ids: productIds.join(',') }
      }),
    enabled: Array.isArray(productIds) && !!productIds.length
  });
};

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
