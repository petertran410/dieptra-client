import { API } from '@/utils/API';
import { useGetParamsURL } from '@/utils/hooks';
import { useQuery } from '@tanstack/react-query';

export const useQueryBlogCultureList = () => {
  const params = useGetParamsURL();
  const { page: pageNumber = 1, keyword } = params;
  const queryKey = ['GET_BLOG_CULTURE_LIST_CLIENT', pageNumber, keyword];

  return useQuery({
    queryKey,
    queryFn: () =>
      API.request({
        url: '/api/news/get-all',
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
