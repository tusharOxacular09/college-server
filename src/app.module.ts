import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configService } from './config/database.config';
import { AuthModule } from './features/auth/module/auth.module';
import { CollegeModule } from './features/colleges/module/college.module';
import { EntityNotFoundExceptionFilter } from './validators/entity_not_found.validator';

@Module({
  imports: [
    // Configuring TypeORM with database connection settings
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
    // Importing AuthModule for handling authentication-related routes and logic
    AuthModule,
    // Importing CollegeModule to manage college-related services and routes
    CollegeModule,
  ],
  controllers: [AppController], // Registering the main application controller
  providers: [
    AppService, // Providing the AppService for application logic
    {
      provide: APP_FILTER,
      useClass: EntityNotFoundExceptionFilter, // Global filter to handle entity not found errors
    },
  ],
})
export class AppModule {}
