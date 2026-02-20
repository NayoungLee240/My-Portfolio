// 연락처 섹션 - 링크 목록 + 자격증/학력
export default function Contact() {
  return (
    <section id="contact">
      <div className="section-wrap">
        <div className="sec-header fi">
          <div className="sec-num">// 08</div>
          <div className="sec-title">CONTACT</div>
          <div className="sec-line" />
        </div>
        <div className="contact-grid">
          {/* 연락처 링크 */}
          <div className="c-links fi">
            <a href="mailto:iny003@naver.com" className="c-link">
              <div className="c-icon">✉</div>
              <div className="c-info">
                <div className="c-label">EMAIL</div>
                <div className="c-val">iny003@naver.com</div>
              </div>
            </a>
            <a
              href="https://nayoung-lee.notion.site/fcbd5946265d4b9082c1021dd7701ba0"
              target="_blank"
              rel="noopener noreferrer"
              className="c-link"
            >
              <div className="c-icon">📋</div>
              <div className="c-info">
                <div className="c-label">NOTION PORTFOLIO</div>
                <div className="c-val">nayoung-lee.notion.site</div>
              </div>
            </a>
            <a
              href="https://lyeo-code.tistory.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="c-link"
            >
              <div className="c-icon">📝</div>
              <div className="c-info">
                <div className="c-label">DEV BLOG</div>
                <div className="c-val">lyeo-code.tistory.com</div>
              </div>
            </a>
            <a
              href="https://zerowakegates.com/ko/"
              target="_blank"
              rel="noopener noreferrer"
              className="c-link"
            >
              <div className="c-icon">🎮</div>
              <div className="c-info">
                <div className="c-label">GAME — ZEROWAKE GATES</div>
                <div className="c-val">zerowakegates.com</div>
              </div>
            </a>
          </div>

          {/* 자격증 & 학력 */}
          <div className="fi">
            <div className="cert-lbl">CERTIFICATIONS &amp; EDUCATION</div>
            <div className="cert-list">
              <div className="cert-item">
                <div className="cert-badge">SQLD</div>
                <div className="cert-info">
                  <div className="cert-name">SQL 개발자 자격증</div>
                  <div className="cert-org">한국데이터진흥원 · 2021.04</div>
                </div>
              </div>
              <div className="cert-item">
                <div className="cert-badge">PCSQL</div>
                <div className="cert-info">
                  <div className="cert-name">PCSQL 인증시험</div>
                  <div className="cert-org">프로그래머스 · 2024.05</div>
                </div>
              </div>
              <div className="cert-item">
                <div className="cert-badge">KMU</div>
                <div className="cert-info">
                  <div className="cert-name">국민대학교 대학원 석사</div>
                  <div className="cert-org">
                    융합디자인테크놀로지학과 · GPA 4.45/4.5 · 2017~2019
                  </div>
                </div>
              </div>
              <div className="cert-item">
                <div className="cert-badge">🏆</div>
                <div className="cert-info">
                  <div className="cert-name">
                    최우수논문발표상 (한국발명진흥회장상)
                  </div>
                  <div className="cert-org">
                    한국지식재산교육연구학회 · 2019.04
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
