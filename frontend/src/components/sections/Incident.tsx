// 장애 대응 섹션 - DB 커넥션 폭증 → RDS Proxy 도입
const flow = [
  { step: "발생", title: "INCIDENT", desc: "동접에 맞춰 Cluster 인스턴스를 늘리자 DB 쿼리 오류가 나기 시작" },
  { step: "원인", title: "ROOT CAUSE", desc: "인스턴스 수만큼 DB 커넥션이 늘어나는 것을 모니터링으로 확인" },
  { step: "대응", title: "RESPONSE", desc: "조사부터 적용까지 3–5일. 바로 다음 점검에 RDS Proxy를 붙여 커넥션 풀을 한곳에서 관리" },
  { step: "결과", title: "RESULT", desc: "쿼리 오류 해소. 이후 인스턴스를 늘려도 DB 연결 수가 안정적으로 유지" },
];

export default function Incident() {
  return (
    <section id="incident">
      <div className="section-wrap">
        <div className="sec-header fi">
          <div className="sec-num">// 06</div>
          <div className="sec-title">INCIDENT RESPONSE</div>
          <div className="sec-line" />
        </div>
        <h3 className="sec-lead fi">서버를 늘렸더니 DB 커넥션이 먼저 터졌습니다</h3>
        <p className="sec-sub fi">
          예상보다 많은 유저가 몰려 PM2 Cluster 인스턴스를 급히 늘리자, 프로세스마다 DB에 직접 연결하던 구조 탓에 커넥션 수가 함께 치솟았습니다.
        </p>

        <div className="flow-steps">
          {flow.map((f, i) => (
            <div key={f.step} className="flow-step fi">
              <div className="flow-left">
                <div className="flow-circle">{f.step}</div>
                {i < flow.length - 1 && <div className="flow-line" />}
              </div>
              <div className="flow-content">
                <div className="flow-title">{f.title}</div>
                <div className="flow-desc">{f.desc}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="callout fi">
          <div className="callout-lbl">이 경험으로 바뀐 것</div>
          <p>
            커넥션 관리가 얼마나 중요한지 확실히 깨달았습니다. 이제는 서버를 늘리기 전에 인스턴스 수와 커넥션 풀 크기로 DB 연결 상한을 먼저 계산하고, 쿼리 효율도 함께 따져 봅니다.
          </p>
        </div>
        <div className="case-tech tags fi">
          {["PM2 Cluster", "AWS RDS", "RDS Proxy", "MySQL"].map((t) => (
            <span key={t} className="tag">{t}</span>
          ))}
        </div>
      </div>
    </section>
  );
}
