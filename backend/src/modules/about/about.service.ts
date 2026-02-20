import { Injectable } from "@nestjs/common";

// 추후 DB 연동 시 이 서비스에서 TypeORM/Prisma 등을 통해 데이터를 조회
@Injectable()
export class AboutService {
  getAbout() {
    return {
      name: "이나영",
      nameEn: "NAYOUNG LEE",
      title: "Backend Server Developer",
      subtitle: "// GAME BACKEND · NODE.JS · AWS · REDIS",
      summary:
        "Node.js 기반 글로벌 게임 라이브 서비스를 구축·운영하며 인증/접속 대기/콘텐츠 서버를 포함한 백엔드 전반을 담당합니다. 상시 6만 / 최대 20만 동접 규모의 서비스를 안정적으로 운영한 경험을 보유합니다.",
      email: "iny003@naver.com",
      blog: "https://lyeo-code.tistory.com/",
      notion:
        "https://nayoung-lee.notion.site/fcbd5946265d4b9082c1021dd7701ba0",
      stats: {
        totalExp: "4.9",
        maxCCU: "20만",
        stableCCU: "6만",
        liveGames: "4+",
      },
    };
  }
}
