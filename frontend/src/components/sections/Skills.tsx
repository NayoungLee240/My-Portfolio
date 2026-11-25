// 기술 스택 섹션 - 백엔드 skills 데이터를 prop으로 받아 주력/경험 표로 렌더링
export type SkillCategory = { category: string; primary: string[]; experience: string[] };

export default function Skills({ skills }: { skills: SkillCategory[] }) {
  return (
    <section id="skills">
      <div className="section-wrap">
        <div className="sec-header fi">
          <div className="sec-num">// 10</div>
          <div className="sec-title">SKILLS</div>
          <div className="sec-line" />
        </div>
        <div className="table-scroll fi">
          <table className="comp-table skill-table">
            <thead>
              <tr>
                <th>분야</th>
                <th>주력</th>
                <th>경험</th>
              </tr>
            </thead>
            <tbody>
              {skills.map((cat) => (
                <tr key={cat.category}>
                  <td className="comp-name">{cat.category}</td>
                  <td>
                    <div className="tags">
                      {cat.primary.map((s) => (
                        <span key={s} className="tag">{s}</span>
                      ))}
                    </div>
                  </td>
                  <td>
                    <div className="tags">
                      {cat.experience.map((s) => (
                        <span key={s} className="tag gr">{s}</span>
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
