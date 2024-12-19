import { Module } from '@nestjs/common';
import { CollegeService } from '../services/college.service';
import { CollegeController } from '../controllers/college.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CollegePlacementEntity } from 'src/entities/placement.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([CollegePlacementEntity]),
  ],
  controllers: [CollegeController],
  providers: [CollegeService],
})
export class CollegeModule {}
