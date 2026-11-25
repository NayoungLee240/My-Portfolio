/** @type {import('next').NextConfig} */
// GitHub Pages 정적 배포 (https://nayounglee240.github.io/MyPortfolio-Build/)
// 백엔드 서버 없이 프론트엔드만 정적 export
const basePath = "/MyPortfolio-Build";
const nextConfig = {
  basePath: basePath,
  output: "export",
  images: {
    unoptimized: true,
    loader: "imgix",
    path: basePath + "/",
  },
};

export default nextConfig;
