import { NextResponse } from 'next/server';

const API_DOMAIN = process.env.NEXT_PUBLIC_API_DOMAIN || 'http://localhost:8084';
const SITE_CODE = 'dieptra';
const CACHE_TTL_MS = 60 * 1000; // cache map redirect 60s trong bộ nhớ runtime

// Cache in-memory theo từng runtime instance (best-effort). Tránh gọi backend mỗi request.
let cache = { data: null, expires: 0 };

async function getRedirectMap() {
  const now = Date.now();
  if (cache.data && now < cache.expires) {
    return cache.data;
  }

  try {
    const res = await fetch(`${API_DOMAIN}/api/redirect/client/map`, {
      headers: {
        'Content-Type': 'application/json',
        'X-Site-Code': SITE_CODE
      },
      // revalidate phía Next cache fetch + TTL bộ nhớ ở trên là 2 lớp
      next: { revalidate: 60 }
    });

    if (!res.ok) {
      // Lỗi backend: dùng cache cũ nếu còn, nếu không trả null (không chặn request)
      return cache.data || null;
    }

    const list = await res.json();
    // exact: Map tra O(1). prefix: mảng match theo tiền tố URL (bao con cháu).
    const exact = new Map();
    const prefix = [];
    if (Array.isArray(list)) {
      for (const item of list) {
        if (item?.source_path && item?.target_path) {
          const entry = {
            source: item.source_path,
            target: item.target_path,
            status: item.status_code === 302 ? 302 : 301
          };
          if (item.match_type === 'prefix') {
            prefix.push(entry);
          } else {
            exact.set(item.source_path, entry);
          }
        }
      }
    }

    const data = { exact, prefix };
    cache = { data, expires: now + CACHE_TTL_MS };
    return data;
  } catch {
    return cache.data || null;
  }
}

// Chuẩn hoá path giống backend: bỏ "/" thừa ở cuối (trừ root).
function normalizePath(pathname) {
  if (pathname.length > 1 && pathname.endsWith('/')) {
    return pathname.replace(/\/+$/, '');
  }
  return pathname;
}

export async function middleware(request) {
  const { pathname } = request.nextUrl;

  // Bỏ qua nội bộ Next, API, file tĩnh → không tra redirect thừa.
  const isStatic =
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname === '/favicon.ico' ||
    /\.[a-zA-Z0-9]+$/.test(pathname);

  if (!isStatic) {
    const map = await getRedirectMap();
    if (map) {
      const path = normalizePath(pathname);

      // 1. Exact match trước (ưu tiên cao hơn, O(1)).
      const hit = map.exact?.get(path);
      if (hit) {
        const url = new URL(hit.target, request.url);
        return NextResponse.redirect(url, hit.status);
      }

      // 2. Prefix match: URL == source HOẶC bắt đầu bằng "source/" → giữ phần đuôi.
      //    Ví dụ source=/a/siro target=/a/mut, path=/a/siro/con → /a/mut/con.
      for (const r of map.prefix || []) {
        if (path === r.source || path.startsWith(`${r.source}/`)) {
          const suffix = path.slice(r.source.length); // "" hoặc "/con/chau"
          const url = new URL(`${r.target}${suffix}`, request.url);
          return NextResponse.redirect(url, r.status);
        }
      }
    }
  }

  const response = NextResponse.next();
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('Content-Security-Policy', "frame-ancestors 'none'");
  return response;
}

export const config = {
  matcher: '/:path*'
};
