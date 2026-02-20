import { Injectable } from '@nestjs/common';

@Injectable()
export class ProjectsService {
  getProjects() {
    // 프로젝트 목록 - 추후 DB 연동으로 대체
    return [
      {
        id: 1,
        title: '대용량 트래픽 처리 API 서버',
        description:
          '초당 10만 요청을 처리하는 고성능 REST API 서버 설계 및 구현. Redis 캐싱과 DB 커넥션 풀 최적화로 응답 시간 70% 단축.',
        techStack: ['Node.js', 'Express', 'MySQL', 'Redis', 'Docker'],
        github: 'https://github.com/username/project1',
        demo: null,
        period: '2023.06 - 2023.12',
        featured: true,
      },
      {
        id: 2,
        title: '실시간 알림 시스템',
        description:
          'WebSocket 기반 실시간 알림 서버 구축. MSA 환경에서 서비스 간 이벤트 처리를 위한 메시지 큐 도입.',
        techStack: ['Node.js', 'Socket.IO', 'RabbitMQ', 'MySQL'],
        github: 'https://github.com/username/project2',
        demo: null,
        period: '2022.03 - 2022.09',
        featured: true,
      },
      {
        id: 3,
        title: '포트폴리오 웹사이트',
        description: 'NestJS + Next.js로 구성한 개인 포트폴리오 사이트.',
        techStack: ['NestJS', 'Next.js', 'TypeScript', 'MySQL'],
        github: 'https://github.com/username/portfolio',
        demo: 'https://portfolio.example.com',
        period: '2024.01 - 현재',
        featured: false,
      },
    ];
  }

  getProjectById(id: number) {
    const projects = this.getProjects();
    return projects.find((p) => p.id === id) || null;
  }
}
