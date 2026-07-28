/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/auth-proxy/:path*',
        destination: 'http://localhost:3000/api/auth/:path*',
      },
    ];
  },
};

export default nextConfig;