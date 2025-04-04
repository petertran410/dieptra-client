import { API } from '@/utils/API';
import { useGetParamsURL } from '@/utils/hooks';
import { useMutation, useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';

export const useQueryJobList = () => {
  const params = useGetParamsURL();
  const { page: pageNumber = 1, keyword } = params;
  const queryKey = ['GET_JOB_LIST_CLIENT', pageNumber, keyword];

  return useQuery({
    queryKey,
    queryFn: () =>
      API.request({
        url: '/api/job/client/search',
        params: { pageNumber: pageNumber - 1, title: keyword, applicationDeadline: dayjs().format('YYYY-MM-DD') }
      })
  });
};

export const useApplyJob = (jobId) => {
  return useMutation({
    mutationFn: (params) => {
      return API.request({
        url: `/api/job/client/apply/${jobId}`,
        method: 'POST',
        params
      });
    }
  });
};
