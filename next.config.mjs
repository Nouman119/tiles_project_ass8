/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/auth-proxy/:path*',
        destination: '/api/auth/:path*',
      },
    ];
  },
};

export default nextConfig;