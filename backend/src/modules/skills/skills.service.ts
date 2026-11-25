import { Injectable } from '@nestjs/common';

@Injectable()
export class SkillsService {
  getSkills() {
    // 기술 스택을 분야별로 분류 (primary: 주력, experience: 경험)
    return [
      { category: '언어', primary: ['JavaScript', 'TypeScript'], experience: ['Java', 'C#'] },
      { category: '런타임·프레임워크', primary: ['Node.js', 'PM2 Cluster'], experience: ['ASP.NET', 'Spring', 'Nginx'] },
      { category: '데이터베이스', primary: ['MySQL', 'Redis', 'MongoDB'], experience: ['MSSQL', 'PostgreSQL', 'Elasticsearch'] },
      { category: '클라우드·인프라', primary: ['AWS EC2', 'RDS', 'ElastiCache', 'RDS Proxy'], experience: ['Lambda', 'Docker', 'Linux'] },
      { category: '인증', primary: ['JWT', 'Firebase Auth', 'Steam OAuth'], experience: ['Redis 세션 관리'] },
      { category: '도구', primary: ['Git'], experience: ['GoogleChat 봇', 'Slack 봇'] },
    ];
  }
}
