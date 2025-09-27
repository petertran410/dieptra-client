import Cookies from 'js-cookie';
import { CK_CLIENT_TOKEN } from './const';

const BASE_URL = process.env.NODE_ENV === 'production' ? 'https://api.gaulermao.com' : 'http://localhost:8084';

export const API = {
  request: async ({ url, method = 'GET', params = {} }) => {
    try {
      const token = Cookies.get(CK_CLIENT_TOKEN);

      const config = {
        method,
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include'
      };

      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }

      let fullUrl = `${BASE_URL}${url}`;

      if (method === 'GET' && Object.keys(params).length > 0) {
        const searchParams = new URLSearchParams();
        Object.entries(params).forEach(([key, value]) => {
          if (value !== undefined && value !== null) {
            searchParams.append(key, value);
          }
        });
        fullUrl += `?${searchParams.toString()}`;
      } else if (method !== 'GET') {
        config.body = JSON.stringify(params);
      }

      const response = await fetch(fullUrl, config);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP ${response.status}: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
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
