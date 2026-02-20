// 히어로 섹션 - 이름/직책/스탯 + 우측 터미널 위젯
export default function Hero() {
  return (
    <section id="hero">
      <div className="hero-glow" />
      <div className="hero-content">
        <div className="hero-tag">BACKEND SERVER DEVELOPER</div>
        <div className="hero-name">
          NA<span className="ac">YOUNG</span>
          <br />LEE
        </div>
        <div className="hero-title">// GAME BACKEND · NODE.JS · AWS · REDIS</div>
        <p className="hero-desc">
          Node.js 기반 글로벌 게임 라이브 서비스를 구축·운영하며<br />
          인증/접속 대기/콘텐츠 서버를 포함한 백엔드 전반을 담당합니다.<br />
          상시 6만 / 최대 20만 동접 규모의 서비스를 안정적으로 운영한 경험을 보유합니다.
        </p>
        <div className="hero-stats">
          <div className="stat">
            <div className="stat-num">4.9<span className="stat-unit">년</span></div>
            <div className="stat-label">TOTAL EXP</div>
          </div>
          <div className="stat">
            <div className="stat-num">20<span className="stat-unit">만</span></div>
            <div className="stat-label">MAX CCU</div>
          </div>
          <div className="stat">
            <div className="stat-num">6<span className="stat-unit">만</span></div>
            <div className="stat-label">STABLE CCU</div>
          </div>
          <div className="stat">
            <div className="stat-num">4<span className="stat-unit">+</span></div>
            <div className="stat-label">LIVE GAMES</div>
          </div>
        </div>
        <div className="hero-cta">
          <a href="#experience" className="btn btn-primary">경력 보기 →</a>
          <a href="https://zerowakegates.com/ko/" target="_blank" rel="noopener noreferrer" className="btn btn-ghost">🎮 ZWG 공식 사이트 ↗</a>
          <a href="/api-docs" className="btn btn-ghost">API 문서 ↗</a>
          <a href="mailto:iny003@naver.com" className="btn btn-ghost">연락하기</a>
        </div>
      </div>

      {/* 터미널 위젯 (데스크탑 전용) */}
      <div className="hero-terminal">
        <div className="term-head">
          <div className="dot dr" /><div className="dot dy" /><div className="dot dg" />
          <div className="term-title">server_status.sh</div>
        </div>
        <div className="term-body">
          <div className="tl"><span className="tp">$</span><span className="tc"> whoami</span></div>
          <div className="tl"><span className="to"><span className="tv">nayoung_lee</span> // Game Backend Dev</span></div>
          <br />
          <div className="tl"><span className="tp">$</span><span className="tc"> node status.js</span></div>
          <div className="tl"><span className="to"><span className="tk">position:</span> <span className="tv">&quot;Server Lead&quot;</span></span></div>
          <div className="tl"><span className="to"><span className="tk">company :</span> <span className="tv">&quot;스토리타코&quot;</span></span></div>
          <div className="tl"><span className="to"><span className="tk">game    :</span> <span className="tv">&quot;Zerowake Gates&quot;</span></span></div>
          <div className="tl"><span className="to"><span className="tk">stack   :</span> <span className="tv">[&quot;Node&quot;,&quot;MySQL&quot;,&quot;Redis&quot;]</span></span></div>
          <div className="tl"><span className="to"><span className="tk">ccu_avg :</span> <span className="tv">60000</span></span></div>
          <div className="tl"><span className="to"><span className="tk">ccu_max :</span> <span className="tv">200000</span></span></div>
          <div className="tl"><span className="to"><span className="tk">status  :</span> <span style={{ color: 'var(--accent3)' }}>&quot;LIVE ✓&quot;</span></span></div>
          <br />
          <div className="tl"><span className="tp">$</span><span className="tcur" /></div>
        </div>
      </div>
    </section>
  );
}
