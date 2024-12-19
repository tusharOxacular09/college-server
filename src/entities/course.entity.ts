import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { CollegesEntity } from './colleges.entity';

@Entity({ name: 'college_wise_courses' })
export class CollegeWiseCourseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  college_id: string;

  @ManyToOne(() => CollegesEntity, (college) => college.id, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'college_id' })
  college: CollegesEntity;

  @Column({ type: 'varchar', length: 300 })
  course_name: string;

  @Column({ type: 'int', unsigned: true })
  course_duration: number; // Duration in years

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  course_fee: number; // Fee in decimal format
}
