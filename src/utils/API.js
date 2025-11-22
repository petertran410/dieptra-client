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

      if (!url.startsWith('/api/')) {
        throw new Error('Invalid API endpoint');
      }

      const config = {
        method,
        headers: {
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest'
        },
        credentials: 'include'
      };

      if (token) {
        if (!/^[A-Za-z0-9\-_]+\.[A-Za-z0-9\-_]+\.[A-Za-z0-9\-_]+$/.test(token)) {
          throw new Error('Invalid token format');
        }
        config.headers['Authorization'] = `Bearer ${token}`;
      }

      let fullUrl = `${BASE_URL}${url}`;

      if (method === 'GET' && Object.keys(params).length > 0) {
        const searchParams = new URLSearchParams();
        Object.entries(params).forEach(([key, value]) => {
          if (value !== undefined && value !== null && typeof key === 'string') {
            const sanitizedValue = String(value).replace(/[<>"']/g, '');
            searchParams.append(key, sanitizedValue);
          }
        });
        fullUrl += `?${searchParams.toString()}`;
      } else if (method !== 'GET') {
        const sanitizedParams = this.sanitizeRequestBody(params);
        config.body = JSON.stringify(sanitizedParams);
      }

      let response = await fetch(fullUrl, config);

      if (response.status === 401 && refreshAuthToken) {
        const newToken = await refreshAuthToken();
        if (newToken && /^[A-Za-z0-9\-_]+\.[A-Za-z0-9\-_]+\.[A-Za-z0-9\-_]+$/.test(newToken)) {
          config.headers['Authorization'] = `Bearer ${newToken}`;
          response = await fetch(fullUrl, config);
        } else {
          throw new Error('Authentication failed');
        }
      }

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('Authentication required');
        } else if (response.status === 403) {
          throw new Error('Access denied');
        } else if (response.status >= 500) {
          throw new Error('Service unavailable');
        } else {
          throw new Error('Request failed');
        }
      }

      const responseData = await response.json();

      return this.sanitizeResponseData(responseData);
    } catch (error) {
      throw error;
    }
  },

  sanitizeRequestBody: (data) => {
    if (typeof data !== 'object' || data === null) return data;

    const sanitized = {};
    Object.keys(data).forEach((key) => {
      if (typeof data[key] === 'string') {
        sanitized[key] = data[key].replace(/[<>"'&]/g, '');
      } else if (typeof data[key] === 'object' && data[key] !== null) {
        sanitized[key] = API.sanitizeRequestBody(data[key]);
      } else {
        sanitized[key] = data[key];
      }
    });
    return sanitized;
  },

  sanitizeResponseData: (data) => {
    if (typeof data !== 'object' || data === null) return data;

    const sanitized = {};
    Object.keys(data).forEach((key) => {
      if (typeof data[key] === 'string') {
        sanitized[key] = data[key].replace(/[<>"']/g, '');
      } else if (typeof data[key] === 'object' && data[key] !== null) {
        sanitized[key] = API.sanitizeResponseData(data[key]);
      } else {
        sanitized[key] = data[key];
      }
    });
    return sanitized;
  }
};
