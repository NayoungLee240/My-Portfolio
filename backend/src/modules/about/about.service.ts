import { Injectable } from "@nestjs/common";

// 추후 DB 연동 시 이 서비스에서 TypeORM/Prisma 등을 통해 데이터를 조회
@Injectable()
export class AboutService {
  getAbout() {
    return {
      name: "이나영",
      nameEn: "NAYOUNG LEE",
      title: "Game Backend Server Developer",
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
  }
}
