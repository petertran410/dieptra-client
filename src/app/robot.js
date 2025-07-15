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
          '/search',
          '/search?',
          '/search?keywords=',
          '/search?keywords=category',
          '*?s=',
          '*?q=',
          '*ref=',
          '*track=',
          '*go=',
          '*?replytocom',
          '*?fbclid=',
          '*?gclid=',
          '*utm_source',
          '*utm_medium',
          '*utm_campaign',
          '*utm_term',
          '*utm_content'
        ]
      }
    ],
    sitemap: `${domain}/sitemap.xml`
  };
}
