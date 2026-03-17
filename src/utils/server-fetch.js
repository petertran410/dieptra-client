// src/utils/server-fetch.js (dieptra-client) — TẠO MỚI

const API_DOMAIN = process.env.NEXT_PUBLIC_API_DOMAIN || 'http://localhost:8084';
const SITE_CODE = 'dieptra';

/**
 * Server-side fetch wrapper tự động gắn X-Site-Code header.
 * Dùng trong generateMetadata, server components, route handlers.
 */
export async function serverFetch(path, options = {}) {
  const { headers = {}, ...restOptions } = options;

  const response = await fetch(`${API_DOMAIN}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      'X-Site-Code': SITE_CODE,
      ...headers
    },
    ...restOptions
  });

  return response;
}

/**
 * Server-side fetch + auto parse JSON
 */
export async function serverFetchJSON(path, options = {}) {
  const response = await serverFetch(path, options);

  if (!response.ok) {
    throw new Error(`API ${path} returned ${response.status}`);
  }

  return response.json();
}
