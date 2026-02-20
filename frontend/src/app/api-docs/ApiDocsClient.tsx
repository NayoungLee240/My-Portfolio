'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import Script from 'next/script';
import { swaggerSpec } from '@/lib/swaggerSpec';

// Swagger UI를 CDN으로 로드하는 클라이언트 전용 컴포넌트 (ssr: false로 임포트됨)
export default function ApiDocsClient() {
  useEffect(() => {
    // 로컬스토리지의 테마를 적용 (FOUC 방지)
    const t = localStorage.getItem('ny_theme') || 'dark';
    document.documentElement.dataset.theme = t;
  }, []);

  const initSwagger = () => {
    // @ts-expect-error SwaggerUIBundle은 CDN 스크립트에서 로드됨
    if (typeof SwaggerUIBundle === 'undefined') return;
    // @ts-expect-error
    SwaggerUIBundle({
      spec: swaggerSpec,
      dom_id: '#swagger-ui',
      deepLinking: true,
      // @ts-expect-error
      presets: [SwaggerUIBundle.presets.apis, SwaggerUIBundle.SwaggerUIStandalonePreset],
      layout: 'BaseLayout',
      defaultModelsExpandDepth: 1,
      defaultModelExpandDepth: 2,
      displayRequestDuration: true,
      tryItOutEnabled: true,
      filter: true,
      persistAuthorization: true,
    });
  };

  return (
    <>
      {/* Swagger UI CSS */}
      {/* eslint-disable-next-line @next/next/no-page-custom-font */}
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.11.0/swagger-ui.css" />

      {/* 커스텀 Swagger 다크 테마 오버라이드 */}
      <style>{`
        [data-theme="dark"] .swagger-ui { color: var(--text) !important; }
        [data-theme="dark"] .swagger-ui .topbar { display: none !important; }
        [data-theme="dark"] .swagger-ui .info .title { color: var(--accent) !important; font-family: 'Space Mono', monospace !important; }
        [data-theme="dark"] .swagger-ui .scheme-container { background: var(--surface) !important; border: 1px solid var(--border) !important; box-shadow: none !important; padding: 1rem 1.5rem !important; }
        [data-theme="dark"] .swagger-ui .opblock-tag { color: var(--text) !important; border-bottom: 1px solid var(--border) !important; }
        [data-theme="dark"] .swagger-ui .opblock { background: var(--card) !important; border: 1px solid var(--border) !important; box-shadow: none !important; }
        [data-theme="dark"] .swagger-ui .opblock-body { background: var(--bg2) !important; border-top: 1px solid var(--border) !important; }
        [data-theme="dark"] .swagger-ui .opblock-section-header { background: var(--surface) !important; }
        [data-theme="dark"] .swagger-ui .opblock-section-header h4 { color: var(--accent) !important; }
        [data-theme="dark"] .swagger-ui label { color: var(--text2) !important; }
        [data-theme="dark"] .swagger-ui input[type=text], [data-theme="dark"] .swagger-ui textarea, [data-theme="dark"] .swagger-ui select { background: var(--surface) !important; border: 1px solid var(--border) !important; color: var(--text) !important; }
        [data-theme="dark"] .swagger-ui .btn.execute { background: var(--accent) !important; color: #080c10 !important; border: none !important; font-weight: 700 !important; }
        [data-theme="dark"] .swagger-ui .btn.authorize { background: transparent !important; border: 1px solid var(--accent3) !important; color: var(--accent3) !important; }
        [data-theme="dark"] .swagger-ui .model-box { background: var(--surface) !important; border: 1px solid var(--border) !important; }
        [data-theme="dark"] .swagger-ui .parameter__name { color: var(--accent2) !important; }
        [data-theme="dark"] .swagger-ui .parameter__type { color: var(--accent3) !important; }
        [data-theme="dark"] .swagger-ui section.models { border: 1px solid var(--border) !important; background: var(--card) !important; }
        [data-theme="dark"] .swagger-ui section.models h4 { color: var(--accent) !important; border-bottom: 1px solid var(--border) !important; }
        [data-theme="dark"] .swagger-ui .opblock.opblock-get { border-left: 3px solid var(--accent3) !important; }
        [data-theme="dark"] .swagger-ui .opblock.opblock-get .opblock-summary-method { background: rgba(16,185,129,.15) !important; color: var(--accent3) !important; }
        [data-theme="dark"] .swagger-ui .opblock.opblock-post { border-left: 3px solid var(--accent) !important; }
        [data-theme="dark"] .swagger-ui .opblock.opblock-post .opblock-summary-method { background: rgba(0,229,255,.12) !important; color: var(--accent) !important; }
        [data-theme="dark"] .swagger-ui .response-col_status { color: var(--text) !important; }
        [data-theme="dark"] .swagger-ui .tablinks { color: var(--muted) !important; }
        [data-theme="dark"] .swagger-ui .tablinks.active { color: var(--accent) !important; border-bottom: 2px solid var(--accent) !important; }
        .swagger-wrap { padding: 1.5rem 2rem; max-width: 1300px; margin: 0 auto; }
        .api-banner { background: var(--bg2); border-bottom: 1px solid var(--border); padding: 2rem 2.5rem; }
        .banner-eyebrow { font-family: 'Space Mono', monospace; font-size: .62rem; color: var(--accent); letter-spacing: 3px; margin-bottom: .5rem; }
        .banner-title { font-size: 1.5rem; font-weight: 700; color: var(--text); margin-bottom: .5rem; }
        .banner-sub { font-size: .83rem; color: var(--text2); line-height: 1.7; }
        .api-footer { background: var(--bg2); border-top: 1px solid var(--border); padding: 1.2rem 2.5rem; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: .5rem; margin-top: 2rem; font-family: 'Space Mono', monospace; font-size: .6rem; color: var(--muted); }
        .api-footer span { color: var(--accent); }
      `}</style>

      {/* 배너 */}
      <div className="api-banner">
        <div className="banner-eyebrow">GAME BACKEND API · v1.0.0</div>
        <div className="banner-title">이나영의 게임 서버 API 설계 문서</div>
        <p className="banner-sub">
          실제 게임 백엔드 아키텍처 경험을 기반으로 작성된 샘플 API 명세입니다.<br />
          인증 / 서버 상태 / 유저 / 게임 콘텐츠 / 운영툴 5개 영역, 15개 이상의 엔드포인트를 직접 테스트해볼 수 있습니다.
        </p>
        <div style={{ marginTop: '1rem' }}>
          <Link href="/" className="btn btn-ghost" style={{ fontSize: '0.68rem' }}>
            ← 포트폴리오로
          </Link>
        </div>
      </div>

      {/* Swagger UI 컨테이너 */}
      <div className="swagger-wrap">
        <div id="swagger-ui" />
      </div>

      <div className="api-footer">
        <span style={{ color: 'var(--muted)' }}>© 2025 NAYOUNG LEE · GAME BACKEND DEVELOPER</span>
        <span>STACK: <span>NODE.JS</span> · <span>REDIS</span> · <span>AWS</span></span>
      </div>

      {/* Swagger UI 번들 - 로드 완료 후 초기화 */}
      <Script
        src="https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.11.0/swagger-ui-bundle.js"
        onLoad={initSwagger}
      />
    </>
  );
}
