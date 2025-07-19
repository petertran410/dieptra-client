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
          pageSize: 12
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
      const idResponse = await API.request({
        url: '/api/news/client/find-id-by-slug',
        params: { slug, type }
      });

      if (!idResponse?.id) {
        throw new Error('Article not found');
      }

      const detailResponse = await API.request({
        url: `/api/news/client/${idResponse.id}`
      });

      return {
        ...detailResponse,
        articleId: idResponse.id
      };
    },
    enabled: !!(slug && type),
    staleTime: 5 * 60 * 1000
  });
};

/**
 * Service lấy latest articles cùng type (thay thế related articles)
 */
export const useQueryLatestArticlesByType = (type, excludeId, limit = 6) => {
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
