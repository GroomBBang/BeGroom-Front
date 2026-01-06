import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'img-cf.kurly.com',
      },
      {
        protocol: 'https',
        hostname: 'product-image.kurly.com',
      },
    ],
  },

  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value:
              process.env.NODE_ENV === 'development'
                ? "script-src 'self' 'unsafe-eval' 'unsafe-inline'; object-src 'none';"
                : "script-src 'self' 'unsafe-inline'; object-src 'none';",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
