// src/services/pages.service.js (Client)
import { API } from '../utils/API';
import { useQuery } from '@tanstack/react-query';

// Lấy trang theo slug
export const useQueryPageBySlug = (slug) => {
  const queryKey = ['GET_PAGE_BY_SLUG', slug];

  return useQuery({
    queryKey,
    queryFn: () =>
      API.request({
        url: `/api/pages/client/by-slug/${slug}`
      }),
    enabled: !!slug,
    staleTime: 5 * 60 * 1000, // Cache 5 phút
    cacheTime: 10 * 60 * 1000 // Cache 10 phút
  });
};

// Lấy hierarchy của trang (dùng cho sidebar)
export const useQueryPagesHierarchy = (parentSlug) => {
  const queryKey = ['GET_PAGES_HIERARCHY', parentSlug];

  return useQuery({
    queryKey,
    queryFn: () =>
      API.request({
        url: '/api/pages/client/hierarchy',
        params: parentSlug ? { parentSlug } : {}
      }),
    staleTime: 10 * 60 * 1000, // Cache 10 phút
    cacheTime: 30 * 60 * 1000 // Cache 30 phút
  });
};

// Lấy các trang con của trang cha
export const useQueryChildPages = (parentId) => {
  const queryKey = ['GET_CHILD_PAGES', parentId];

  return useQuery({
    queryKey,
    queryFn: () =>
      API.request({
        url: '/api/pages/client/children',
        params: parentId ? { parentId } : {}
      }),
    staleTime: 10 * 60 * 1000, // Cache 10 phút
    cacheTime: 30 * 60 * 1000 // Cache 30 phút
  });
};
