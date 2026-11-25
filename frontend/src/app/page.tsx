import Hero, { type AboutData } from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Experience from "@/components/sections/Experience";
import Project from "@/components/sections/Project";
import Architecture from "@/components/sections/Architecture";
import CoreDesign from "@/components/sections/CoreDesign";
import Incident from "@/components/sections/Incident";
import Monitoring from "@/components/sections/Monitoring";
import AdminTool from "@/components/sections/AdminTool";
import Leadership from "@/components/sections/Leadership";
import Skills, { type SkillCategory } from "@/components/sections/Skills";
import Blog from "@/components/sections/Blog";
import Contact from "@/components/sections/Contact";

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

// 정적 데이터 (GitHub Pages 정적 배포 - 백엔드 서버 미사용)
const about: AboutData = {
  nameEn: "NAYOUNG LEE",
  subtitle: "게임 서버 설계와 라이브 운영 · 서버 파트 리드",
  summary:
    "Node.js로 글로벌 RPG Zerowake Gates의 서버를 처음부터 설계했고, 상시 6만 명, 최대 20만 명이 접속하는 라이브 서비스를 운영했습니다.",
  email: "iny003@naver.com",
  blog: "https://lyeo-code.tistory.com",
  notion: "https://nayoung-lee.notion.site/fcbd5946265d4b9082c1021dd7701ba0",
  game: "https://zerowakegates.com",
  stats: [
    { value: "20만", label: "MAX CCU" },
    { value: "6만", label: "STABLE CCU" },
    { value: "10+", label: "LINKED GAMES" },
    { value: "5년 3개월", label: "SERVER EXP" },
  ],
};

const skills: SkillCategory[] = [
  { category: "언어", primary: ["JavaScript", "TypeScript"], experience: ["Java", "C#"] },
  { category: "런타임·프레임워크", primary: ["Node.js", "PM2 Cluster"], experience: ["ASP.NET", "Spring", "Nginx"] },
  { category: "데이터베이스", primary: ["MySQL", "Redis", "MongoDB"], experience: ["MSSQL", "PostgreSQL", "Elasticsearch"] },
  { category: "클라우드·인프라", primary: ["AWS EC2", "RDS", "ElastiCache", "RDS Proxy"], experience: ["Lambda", "Docker", "Linux"] },
  { category: "인증", primary: ["JWT", "Firebase Auth", "Steam OAuth"], experience: ["Redis 세션 관리"] },
  { category: "도구", primary: ["Git"], experience: ["GoogleChat 봇", "Slack 봇"] },
];

// 홈 페이지
export default function HomePage() {
  return (
    <>
      <Hero about={about} />
      <About />
      <Experience />
      <Project />
      <Architecture />
      <CoreDesign />
      <Incident />
      <Monitoring />
      <AdminTool />
      <Leadership />
      <Skills skills={skills} />
      <Blog />
      <Contact />
      <FadeInScript />
    </>
  );
}
