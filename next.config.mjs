/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 320, 384, 480],
    minimumCacheTTL: 31536000,
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '8084',
        pathname: '/public/**'
      },
      {
        protocol: 'https',
        hostname: 'api.hisweetievietnam.com',
        pathname: '/public/**'
      },
      {
        protocol: 'http',
        hostname: '14.224.212.102',
        port: '8084',
        pathname: '/public/**'
      },
      {
        protocol: 'https',
        hostname: '**.kiotviet.vn',
        pathname: '/**'
      },
      {
        protocol: 'https',
        hostname: 'backendpos.hisweetievietnam.com',
        pathname: '/uploads/**'
      }
    ]
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'Content-Security-Policy', value: "frame-ancestors 'none'" }
        ]
      },
      {
        source: '/images/:path*',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }]
      },
      {
        source: '/:path*\\.(webp|avif|png|jpg|jpeg|svg|ico)',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }]
      },
      {
        source: '/:path*\\.(woff|woff2|ttf)',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }]
      }
    ];
  }
};

export default nextConfig;
