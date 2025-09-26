import { API } from '../utils/API';

export const profileService = {
  getProfile: async () => {
    return await API.request({
      url: '/api/client-auth/profile',
      method: 'GET'
    });
  },

  updateProfile: async (data) => {
    return await API.request({
      url: '/api/client-user/profile',
      method: 'PATCH',
      params: data
    });
  }
};
