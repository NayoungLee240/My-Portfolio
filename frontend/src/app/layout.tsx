import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: '이나영 | Backend Server Developer',
  description: 'Node.js 기반 글로벌 게임 라이브 서비스 백엔드 개발자 포트폴리오',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // suppressHydrationWarning: 인라인 스크립트로 data-theme을 덮어쓰기 때문에 hydration 경고 억제
    <html lang="ko" data-theme="dark" suppressHydrationWarning>
      <head>
        {/* NanumBarunGothic는 globals.css의 @font-face에서 네이버 CDN으로 로드 */}
        {/* Bebas Neue: 이름/섹션 타이틀 디스플레이 폰트 */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap"
          rel="stylesheet"
        />
        {/* 페이지 로드 즉시 로컬스토리지의 테마 적용 (FOUC 방지) */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var t=localStorage.getItem('ny_theme')||'dark';document.documentElement.dataset.theme=t})()`,
          }}
        />
      </head>
      <body>
        <div className="grid-bg" />
        <Header />
        <main style={{ paddingTop: '60px' }}>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
