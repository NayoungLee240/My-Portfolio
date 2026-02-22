/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === "production";
const basePath = ""; //"/MyPortfolio-Build";
const nextConfig = {
  // /api/* 요청을 백엔드 서버로 프록시
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001"}/api/:path*`,
      },
    ];
  },
  basePath: basePath,
  // output: "export",
  // images: {
  //   unoptimized: true,
  //   loader: "imgix",
  //   path: basePath + "/",
  // },
  // assetPrefix: isProd
  //   ? "https://nayounglee240.github.io" + basePath
  //   : undefined,
};

export default nextConfig;
