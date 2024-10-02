import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidatePromise } from 'class-validator';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist:true
  }))
  app.enableCors({
    origin: 'http://localhost:5173', // Allow only this origin (your frontend)
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  await app.listen(3000);
}
bootstrap();
