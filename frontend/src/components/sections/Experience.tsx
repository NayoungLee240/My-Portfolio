// 경력 타임라인 섹션 - 회사별 경력 및 프로젝트 기여 내역
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

          {/* 스토리타코 */}
          <div className="tl-item fi">
            <div className="tl-dot cur" />
            <div className="exp-card">
              <div className="exp-meta">
                <div className="exp-period">2024.10 → PRESENT</div>
                <div className="exp-badge">● CURRENT</div>
              </div>
              <div className="exp-co">스토리타코 (StoreyTaco)</div>
              <div className="exp-role">SERVER LEAD · 1년 5개월+</div>
              <div className="exp-projs">
                <div className="exp-proj">
                  <div className="exp-pname">
                    🎮 Zerowake Gates — 글로벌 RPG (2024.12 ~)
                    <a href="https://zerowakegates.com/ko/" target="_blank" rel="noopener noreferrer" className="exp-site-btn">공식 사이트 ↗</a>
                  </div>
                  <ul className="exp-list">
                    <li>서버 파트 리드로서 백엔드 아키텍처 전체 설계 및 구축 주도 (2025.05 2실 서버 리드 진급)</li>
                    <li>로그인 / 대기 / 게임 / 운영툴 서버 역할 분리 설계 — 확장성 및 가용성 확보</li>
                    <li>JWT 기반 인증 구조 설계 — Access/Refresh Token 분리, 이중 검증, 중복 로그인 방지</li>
                    <li>Redis 기반 세션 및 접속 제어로 상시 6만 / 최대 20만 동접 안정 운영</li>
                    <li>InfluxDB 기반 지표 수집 시스템으로 5분 단위 CCU 모니터링 고도화</li>
                    <li>GoogleChat 알림 봇 — 크리티컬 오류, 유효하지 않은 접근, 스케줄러 실시간 대응</li>
                    <li>Firebase(iOS/AOS), Steam, EroLabs 멀티 플랫폼 로그인 통합</li>
                    <li>Node.js EventEmitter 기반 이벤트 주도 미션·업적 시스템 구현</li>
                    <li>AI 채팅 연동 중간 서버 역할 구현 (클라이언트 ↔ AI 서버 중계)</li>
                    <li>2025.10 CBT → 2025.11 글로벌 정식 오픈</li>
                  </ul>
                  <div className="exp-stack">
                    <span className="tag">Node.js</span><span className="tag">MySQL</span>
                    <span className="tag p">Redis</span><span className="tag g">InfluxDB</span>
                    <span className="tag">AWS EC2</span><span className="tag">RDS</span><span className="tag">ElastiCache</span>
                  </div>
                </div>
                <div className="exp-proj">
                  <div className="exp-pname">🔧 단일앱 통합 운영툴 개발 (2024.10 ~ 2024.12)</div>
                  <ul className="exp-list">
                    <li>다수 게임에 분산된 운영 기능을 단일 웹 기반 통합 운영툴로 재구성</li>
                    <li>유저 관리, 로그 조회, 우편 발송 통합 — 운영 대응 속도 개선</li>
                    <li>권한 관리 시스템 도입으로 역할별 접근 제어 및 보안성 강화</li>
                  </ul>
                  <div className="exp-stack">
                    <span className="tag">Node.js</span><span className="tag">MySQL</span>
                    <span className="tag gr">Firebase Realtime DB</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 커버넌트랩스 */}
          <div className="tl-item fi">
            <div className="tl-dot" />
            <div className="exp-card">
              <div className="exp-meta"><div className="exp-period">2023.08 → 2024.10</div></div>
              <div className="exp-co">주식회사 커버넌트랩스</div>
              <div className="exp-role">SERVER DEVELOPER · 1년 3개월</div>
              <div className="exp-projs">
                <div className="exp-proj">
                  <div className="exp-pname">🎮 커버넌트차일드 — NFT 기반 방치형 RPG</div>
                  <ul className="exp-list">
                    <li>게임 콘텐츠 서버 전반 개발 — 상점 구매, 길드, 시즌 패스, 요일 던전, 탐험 등</li>
                    <li>Redis 캐싱 전략으로 성능 최적화 및 라이브 운영 안정화</li>
                    <li>Slack 연동 서버 알림 봇 — AWS 상태 이상 및 스케줄러 오류 실시간 대응</li>
                    <li>운영자용 유저/길드 정보 조회·수정, 서버 로그 확인 기능 개발</li>
                    <li>운영툴 리팩토링 — Bootstrap + Node.js + EJS 구조, 중복 코드 제거</li>
                    <li>2023.12 OBT → 2024.07 정식 오픈</li>
                  </ul>
                  <div className="exp-stack">
                    <span className="tag">Node.js</span><span className="tag">MongoDB</span>
                    <span className="tag p">Redis</span><span className="tag">AWS</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 위플레이랩스 */}
          <div className="tl-item fi">
            <div className="tl-dot" />
            <div className="exp-card">
              <div className="exp-meta"><div className="exp-period">2023.06 → 2023.08</div></div>
              <div className="exp-co">주식회사 위플레이랩스</div>
              <div className="exp-role">SERVER DEVELOPER · 3개월</div>
              <div className="exp-projs">
                <div className="exp-proj">
                  <div className="exp-pname">🎮 버블퐁프렌즈 — 서버 프레임워크 전환</div>
                  <ul className="exp-list">
                    <li>기존 Java Spring 기반 게임 서버를 Node.js 환경으로 전환</li>
                    <li>기존 기능 유지 및 신규 기능 추가 개발로 생산성·유지보수성 개선</li>
                  </ul>
                  <div className="exp-stack">
                    <span className="tag">Node.js</span><span className="tag">MySQL</span><span className="tag">AWS</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 코드크레인 */}
          <div className="tl-item fi">
            <div className="tl-dot" />
            <div className="exp-card">
              <div className="exp-meta"><div className="exp-period">2021.06 → 2023.06</div></div>
              <div className="exp-co">코드크레인 유한회사</div>
              <div className="exp-role">BACKEND MODULE LEAD (선임) · 2년 1개월</div>
              <div className="exp-projs">
                <div className="exp-proj">
                  <div className="exp-pname">🌐 B2B 웹 서비스 백엔드 개발 및 모듈장</div>
                  <ul className="exp-list">
                    <li>2022.03 선임 및 모듈장 진급 — 백엔드 개발 인원 관리 및 프로젝트 리딩</li>
                    <li>ASP.NET(C#) 기반 DV몰, 덴탈잡 유지보수 및 기능 개선</li>
                    <li>Node.js 기반 신규 서비스 백엔드 설계 및 RESTful API 개발</li>
                    <li>Elasticsearch 구축 — 국내 공장 검색 서비스 검색 성능 최적화</li>
                    <li>MySQL, MSSQL, PostgreSQL 다양한 DB 설계 및 연동 경험 축적</li>
                    <li>주요 서비스: DV몰, 덴탈잡, 당신의 제작소, kplus, 하니웰 스마트홈케어</li>
                  </ul>
                  <div className="exp-stack">
                    <span className="tag">Node.js</span><span className="tag gr">ASP.NET C#</span>
                    <span className="tag">MySQL</span><span className="tag gr">MSSQL</span>
                    <span className="tag gr">PostgreSQL</span><span className="tag g">Elasticsearch</span>
                    <span className="tag">AWS</span><span className="tag gr">Linux</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
