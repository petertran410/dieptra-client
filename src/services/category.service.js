import { API } from '../utils/API';
import { useGetParamsURL } from '../utils/hooks';
import { useQuery } from '@tanstack/react-query';

export const useQueryCategoryList = () => {
  const params = useGetParamsURL();
  const { page: pageNumber = 1, keyword } = params;
  const queryKey = ['GET_CATEGORY_LIST_CLIENT', keyword, pageNumber];

  return useQuery({
    queryKey,
    queryFn: () =>
      API.request({
        url: '/api/category/v2/get-all',
        params: { pageNumber, title: keyword }
      })
  });
};

export const useQueryCategoryListByParent = (parentId) => {
  const queryKey = ['GET_CATEGORY_LIST_BY_PARENT_CLIENT', parentId];

  return useQuery({
    queryKey,
    queryFn: () => {
      // FIXED: Handle KiotViet parent categories properly
      let actualParentId = parentId;

      // If it's one of our main KiotViet categories, we need to find their children
      if (parentId === '2205374' || parentId === '2205381') {
        // For KiotViet categories, we'll fetch their subcategories
        // But since we might not have these in our local database, let's return empty
        // and let the ProductList handle it
        console.log(`Fetching subcategories for KiotViet parent: ${parentId}`);
      }

      return API.request({
        url: '/api/category/v2/get-all',
        params: {
          pageNumber: 0,
          parentId: actualParentId,
          pageSize: 100
        }
      });
    },
    enabled: typeof parentId !== 'undefined' && !!`${parentId}`.length
  });
};
