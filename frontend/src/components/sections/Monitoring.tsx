// 운영과 모니터링 섹션 - 2단 알림 체계, 지표 서버 단순화
const lanes = [
  {
    title: "애플리케이션 알림",
    chain: ["게임 서버(Node.js) 오류 감지", "GoogleChat 봇 API 호출", "개발 채널 실시간 알림"],
    desc: "대상: 크리티컬 오류, 유효하지 않은 접근, 스케줄러 오류",
  },
  {
    title: "인프라 알림",
    chain: ["AWS 서버 상태 이상 감지", "AWS Lambda 실행", "담당자에게 알림 발송"],
    desc: "애플리케이션이 멈춰도 서버 상태는 따로 감시합니다.",
  },
];

export default function Monitoring() {
  return (
    <section id="monitoring" className="bg-alt">
      <div className="section-wrap">
        <div className="sec-header fi">
          <div className="sec-num">// 07</div>
          <div className="sec-title">MONITORING</div>
          <div className="sec-line" />
        </div>
        <h3 className="sec-lead fi">장애를 먼저 알 수 있도록 알림을 두 겹으로 만들었습니다</h3>

        <div className="sub-grid" style={{ marginTop: "1.8rem" }}>
          {lanes.map((l, i) => (
            <div key={l.title} className="sub-card fi">
              <div className="case-num">LAYER {i + 1}</div>
              <div className="sub-card-title">{l.title}</div>
              <div className="chain">
                {l.chain.map((c, j) => (
                  <span key={c} className="chain-item">
                    {j > 0 && <i>→</i>}
                    <span>{c}</span>
                  </span>
                ))}
              </div>
              <p className="sub-card-text">{l.desc}</p>
            </div>
          ))}
          <div className="sub-card fi">
            <div className="case-num">SIMPLIFY</div>
            <div className="sub-card-title">지표 서버 단순화</div>
            <p className="sub-card-text">
              따로 운영하던 InfluxDB 지표 서버를 MySQL로 합쳤습니다. 실제로 보는 지표만 골라 스키마를 설계하고 데이터를 옮겨, 관리할 저장소를 하나 줄였습니다. CCU도 MySQL 기반으로 실시간 집계합니다.
            </p>
          </div>
        </div>

        <div className="callout fi" style={{ marginTop: "1.6rem" }}>
          <div className="callout-lbl">이전 회사에서도</div>
          <p>커버넌트차일드에서 Slack 알림 봇으로 AWS 상태 이상과 스케줄러 오류에 실시간 대응했습니다.</p>
        </div>
      </div>
    </section>
  );
}
