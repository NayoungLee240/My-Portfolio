// 파트 리드 섹션 - 일정 산출·작업 배정 프로세스, 계획 변경 대응
export default function Leadership() {
  return (
    <section id="leadership" className="bg-alt">
      <div className="section-wrap">
        <div className="sec-header fi">
          <div className="sec-num">// 09</div>
          <div className="sec-title">PART LEAD</div>
          <div className="sec-line" />
        </div>
        <h3 className="sec-lead fi">2인 서버 파트의 일정을 산출하고 이끌었습니다</h3>

        <div className="case-block fi">
          <div className="sub-lbl">기획이 나오면 이렇게 진행했습니다</div>
          <ol className="steps">
            <li>기획 공유 받기</li>
            <li>회의로 작업을 나누고 일정 산출</li>
            <li>두 명에게 작업 배정</li>
            <li>진행 공유, 기획·클라이언트와 조율</li>
          </ol>
        </div>

        <div className="case-block sub-grid">
          <div className="sub-card fi">
            <div className="case-num">REPLAN</div>
            <div className="sub-card-title">계획이 틀어졌을 때</div>
            <p className="sub-card-text">
              오픈 후 예상을 넘는 동접으로 서버 장애가 나자, 지금은 라이브 최적화가 콘텐츠 개발보다 급하다고 판단했습니다. 콘텐츠 개발 일정을 확인해 업무 여유가 있는 인원에게 다시 나누고, 대기열 서버와 RDS Proxy 등 서버 최적화에 집중했습니다.
            </p>
          </div>
          <div className="sub-card fi">
            <div className="case-num">SCOPE</div>
            <div className="sub-card-title">리드로 맡은 범위</div>
            <ul className="exp-list">
              <li>2025.05 서버 리드 진급 후 2026.02까지 약 10개월간 서버 개발 일정과 커뮤니케이션 담당</li>
              <li>코드크레인 백엔드 모듈장 (2022.03 –), 백엔드 인원 관리와 프로젝트 리딩</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
