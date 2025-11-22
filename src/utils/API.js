const BASE_URL = process.env.NEXT_PUBLIC_API_DOMAIN || 'http://localhost:8084';

let getAuthToken = null;
let refreshAuthToken = null;

export const setAuthFunctions = (getToken, refreshToken) => {
  getAuthToken = getToken;
  refreshAuthToken = refreshToken;
};

const sanitizeRequestBody = (data) => {
  if (typeof data !== 'object' || data === null) return data;

  if (Array.isArray(data)) {
    return data.map((item) => sanitizeRequestBody(item));
  }

  const sanitized = {};
  Object.keys(data).forEach((key) => {
    if (typeof data[key] === 'string') {
      sanitized[key] = data[key].replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
    } else if (Array.isArray(data[key])) {
      // ✅ Preserve arrays
      sanitized[key] = data[key].map((item) => sanitizeRequestBody(item));
    } else if (typeof data[key] === 'object' && data[key] !== null) {
      sanitized[key] = sanitizeRequestBody(data[key]);
    } else {
      sanitized[key] = data[key];
    }
  });
  return sanitized;
};

const sanitizeResponseData = (data) => {
  if (typeof data !== 'object' || data === null) return data;

  if (Array.isArray(data)) {
    return data;
  }

  const sanitized = {};
  Object.keys(data).forEach((key) => {
    if (typeof data[key] === 'string') {
      sanitized[key] = data[key].replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
    } else if (Array.isArray(data[key])) {
      sanitized[key] = data[key];
    } else if (typeof data[key] === 'object' && data[key] !== null) {
      sanitized[key] = sanitizeResponseData(data[key]);
    } else {
      sanitized[key] = data[key];
    }
  });
  return sanitized;
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
        if (typeof token === 'string' && token.length > 10) {
          config.headers['Authorization'] = `Bearer ${token}`;
        }
      }

      let fullUrl = `${BASE_URL}${url}`;

      if (method === 'GET' && Object.keys(params).length > 0) {
        const searchParams = new URLSearchParams();
        Object.entries(params).forEach(([key, value]) => {
          if (value !== undefined && value !== null && typeof key === 'string') {
            const sanitizedValue = String(value).replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
            searchParams.append(key, sanitizedValue);
          }
        });
        fullUrl += `?${searchParams.toString()}`;
      } else if (method !== 'GET') {
        const sanitizedParams = sanitizeRequestBody(params);
        config.body = JSON.stringify(sanitizedParams);
      }

      let response = await fetch(fullUrl, config);

      if (response.status === 401 && refreshAuthToken) {
        const newToken = await refreshAuthToken();
        if (newToken && typeof newToken === 'string' && newToken.length > 10) {
          config.headers['Authorization'] = `Bearer ${newToken}`;
          response = await fetch(fullUrl, config);
        } else {
          throw new Error('Authentication failed');
        }
      }

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));

        if (response.status === 401) {
          throw new Error('Authentication required');
        } else if (response.status === 403) {
          throw new Error('Access denied');
        } else if (response.status >= 500) {
          throw new Error('Service unavailable');
        } else {
          throw new Error(errorData.message || 'Request failed');
        }
      }

      const responseData = await response.json();

      return sanitizeResponseData(responseData);
    } catch (error) {
      throw error;
    }
  }
};
