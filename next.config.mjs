/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
    return [
      {
        source: '/auth-proxy/:path*',
        destination: `${baseUrl}/api/auth/:path*`,
      },
    ];
  },
};

export default nextConfig;