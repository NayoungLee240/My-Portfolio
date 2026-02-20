/** @type {import('next').NextConfig} */
const nextConfig = {
  // /api/* 요청을 백엔드 서버로 프록시
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'}/api/:path*`,
      },
    ];
  },
};

export default nextConfig;
