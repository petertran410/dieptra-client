const BASE_URL = process.env.NEXT_PUBLIC_API_DOMAIN || 'http://localhost:8084';

let getAuthToken = null;
let refreshAuthToken = null;

export const setAuthFunctions = (getToken, refreshToken) => {
  getAuthToken = getToken;
  refreshAuthToken = refreshToken;
};

const safeGetLocalStorage = (key) => {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      return localStorage.getItem(key);
    }
    return null;
  } catch (error) {
    console.warn('LocalStorage access failed:', error);
    return null;
  }
};

const safeSetLocalStorage = (key, value) => {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem(key, value);
      return true;
    }
    return false;
  } catch (error) {
    console.warn('LocalStorage set failed:', error);
    return false;
  }
};

const safeRemoveLocalStorage = (key) => {
  try {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.removeItem(key);
      return true;
    }
    return false;
  } catch (error) {
    console.warn('LocalStorage remove failed:', error);
    return false;
  }
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

const getCurrentToken = () => {
  if (getAuthToken) {
    const token = getAuthToken();
    if (token && token.length > 10) return token;
  }

  const tempToken = safeGetLocalStorage('temp_token');
  if (tempToken && tempToken.length > 10) return tempToken;

  return null;
};

export const API = {
  request: async ({ url, method = 'GET', params = {} }) => {
    try {
      let token = getCurrentToken();

      if (process.env.NODE_ENV === 'development') {
        console.log('🔑 Using token for request:', !!token, 'URL:', url);
      }

      if (!url.startsWith('/api/')) {
        throw new Error('Invalid API endpoint');
      }

      const config = {
        method,
        headers: {
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
          Accept: 'application/json'
        },
        credentials: 'include'
      };

      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
        if (process.env.NODE_ENV === 'development') {
          console.log('✅ Authorization header set');
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

      if (process.env.NODE_ENV === 'development') {
        console.log('📡 Making request to:', fullUrl);
      }

      let response = await fetch(fullUrl, config);

      if (process.env.NODE_ENV === 'development') {
        console.log('📥 Response status:', response.status);
      }

      if (!response) {
        throw new Error('Network error: No response received');
      }

      if (response.status === 401 && refreshAuthToken) {
        if (process.env.NODE_ENV === 'development') {
          console.log('🔄 Attempting token refresh...');
        }

        const newToken = await refreshAuthToken();
        if (newToken && typeof newToken === 'string' && newToken.length > 10) {
          safeSetLocalStorage('temp_token', newToken);
          config.headers['Authorization'] = `Bearer ${newToken}`;

          if (process.env.NODE_ENV === 'development') {
            console.log('✅ Token refreshed, retrying request');
          }

          response = await fetch(fullUrl, config);
        } else {
          safeRemoveLocalStorage('temp_token');
          throw new Error('Authentication failed');
        }
      }

      if (!response.ok) {
        let errorData = {};
        try {
          errorData = await response.json();
        } catch (e) {
          // Response might not be JSON
        }

        if (process.env.NODE_ENV === 'development') {
          console.log('❌ Request failed:', response.status, errorData);
        }

        if (response.status === 401) {
          safeRemoveLocalStorage('temp_token');
          throw new Error('Authentication required');
        } else if (response.status === 403) {
          throw new Error('Access denied');
        } else if (response.status === 404) {
          throw new Error('Resource not found');
        } else if (response.status >= 500) {
          throw new Error('Service temporarily unavailable');
        } else {
          throw new Error(errorData.message || `Request failed with status ${response.status}`);
        }
      }

      const responseData = await response.json();

      if (process.env.NODE_ENV === 'development') {
        console.log('✅ Request successful:', Object.keys(responseData));
      }

      return sanitizeResponseData(responseData);
    } catch (error) {
      if (process.env.NODE_ENV === 'development') {
        console.error('💥 API Request failed:', {
          url,
          method,
          error: error.message
        });
      }
      throw error;
    }
  }
};
