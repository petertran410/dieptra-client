import { API } from './API';

export const ClientAPI = {
  auth: {
    register: (data) =>
      API.request({
        url: '/client-auth/register',
        method: 'POST',
        params: data
      }),

    login: (data) =>
      API.request({
        url: '/client-auth/login',
        method: 'POST',
        params: data
      }),

    verifyEmail: (data) =>
      API.request({
        url: '/client-auth/verify-email',
        method: 'POST',
        params: data
      })
  },

  user: {
    getProfile: () =>
      API.request({
        url: '/client/profile',
        method: 'GET'
      })
  }
};
