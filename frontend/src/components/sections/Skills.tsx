// 기술 스택 섹션 - 카테고리별 태그 카드
export default function Skills() {
  return (
    <section id="skills" className="bg-alt">
      <div className="section-wrap">
        <div className="sec-header fi">
          <div className="sec-num">// 01</div>
          <div className="sec-title">SKILLS</div>
          <div className="sec-line" />
        </div>
        <div className="skills-grid">
          <div className="sk-card fi">
            <div className="sk-title">LANGUAGES</div>
            <div className="tags">
              <span className="tag">JavaScript</span>
              <span className="tag gr">JAVA</span>
              <span className="tag gr">C#</span>
            </div>
          </div>
          <div className="sk-card fi">
            <div className="sk-title">RUNTIME / FRAMEWORK</div>
            <div className="tags">
              <span className="tag">Node.js</span>
              <span className="tag gr">ASP.NET</span>
              <span className="tag gr">Spring</span>
              <span className="tag gr">Nginx</span>
            </div>
          </div>
          <div className="sk-card fi">
            <div className="sk-title">DATABASE</div>
            <div className="tags">
              <span className="tag">MySQL</span>
              <span className="tag">MongoDB</span>
              <span className="tag gr">MSSQL</span>
              <span className="tag gr">PostgreSQL</span>
              <span className="tag p">Redis</span>
              <span className="tag g">InfluxDB</span>
            </div>
          </div>
          <div className="sk-card fi">
            <div className="sk-title">CLOUD / INFRA</div>
            <div className="tags">
              <span className="tag">AWS EC2</span>
              <span className="tag">RDS</span>
              <span className="tag">ElastiCache</span>
              <span className="tag">Load Balancer</span>
              <span className="tag gr">Docker</span>
              <span className="tag gr">Linux</span>
            </div>
          </div>
          <div className="sk-card fi">
            <div className="sk-title">AUTHENTICATION</div>
            <div className="tags">
              <span className="tag">JWT</span>
              <span className="tag">Firebase Auth</span>
              <span className="tag">Steam OAuth</span>
              <span className="tag gr">Session Mgmt</span>
            </div>
          </div>
          <div className="sk-card fi">
            <div className="sk-title">TOOLS &amp; ETC</div>
            <div className="tags">
              <span className="tag">Git</span>
              <span className="tag g">Elasticsearch</span>
              <span className="tag gr">Slack Bot</span>
              <span className="tag gr">GoogleChat Bot</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
