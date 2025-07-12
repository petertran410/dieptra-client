import { headers } from 'next/headers';

export default function robots() {
  const host = headers().get('host');
  const protocol = host.startsWith('localhost') ? 'http' : 'https';
  const domain = `${protocol}://${host}`;

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disAllow: [
          '/gio-hang/',
          '/thanh-toan/',
          '/tim-kiem',
          '/search?',
          '/search?keywords=*.tv',
          '/search?keywords=*.xyz',
          '*utm_source',
          '/search?category=*.com'
        ]
      }
    ],
    sitemap: `${domain}/sitemap.xml`
  };
}
