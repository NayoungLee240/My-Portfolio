import { Injectable } from '@nestjs/common';

@Injectable()
export class SkillsService {
  getSkills() {
    // 기술 스택을 카테고리별로 분류 (메인 기술: primary, 보조: secondary, 경험: gray)
    return [
      {
        category: 'LANGUAGES',
        items: [
          { name: 'JavaScript', type: 'primary' },
          { name: 'JAVA', type: 'gray' },
          { name: 'C#', type: 'gray' },
        ],
      },
      {
        category: 'RUNTIME / FRAMEWORK',
        items: [
          { name: 'Node.js', type: 'primary' },
          { name: 'ASP.NET', type: 'gray' },
          { name: 'Spring', type: 'gray' },
          { name: 'Nginx', type: 'gray' },
        ],
      },
      {
        category: 'DATABASE',
        items: [
          { name: 'MySQL', type: 'primary' },
          { name: 'MongoDB', type: 'primary' },
          { name: 'MSSQL', type: 'gray' },
          { name: 'PostgreSQL', type: 'gray' },
          { name: 'Redis', type: 'purple' },
          { name: 'InfluxDB', type: 'green' },
        ],
      },
      {
        category: 'CLOUD / INFRA',
        items: [
          { name: 'AWS EC2', type: 'primary' },
          { name: 'RDS', type: 'primary' },
          { name: 'ElastiCache', type: 'primary' },
          { name: 'Load Balancer', type: 'primary' },
          { name: 'Docker', type: 'gray' },
          { name: 'Linux', type: 'gray' },
        ],
      },
      {
        category: 'AUTHENTICATION',
        items: [
          { name: 'JWT', type: 'primary' },
          { name: 'Firebase Auth', type: 'primary' },
          { name: 'Steam OAuth', type: 'primary' },
          { name: 'Session Mgmt', type: 'gray' },
        ],
      },
      {
        category: 'TOOLS & ETC',
        items: [
          { name: 'Git', type: 'primary' },
          { name: 'Elasticsearch', type: 'green' },
          { name: 'Slack Bot', type: 'gray' },
          { name: 'GoogleChat Bot', type: 'gray' },
        ],
      },
    ];
  }
}
