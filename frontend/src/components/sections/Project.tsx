import Slider from "@/components/Slider";
import NextConfig from "../../../next.config.mjs";

const basePath = NextConfig.basePath;

// 프로젝트 섹션 - Zerowake Gates 개요·일정·직접 만든 것 + 게임 쇼케이스
const overview = [
  { k: "장르", v: "글로벌 RPG · 2025.11.26 정식 오픈" },
  { k: "플랫폼", v: "iOS, Android, Steam, EroLabs" },
  { k: "역할", v: "서버 파트 리드 · 백엔드 아키텍처 설계와 구축" },
  { k: "규모", v: "상시 동접 6만 · 최대 동접 20만 · DAU 50만~160만" },
  { k: "리전", v: "AWS Singapore (글로벌 서비스)" },
  { k: "기술", v: "Node.js, MySQL, Redis, AWS EC2, RDS, ElastiCache, RDS Proxy" },
];

const schedule = [
  { date: "2024.12", text: "서버 개발 시작" },
  { date: "2025.05", text: "서버 리드 진급" },
  { date: "2025.10", text: "CBT (10.16 – 10.29)" },
  { date: "2025.11", text: "글로벌 정식 오픈", hl: true },
  { date: "2026.09", text: "퇴사 (약 10개월 라이브 운영)" },
];

const built = [
  "로그인 서버",
  "대기열 서버",
  "게임 서버",
  "운영툴 서버",
  "멀티 플랫폼 로그인 통합",
  "이벤트 기반 미션·업적 시스템",
  "AI 채팅 중계 서버",
];

export default function Project() {
  return (
    <section id="project" className="bg-alt">
      <div className="section-wrap">
        <div className="sec-header fi">
          <div className="sec-num">// 03</div>
          <div className="sec-title">PROJECT</div>
          <div className="sec-line" />
        </div>

        <div className="proj-head fi">
          <div className="showcase-badge zwg">ZEROWAKE GATES</div>
          <a
            href="https://zerowakegates.com"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
            style={{ fontSize: "0.6rem", padding: "0.6rem 1.1rem" }}
          >
            공식 사이트 ↗
          </a>
        </div>
        <h3 className="sec-lead fi">글로벌 RPG의 서버를 처음부터 설계했습니다</h3>

        <div className="proj-grid">
          <dl className="info-table fi">
            {overview.map((row) => (
              <div key={row.k} className="info-row">
                <dt>{row.k}</dt>
                <dd>{row.v}</dd>
              </div>
            ))}
          </dl>
          <div className="fi">
            <div className="sub-lbl">SCHEDULE · 일정</div>
            <ul className="mini-tl">
              {schedule.map((s) => (
                <li key={s.date} className={s.hl ? "hl" : undefined}>
                  <div className="mini-tl-date">{s.date}</div>
                  <div className="mini-tl-text">{s.text}</div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="fi" style={{ marginBottom: "2.5rem" }}>
          <div className="sub-lbl">BUILT BY ME · 직접 만든 것</div>
          <div className="tags">
            {built.map((b) => (
              <span key={b} className="tag">{b}</span>
            ))}
          </div>
        </div>

        <div className="showcase-block fi">
          <Slider
            images={[
              { src: basePath + "/game1.webp", alt: "Zerowake Gates 메인 아트" },
              { src: basePath + "/game2.webp", alt: "Zerowake Gates 편성 화면" },
              { src: basePath + "/game3.webp", alt: "Zerowake Gates 칩셋 시스템" },
            ]}
          />
        </div>

        <div className="showcase-block fi" style={{ marginTop: "3.5rem" }}>
          <div className="showcase-meta">
            <div className="showcase-badge cc">COVENANT CHILD</div>
            <div className="showcase-sub">
              2023.12 OBT → 2024.07 정식 오픈 · NFT 방치형 RPG · 콘텐츠 서버 개발
            </div>
          </div>
          <Slider
            images={[
              { src: basePath + "/game4.webp", alt: "Covenant Child 타운 빌딩" },
              { src: basePath + "/game5.webp", alt: "Covenant Child 방어 전투" },
              { src: basePath + "/game6.webp", alt: "Covenant Child 모험 맵" },
            ]}
          />
        </div>
      </div>
    </section>
  );
}
