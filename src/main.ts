import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ENV } from './config/env.config';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  // Create the NestJS application using the AppModule
  const app = await NestFactory.create(AppModule);

  // Set a global prefix for all routes, making every route start with 'api'
  app.setGlobalPrefix('api');

  // Set up Swagger documentation
  const options = new DocumentBuilder()
    .setTitle('API Documentation')
    .setDescription('API description for the college server app.')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('documentation', app, document); // Swagger UI will be available at /documentation

  // Use a global validation pipe to validate all incoming requests based on the DTOs
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Remove properties that are not defined in the DTO
      forbidNonWhitelisted: true, // Throw an error if the request contains properties that are not defined in the DTO
      transform: true, // Automatically transform payloads into the DTO classes
      errorHttpStatusCode: 400, // Send a 400 status code for validation errors
    }),
  );

  // Start the application and listen on the port defined in the environment variable (default to 3000 if not defined)
  await app.listen(ENV.PORT ?? 3000);
}

// Call the bootstrap function to initialize the application
bootstrap();
