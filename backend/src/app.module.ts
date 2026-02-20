import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
import { AboutModule } from './modules/about/about.module';
import { SkillsModule } from './modules/skills/skills.module';
import { ProjectsModule } from './modules/projects/projects.module';
import { ContactModule } from './modules/contact/contact.module';

// 루트 모듈 - 모든 기능 모듈을 여기서 조립
@Module({
  imports: [
    // 환경변수 전역 로드
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    AboutModule,
    SkillsModule,
    ProjectsModule,
    ContactModule,
  ],
})
export class AppModule {}
