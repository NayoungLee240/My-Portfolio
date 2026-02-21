import Link from 'next/link';

// 서버 아키텍처 설계 경험 소개 섹션
export default function Architecture() {
  const cards = [
    {
      icon: '🔐',
      title: 'AUTH SYSTEM',
      desc: 'JWT 기반 Access/Refresh Token 분리 설계. Access Token은 API Header, Refresh Token은 HTTP Cookie에 저장하는 이중 검증 구조로 보안성을 강화했습니다.',
      hl: 'Access: 10min / Refresh: 15min · 중복 로그인 방지',
    },
    {
      icon: '⚡',
      title: 'SESSION CONTROL',
      desc: 'Redis에 Refresh Token 단일 저장 구조로 세션 정합성 유지. 신규 로그인 시 기존 토큰을 폐기하여 동시 접속 환경에서도 안정적인 세션 관리를 구현했습니다.',
      hl: 'ElastiCache Redis · 세션 단일 진실 공급원',
    },
    {
      icon: '🏗',
      title: 'ROLE SEPARATION',
      desc: '로그인 / 대기 / 게임 / 운영툴 서버를 역할별로 분리하여 확장성과 가용성을 높였습니다. 트래픽 급증 시 각 레이어를 독립적으로 스케일링할 수 있습니다.',
      hl: 'EC2 + Load Balancer · 수평 확장 구조',
    },
    {
      icon: '📊',
      title: 'LIVE MONITORING',
      desc: 'InfluxDB 기반 지표 수집으로 동접자 수를 5분 단위로 저장하고 추이를 분석합니다. AWS Load Balancer 지표와 비교하여 트래픽 패턴을 정량적으로 모니터링합니다.',
      hl: 'InfluxDB · AWS CloudWatch · 알림 봇',
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
