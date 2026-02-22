"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import NextConfig from "../../../next.config.mjs";

const basePath = NextConfig.basePath;

// 아키텍처 상세 페이지 - Zerowake Gates 게임 서버 설계 문서
export default function ArchitecturePage() {
  const [lbOpen, setLbOpen] = useState(false);

  useEffect(() => {
    // 스크롤 페이드인
    const obs = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("v");
        }),
      { threshold: 0.07 },
    );
    document.querySelectorAll(".fi").forEach((el) => obs.observe(el));

    // ESC 키로 라이트박스 닫기
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLbOpen(false);
    };
    document.addEventListener("keydown", handleKey);

    return () => {
      obs.disconnect();
      document.removeEventListener("keydown", handleKey);
    };
  }, []);

  return (
    <>
      {/* ── 히어로 배너 ── */}
      <div className="arch-page-hero">
        <div className="arch-page-eyebrow">
          ZEROWAKE GATES · GAME SERVER DESIGN
        </div>
        <div className="arch-page-title">
          GAME SERVER
          <br />
          <span>ARCHITECTURE</span>
        </div>
        <p className="arch-page-desc">
          글로벌 게임 서비스를 위해 <strong>Singapore 리전</strong>에
          설계·구축한 게임 서버 아키텍처입니다.
          <br />
          역할별 서버 분리, Multi-AZ 고가용성, Redis 세션 제어, RDS Proxy 연결
          풀링까지
          <br />
          스케일과 안정성을 동시에 고려한 설계 결정들을 직접 주도했습니다.
        </p>
        <div className="arch-kpis">
          <div className="kpi">
            <div className="kpi-num">
              50k~200k<span style={{ fontSize: "1.4rem" }}>+</span>
            </div>
            <div className="kpi-label">CCU (CONCURRENT USERS)</div>
          </div>
          <div className="kpi">
            <div className="kpi-num">
              500k~1.6M<span style={{ fontSize: "1.4rem" }}>+</span>
            </div>
            <div className="kpi-label">DAU (DAILY ACTIVE USERS)</div>
          </div>
          <div className="kpi">
            <div className="kpi-num">SGP</div>
            <div className="kpi-label">GLOBAL REGION</div>
          </div>
          <div className="kpi">
            <div className="kpi-num">Multi-AZ</div>
            <div className="kpi-label">HIGH AVAILABILITY</div>
          </div>
        </div>
      </div>

      {/* ── 01 다이어그램 ── */}
      <section>
        <div className="section-wrap">
          <div className="sec-num">// 01</div>
          <div className="sec-title">ARCHITECTURE DIAGRAM</div>
          <div className="sec-line" />
          <p className="sec-sub">
            이 다이어그램은 Zerowake Gates의 게임 서버 전체 구성을 도식화한
            설계도입니다.
            <br />
            Delay(접속 대기), Login(인증), Game(게임 플레이) 3개 레이어로
            트래픽을 분리하고,
            <br />
            각각 독립적인 ALB와 ElastiCache, RDS Proxy를 배치하여 장애 격리와
            확장성을 확보했습니다.
          </p>
          <div className="arch-diagram-wrap fi">
            <div className="arch-diagram-header">
              <div className="arch-dot ad-r" />
              <div className="arch-dot ad-y" />
              <div className="arch-dot ad-g" />
              <span className="arch-diagram-title">
                server_architecture.diagram — Game Server Architecture
                (Singapore Region)
              </span>
            </div>
            <Image
              src={basePath + "/server_arch.png"}
              alt="Game Server Architecture Diagram"
              width={1600}
              height={900}
              className="arch-diagram-img"
              onClick={() => setLbOpen(true)}
              priority
            />
            <div className="arch-diagram-caption">
              이미지를 클릭하면 확대해서 볼 수 있습니다 &nbsp;·&nbsp; CCU
              50k~200k+ &nbsp;·&nbsp; DAU 500k~1.6M+ &nbsp;·&nbsp; Singapore
              Region
            </div>
          </div>
        </div>
      </section>

      {/* ── 02 컴포넌트 목록 ── */}
      <section className="bg-alt">
        <div className="section-wrap">
          <div className="sec-num">// 02</div>
          <div className="sec-title">COMPONENT BREAKDOWN</div>
          <div className="sec-line" />
          <p className="sec-sub">
            각 컴포넌트의 역할과 기술 선택 이유를 정리했습니다.
          </p>
          <div className="fi" style={{ overflowX: "auto" }}>
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
                <tr>
                  <td>
                    <div className="comp-name">Delay Server</div>
                    <span className="comp-badge cb-node">Node.js</span>
                    <span className="comp-badge cb-aws">EC2 ×1</span>
                  </td>
                  <td>
                    접속 대기열 관리
                    <br />
                    CCU 초과 시 큐잉
                  </td>
                  <td>
                    AWS ALB
                    <br />
                    ElastiCache (Redis)
                  </td>
                  <td>
                    게임 서버 CCU 한계 도달 시 유저를 대기열에 보관하고 순서대로
                    입장시킵니다. Delay Redis에 대기 상태를 저장해 서버
                    재시작에도 대기 정보가 유지됩니다.
                  </td>
                </tr>
                <tr>
                  <td>
                    <div className="comp-name">Login Server</div>
                    <span className="comp-badge cb-node">Node.js</span>
                    <span className="comp-badge cb-aws">EC2 ×2 Multi-AZ</span>
                  </td>
                  <td>
                    인증·토큰 발급
                    <br />
                    플랫폼 로그인 통합
                  </td>
                  <td>
                    JWT (Access/Refresh)
                    <br />
                    Firebase, Steam, EroLabs
                  </td>
                  <td>
                    인증 레이어를 게임 로직과 분리하여 보안 코드 변경이 게임
                    서버에 영향을 주지 않습니다. Multi-AZ 2인스턴스로 Login 서버
                    장애 시에도 인증이 중단되지 않습니다.
                  </td>
                </tr>
                <tr>
                  <td>
                    <div className="comp-name">Game Server</div>
                    <span className="comp-badge cb-node">Node.js</span>
                    <span className="comp-badge cb-aws">EC2 ×4 Multi-AZ</span>
                  </td>
                  <td>
                    게임 핵심 로직
                    <br />
                    콘텐츠 API 전반
                  </td>
                  <td>
                    AWS ALB
                    <br />
                    RDS Proxy, Redis
                  </td>
                  <td>
                    4인스턴스 Multi-AZ 구성으로 AZ 장애 시에도 서비스가
                    유지됩니다. Token/Ticket 검증은 Login 서버에 위임하여 Game
                    서버는 게임 로직에만 집중합니다.
                  </td>
                </tr>
                <tr>
                  <td>
                    <div className="comp-name">Game Redis</div>
                    <span className="comp-badge cb-redis">ElastiCache</span>
                  </td>
                  <td>
                    세션 관리
                    <br />
                    Refresh Token 저장
                    <br />
                    CCU 산정
                  </td>
                  <td>
                    Redis Cluster
                    <br />
                    ElastiCache
                  </td>
                  <td>
                    Refresh Token을 Redis에 단일 저장하여 세션 정합성을
                    유지합니다. 신규 로그인 시 기존 토큰을 즉시 폐기해 중복
                    로그인을 방지합니다. 현재 CCU도 Redis 키 수로 산정합니다.
                  </td>
                </tr>
                <tr>
                  <td>
                    <div className="comp-name">RDS Proxy (User)</div>
                    <span className="comp-badge cb-mysql">MySQL</span>
                    <span className="comp-badge cb-aws">RDS Proxy</span>
                  </td>
                  <td>
                    유저 데이터 읽기/쓰기
                    <br />
                    DB 연결 풀링
                  </td>
                  <td>
                    AWS RDS Proxy
                    <br />
                    RDS MySQL
                  </td>
                  <td>
                    Game 서버 4인스턴스에서 직접 DB에 연결하면 커넥션이
                    폭발적으로 증가합니다. RDS Proxy가 연결 풀을 관리해 DB
                    부하를 크게 줄이고 DB 장애 시 재연결 속도를 높입니다.
                  </td>
                </tr>
                <tr>
                  <td>
                    <div className="comp-name">RDS Proxy (Log)</div>
                    <span className="comp-badge cb-mysql">MySQL</span>
                    <span className="comp-badge cb-aws">RDS Proxy</span>
                  </td>
                  <td>
                    게임 로그 Write 전용
                    <br />
                    유저 DB와 분리
                  </td>
                  <td>
                    AWS RDS Proxy
                    <br />
                    RDS MySQL (Write Only)
                  </td>
                  <td>
                    로그 DB를 유저 DB와 분리하여 대량 로그 쓰기가 유저 데이터
                    조회에 영향을 주지 않습니다. Write Only로 설정해 로그 DB에
                    읽기 쿼리가 유입되는 것을 구조적으로 차단합니다.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── 03 설계 결정 ── */}
      <section>
        <div className="section-wrap">
          <div className="sec-num">// 03</div>
          <div className="sec-title">KEY DESIGN DECISIONS</div>
          <div className="sec-line" />
          <p className="sec-sub">
            단순 기능 구현이 아닌, 문제를 인식하고 설계 결정을 내린 핵심
            포인트들입니다.
          </p>
          <div className="decision-grid">
            {[
              {
                color: "c1",
                num: "01",
                title: "3-TIER SERVER SEPARATION\n역할별 서버 레이어 분리",
                problem:
                  "단일 서버에 모든 로직이 집중되면 CCU 급증 시 인증·게임 로직이 함께 병목됩니다. 인증 코드 수정이 게임 로직 배포에 영향을 줍니다.",
                solution:
                  "Delay / Login / Game 서버를 역할별로 완전 분리하고 각각 독립적인 ALB를 배치했습니다. 레이어별 독립 스케일링이 가능합니다.",
                effect: "CCU 급증 시 Game 서버만 스케일 아웃 가능",
              },
              {
                color: "c2",
                num: "02",
                title:
                  "JWT DUAL TOKEN + REDIS SESSION\n이중 토큰 & 세션 단일화",
                problem:
                  "Access Token만 사용하면 만료 주기를 길게 설정해야 하고, 도용된 토큰을 즉시 무효화할 수 없습니다. 중복 로그인 방지도 불가능합니다.",
                solution:
                  "Access Token(10분, Header)과 Refresh Token(15분, HttpOnly Cookie)을 분리하고, Refresh Token을 Redis에 단일 저장하여 신규 로그인 시 기존 세션을 즉시 폐기합니다.",
                effect: "중복 로그인 방지 + 도용 토큰 즉시 무효화",
              },
              {
                color: "c3",
                num: "03",
                title: "RDS PROXY CONNECTION POOLING\nDB 연결 폭발 방지",
                problem:
                  "Game Server 4인스턴스 × Node.js 프로세스가 직접 RDS에 연결하면 커넥션이 수백 개로 폭발합니다. RDS MySQL의 max_connections 한계에 도달할 위험이 있습니다.",
                solution:
                  "AWS RDS Proxy를 앞단에 두어 커넥션 풀을 중앙 관리합니다. 서버 인스턴스가 늘어도 실제 DB 연결 수는 일정하게 유지되고, Proxy가 DB 재시작 시 재연결을 처리합니다.",
                effect: "DB 커넥션 수 통제 + 장애 복구 속도 개선",
              },
              {
                color: "c4",
                num: "04",
                title:
                  "QUEUE SERVER (DELAY SERVER)\n접속 대기열로 CCU 상한 제어",
                problem:
                  "CCU가 게임 서버의 처리 한계를 초과하면 서버가 다운되거나 응답이 지연됩니다. 갑작스러운 트래픽 피크를 서버 스케일 아웃만으로 즉시 대응하기 어렵습니다.",
                solution:
                  "전용 Delay Server와 Delay Redis를 분리하여 CCU 한계 초과 시 유저를 대기열에 보관합니다. 게임 서버가 여유가 생기는 즉시 순서대로 입장을 처리합니다.",
                effect: "서버 과부하 없이 유저 경험 유지 가능",
              },
              {
                color: "c5",
                num: "05",
                title: "LOG DB WRITE-ONLY SEPARATION\n로그 DB 쓰기 전용 분리",
                problem:
                  "게임 중 발생하는 대량의 로그(전투, 구매, 접속) 쓰기가 유저 데이터 조회 쿼리와 동일한 DB에서 경합하면 게임 플레이에 지연이 발생합니다.",
                solution:
                  "Log DB를 User DB와 완전 분리하고 Write Only로 설정했습니다. 대용량 로그 인서트가 유저 조회 성능에 전혀 영향을 주지 않는 구조를 만들었습니다.",
                effect: "게임 로직과 로그 I/O 완전 격리",
              },
              {
                color: "c6",
                num: "06",
                title: "MULTI-AZ DEPLOYMENT\nAZ 장애 대비 고가용성",
                problem:
                  "글로벌 서비스에서 특정 AWS Availability Zone에 장애가 발생하면 서비스 전체가 중단될 위험이 있습니다. 특히 Login 서버 장애는 전체 인증 불가로 이어집니다.",
                solution:
                  "Login 서버(2인스턴스)와 Game 서버(4인스턴스)를 Multi-AZ로 배포했습니다. 하나의 AZ가 전체 장애를 일으켜도 나머지 AZ의 인스턴스가 서비스를 이어받습니다.",
                effect: "단일 AZ 장애 시 서비스 무중단 유지",
              },
            ].map((d, i) => (
              <div
                key={d.num}
                className={`decision-card ${d.color} fi fi-d${(i % 3) + 1}`}
              >
                <div className="decision-num">DECISION {d.num}</div>
                <div className="decision-title">
                  {d.title.split("\n").map((t, j) => (
                    <span key={j}>
                      {t}
                      <br />
                    </span>
                  ))}
                </div>
                <div className="decision-problem">
                  <div className="dp-label">✕ PROBLEM</div>
                  <div className="dp-text">{d.problem}</div>
                </div>
                <div className="decision-problem">
                  <div className="solution-label">✓ SOLUTION</div>
                  <div className="solution-text">{d.solution}</div>
                </div>
                <div className="decision-effect">{d.effect}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 04 로그인 플로우 ── */}
      <section className="bg-alt">
        <div className="section-wrap">
          <div className="sec-num">// 04</div>
          <div className="sec-title">LOGIN &amp; SESSION FLOW</div>
          <div className="sec-line" />
          <p className="sec-sub">
            유저가 로그인해서 게임 서버에 접속하기까지의 흐름입니다.
            Token/Ticket 검증이 핵심입니다.
          </p>
          <div className="flow-steps">
            {[
              {
                step: "01",
                title: "DELAY CHECK — CCU 초과 시 대기열 진입",
                desc: "유저가 게임 서버 입장을 시도하면 Delay Socket Server가 현재 CCU를 확인합니다. 한계 초과 시 Delay Redis에 대기 정보를 저장하고 대기 순번을 반환합니다.",
                detail: (
                  <>
                    Delay Redis: CCU check → &nbsp;
                    <span className="hl2">QUEUE</span> 또는{" "}
                    <span className="hl3">PASS</span>
                    <br />
                    대기 시: queue_position + estimated_wait_seconds 반환
                  </>
                ),
              },
              {
                step: "02",
                title: "TICKET ISSUE — 입장 Ticket 발급",
                desc: "CCU 여유 확인 후 Login 서버가 단기 유효 입장 Ticket을 발급합니다. 이 Ticket은 Game 서버 입장 시 1회만 사용 가능하며 재사용이 불가합니다.",
                detail: (
                  <>
                    Ticket: <span className="hl2">short-lived</span>,{" "}
                    <span className="hl3">single-use</span> &nbsp;/ &nbsp;Game
                    서버 입장 시 Login 서버에 검증 위임
                  </>
                ),
              },
              {
                step: "03",
                title: "PLATFORM AUTH — 플랫폼 인증 토큰 수신",
                desc: "유저가 Firebase (iOS/AOS), Steam, EroLabs 중 하나로 로그인합니다. 클라이언트는 플랫폼 SDK로부터 받은 platform_token을 Login 서버로 전송합니다.",
                detail: (
                  <>
                    <span className="hl">POST</span> /auth/login &nbsp;
                    {"{ platform: "}
                    <span className="hl2">&quot;firebase&quot;</span>
                    {", platform_token: "}
                    <span className="hl2">&quot;...&quot;</span>
                    {" }"}
                  </>
                ),
              },
              {
                step: "03-1",
                title: "GAME SERVER ENTRY — Ticket 이중 검증 후 입장",
                desc: "Game 서버는 로그인 정보와 입장 Ticket을 검증 합니다. 모두 통과된 경우에만 게임 API 접근을 허용합니다. RDS Proxy를 통해 유저 데이터에 접근합니다.",
                detail: (
                  <>
                    Token/Ticket Verification:{" "}
                    <span className="hl2">Game Server</span> →{" "}
                    <span className="hl">Login Server</span> (위임 검증)
                    <br />
                    DB Access: Game Server →{" "}
                    <span className="hl3">RDS Proxy (User)</span> → RDS MySQL
                  </>
                ),
              },
              {
                step: "04",
                title: "TOKEN ISSUANCE — JWT 발급 & Redis 세션 저장",
                desc: "Login 서버가 플랫폼 토큰을 검증한 뒤 Access Token과 Refresh Token을 생성합니다. Refresh Token은 Redis에 저장하고, 기존 세션이 있으면 즉시 폐기합니다.(중복 로그인 방지)",
                detail: (
                  <>
                    <span className="hl">Redis</span>: SET user:
                    <span className="hl2">
                      &#123;user_id&#125;
                    </span>:refresh{" "}
                    <span className="hl2">&quot;new_token&quot;</span> EX 900
                    <br />
                    <span className="hl">Response</span>: access_token (Header)
                    + refresh_token (
                    <span className="hl3">HttpOnly Cookie</span>)
                  </>
                ),
                last: true,
              },
            ].map((f) => (
              <div key={f.step} className="flow-step fi">
                <div className="flow-left">
                  <div className="flow-circle">{f.step}</div>
                  {!f.last && <div className="flow-line" />}
                </div>
                <div className="flow-content">
                  <div className="flow-title">{f.title}</div>
                  <div className="flow-desc">{f.desc}</div>
                  <div className="flow-detail">{f.detail}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 05 서비스 스케일 ── */}
      <section>
        <div className="section-wrap">
          <div className="sec-num">// 05</div>
          <div className="sec-title">SERVICE SCALE</div>
          <div className="sec-line" />
          <div className="scale-banner fi">
            <div className="scale-grid">
              {[
                {
                  num: "200k+",
                  color: "var(--accent)",
                  label: "PEAK CCU\n최대 동시 접속자",
                },
                {
                  num: "1.6M+",
                  color: "var(--accent2)",
                  label: "PEAK DAU\n최대 일일 활성 유저",
                },
                {
                  num: "7",
                  color: "var(--accent3)",
                  label: "TOTAL EC2 INSTANCES\n게임 서버 인스턴스",
                },
                {
                  num: "2",
                  color: "#f59e0b",
                  label: "RDS PROXIES\nUser + Log 분리",
                },
                {
                  num: "3",
                  color: "#ec4899",
                  label: "ALB COUNT\n역할별 독립 LB",
                },
                {
                  num: "SGP",
                  color: "#06b6d4",
                  label: "AWS REGION\nSingapore (Global)",
                },
              ].map((s) => (
                <div key={s.num} style={{ textAlign: "center" }}>
                  <div className="scale-num" style={{ color: s.color }}>
                    {s.num}
                  </div>
                  <div className="scale-label">
                    {s.label.split("\n").map((l, i) => (
                      <span key={i}>
                        {l}
                        {i === 0 && <br />}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 06 기여 영역 ── */}
      <section className="bg-alt">
        <div className="section-wrap">
          <div className="sec-num">// 06</div>
          <div className="sec-title">MY CONTRIBUTIONS</div>
          <div className="sec-line" />
          <p className="sec-sub">
            이 아키텍처에서 직접 설계하고 구현한 영역들입니다.
          </p>
          <div className="contrib-grid">
            {[
              {
                icon: "🏗️",
                title: "ARCHITECTURE DESIGN",
                desc: "서버 파트 리드로서 Delay/Login/Game 3-tier 분리 구조를 직접 설계했습니다. 트래픽 흐름, AZ 배치, DB 분리 전략까지 아키텍처 전반의 의사결정을 주도했습니다.",
                tags: ["System Design", "AWS", "Multi-AZ"],
                delay: "fi-d1",
              },
              {
                icon: "🔑",
                title: "AUTH SYSTEM IMPL",
                desc: "JWT Access/Refresh Token 이중 설계를 직접 구현했습니다. Redis를 활용한 세션 단일화, 중복 로그인 방지, HttpOnly Cookie를 통한 XSS 방어까지 구현했습니다.",
                tags: ["JWT", "Redis", "Security"],
                delay: "fi-d2",
              },
              {
                icon: "⚡",
                title: "DELAY SERVER & QUEUE",
                desc: "접속 대기열 서버 전체를 설계하고 구현했습니다. Delay Redis 기반 대기 상태 관리, 순번 배분, CCU 여유 감지 후 자동 입장 처리 로직을 개발했습니다.",
                tags: ["Queue System", "Redis", "Node.js"],
                delay: "fi-d3",
              },
              {
                icon: "📊",
                title: "CCU MONITORING",
                desc: "InfluxDB 기반 5분 단위 CCU 수집 시스템을 구축했습니다. Redis의 현재 세션 수를 기반으로 CCU를 산정하고 GoogleChat 알림 봇을 연동하여 이상 감지를 자동화했습니다.",
                tags: ["InfluxDB", "Monitoring", "Alert Bot"],
                delay: "fi-d1",
              },
              {
                icon: "🌍",
                title: "MULTI-PLATFORM LOGIN",
                desc: "Firebase(iOS/AOS), Steam, EroLabs 3개 플랫폼의 인증 통합을 구현했습니다. 플랫폼별 토큰 검증 로직을 추상화하여 신규 플랫폼 추가 시 최소 코드 변경으로 확장 가능합니다.",
                tags: ["Firebase", "Steam", "EroLabs"],
                delay: "fi-d2",
              },
              {
                icon: "🔧",
                title: "ADMIN TOOL (운영툴)",
                desc: "단일앱 통합 운영툴을 설계하고 구현했습니다. 유저 관리, 로그 조회, 우편 발송, 서버 점검 모드 제어 기능을 권한 관리 시스템과 함께 개발했습니다.",
                tags: ["Admin Panel", "RBAC", "Node.js"],
                delay: "fi-d3",
              },
            ].map((c) => (
              <div key={c.title} className={`contrib-card fi ${c.delay}`}>
                <span className="contrib-icon">{c.icon}</span>
                <div className="contrib-title">{c.title}</div>
                <div className="contrib-desc">{c.desc}</div>
                <div className="contrib-tags">
                  {c.tags.map((t) => (
                    <span key={t} className="ctag">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 라이트박스 ── */}
      <div
        className={`arch-lb${lbOpen ? " open" : ""}`}
        onClick={() => setLbOpen(false)}
      >
        <button className="arch-lb-close" onClick={() => setLbOpen(false)}>
          ×
        </button>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/server_arch.png"
          alt="Architecture Diagram"
          onClick={(e) => e.stopPropagation()}
        />
        <div className="arch-lb-hint">ESC 또는 클릭으로 닫기</div>
      </div>

      {/* 포트폴리오로 돌아가기 링크 */}
      <div
        style={{
          background: "var(--bg2)",
          borderTop: "1px solid var(--border)",
          padding: "1.5rem 8vw",
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <Link href="/" className="btn btn-ghost">
          ← 포트폴리오로
        </Link>
      </div>
    </>
  );
}
