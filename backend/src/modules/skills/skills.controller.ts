import { Controller, Get } from '@nestjs/common';
import { SkillsService } from './skills.service';

// GET /api/skills - 기술 스택 목록 반환
@Controller('skills')
export class SkillsController {
  constructor(private readonly skillsService: SkillsService) {}

  @Get()
  getSkills() {
    return this.skillsService.getSkills();
  }
}
