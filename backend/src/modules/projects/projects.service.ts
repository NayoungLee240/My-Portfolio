import { Injectable } from "@nestjs/common";

@Injectable()
export class ProjectsService {
  getProjects() {
    // 프로젝트 목록 - 추후 DB 연동으로 대체
    return [
      {
        id: 1,
        title: "포트폴리오 웹사이트",
        description: "NestJS + Next.js로 구성한 개인 포트폴리오 사이트.",
        techStack: ["NestJS", "Next.js", "TypeScript", "MySQL"],
        github: "https://github.com/username/portfolio",
        demo: "https://portfolio.example.com",
        period: "2026.02 - 현재",
        featured: false,
      },
    ];
  }

  getProjectById(id: number) {
    const projects = this.getProjects();
    return projects.find((p) => p.id === id) || null;
  }
}
