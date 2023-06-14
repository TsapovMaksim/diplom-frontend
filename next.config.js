/** @type {import('next').NextConfig} */
const path = require('path');

const { API_URL } = require('./src/shared/constants');

console.log('env', process.env.NEXTAUTH_URL);

const nextConfig = {
  sassOptions: {
    includePaths: [path.join(__dirname, 'src')],
  },
  async rewrites() {
    return [
      {
        source: '/server-api/:path*',
        destination: 'http://localhost:3000/api/:path*',
        basePath: false,
      },
      {
        source: '/uploads/:path*',
        destination: 'http://localhost:3000/static/:path*',
      },
    ];
  },
  images: {
    domains: ['http://localhost:3000'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'gw.alipayobjects.com',
        port: '',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3000',
      },
    ],
  },
};

module.exports = nextConfig;
