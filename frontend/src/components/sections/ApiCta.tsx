// API 문서 안내 섹션 - 주요 엔드포인트 미리보기 + Swagger 링크
const endpoints = [
  { method: 'POST', path: '/auth/login', desc: '플랫폼 로그인' },
  { method: 'POST', path: '/auth/refresh', desc: '토큰 갱신' },
  { method: 'GET', path: '/server/status', desc: '서버 상태 / CCU' },
  { method: 'GET', path: '/game/shop/items', desc: '상점 아이템' },
  { method: 'POST', path: '/game/shop/purchase', desc: '아이템 구매' },
  { method: 'GET', path: '/game/missions', desc: '미션 목록' },
  { method: 'POST', path: '/admin/mail/send', desc: '운영자 우편' },
  { method: 'GET', path: '/admin/metrics/ccu', desc: 'CCU 추이' },
];

export default function ApiCta() {
  return (
    <section id="api-cta" className="bg-alt">
      <div className="section-wrap">
        <div className="sec-header fi">
          <div className="sec-num">// 07</div>
          <div className="sec-title">API DOCUMENTATION</div>
          <div className="sec-line" />
        </div>
        <div className="api-inner fi">
          <div className="api-text">
            <div className="api-title">SWAGGER UI<br />API 테스트</div>
            <p className="api-desc">
              게임 백엔드 아키텍처 설계 경험 기반의 API 문서입니다.<br />
              Auth / Session / User / Game Content / Admin 5개 영역,<br />
              15개 이상의 엔드포인트를 Swagger UI에서 직접 테스트할 수 있습니다.
            </p>
            <br /><br />
            <a href="/api-docs" target="_blank" rel="noopener noreferrer" className="btn btn-primary">
              API 문서 새 탭에서 열기 ↗
            </a>
          </div>
          <div className="ep-list">
            {endpoints.map((ep) => (
              <div key={ep.path} className="ep-item">
                <span className={`method ${ep.method === 'GET' ? 'mget' : 'mpost'}`}>{ep.method}</span>
                <span className="ep-path">{ep.path}</span>
                <span className="ep-desc">{ep.desc}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
