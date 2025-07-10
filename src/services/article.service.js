// src/services/article.service.js - MỚI
import { API } from '../utils/API';
import { useGetParamsURL } from '../utils/hooks';
import { useQuery } from '@tanstack/react-query';

// Service cho trang "Bài Viết" chính - lấy 6 sections
export const useQueryArticleSections = () => {
  const queryKey = ['GET_ARTICLE_SECTIONS'];

  return useQuery({
    queryKey,
    queryFn: () =>
      API.request({
        url: '/api/news/client/article-sections'
      }),
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 10 * 60 * 1000 // 10 minutes
  });
};

// Service cho các trang con - lấy theo type cụ thể
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
          pageSize: 12, // 12 bài mỗi trang cho trang con
          keyword,
          type: articleType
        }
      }),
    enabled: !!articleType // Chỉ call API khi có articleType
  });
};

// Service cho bài viết cũ (giữ nguyên cho backward compatibility)
export const useQueryArticlesList = () => {
  const params = useGetParamsURL();
  const { page: pageNumber = 1, keyword } = params;
  const queryKey = ['GET_NEWS_LIST_CLIENT', pageNumber, keyword];

  return useQuery({
    queryKey,
    queryFn: () =>
      API.request({
        url: '/api/news/client/get-all',
        params: { pageNumber: pageNumber - 1, keyword, type: 'NEWS' }
      })
  });
};

// Service để lấy bài viết liên quan
export const useQueryRelatedArticles = (articleId, limit = 4) => {
  const queryKey = ['GET_RELATED_ARTICLES', articleId, limit];

  return useQuery({
    queryKey,
    queryFn: () =>
      API.request({
        url: `/api/news/client/related/${articleId}`,
        params: { limit }
      }),
    enabled: !!articleId
  });
};
