import { API } from '../utils/API';
import { useGetParamsURL } from '../utils/hooks';
import { useMutation, useQuery } from '@tanstack/react-query';

export const useQueryAllProducts = () => {
  return useQuery({
    queryKey: ['GET_ALL_PRODUCTS'],
    queryFn: () =>
      API.request({
        url: '/api/product/client/get-all',
        method: 'GET'
      }),
    staleTime: 5 * 60 * 1000,
    cacheTime: 10 * 60 * 1000,
    refetchOnWindowFocus: false
  });
};

export const useQueryProductCategories = () => {
  const queryKey = ['GET_PRODUCT_CATEGORIES_FOR_DROPDOWN'];

  return useQuery({
    queryKey,
    queryFn: async () => {
      const response = await API.request({
        url: '/api/product/client/get-all',
        params: {
          pageSize: 500,
          pageNumber: 0,
          is_visible: 'true'
        }
      });

      const categories = [];
      const seen = new Set();

      response.content?.forEach((product) => {
        if (product.kiotViet?.category) {
          const category = product.kiotViet.category;
          const key = `${category.kiotVietId}-${category.name}`;

          if (!seen.has(key)) {
            seen.add(key);
            categories.push({
              id: category.kiotVietId,
              name: category.name,
              href: `/san-pham?categoryId=${category.kiotVietId}`
            });
          }
        }
      });

      return categories.sort((a, b) => a.name.localeCompare(b.name));
    },
    staleTime: 10 * 60 * 1000
  });
};

export const useQueryProductList = ({ currentPage = 1, enabled = true } = {}) => {
  const queryKey = ['GET_PRODUCT_LIST_CLIENT', currentPage];

  return useQuery({
    queryKey,
    queryFn: async () => {
      const response = await API.request({
        url: '/api/product/client/get-all',
        params: {
          pageNumber: 0,
          pageSize: 1000,
          is_visible: 'true'
        }
      });
      return response;
    },
    enabled,
    staleTime: 2 * 60 * 1000
  });
};

export const useQueryProductsByCategories = (categoryIds = [], options = {}) => {
  const { currentPage = 1, enabled = true } = options;

  return useQuery({
    queryKey: ['GET_PRODUCTS_BY_CATEGORIES', categoryIds],
    queryFn: async () => {
      return API.request({
        url: '/api/product/client/get-all',
        params: {
          pageNumber: 0,
          pageSize: 1000,
          categoryIds: categoryIds.join(','),
          is_visible: 'true'
        }
      });
    },
    enabled: Array.isArray(categoryIds) && categoryIds.length > 0 && enabled,
    staleTime: 2 * 60 * 1000
  });
};

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

export const useQueryProductDetail = (id) => {
  const queryKey = ['GET_PRODUCT_DETAIL_CLIENT', id];

  return useQuery({
    queryKey,
    queryFn: () => API.request({ url: `/api/product/get-by-id/${id}` }),
    enabled: !!id,
    staleTime: 5 * 60 * 1000
  });
};

export const useQueryProductBySlugs = (slugs) => {
  const queryKey = ['GET_PRODUCTS_BY_SLUGS', slugs];

  return useQuery({
    queryKey,
    queryFn: async () => {
      console.log('Fetching products by slugs:', slugs);

      const productPromises = slugs.map((slug) =>
        API.request({
          url: `/api/product/client/find-by-slug/${slug}`,
          method: 'GET'
        })
      );

      const products = await Promise.allSettled(productPromises);

      return products.filter((result) => result.status === 'fulfilled').map((result) => result.value);
    },
    enabled: !!slugs && slugs.length > 0,
    staleTime: 5 * 60 * 1000
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

export const FILTER_OPTIONS = [
  {
    label: 'Sắp xếp A-Z',
    value: 'az',
    objectParams: { orderBy: 'title', isDesc: false }
  },
  {
    label: 'Giá tăng dần',
    value: 'increase',
    objectParams: { orderBy: 'kiotviet_price', isDesc: false }
  },
  {
    label: 'Giá giảm dần',
    value: 'decrease',
    objectParams: { orderBy: 'kiotviet_price', isDesc: true }
  }
];

export const useQueryFeaturedProducts = (limit = 8) => {
  const queryKey = ['GET_FEATURED_PRODUCTS', limit];

  return useQuery({
    queryKey,
    queryFn: () => {
      return API.request({
        url: '/api/product/by-categories',
        params: {
          pageNumber: 0,
          pageSize: limit,
          includeHidden: false,
          orderBy: 'id',
          isDesc: true
        }
      });
    },
    staleTime: 10 * 60 * 1000
  });
};

export const useQuerySearchProducts = () => {
  const params = useGetParamsURL();
  const { page: pageNumber = 1, keyword, sort, categoryId } = params;
  const queryKey = ['GET_SEARCH_PRODUCTS', pageNumber, keyword, sort, categoryId];

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

      const apiParams = {
        pageNumber: pageNumber - 1,
        pageSize: 12,
        title: keyword,
        is_visible: true,
        ...sortParams
      };

      if (categoryId) {
        apiParams.categoryId = categoryId;
      }

      return API.request({
        url: '/api/product/client/get-all',
        params: apiParams
      });
    },
    enabled: !!params.keyword,
    staleTime: 3 * 60 * 1000
  });
};

export const useQueryProductsByType = (type, options = {}) => {
  const { pageSize = 12, enabled = true } = options;
  const queryKey = ['GET_PRODUCTS_BY_TYPE', type, pageSize];

  return useQuery({
    queryKey,
    queryFn: () => {
      return API.request({
        url: '/api/product/search',
        params: {
          pageNumber: 0,
          pageSize,
          type,
          includeHidden: false
        }
      });
    },
    enabled: enabled && !!type,
    staleTime: 5 * 60 * 1000
  });
};

export const useQueryRelatedProducts = (categoryId, currentProductId, limit = 4) => {
  const queryKey = ['GET_RELATED_PRODUCTS', categoryId, currentProductId, limit];

  return useQuery({
    queryKey,
    queryFn: () => {
      return API.request({
        url: '/api/product/by-categories',
        params: {
          pageNumber: 0,
          pageSize: limit + 1,
          categoryId,
          includeHidden: false,
          orderBy: 'id',
          isDesc: true
        }
      });
    },
    enabled: !!categoryId && !!currentProductId,
    select: (data) => {
      const filteredProducts = data.content.filter((product) => product.id !== currentProductId);
      return {
        ...data,
        content: filteredProducts.slice(0, limit)
      };
    },
    staleTime: 5 * 60 * 1000
  });
};

export const useQueryVisibleProductsCount = () => {
  const queryKey = ['GET_VISIBLE_PRODUCTS_COUNT'];

  return useQuery({
    queryKey,
    queryFn: () => {
      return API.request({
        url: '/api/product/search',
        params: {
          pageNumber: 0,
          pageSize: 1,
          includeHidden: false
        }
      });
    },
    select: (data) => data.totalElements || 0,
    staleTime: 10 * 60 * 1000
  });
};
