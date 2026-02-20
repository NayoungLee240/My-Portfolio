// 히어로 섹션 - 백엔드 about 데이터를 prop으로 받아 렌더링
export type AboutData = {
  nameEn: string;
  subtitle: string;
  summary: string;
  email: string;
  blog: string;
  notion: string;
  stats: {
    totalExp: string;
    maxCCU: string;
    stableCCU: string;
    liveGames: string;
  };
};

// "4.9" → ["4.9", ""], "20만" → ["20", "만"], "4+" → ["4", "+"]
function splitStat(val: string): [string, string] {
  const m = val.match(/^([\d.]+)(.*)$/);
  return m ? [m[1], m[2]] : [val, ''];
}

export default function Hero({ about }: { about: AboutData }) {
  // "NAYOUNG LEE" → 앞 2글자 일반 + 나머지 accent, 성은 줄바꿈
  const [firstName, ...rest] = about.nameEn.split(' ');
  const lastName = rest.join(' ');
  const nameA = firstName.slice(0, 2);   // "NA"
  const nameB = firstName.slice(2);      // "YOUNG"

  const [expNum] = splitStat(about.stats.totalExp);
  const [ccuMaxNum, ccuMaxUnit] = splitStat(about.stats.maxCCU);
  const [ccuStableNum, ccuStableUnit] = splitStat(about.stats.stableCCU);
  const [gamesNum, gamesUnit] = splitStat(about.stats.liveGames);

  return (
    <section id="hero">
      <div className="hero-glow" />
      <div className="hero-content">
        <div className="hero-tag">BACKEND SERVER DEVELOPER</div>
        <div className="hero-name">
          {nameA}<span className="ac">{nameB}</span>
          <br />{lastName}
        </div>
        <div className="hero-title">{about.subtitle}</div>
        <p className="hero-desc">{about.summary}</p>
        <div className="hero-stats">
          <div className="stat">
            <div className="stat-num">{expNum}<span className="stat-unit">년</span></div>
            <div className="stat-label">TOTAL EXP</div>
          </div>
          <div className="stat">
            <div className="stat-num">{ccuMaxNum}<span className="stat-unit">{ccuMaxUnit || '만'}</span></div>
            <div className="stat-label">MAX CCU</div>
          </div>
          <div className="stat">
            <div className="stat-num">{ccuStableNum}<span className="stat-unit">{ccuStableUnit || '만'}</span></div>
            <div className="stat-label">STABLE CCU</div>
          </div>
          <div className="stat">
            <div className="stat-num">{gamesNum}<span className="stat-unit">{gamesUnit || '+'}</span></div>
            <div className="stat-label">LIVE GAMES</div>
          </div>
        </div>
        <div className="hero-cta">
          <a href="#experience" className="btn btn-primary">경력 보기 →</a>
          <a href="https://zerowakegates.com/ko/" target="_blank" rel="noopener noreferrer" className="btn btn-ghost">🎮 ZWG 공식 사이트 ↗</a>
          <a href="/api-docs" className="btn btn-ghost">API 문서 ↗</a>
          <a href={`mailto:${about.email}`} className="btn btn-ghost">연락하기</a>
        </div>
      </div>

      {/* 터미널 위젯 (데스크탑 전용) - 장식용 고정값 */}
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
