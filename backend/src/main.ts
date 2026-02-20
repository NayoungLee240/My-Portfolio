import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 전역 API prefix 설정 - 모든 라우트는 /api/... 형태
  app.setGlobalPrefix('api');

  // CORS 설정 - 프론트엔드에서 API 호출 허용
  app.enableCors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    credentials: true,
  });

  // 전역 파이프 - DTO 유효성 검사
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    }),
  );

  // 전역 필터 - 에러 응답 통일
  app.useGlobalFilters(new HttpExceptionFilter());

  // 전역 인터셉터 - 성공 응답 통일
  app.useGlobalInterceptors(new ResponseInterceptor());

  const port = process.env.PORT || 3001;
  await app.listen(port);
  console.log(`백엔드 서버 실행 중: http://localhost:${port}/api`);
}

bootstrap();
