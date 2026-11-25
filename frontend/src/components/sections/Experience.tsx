// 경력 타임라인 섹션 - 회사별 경력 및 프로젝트 기여 내역
type Proj = {
  name: string;
  site?: string;
  items: string[];
  stack: { name: string; cls?: string }[];
};

type Career = {
  period: string;
  company: string;
  note?: string;
  role: string;
  projs: Proj[];
};

const careers: Career[] = [
  {
    period: "2024.10 → 2026.09",
    company: "스토리타코 (StoreyTaco)",
    role: "SERVER PART LEAD · 1년 11개월",
    projs: [
      {
        name: "🎮 Zerowake Gates — 글로벌 RPG (2024.12 ~ 2026.09)",
        site: "https://zerowakegates.com",
        items: [
          "2025.05 서버 리드 진급 — 서버 파트(2인) 일정 산출·작업 배정, 백엔드 아키텍처 설계와 구축 주도",
          "대기열 / 로그인 / 게임 / 운영툴 서버를 역할별로 분리해 따로 확장되는 구조 설계",
          "Refresh Token 기반 인증 — 요청마다 토큰을 교체하고 Redis에 계정별 최신 토큰 하나만 유효하게 저장해 탈취·중복 로그인 차단",
          "접속 폭주로 서버가 다운되자 대기열 서버 + Delay Redis 긴급 투입 — 이후 다운 0회, 수용 규모 30만 명",
          "PM2 Cluster 증설로 DB 커넥션이 폭증하자 RDS Proxy로 커넥션 풀을 한곳에서 관리 — 쿼리 오류 해소",
          "업적·에스퍼 등 핵심 테이블 키 구조 변경을 로그인 시점 지연 변환 + 정기점검 분할 변환으로 서비스 중단 없이 완료",
          "Slow Query Log·EXPLAIN 분석으로 인덱스 누락 쿼리 개선, 재화 확인·지급·로그 기록을 하나의 DB 프로시저로 묶어 정합성 확보",
          "GoogleChat 봇(애플리케이션) + AWS Lambda(인프라) 2단 알림 체계 구축",
          "InfluxDB 지표 서버를 MySQL로 통합 — 실사용 지표만 선별해 스키마 설계·데이터 이전",
          "Firebase(iOS/AOS), Steam, EroLabs 멀티 플랫폼 로그인 통합",
          "Node.js EventEmitter 기반 이벤트 주도 미션·업적 시스템, AI 채팅 중계 서버 구현",
          "2025.10 CBT → 2025.11 글로벌 정식 오픈 → 약 10개월 라이브 운영",
        ],
        stack: [
          { name: "Node.js" }, { name: "MySQL" }, { name: "Redis", cls: "p" },
          { name: "AWS EC2" }, { name: "RDS" }, { name: "ElastiCache" }, { name: "RDS Proxy" }, { name: "PM2 Cluster" },
        ],
      },
      {
        name: "🔧 통합 운영툴 개발 (2024.10 ~ 2024.12)",
        items: [
          "같은 데이터 구조의 게임 10개 이상을 하나의 운영툴로 연동",
          "새 게임은 게임 정보만 등록하면 코드 수정 없이 바로 동작하도록 설계",
          "인게임 우편 발송, 유저 아이템·정보 조회·수정, 서버 로그 조회 통합",
          "역할별 권한 관리(RBAC)로 접근 제어 및 보안성 강화",
        ],
        stack: [{ name: "Node.js" }, { name: "MySQL" }, { name: "Firebase Realtime DB", cls: "gr" }],
      },
    ],
  },
  {
    period: "2023.06 → 2024.10",
    company: "위플레이랩스 → 커버넌트랩스",
    note: "동일 그룹 계열사 · 2023.08 담당 게임 변경으로 부서를 옮기며 서류상 소속이 계열사로 변경",
    role: "SERVER DEVELOPER · 1년 4개월",
    projs: [
      {
        name: "🎮 커버넌트차일드 — NFT 기반 방치형 RPG",
        items: [
          "콘텐츠 서버 개발 — 상점, 길드, 시즌 패스, 요일 던전, 탐험",
          "OBT(2023.12)부터 정식 오픈(2024.07)까지 개발·운영",
          "Redis 캐싱 전략으로 성능 최적화 및 라이브 운영 안정화",
          "Slack 알림 봇 — AWS 상태 이상 및 스케줄러 오류 실시간 대응",
          "운영툴 리팩토링 — 유저/길드 정보 조회·수정, 서버 로그 확인, 중복 코드 제거 (Bootstrap + Node.js + EJS)",
        ],
        stack: [{ name: "Node.js" }, { name: "MongoDB" }, { name: "Redis", cls: "p" }, { name: "AWS" }],
      },
      {
        name: "🎮 버블퐁프렌즈 — 서버 프레임워크 전환",
        items: [
          "기존 Java Spring 기반 게임 서버를 Node.js로 전환",
          "기존 기능 유지 및 신규 기능 추가 개발로 생산성·유지보수성 개선",
        ],
        stack: [{ name: "Node.js" }, { name: "MySQL" }, { name: "Java Spring", cls: "gr" }, { name: "AWS" }],
      },
    ],
  },
  {
    period: "2021.06 → 2023.06",
    company: "코드크레인 유한회사",
    role: "BACKEND MODULE LEAD · 2년",
    projs: [
      {
        name: "🌐 B2B 웹 서비스 백엔드 개발 및 모듈장",
        items: [
          "2022.03 선임·모듈장 진급 — 백엔드 인원 관리와 프로젝트 리딩",
          "B2B 웹 서비스 백엔드 개발과 유지보수 (ASP.NET, Node.js)",
          "Elasticsearch로 국내 공장 검색 서비스 구축",
          "MySQL, MSSQL, PostgreSQL 설계와 연동",
          "주요 서비스: DV몰, 덴탈잡, 당신의 제작소, kplus, 하니웰 스마트홈케어",
        ],
        stack: [
          { name: "Node.js" }, { name: "ASP.NET C#", cls: "gr" }, { name: "MySQL" }, { name: "MSSQL", cls: "gr" },
          { name: "PostgreSQL", cls: "gr" }, { name: "Elasticsearch", cls: "g" }, { name: "AWS" }, { name: "Linux", cls: "gr" },
        ],
      },
    ],
  },
];

export default function Experience() {
  return (
    <section id="experience">
      <div className="section-wrap">
        <div className="sec-header fi">
          <div className="sec-num">// 02</div>
          <div className="sec-title">EXPERIENCE</div>
          <div className="sec-line" />
        </div>
        <div className="timeline">
          {careers.map((c) => (
            <div key={c.company} className="tl-item fi">
              <div className="tl-dot" />
              <div className="exp-card">
                <div className="exp-meta">
                  <div className="exp-period">{c.period}</div>
                </div>
                <div className="exp-co">{c.company}</div>
                {c.note && <div className="exp-note">{c.note}</div>}
                <div className="exp-role">{c.role}</div>
                <div className="exp-projs">
                  {c.projs.map((p) => (
                    <div key={p.name} className="exp-proj">
                      <div className="exp-pname">
                        {p.name}
                        {p.site && (
                          <a href={p.site} target="_blank" rel="noopener noreferrer" className="exp-site-btn">
                            공식 사이트 ↗
                          </a>
                        )}
                      </div>
                      <ul className="exp-list">
                        {p.items.map((it) => (
                          <li key={it}>{it}</li>
                        ))}
                      </ul>
                      <div className="exp-stack">
                        {p.stack.map((t) => (
                          <span key={t.name} className={t.cls ? `tag ${t.cls}` : "tag"}>{t.name}</span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
