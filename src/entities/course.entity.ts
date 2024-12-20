import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { CollegesEntity } from './colleges.entity';

// Defining the 'college_wise_courses' entity for the college-wise courses table
@Entity({ name: 'college_wise_courses' })
export class CollegeWiseCourseEntity {
  // Primary key for the course entity, using a UUID
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // Foreign key to link the course to a college, stored as a UUID
  @Column({ type: 'uuid' })
  college_id: string;

  // Many-to-one relationship with the CollegesEntity, indicating that many courses belong to one college
  @ManyToOne(() => CollegesEntity, (college) => college.id, {
    onDelete: 'CASCADE', // If the college is deleted, associated courses will also be deleted
  })
  @JoinColumn({ name: 'college_id' }) // Specifies the column name to join on
  college: CollegesEntity;

  // Name of the course with a maximum length of 300 characters
  @Column({ type: 'varchar', length: 300 })
  course_name: string;

  // Duration of the course in years, represented as an unsigned integer
  @Column({ type: 'int', unsigned: true })
  course_duration: number; // Duration in years

  // Fee for the course represented as a decimal with 10 digits precision and 2 digits scale
  @Column({ type: 'decimal', precision: 10, scale: 2 })
  course_fee: number; // Fee in decimal format
}
