// 프로필 요약 섹션 - 주요 역량 4개 카드
const cards = [
  {
    icon: '🧑‍💻',
    title: 'BACKEND LEAD',
    desc: 'Node.js 기반 게임 백엔드 개발 4년 9개월. 서버 파트 리드로서 아키텍처 설계부터 글로벌 라이브 운영까지 전담.',
    hl: "글로벌 RPG 'Zerowake Gates' 백엔드 총괄",
  },
  {
    icon: '⚙️',
    title: 'SERVER DESIGN',
    desc: '로그인 / 대기 / 게임 / 운영툴 서버 역할 분리 설계. JWT Access/Refresh Token 이중 인증 설계·구현. PM2 Cluster + RDS Proxy로 안정성 확보.',
    hl: '3-tier 아키텍처 · 수평 확장 구조',
  },
  {
    icon: '🌍',
    title: 'SCALE & OPS',
    desc: '상시 6만 / 최대 20만 동접, DAU 50만~160만 규모 서비스 운영. InfluxDB 기반 5분 단위 CCU 수집. Firebase, Steam, EroLabs 멀티 플랫폼 통합.',
    hl: 'Singapore Region · 글로벌 서비스',
  },
  {
    icon: '🛡️',
    title: 'MIDDLEWARE',
    desc: 'Redis 기반 세션 제어 및 중복 로그인 방지. API 응답 압축·포맷 통일, 점검 모드, IP 차단·UID 화이트리스트 등 MW단 직접 설계.',
    hl: '보안성 · 운영성 · 일관성 확보',
  },
];

export default function Profile() {
  return (
    <section id="profile">
      <div className="section-wrap">
        <div className="sec-header fi">
          <div className="sec-num">// 00</div>
          <div className="sec-title">PROFILE &amp; SUMMARY</div>
          <div className="sec-line" />
        </div>
        <div
          className="arch-grid"
          style={{ gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))' }}
        >
          {cards.map((card) => (
            <div key={card.title} className="arch-card fi">
              <span className="arch-icon">{card.icon}</span>
              <div className="arch-title">{card.title}</div>
              <p className="arch-desc">{card.desc}</p>
              <div className="arch-hl">{card.hl}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
