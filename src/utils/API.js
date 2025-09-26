import axios from 'axios';
import Cookies from 'js-cookie';
import { CK_TOKEN } from './const';

export const API = {
  request: (config) => {
    const { baseUrl = process.env.NEXT_PUBLIC_API_DOMAIN, method = 'GET', url, params, headers } = config;
    const token = Cookies.get(CK_TOKEN);

    const requestConfig = {
      url: `${baseUrl}${url}`,
      method,
      headers: {
        'Content-Type': 'application/json',
        Authorization: token ? `Bearer ${token}` : undefined,
        ...headers
      },
      data: ['POST', 'PATCH', 'PUT'].includes(method) ? params : undefined,
      params: method === 'GET' ? params : undefined,
      timeout: 20000,
      timeoutErrorMessage: 'Hệ thống không phản hồi. Vui lòng thử lại sau!'
    };

    return axios(requestConfig)
      .then((response) => {
        return response.data;
      })
      .catch((e) => {
        const { status } = e?.response || {};
        if (status === 401) {
          Cookies.remove(CK_TOKEN);
          // Don't reload on client-side, just handle gracefully
          console.warn('Authentication token expired');
        }
        return Promise.reject(e?.response?.data || e);
      });
  },

  upload: (config) => {
    const { headers, file, url = '/api/file/upload', internalUrl, responseType = 'json' } = config;

    if (!file) {
      return Promise.resolve(null);
    }

    const formData = new FormData();
    formData.append('file', file);

    const baseUrlDefault = process.env.NEXT_PUBLIC_API_DOMAIN;

    const requestConfig = {
      url: internalUrl || `${baseUrlDefault}${url}`,
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
        ...headers
      },
      data: formData,
      timeout: 20000,
      timeoutErrorMessage: 'Hệ thống không phản hồi. Vui lòng thử lại sau!',
      responseType: responseType
    };

    return axios(requestConfig)
      .then((response) => {
        return response.data;
      })
      .catch((e) => {
        return Promise.reject(e?.response?.data || e);
      });
  }
};
