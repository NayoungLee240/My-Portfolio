import ZoomImage from "@/components/ZoomImage";
import NextConfig from "../../../next.config.mjs";

const basePath = NextConfig.basePath;

// 서버 아키텍처 섹션 - 역할별 서버 구조, 컴포넌트 구성, 규모, 설계 포인트
const tiers = [
  { name: "클라이언트", sub: "iOS · AOS · Steam · EroLabs", client: true },
  { name: "대기열 서버", sub: "접속 인원 제한", stores: [{ name: "Delay Redis", sub: "대기 순번, 동접 수" }] },
  { name: "로그인 서버", sub: "인증 · 계정 생성", stores: [{ name: "Redis", sub: "세션, 유저 데이터 캐시" }] },
  {
    name: "게임 서버",
    sub: "게임 로직 · 콘텐츠 API",
    stores: [
      { name: "RDS Proxy", sub: "커넥션 풀" },
      { name: "MySQL (RDS)", sub: "운영툴 서버도 함께 연결", db: true },
    ],
  },
];

const notes = [
  "AWS EC2와 Load Balancer 위에서 PM2 Cluster로 운영",
  "대기열은 로그인 서버 앞에 둡니다. 첫 로그인 때 계정이 생성되는 구조라 계정 생성 전에 인원을 제한해야 했습니다.",
  "Redis에는 세션과 호출이 많은 유저 데이터를 함께 저장합니다.",
];

const components = [
  {
    name: "Delay Server",
    badges: [{ t: "Node.js", c: "cb-node" }, { t: "EC2 ×1", c: "cb-aws" }],
    role: "접속 대기열 관리\n동접 초과 시 대기 순번 발급",
    tech: "AWS ALB\nDelay Redis (ElastiCache)",
    reason:
      "로그인 서버 앞에서 현재 동접을 확인하고, 한도를 넘으면 대기 순번을 발급해 자리가 나는 대로 들여보냅니다. 첫 로그인 때 계정이 생성되므로 계정 생성까지 트래픽이 몰리지 않게 막습니다.",
  },
  {
    name: "Login Server",
    badges: [{ t: "Node.js", c: "cb-node" }, { t: "EC2 ×2 Multi-AZ", c: "cb-aws" }],
    role: "인증 · 토큰 발급\n플랫폼 로그인 통합",
    tech: "Refresh Token (요청마다 교체)\nFirebase, Steam, EroLabs",
    reason:
      "인증 레이어를 게임 로직과 분리해 보안 코드 변경이 게임 서버에 영향을 주지 않습니다. Multi-AZ 2인스턴스로 Login 서버 장애 시에도 인증이 중단되지 않습니다.",
  },
  {
    name: "Game Server",
    badges: [{ t: "Node.js", c: "cb-node" }, { t: "EC2 ×4 Multi-AZ", c: "cb-aws" }],
    role: "게임 핵심 로직\n콘텐츠 API 전반",
    tech: "AWS ALB · PM2 Cluster\nRDS Proxy, Redis",
    reason:
      "4인스턴스 Multi-AZ 구성으로 AZ 장애 시에도 서비스가 유지됩니다. Token/Ticket 검증은 Login 서버에 위임해 Game 서버는 게임 로직에만 집중합니다.",
  },
  {
    name: "Game Redis",
    badges: [{ t: "ElastiCache", c: "cb-redis" }],
    role: "세션 관리\n유저 데이터 캐시",
    tech: "Redis Cluster\nElastiCache",
    reason:
      "계정별 최신 토큰 하나만 저장해 세션 정합성을 유지하고, 호출이 많은 유저 데이터를 함께 두어 DB 호출을 줄입니다. 임시 데이터는 TTL로 만료합니다.",
  },
  {
    name: "RDS Proxy (User)",
    badges: [{ t: "MySQL", c: "cb-mysql" }, { t: "RDS Proxy", c: "cb-aws" }],
    role: "유저 데이터 읽기/쓰기\nDB 커넥션 풀링",
    tech: "AWS RDS Proxy\nRDS MySQL",
    reason:
      "PM2 Cluster 인스턴스마다 DB에 직접 연결하면 커넥션이 인스턴스 수만큼 늘어납니다. RDS Proxy가 커넥션 풀을 한곳에서 관리해 인스턴스를 늘려도 DB 연결 수가 안정적으로 유지됩니다.",
  },
  {
    name: "RDS Proxy (Log)",
    badges: [{ t: "MySQL", c: "cb-mysql" }, { t: "RDS Proxy", c: "cb-aws" }],
    role: "게임 로그 Write 전용\n유저 DB와 분리",
    tech: "AWS RDS Proxy\nRDS MySQL (Write Only)",
    reason:
      "로그 DB를 유저 DB와 분리해 대량 로그 쓰기가 유저 데이터 조회에 영향을 주지 않습니다. Write Only로 설정해 로그 DB에 읽기 쿼리가 유입되는 것을 구조적으로 차단합니다.",
  },
];

