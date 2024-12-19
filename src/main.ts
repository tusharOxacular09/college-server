import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ENV } from './config/env.config';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Set a global prefix for all routes
  app.setGlobalPrefix('api');

  // Use a global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Strip out fields not defined in the DTO
      forbidNonWhitelisted: true, // Throw an error if extra fields are provided
      transform: true, // Automatically transform payloads to DTO classes
      errorHttpStatusCode: 400, // Use 400 for validation errors
    }),
  );

  await app.listen(ENV.PORT ?? 3000);
}
bootstrap();
