import { Injectable } from '@nestjs/common';

// 추후 DB 연동 시 이 서비스에서 TypeORM/Prisma 등을 통해 데이터를 조회
@Injectable()
export class AboutService {
  getAbout() {
    // 임시 하드코딩 데이터 - DB 연동 전까지 사용
    return {
      name: '홍길동',
      title: '백엔드 서버 개발자',
      summary:
        'Node.js 5년차 백엔드 개발자로, 대용량 트래픽 처리와 안정적인 서버 아키텍처 설계를 전문으로 합니다.',
      email: 'example@email.com',
      github: 'https://github.com/username',
      blog: 'https://blog.example.com',
      experience: [
        {
          company: '(주) 예시회사',
          role: '백엔드 개발자',
          period: '2020.01 - 현재',
          description: 'REST API 설계 및 서버 개발',
        },
      ],
      education: [
        {
          school: '예시대학교',
          major: '컴퓨터공학',
          period: '2016 - 2020',
        },
      ],
    };
  }
}
