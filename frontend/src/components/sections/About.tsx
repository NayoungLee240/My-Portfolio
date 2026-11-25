// 소개 섹션 - 한 줄 소개, 기본 정보, 강점 4가지
const info = [
  { k: "경력", v: "2021.06 – 2026.09 · 5년 3개월" },
  { k: "주력", v: "Node.js, MySQL, Redis, AWS" },
  { k: "학력", v: "국민대학교 대학원 석사" },
  { k: "자격", v: "SQLD, PCSQL" },
];

const strengths = [
  {
    icon: "🌐",
    title: "HIGH TRAFFIC · 대규모 트래픽 설계",
    desc: "역할별 서버 분리, 대기열, 커넥션 풀로 최대 20만 동접에 대응했습니다.",
    hl: "최대 동접 20만 · 상시 6만",
  },
  {
    icon: "🔄",
    title: "ZERO DOWNTIME · 무중단 라이브 운영",
    desc: "핵심 테이블 키 변경을 서비스 중단 없이 마쳤습니다.",
    hl: "지연 + 분할 변환 · 서비스 중단 0",
  },
  {
    icon: "🔧",
    title: "OPS EFFICIENCY · 운영 효율화",
    desc: "10개 이상 게임을 묶은 통합 운영툴과 2단 알림 체계를 만들었습니다.",
    hl: "통합 운영툴 10+ 게임 · 2단 알림",
  },
  {
    icon: "🧭",
    title: "PART LEAD · 파트 리드",
    desc: "서버 파트의 일정을 산출하고 작업을 배정해 정식 오픈까지 이끌었습니다.",
    hl: "2인 서버 파트 · 글로벌 정식 오픈",
  },
];

export default function About() {
  return (
    <section id="about" className="bg-alt">
      <div className="section-wrap">
        <div className="sec-header fi">
          <div className="sec-num">// 01</div>
          <div className="sec-title">ABOUT</div>
          <div className="sec-line" />
        </div>
        <div className="about-grid">
          <div className="fi">
            <h3 className="sec-lead">설계부터 라이브 운영까지 맡아 온 서버 개발자</h3>
            <p className="about-text">
              라이브 게임 서버를 설계부터 운영까지 맡아 왔고, 2인 서버 파트를 이끌었습니다.
            </p>
          </div>
          <dl className="info-table fi">
            {info.map((row) => (
              <div key={row.k} className="info-row">
                <dt>{row.k}</dt>
                <dd>{row.v}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="sub-lbl fi">STRENGTHS · 강점</div>
        <div className="arch-grid">
          {strengths.map((s) => (
            <div key={s.title} className="arch-card fi">
              <span className="arch-icon">{s.icon}</span>
              <div className="arch-title">{s.title}</div>
              <p className="arch-desc">{s.desc}</p>
              <div className="arch-hl">{s.hl}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
