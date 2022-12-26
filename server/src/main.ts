import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { TransformInterceptor } from './interceptors/transformInterceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // 做自动校验的，依赖 class-validator class-transformer
  app.useGlobalPipes(new ValidationPipe());
  // 拦截器
  app.useGlobalInterceptors(new TransformInterceptor());
  await app.listen(3000);
}
bootstrap();