const scale = [
  { num: "200k+", color: "var(--accent)", label: "PEAK CCU", sub: "최대 동시 접속자" },
  { num: "1.6M+", color: "var(--accent2)", label: "PEAK DAU", sub: "최대 일일 활성 유저" },
  { num: "7", color: "var(--accent3)", label: "EC2 INSTANCES", sub: "Delay 1 · Login 2 · Game 4" },
  { num: "2", color: "#f59e0b", label: "RDS PROXIES", sub: "User + Log 분리" },
  { num: "3", color: "#ec4899", label: "ALB", sub: "역할별 독립 LB" },
  { num: "SGP", color: "#06b6d4", label: "AWS REGION", sub: "Singapore (Global)" },
];

const cards = [
  {
    icon: "🏗",
    title: "ROLE SEPARATION · MULTI-AZ",
    desc: "대기열 / 로그인 / 게임 / 운영툴 서버를 역할별로 분리하고 각각 독립적인 ALB를 배치했습니다. Login·Game 서버는 Multi-AZ로 배포해 단일 AZ 장애에도 서비스가 이어집니다.",
    hl: "동접 급증 시 필요한 레이어만 스케일 아웃",
  },
  {
    icon: "📝",
    title: "LOG DB WRITE-ONLY",
    desc: "전투·구매·접속 등 대량 로그 쓰기가 유저 조회 쿼리와 경합하지 않도록 Log DB를 User DB와 분리하고 Write Only로 설정했습니다.",
    hl: "게임 로직과 로그 I/O 격리",
  },
  {
    icon: "🌍",
    title: "GLOBAL SERVICE",
    desc: "모든 시간 기준을 UTC로 통일했습니다. 플랫폼별(Firebase iOS/AOS, Steam, EroLabs) 상품·초기 아이템·접근 콘텐츠를 분기 처리하는 글로벌 서비스 운영 정책을 수립했습니다.",
    hl: "UTC 기준 · 멀티 플랫폼 분기",
  },
  {
    icon: "🎯",
    title: "MISSION SYSTEM",
    desc: "Node.js EventEmitter 기반 이벤트 주도 미션·업적 시스템입니다. 사용자 API 로직과 분리해 서버에서 모든 조건을 검증하고, 클라이언트 신뢰를 최소화했습니다.",
    hl: "EventEmitter · 기획 테이블 추가 시 자동 반영",
  },
  {
    icon: "🛡️",
    title: "MIDDLEWARE",
    desc: "API 응답 압축·포맷 통일, 점검 모드, IP 차단·UID 화이트리스트 등 미들웨어 계층을 직접 설계했습니다.",
    hl: "보안성 · 운영성 · 일관성 확보",
  },
  {
    icon: "🤖",
    title: "AI CHAT RELAY",
    desc: "클라이언트와 AI 서버 사이에서 요청을 중계하는 AI 채팅 중계 서버를 구현했습니다.",
    hl: "클라이언트 ↔ AI 서버 중계",
  },
];

