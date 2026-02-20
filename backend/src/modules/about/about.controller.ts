import { Controller, Get } from '@nestjs/common';
import { AboutService } from './about.service';

// GET /api/about - 자기소개 정보 반환
@Controller('about')
export class AboutController {
  constructor(private readonly aboutService: AboutService) {}

  @Get()
  getAbout() {
    return this.aboutService.getAbout();
  }
}
