// 핵심 지표 섹션 - 운영 규모를 숫자로 강조
const metrics = [
  { num: '20만', label: 'MAX CCU\n최대 동접자' },
  { num: '6만', label: 'STABLE CCU\n상시 동접자' },
  { num: '4+', label: 'LIVE GAMES\n운영 경험' },
  { num: '4.9', label: 'YEARS\n총 개발 경력' },
  { num: '5분', label: 'CCU 수집 주기\nINTERVAL' },
  { num: 'UTC', label: 'TIME STANDARD\n글로벌 기준' },
];

export default function Metrics() {
  return (
    <section id="metrics" className="bg-alt">
      <div className="section-wrap">
        <div className="sec-header fi">
          <div className="sec-num">// 05</div>
          <div className="sec-title">LIVE METRICS</div>
          <div className="sec-line" />
        </div>
        <div className="metrics-grid">
          {metrics.map((m) => (
            <div key={m.num + m.label} className="met-card fi">
              <div className="met-num">{m.num}</div>
              <div className="met-label" style={{ whiteSpace: 'pre-line' }}>{m.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
