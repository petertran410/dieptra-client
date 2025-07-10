// src/services/news.service.js - UPDATED để tương thích với hệ thống mới
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
          pageSize: 9 // Increase for better display
        }
      })
  });
};

// Service cho video (giữ nguyên)
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

// Service cho culture/văn hóa (giữ nguyên)
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

// THÊM MỚI: Service tổng quát để lấy news theo type
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

// THÊM MỚI: Service cho featured articles
export const useQueryFeaturedNews = (type, limit = 5) => {
  const queryKey = ['GET_FEATURED_NEWS', type, limit];

  return useQuery({
    queryKey,
    queryFn: () =>
      API.request({
        url: '/api/news/client/featured',
        params: { limit, type }
      }),
    staleTime: 5 * 60 * 1000 // 5 minutes
  });
};

// THÊM MỚI: Service để lấy bài viết theo ID
export const useQueryNewsDetail = (id) => {
  const queryKey = ['GET_NEWS_DETAIL_CLIENT', id];

  return useQuery({
    queryKey,
    queryFn: () =>
      API.request({
        url: `/api/news/client/${id}`
      }),
    enabled: !!id,
    staleTime: 10 * 60 * 1000 // 10 minutes
  });
};

// THÊM MỚI: Service để increment view count
export const useIncrementViewCount = () => {
  return useMutation({
    mutationFn: (articleId) =>
      API.request({
        url: `/api/news/client/increment-view/${articleId}`,
        method: 'POST'
      }),
    onError: (error) => {
      console.warn('Failed to increment view count:', error);
      // Không hiển thị error cho user vì không quan trọng
    }
  });
};
