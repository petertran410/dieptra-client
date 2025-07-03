import { API } from '../utils/API';
import { useGetParamsURL } from '../utils/hooks';
import { useQuery } from '@tanstack/react-query';

export const useQueryCategoryList = () => {
  const params = useGetParamsURL();
  const { page: pageNumber = 1, keyword } = params;
  const queryKey = ['GET_CATEGORY_LIST_CLIENT', keyword, pageNumber];

  return useQuery({
    queryKey,
    queryFn: async () => {
      const response = await API.request({
        url: '/api/category/v2/get-all',
        params: { pageNumber, title: keyword }
      });

      // FIXED: Return only the content array, not the full response object
      return response?.content || [];
    }
  });
};

export const useQueryCategoryListByParent = (parentId) => {
  const queryKey = ['GET_CATEGORY_LIST_BY_PARENT_CLIENT', parentId];

  return useQuery({
    queryKey,
    queryFn: async () => {
      const response = await API.request({
        url: '/api/category/v2/get-all',
        params: { pageNumber: 0, parentId, pageSize: 100 }
      });

      // FIXED: Return only the content array, not the full response object
      return response?.content || [];
    },
    enabled: typeof parentId !== 'undefined' && !!`${parentId}`.length
  });
};
