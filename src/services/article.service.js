import { API } from '../utils/API';
import { useGetParamsURL } from '../utils/hooks';
import { useQuery } from '@tanstack/react-query';

/**
 * Service lấy articles theo type cho các trang con
 */
export const useQueryArticlesByType = (articleType) => {
  const params = useGetParamsURL();
  const { page: pageNumber = 1, keyword } = params;
  const queryKey = ['GET_ARTICLES_BY_TYPE', articleType, pageNumber, keyword];

  return useQuery({
    queryKey,
    queryFn: () =>
      API.request({
        url: '/api/news/client/get-all',
        params: {
          pageNumber: pageNumber - 1,
          keyword,
          type: articleType,
          pageSize: 12 // 12 articles per page cho grid layout
        }
      }),
    enabled: !!articleType
  });
};

/**
 * Service lấy detail article bằng slug và type
 */
export const useQueryArticleDetailBySlug = (slug, type) => {
  const queryKey = ['GET_ARTICLE_DETAIL_BY_SLUG', slug, type];

  return useQuery({
    queryKey,
    queryFn: async () => {
      // Step 1: Tìm ID từ slug và type
      const idResponse = await API.request({
        url: '/api/news/client/find-id-by-slug',
        params: { slug, type }
      });

      if (!idResponse?.id) {
        throw new Error('Article not found');
      }

      // Step 2: Lấy detail bằng ID
      const detailResponse = await API.request({
        url: `/api/news/client/${idResponse.id}`
      });

      return {
        ...detailResponse,
        articleId: idResponse.id // Thêm ID để dùng cho related articles
      };
    },
    enabled: !!(slug && type),
    staleTime: 5 * 60 * 1000 // 5 minutes cache
  });
};

/**
 * Service lấy related articles
 */
export const useQueryRelatedArticles = (articleId, type, limit = 4) => {
  const queryKey = ['GET_RELATED_ARTICLES', articleId, type, limit];

  return useQuery({
    queryKey,
    queryFn: () =>
      API.request({
        url: `/api/news/client/related/${articleId}`,
        params: { limit }
      }),
    enabled: !!articleId,
    staleTime: 5 * 60 * 1000
  });
};

/**
 * Service lấy latest articles cùng type
 */
export const useQueryLatestArticlesByType = (type, excludeId, limit = 3) => {
  const queryKey = ['GET_LATEST_ARTICLES_BY_TYPE', type, excludeId, limit];

  return useQuery({
    queryKey,
    queryFn: async () => {
      const response = await API.request({
        url: '/api/news/client/get-all',
        params: {
          pageNumber: 0,
          pageSize: limit + 1, // +1 để có thể filter current article
          type
        }
      });

      const { content = [] } = response || {};

      // Filter out current article nếu có
      const filtered = excludeId ? content.filter((article) => article.id !== excludeId) : content;

      return filtered.slice(0, limit);
    },
    enabled: !!type,
    staleTime: 5 * 60 * 1000
  });
};
