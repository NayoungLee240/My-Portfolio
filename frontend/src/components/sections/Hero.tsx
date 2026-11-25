import Link from "next/link";

// 히어로 섹션 - 백엔드 about 데이터를 prop으로 받아 렌더링
export type AboutData = {
  nameEn: string;
  subtitle: string;
  summary: string;
  email: string;
  blog: string;
  notion: string;
  game: string;
  stats: { value: string; label: string }[];
};

// "5년 3개월" → 숫자는 크게, 단위는 작게 ("20만" → 20 + 만, "10+" → 10+)
function StatValue({ value }: { value: string }) {
  const parts = value.match(/\d[\d.,+]*|\D+/g) ?? [value];
  return (
    <>
      {parts.map((p, i) =>
        /^\d/.test(p) ? (
          <span key={i}>{p}</span>
        ) : (
          <span key={i} className="stat-unit">{p}</span>
        ),
      )}
    </>
  );
}

export default function Hero({ about }: { about: AboutData }) {
  // "NAYOUNG LEE" → 앞 2글자 일반 + 나머지 accent, 성은 줄바꿈
  const [firstName, ...rest] = about.nameEn.split(' ');
  const lastName = rest.join(' ');
  const nameA = firstName.slice(0, 2);   // "NA"
  const nameB = firstName.slice(2);      // "YOUNG"

  return (
    <section id="hero">
      <div className="hero-glow" />
      <div className="hero-content">
        <div className="hero-tag">GAME BACKEND SERVER DEVELOPER</div>
        <div className="hero-name">
          {nameA}<span className="ac">{nameB}</span>
          <br />{lastName}
        </div>
        <div className="hero-title">{about.subtitle}</div>
        <p className="hero-desc">{about.summary}</p>
        <div className="hero-stats">
          {about.stats.map((s) => (
            <div key={s.label} className="stat">
              <div className="stat-num"><StatValue value={s.value} /></div>
              <div className="stat-label">{s.label}</div>
            </div>
          ))}
        </div>
        <div className="hero-cta">
          <a href="#experience" className="btn btn-primary">경력 보기 →</a>
          <a href={about.game} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">🎮 ZWG 공식 사이트 ↗</a>
          <Link href="/api-docs" className="btn btn-ghost">API 문서 ↗</Link>
          <a href={`mailto:${about.email}`} className="btn btn-ghost">연락하기</a>
        </div>
      </div>

      {/* 터미널 위젯 (데스크탑 전용) - 장식용 고정값 */}
      <div className="hero-terminal">
        <div className="term-head">
          <div className="dot dr" /><div className="dot dy" /><div className="dot dg" />
          <div className="term-title">career.sh</div>
        </div>
        <div className="term-body">
          <div className="tl"><span className="tp">$</span><span className="tc"> whoami</span></div>
          <div className="tl"><span className="to"><span className="tv">nayoung_lee</span> // Game Backend Dev</span></div>
          <br />
          <div className="tl"><span className="tp">$</span><span className="tc"> node career.js</span></div>
          <div className="tl"><span className="to"><span className="tk">role    :</span> <span className="tv">&quot;Server Part Lead&quot;</span></span></div>
          <div className="tl"><span className="to"><span className="tk">last_co :</span> <span className="tv">&quot;스토리타코&quot;</span></span></div>
          <div className="tl"><span className="to"><span className="tk">game    :</span> <span className="tv">&quot;Zerowake Gates&quot;</span></span></div>
          <div className="tl"><span className="to"><span className="tk">stack   :</span> <span className="tv">[&quot;Node&quot;,&quot;MySQL&quot;,&quot;Redis&quot;,&quot;AWS&quot;]</span></span></div>
          <div className="tl"><span className="to"><span className="tk">ccu_avg :</span> <span className="tv">60000</span></span></div>
          <div className="tl"><span className="to"><span className="tk">ccu_max :</span> <span className="tv">200000</span></span></div>
          <div className="tl"><span className="to"><span className="tk">career  :</span> <span className="tv">&quot;2021.06 – 2026.09&quot;</span></span></div>
          <div className="tl"><span className="to"><span className="tk">status  :</span> <span style={{ color: 'var(--accent3)' }}>&quot;OPEN TO WORK ✓&quot;</span></span></div>
          <br />
          <div className="tl"><span className="tp">$</span><span className="tcur" /></div>
        </div>
      </div>
    </section>
  );
}
