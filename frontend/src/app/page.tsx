import Hero, { type AboutData } from '@/components/sections/Hero';
import Skills, { type SkillCategory } from '@/components/sections/Skills';
import Experience from '@/components/sections/Experience';
import Showcase from '@/components/sections/Showcase';
import Architecture from '@/components/sections/Architecture';
import Metrics from '@/components/sections/Metrics';
import Blog from '@/components/sections/Blog';
import ApiCta from '@/components/sections/ApiCta';
import Contact from '@/components/sections/Contact';

// 스크롤 페이드인 IntersectionObserver 초기화 스크립트 (클라이언트)
function FadeInScript() {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `
          var obs = new IntersectionObserver(function(es) {
            es.forEach(function(e) { if (e.isIntersecting) e.target.classList.add('v'); });
          }, { threshold: 0.08 });
          document.querySelectorAll('.fi').forEach(function(el) { obs.observe(el); });
        `,
      }}
    />
  );
}

// 백엔드 연결 불가 시 사용할 폴백 데이터
const fallbackAbout: AboutData = {
  nameEn: 'NAYOUNG LEE',
  subtitle: '// GAME BACKEND · NODE.JS · AWS · REDIS',
  summary:
    'Node.js 기반 글로벌 게임 라이브 서비스를 구축·운영하며 인증/접속 대기/콘텐츠 서버를 포함한 백엔드 전반을 담당합니다. 상시 6만 / 최대 20만 동접 규모의 서비스를 안정적으로 운영한 경험을 보유합니다.',
  email: 'iny003@naver.com',
  blog: 'https://lyeo-code.tistory.com/',
  notion: 'https://nayoung-lee.notion.site/fcbd5946265d4b9082c1021dd7701ba0',
  stats: { totalExp: '4.9', maxCCU: '20만', stableCCU: '6만', liveGames: '4+' },
};

const fallbackSkills: SkillCategory[] = [
  { category: 'LANGUAGES', items: [{ name: 'JavaScript', type: 'primary' }, { name: 'JAVA', type: 'gray' }, { name: 'C#', type: 'gray' }] },
  { category: 'RUNTIME / FRAMEWORK', items: [{ name: 'Node.js', type: 'primary' }, { name: 'ASP.NET', type: 'gray' }, { name: 'Spring', type: 'gray' }, { name: 'Nginx', type: 'gray' }] },
  { category: 'DATABASE', items: [{ name: 'MySQL', type: 'primary' }, { name: 'MongoDB', type: 'primary' }, { name: 'MSSQL', type: 'gray' }, { name: 'PostgreSQL', type: 'gray' }, { name: 'Redis', type: 'purple' }, { name: 'InfluxDB', type: 'green' }] },
  { category: 'CLOUD / INFRA', items: [{ name: 'AWS EC2', type: 'primary' }, { name: 'RDS', type: 'primary' }, { name: 'ElastiCache', type: 'primary' }, { name: 'Load Balancer', type: 'primary' }, { name: 'Docker', type: 'gray' }, { name: 'Linux', type: 'gray' }] },
  { category: 'AUTHENTICATION', items: [{ name: 'JWT', type: 'primary' }, { name: 'Firebase Auth', type: 'primary' }, { name: 'Steam OAuth', type: 'primary' }, { name: 'Session Mgmt', type: 'gray' }] },
  { category: 'TOOLS & ETC', items: [{ name: 'Git', type: 'primary' }, { name: 'Elasticsearch', type: 'green' }, { name: 'Slack Bot', type: 'gray' }, { name: 'GoogleChat Bot', type: 'gray' }] },
];

// 백엔드 API에서 데이터를 fetch하는 헬퍼 (실패 시 폴백 반환)
async function fetchJson<T>(url: string, fallback: T): Promise<T> {
  try {
    const res = await fetch(url, { next: { revalidate: 3600 } });
    if (!res.ok) return fallback;
    const json = await res.json();
    // NestJS ResponseInterceptor가 { success, data } 형태로 감싸므로 .data 추출
    return (json?.data ?? json) as T;
  } catch {
    return fallback;
  }
}

// 홈 페이지 - 백엔드에서 about/skills fetch 후 컴포넌트에 prop으로 전달
export default async function HomePage() {
  const apiBase = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

  const [about, skills] = await Promise.all([
    fetchJson<AboutData>(`${apiBase}/api/about`, fallbackAbout),
    fetchJson<SkillCategory[]>(`${apiBase}/api/skills`, fallbackSkills),
  ]);

  return (
    <>
      <Hero about={about} />
      <Skills skills={skills} />
      <Experience />
      <Showcase />
      <Architecture />
      <Metrics />
      <Blog />
      <ApiCta />
      <Contact />
      <FadeInScript />
    </>
  );
}
