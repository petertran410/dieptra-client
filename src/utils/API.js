import Cookies from 'js-cookie';
import { CK_CLIENT_TOKEN } from './const';

const BASE_URL = process.env.NEXT_PUBLIC_API_DOMAIN || 'http://localhost:8084';

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
  }
};
