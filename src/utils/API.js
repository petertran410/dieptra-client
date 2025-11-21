const BASE_URL = process.env.NEXT_PUBLIC_API_DOMAIN || 'http://localhost:8084';

let getAuthToken = null;
let refreshAuthToken = null;

export const setAuthFunctions = (getToken, refreshToken) => {
  getAuthToken = getToken;
  refreshAuthToken = refreshToken;
};

export const API = {
  request: async ({ url, method = 'GET', params = {} }) => {
    try {
      let token = getAuthToken ? getAuthToken() : null;

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

      let response = await fetch(fullUrl, config);

      if (response.status === 401 && refreshAuthToken) {
        const newToken = await refreshAuthToken();

        if (newToken) {
          config.headers['Authorization'] = `Bearer ${newToken}`;
          response = await fetch(fullUrl, config);
        } else {
          console.error('Token refresh failed');
          throw new Error('Session expired. Please login again.');
        }
      }

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));

        if (response.status === 401) {
          throw new Error('Authentication failed. Please login again.');
        } else if (response.status === 403) {
          throw new Error('Access denied.');
        } else if (response.status >= 500) {
          throw new Error('Internal server error');
        } else {
          throw new Error(errorData.message || `HTTP ${response.status}: ${response.statusText}`);
        }
      }

      return await response.json();
    } catch (error) {
      console.error(`API Error for ${method} ${url}:`, error.message);
      throw error;
    }
  }
};
