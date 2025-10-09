import { API } from '../utils/API';
import { useGetParamsURL } from '../utils/hooks';
import { useQuery } from '@tanstack/react-query';

export const useQueryArticlesList = () => {
  const params = useGetParamsURL();
  const { page: pageNumber = 1, keyword } = params;
  const queryKey = ['GET_NEWS_LIST_CLIENT', pageNumber, keyword];

  return useQuery({
    queryKey,
    queryFn: () =>
      API.request({
        url: '/api/news/client/get-all',
        params: {
          pageNumber: pageNumber - 1,
          keyword,
          type: 'NEWS',
          pageSize: 9
        }
      })
  });
};

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

export const useQueryVideoList = () => {
  const params = useGetParamsURL();
  const { page: pageNumber = 1, keyword } = params;
  const queryKey = ['GET_VIDEO_LIST_CLIENT', pageNumber, keyword];

  return useQuery({
    queryKey,
    queryFn: () =>
      API.request({
        url: '/api/news/client/get-all',
        params: { pageNumber: pageNumber - 1, keyword, type: 'VIDEO' }
      })
  });
};

export const useQueryBlogCultureList = () => {
  const params = useGetParamsURL();
  const { page: pageNumber = 1, keyword } = params;
  const queryKey = ['GET_BLOG_CULTURE_LIST_CLIENT', pageNumber, keyword];

  return useQuery({
    queryKey,
    queryFn: () =>
      API.request({
        url: '/api/news/client/get-all',
        params: {
          pageNumber: pageNumber - 1,
          pageSize: 20,
          keyword,
          type: 'CULTURE',
          orderBy: 'createdDate',
          isDesc: false
        }
      })
  });
};

export const useQueryFindIdBySlug = (slug, type) => {
  const queryKey = ['FIND_ID_BY_SLUG', slug, type];

  return useQuery({
    queryKey,
    queryFn: () =>
      API.request({
        url: '/api/news/client/find-id-by-slug',
        params: { slug, type }
      }),
    enabled: !!(slug && type),
    staleTime: 5 * 60 * 1000
  });
};

export const useQueryNewsByType = (type, options = {}) => {
  const params = useGetParamsURL();
  const { page: pageNumber = 1, keyword } = params;
  const { pageSize = 10, enabled = true } = options;

  const queryKey = ['GET_NEWS_BY_TYPE', type, pageNumber, keyword, pageSize];

  return useQuery({
    queryKey,
    queryFn: () =>
      API.request({
        url: '/api/news/client/get-all',
        params: {
          pageNumber: pageNumber - 1,
          pageSize,
          keyword,
          type
        }
      }),
    enabled: enabled && !!type
  });
};

export const useQueryFeaturedNews = (type, limit = 5) => {
  const queryKey = ['GET_FEATURED_NEWS', type, limit];

  return useQuery({
    queryKey,
    queryFn: () =>
      API.request({
        url: '/api/news/client/featured',
        params: { limit, type }
      }),
    staleTime: 5 * 60 * 1000
  });
};

export const useQueryNewsDetail = (id) => {
  const queryKey = ['GET_NEWS_DETAIL_CLIENT', id];

  return useQuery({
    queryKey,
    queryFn: () =>
      API.request({
        url: `/api/news/client/${id}`
      }),
    enabled: !!id
  });
};

export const useQueryArticleSections = () => {
  const queryKey = ['GET_ARTICLE_SECTIONS'];

  return useQuery({
    queryKey,
    queryFn: () =>
      API.request({
        url: '/api/news/client/article-sections'
      }),
    staleTime: 10 * 60 * 1000
  });
};
