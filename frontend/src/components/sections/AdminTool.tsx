// 통합 운영툴 섹션 - 10개 이상 게임을 하나의 운영툴로 연동
const features = [
  { icon: "✉", name: "인게임 우편 발송" },
  { icon: "🎒", name: "유저 아이템 조회·수정" },
  { icon: "👤", name: "유저 정보 조회" },
  { icon: "📜", name: "서버 로그 조회" },
  { icon: "🔐", name: "역할별 권한 관리(RBAC)" },
];

export default function AdminTool() {
  return (
    <section id="admin-tool">
      <div className="section-wrap">
        <div className="sec-header fi">
          <div className="sec-num">// 08</div>
          <div className="sec-title">ADMIN TOOL</div>
          <div className="sec-line" />
        </div>
        <h3 className="sec-lead fi">흩어진 운영 기능을 하나의 툴로 묶었습니다</h3>

        <div className="admin-grid">
          <div className="fi">
            <div className="result-num">
              <b>10+</b>
              <span>같은 데이터 구조의 게임을 하나의 운영툴로 연동</span>
            </div>
            <p className="sec-sub" style={{ margin: "1.4rem 0" }}>
              <strong>같은 데이터 구조의 게임 10개 이상을 하나의 운영툴로 연동</strong>했습니다. 새 게임은 게임 정보만 등록하면 코드 수정 없이 바로 동작하도록 설계했습니다.
            </p>
            <dl className="info-table">
              <div className="info-row">
                <dt>기간</dt>
                <dd>2024.10 – 2024.12</dd>
              </div>
              <div className="info-row">
                <dt>기술</dt>
                <dd>Node.js, MySQL, Firebase Realtime DB</dd>
              </div>
            </dl>
          </div>
          <div className="fi">
            <div className="sub-lbl">FEATURES · 기능</div>
            <div className="c-links">
              {features.map((f) => (
                <div key={f.name} className="c-link static">
                  <div className="c-icon">{f.icon}</div>
                  <div className="c-val">{f.name}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
