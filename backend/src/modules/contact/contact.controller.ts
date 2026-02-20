import { Controller, Post, Body } from '@nestjs/common';
import { ContactService, ContactDto } from './contact.service';

// POST /api/contact - 문의 메시지 전송
@Controller('contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Post()
  sendMessage(@Body() dto: ContactDto) {
    return this.contactService.sendMessage(dto);
  }
}
