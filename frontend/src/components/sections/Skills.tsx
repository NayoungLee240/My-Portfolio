// 기술 스택 섹션 - 백엔드 skills 데이터를 prop으로 받아 렌더링
export type SkillItem = { name: string; type: string };
export type SkillCategory = { category: string; items: SkillItem[] };

// 백엔드 type 값 → CSS 클래스 매핑
const typeToClass: Record<string, string> = {
  primary: '',
  purple: 'p',
  green: 'g',
  gray: 'gr',
};

export default function Skills({ skills }: { skills: SkillCategory[] }) {
  return (
    <section id="skills" className="bg-alt">
      <div className="section-wrap">
        <div className="sec-header fi">
          <div className="sec-num">// 01</div>
          <div className="sec-title">SKILLS</div>
          <div className="sec-line" />
        </div>
        <div className="skills-grid">
          {skills.map((cat) => (
            <div key={cat.category} className="sk-card fi">
              <div className="sk-title">{cat.category}</div>
              <div className="tags">
                {cat.items.map((item) => {
                  const extra = typeToClass[item.type] ?? '';
                  return (
                    <span key={item.name} className={extra ? `tag ${extra}` : 'tag'}>
                      {item.name}
                    </span>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
