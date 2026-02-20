import Hero from '@/components/sections/Hero';
import Skills from '@/components/sections/Skills';
import Projects from '@/components/sections/Projects';
import Contact from '@/components/sections/Contact';

// 서버 컴포넌트 - 빌드/요청 시점에 백엔드 API를 직접 호출해 데이터를 가져옴
async function getData() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

  // 백엔드가 실행 중이지 않을 때를 대비해 try/catch 처리
  try {
    const [aboutRes, skillsRes, projectsRes] = await Promise.all([
      fetch(`${apiUrl}/api/about`, { cache: 'no-store' }),
      fetch(`${apiUrl}/api/skills`, { cache: 'no-store' }),
      fetch(`${apiUrl}/api/projects`, { cache: 'no-store' }),
    ]);

    const about = (await aboutRes.json()).data;
    const skills = (await skillsRes.json()).data;
    const projects = (await projectsRes.json()).data;

    return { about, skills, projects };
  } catch {
    // 백엔드 미연결 시 빈 데이터 반환 (개발 초기 대비)
    return { about: null, skills: [], projects: [] };
  }
}

export default async function HomePage() {
  const { about, skills, projects } = await getData();

  return (
    <>
      {about && (
        <Hero
          name={about.name}
          title={about.title}
          summary={about.summary}
          github={about.github}
        />
      )}
      <Skills skills={skills} />
      <Projects projects={projects} />
      <Contact />
    </>
  );
}
