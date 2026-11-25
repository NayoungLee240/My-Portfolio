// 핵심 설계 섹션 - 인증 / 접속 대기열 / 무중단 스키마 변경 / 데이터베이스
function CaseHead({ num, tag, title }: { num: string; tag: string; title: string }) {
  return (
    <>
      <div className="case-head">
        <span className="case-num">DESIGN {num}</span>
        <span className="case-tag">{tag}</span>
      </div>
      <h3 className="case-title">{title}</h3>
    </>
  );
}

function Steps({ label, items }: { label: string; items: string[] }) {
  return (
    <div className="case-block">
      <div className="sub-lbl">{label}</div>
      <ol className="steps">
        {items.map((it) => (
          <li key={it}>{it}</li>
        ))}
      </ol>
    </div>
  );
}

function Tech({ items }: { items: string[] }) {
  return (
    <div className="case-tech tags">
      {items.map((t) => (
        <span key={t} className="tag">{t}</span>
      ))}
    </div>
  );
}

export default function CoreDesign() {
  return (
    <section id="design" className="bg-alt">
      <div className="section-wrap">
        <div className="sec-header fi">
          <div className="sec-num">// 05</div>
          <div className="sec-title">CORE DESIGN</div>
          <div className="sec-line" />
        </div>

        {/* 1. 인증 */}
        <article className="case fi">
          <CaseHead num="01" tag="인증" title="요청마다 토큰을 바꿔 탈취와 중복 로그인을 막았습니다" />
          <Steps
            label="요청 한 번의 흐름"
            items={[
              "클라이언트가 현재 토큰으로 API 요청",
              "서버가 Redis의 최신 토큰과 대조",
              "새 토큰 발급, Redis의 최신 토큰 교체",
              "이전 토큰은 즉시 폐기",
            ]}
          />
          <div className="case-block pdr">
            <div className="pdr-item problem">
              <div className="pdr-lbl">✕ 문제</div>
              <p className="pdr-text">
                유효기간이 긴 토큰은 탈취되면 만료 전까지 막을 수 없습니다. 같은 계정으로 여러 기기에서 동시에 접속하는 것도 막아야 했습니다.
              </p>
            </div>
            <div className="pdr-item decision">
              <div className="pdr-lbl">→ 결정</div>
              <p className="pdr-text">
                Refresh Token 하나로 인증을 단순화하고, 요청마다 토큰을 교체해 Redis에는 계정별 최신 토큰 하나만 유효하게 저장했습니다. 동시 요청이 들어오면 기존 토큰을 폐기하고 최신 토큰만 남깁니다.
              </p>
            </div>
            <div className="pdr-item result">
              <div className="pdr-lbl">✓ 결과</div>
              <p className="pdr-text">
                탈취된 토큰은 다음 요청 한 번이면 쓸 수 없게 되고, 새 로그인이 들어오면 기존 세션이 바로 끊겨 중복 로그인이 차단됩니다. Firebase(iOS, Android), Steam, EroLabs 로그인도 같은 흐름으로 묶었습니다.
              </p>
            </div>
          </div>
          <div className="case-block callout">
            <div className="callout-lbl">GAME SERVER ENTRY</div>
            <p>
              게임 서버 입장 시에는 로그인 서버가 발급한 단기·1회용 입장 Ticket을 함께 검증합니다. Token/Ticket 검증은 Login 서버에 위임해 게임 서버는 게임 로직에만 집중합니다.
            </p>
          </div>
          <Tech items={["Refresh Token", "Redis", "Firebase Auth", "Steam OAuth", "EroLabs"]} />
        </article>

        {/* 2. 접속 대기열 */}
        <article className="case fi">
          <CaseHead num="02" tag="접속 대기열" title="서버가 다운된 날, 대기열 서버를 긴급 투입했습니다" />
          <p className="case-lead">
            동접이 서버 한도를 넘어 서버가 다운되자, 초과 인원을 줄 세워 차례로 들여보내는 대기열 서버와 Delay Redis를 따로 만들어 붙였습니다.
          </p>
          <Steps
            label="동작 흐름"
            items={[
              "접속 요청이 대기열 서버로 먼저 들어옴",
              "Delay Redis로 현재 동접 확인",
              "한도를 넘으면 대기 순번 발급",
              "자리가 나면 순서대로 로그인 서버로",
            ]}
          />
          <div className="case-block result-nums">
            <div className="result-num">
              <b>0회</b>
              <span>도입 이후 접속 폭주로 인한 서버 다운</span>
            </div>
            <div className="result-num">
              <b>30만 명</b>
              <span>대기열 수용 규모 (최대 동접 20만 이상 대응)</span>
            </div>
          </div>
          <div className="case-block callout">
            <div className="callout-lbl">왜 로그인 서버 앞에 뒀나</div>
            <p>
              보통은 로그인 뒤에 두지만, 이 게임은 첫 로그인 때 계정이 함께 생성됩니다. 계정 생성까지 몰리지 않도록 로그인 서버 앞에서 인원을 먼저 제한했습니다.
            </p>
          </div>
          <Tech items={["Node.js", "Delay Redis", "ElastiCache", "AWS ALB"]} />
        </article>

        {/* 3. 무중단 스키마 변경 */}
        <article className="case fi">
          <CaseHead num="03" tag="무중단 스키마 변경" title="서비스를 멈추지 않고 핵심 테이블 키를 바꿨습니다" />
          <p className="case-lead">
            업적, 에스퍼 등 핵심 테이블의 키 구조를 바꿔야 했지만, 한 번에 일괄 변환하면 라이브 중 DB 부하가 순간적으로 치솟습니다.
          </p>
          <Steps
            label="진행 방식"
            items={[
              "정기점검 때 새 코드를 먼저 배포",
              "유저가 로그인하면 그 유저의 데이터만 변환",
              "이후 정기점검마다 남은 데이터를 조금씩 변환",
              "전체 전환 완료",
            ]}
          />
          <div className="case-block table-scroll">
            <table className="comp-table">
              <thead>
                <tr>
                  <th>비교</th>
                  <th>한 번에 일괄 변환</th>
                  <th className="chosen">지연 + 분할 변환 (선택)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="comp-name">DB 부하</td>
                  <td>변환 순간에 급증</td>
                  <td className="chosen">로그인 트래픽과 점검 시간에 분산</td>
                </tr>
                <tr>
                  <td className="comp-name">서비스 영향</td>
                  <td>긴 점검이 필요할 수 있음</td>
                  <td className="chosen">서비스 중단 없음</td>
                </tr>
                <tr>
                  <td className="comp-name">접속하지 않는 유저</td>
                  <td>함께 처리</td>
                  <td className="chosen">정기점검 때 나눠서 처리</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="case-block pdr two">
            <div className="pdr-item problem">
              <div className="pdr-lbl">왜 바꿨나</div>
              <p className="pdr-text">
                기존 키 구조로는 조회 효율이 떨어졌습니다. 업적, 에스퍼처럼 자주 조회되는 테이블이라 그대로 둘 수 없었습니다.
              </p>
            </div>
            <div className="pdr-item result">
              <div className="pdr-lbl">✓ 결과</div>
              <p className="pdr-text">라이브 서비스를 멈추지 않고 키 구조 변경 완료</p>
            </div>
          </div>
          <Tech items={["MySQL", "Lazy Migration", "Zero Downtime"]} />
        </article>

        {/* 4. 데이터베이스 */}
        <article className="case fi">
          <CaseHead num="04" tag="데이터베이스" title="느린 쿼리와 재화 정합성은 DB에서 해결했습니다" />
          <div className="case-block sub-grid">
            <div className="sub-card">
              <div className="sub-card-title">느린 쿼리 찾아 고치기</div>
              <ol className="num-list">
                <li>Slow Query Log로 느린 쿼리 수집</li>
                <li>EXPLAIN으로 실행 계획 확인</li>
                <li>인덱스가 빠진 쿼리를 찾아 인덱스 추가</li>
              </ol>
            </div>
            <div className="sub-card">
              <div className="sub-card-title">재화 처리 프로시저</div>
              <p className="sub-card-text">
                현재 재화 확인, 재화 지급, 로그 기록을 하나의 DB 프로시저로 묶었습니다. 재화가 바뀔 때마다 로그가 반드시 남아, 비정상적인 재화 변동을 추적할 수 있습니다.
              </p>
            </div>
            <div className="sub-card">
              <div className="sub-card-title">Redis와 DB 역할 분리</div>
              <ul className="exp-list">
                <li>세션과 호출이 많은 유저 데이터를 Redis에 저장해 DB 호출 최소화</li>
                <li>임시 데이터는 TTL로 만료</li>
                <li>재화 같은 민감 데이터는 DB에서 처리</li>
              </ul>
            </div>
          </div>
          <blockquote className="case-block quote">
            읽기 성능은 Redis로, 재화처럼 중요한 데이터는 DB에서 처리합니다.
          </blockquote>
          <Tech items={["MySQL", "Redis (ElastiCache)", "저장 프로시저", "Slow Query Log", "EXPLAIN"]} />
        </article>
      </div>
    </section>
  );
}
