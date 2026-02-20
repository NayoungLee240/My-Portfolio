import { Injectable } from '@nestjs/common';

export interface ContactDto {
  name: string;
  email: string;
  message: string;
}

@Injectable()
export class ContactService {
  // 추후 실제 이메일 전송(nodemailer 등) 또는 DB 저장으로 대체
  async sendMessage(dto: ContactDto) {
    console.log('문의 수신:', dto);

    // 실제 구현 전 임시 응답
    return {
      message: '문의가 접수되었습니다. 빠른 시일 내에 연락드리겠습니다.',
    };
  }
}
