import { Controller, Get, Param, NotFoundException } from '@nestjs/common';
import { ProjectsService } from './projects.service';

// GET /api/projects      - 전체 프로젝트 목록
// GET /api/projects/:id  - 특정 프로젝트 상세
@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Get()
  getProjects() {
    return this.projectsService.getProjects();
  }

  @Get(':id')
  getProjectById(@Param('id') id: string) {
    const project = this.projectsService.getProjectById(Number(id));
    if (!project) {
      throw new NotFoundException('프로젝트를 찾을 수 없습니다.');
    }
    return project;
  }
}