export default function Architecture() {
  return (
    <section id="architecture">
      <div className="section-wrap">
        <div className="sec-header fi">
          <div className="sec-num">// 04</div>
          <div className="sec-title">SERVER ARCHITECTURE</div>
          <div className="sec-line" />
        </div>
        <h3 className="sec-lead fi">역할별로 나눠 따로 확장되게 만들었습니다</h3>

        {/* 서버 구조 흐름도 */}
        <div className="tier-flow fi">
          {tiers.map((t, i) => (
            <div key={t.name} className="tier-wrap">
              {i > 0 && <div className="tier-arrow">→</div>}
              <div className="tier">
                <div className={t.client ? "tier-node client" : "tier-node"}>
                  <div className="tier-name">{t.name}</div>
                  <div className="tier-sub">{t.sub}</div>
                </div>
                {t.stores?.map((s) => (
                  <div key={s.name} className="tier-store-wrap">
                    <div className="tier-link" />
                    <div className={s.db ? "tier-store db" : "tier-store"}>
                      <div className="tier-name">{s.name}</div>
                      <div className="tier-sub">{s.sub}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <ul className="exp-list fi" style={{ margin: "1.8rem 0 3rem" }}>
          {notes.map((n) => (
            <li key={n}>{n}</li>
          ))}
        </ul>

        {/* 인프라 다이어그램 */}
        <div className="arch-diagram-wrap fi">
          <div className="arch-diagram-header">
            <div className="arch-dot ad-r" />
            <div className="arch-dot ad-y" />
            <div className="arch-dot ad-g" />
            <span className="arch-diagram-title">
              server_architecture.diagram — Game Server Architecture (Singapore Region)
            </span>
          </div>
          <ZoomImage
            src={basePath + "/server_arch.png"}
            alt="Game Server Architecture Diagram"
            width={1600}
            height={900}
            className="arch-diagram-img"
          />
          <div className="arch-diagram-caption">
            이미지를 클릭하면 확대해서 볼 수 있습니다 &nbsp;·&nbsp; CCU 50k~200k+ &nbsp;·&nbsp; DAU 500k~1.6M+
          </div>
        </div>

        {/* 컴포넌트 구성 */}
        <div className="sub-lbl fi" style={{ marginTop: "3.5rem" }}>COMPONENT BREAKDOWN · 컴포넌트 구성</div>
        <div className="table-scroll fi">
          <table className="comp-table">
            <thead>
              <tr>
                <th>COMPONENT</th>
                <th>ROLE</th>
                <th>TECH</th>
                <th>DESIGN REASON</th>
              </tr>
            </thead>
            <tbody>
              {components.map((c) => (
                <tr key={c.name}>
                  <td>
                    <div className="comp-name">{c.name}</div>
                    {c.badges.map((b) => (
                      <span key={b.t} className={`comp-badge ${b.c}`}>{b.t}</span>
                    ))}
                  </td>
                  <td style={{ whiteSpace: "pre-line" }}>{c.role}</td>
                  <td style={{ whiteSpace: "pre-line" }}>{c.tech}</td>
                  <td>{c.reason}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* 서비스 규모 */}
        <div className="scale-banner fi" style={{ marginTop: "3.5rem" }}>
          <div className="scale-grid">
            {scale.map((s) => (
              <div key={s.label}>
                <div className="scale-num" style={{ color: s.color }}>{s.num}</div>
                <div className="scale-label">
                  {s.label}
                  <br />
                  {s.sub}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 설계 포인트 */}
        <div className="sub-lbl fi" style={{ marginTop: "3.5rem" }}>DESIGN POINTS · 설계 포인트</div>
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
      </div>
    </section>
  );
}
