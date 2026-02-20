import { Injectable } from '@nestjs/common';

@Injectable()
export class SkillsService {
  getSkills() {
    // 기술 스택을 카테고리별로 분류
    return [
      {
        category: '언어',
        items: [
          { name: 'JavaScript', level: 'expert' },
          { name: 'TypeScript', level: 'advanced' },
          { name: 'SQL', level: 'advanced' },
        ],
      },
      {
        category: '백엔드',
        items: [
          { name: 'Node.js', level: 'expert' },
          { name: 'NestJS', level: 'intermediate' },
          { name: 'Express.js', level: 'expert' },
        ],
      },
      {
        category: '데이터베이스',
        items: [
          { name: 'MySQL', level: 'advanced' },
          { name: 'Redis', level: 'intermediate' },
          { name: 'MongoDB', level: 'intermediate' },
        ],
      },
      {
        category: '인프라/도구',
        items: [
          { name: 'Docker', level: 'intermediate' },
          { name: 'AWS', level: 'intermediate' },
          { name: 'Git', level: 'advanced' },
        ],
      },
    ];
  }
}
