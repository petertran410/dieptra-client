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

export const useQueryProductList = () => {
  const params = useGetParamsURL();
  const { page: pageNumber = 1, keyword, sort, subCategoryId } = params;
  const queryKey = ['GET_PRODUCT_LIST_CLIENT', pageNumber, keyword, subCategoryId, sort];

  return useQuery({
    queryKey,
    queryFn: () => {
      let sortParams = {};
      if (sort) {
        const currentSort = FILTER_OPTIONS.find((i) => i.value === sort);
        if (currentSort) {
          sortParams = currentSort.objectParams;
        }
      }

      return API.request({
        url: '/api/product/search',
        params: {
          pageNumber: pageNumber - 1,
          pageSize: 12,
          title: keyword,
          categoryId: subCategoryId,
          type: 'SAN_PHAM',
          ...sortParams
        }
      });
    }
  });
};

export const useQueryProductListByCategory = (params) => {
  const { categoryId, isFeatured } = params;
  const queryKey = ['GET_PRODUCT_LIST_CLIENT_BY_CATEGORY', categoryId, isFeatured];

  return useQuery({
    queryKey,
    queryFn: () => {
      return API.request({
        url: '/api/product/search',
        params: { pageNumber: 0, type: 'SAN_PHAM', categoryId, isFeatured }
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
        params: { pageNumber: 0, pageSize: 10, type: 'SAN_PHAM' }
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
        url: '/api/product/cache-list-products',
        params: { productIds: productIds.join(',') }
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
