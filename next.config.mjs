/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
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
      }
    ]
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          },
          {
            key: 'Content-Security-Policy',
            value: "frame-ancestors 'none'"
          }
        ]
      }
    ];
  }
};

export default nextConfig;
