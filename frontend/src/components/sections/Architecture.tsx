import Link from 'next/link';

// 서버 아키텍처 설계 경험 소개 섹션
export default function Architecture() {
  const cards = [
    {
      icon: '🔐',
      title: 'AUTH SYSTEM',
      desc: 'API 호출마다 JWT Access Token을 새로 발급하는 구조로 설계했습니다. 토큰이 매 요청마다 1회성으로 교체되므로 탈취된 토큰은 다음 요청에서 자동으로 무효화됩니다.',
      hl: '요청 단위 토큰 재발급 · Refresh Token 미사용',
    },
    {
      icon: '⚡',
      title: 'SESSION CONTROL',
      desc: 'Redis에 로그인 세션을 저장해 인증 상태를 관리합니다. 신규 로그인 시 기존 세션을 즉시 폐기하여 동시 접속 환경에서도 중복 로그인 없이 안정적인 세션 관리를 구현했습니다.',
      hl: 'ElastiCache Redis · 세션 단일 진실 공급원',
    },
    {
      icon: '🏗',
      title: 'ROLE SEPARATION',
      desc: '로그인 / 대기 / 게임 / 운영툴 서버를 역할별로 분리하여 확장성과 가용성을 높였습니다. 트래픽 급증 시 각 레이어를 독립적으로 스케일링할 수 있습니다.',
      hl: 'EC2 + Load Balancer · 수평 확장 구조',
    },
    {
      icon: '🔄',
      title: 'LIVE MIGRATION',
      desc: '대규모 트래픽 환경에서 테이블 락 없이 스키마를 변경하기 위해, 정기점검 시 애플리케이션 코드만 우선 배포하고 실제 레코드 마이그레이션은 유저 로그인 시점에 지연 처리하는 방식을 적용. 전체 배치 마이그레이션 대비 DB 부하를 트래픽에 분산시켜 서비스 영향 없이 완료.',
      hl: '정기점검 배포 + 로그인 시점 지연 마이그레이션 · 무중단 스키마 변경',
    },
    {
      icon: '🌍',
      title: 'GLOBAL SERVICE',
      desc: '모든 시간 기준 UTC 통일. 플랫폼별(Firebase iOS/AOS, Steam) 상품·초기 아이템·접근 콘텐츠를 분기 처리하는 글로벌 서비스 운영 정책을 수립했습니다.',
      hl: 'Firebase · Steam · EroLabs 멀티 플랫폼',
    },
    {
      icon: '🎯',
      title: 'MISSION SYSTEM',
      desc: 'Node.js EventEmitter 기반 이벤트 주도 미션·업적 시스템. 사용자 API 로직과 분리하여 서버에서 모든 조건을 검증, 클라이언트 신뢰를 최소화한 설계입니다.',
      hl: 'EventEmitter · 기획 테이블 추가 시 자동 반영',
    },
  ];

  return (
    <section id="architecture">
      <div className="section-wrap">
        <div className="sec-header fi">
          <div className="sec-num">// 04</div>
          <div className="sec-title">SERVER ARCHITECTURE</div>
          <div className="sec-line" />
        </div>
        <div className="arch-grid">
          {cards.map((card) => (
            <div key={card.title} className="arch-card fi">
              <span className="arch-icon">{card.icon}</span>
              <div className="arch-title">{card.title}</div>
              <p className="arch-desc">{card.desc}</p>
              <div className="arch-hl">{card.hl}</div>
            </div>
          ))}
        </div>
        {/* 상세 아키텍처 페이지 링크 */}
        <div style={{ marginTop: '2.5rem', display: 'flex', justifyContent: 'center' }}>
          <Link href="/architecture" className="btn btn-ghost">
            전체 아키텍처 설계 보기 →
          </Link>
        </div>
      </div>
    </section>
  );
}
