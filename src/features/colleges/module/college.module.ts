import { Module } from '@nestjs/common';
import { CollegeService } from '../services/college.service';
import { CollegeDataController } from '../controllers/college.data.controller';
import { CollegeFiltersController } from '../controllers/college.filter.controller';
import { CourseController } from '../controllers/course.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  StatesEntity,
  CollegeWiseCourseEntity,
  CollegePlacementEntity,
  CitiesEntity,
  CollegesEntity,
} from 'src/entities';

/**
 * CollegeModule is responsible for providing the services and controllers related to colleges.
 * It imports the required entities and binds them to the appropriate controllers and services.
 */
@Module({
  imports: [
    // TypeOrmModule imports the entities that will be used for database interaction
    TypeOrmModule.forFeature([
      CollegesEntity, // Entity representing college data
      CollegePlacementEntity, // Entity for college placement data
      CollegeWiseCourseEntity, // Entity for college-wise courses
      StatesEntity, // Entity for states data
      CitiesEntity, // Entity for cities data
    ]),
  ],
  controllers: [
    // Controllers handle HTTP requests and map them to appropriate services
    CollegeDataController, // Controller for college data-related routes
    CollegeFiltersController, // Controller for filtering and fetching colleges
    CourseController, // Controller for college course-related routes
  ],
  providers: [CollegeService], // Service to handle business logic and database operations
})
export class CollegeModule {}
