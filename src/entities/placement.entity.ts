import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { CollegesEntity } from './colleges.entity';

// Defining the 'college_placements' entity for the college placements table
@Entity({ name: 'college_placements' })
export class CollegePlacementEntity {
  // Primary key for the placement entity, using a UUID
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // Foreign key to link the placement record to a college, stored as a UUID
  @Column({ type: 'uuid' })
  college_id: string;

  // Many-to-one relationship with the CollegesEntity, indicating that many placements belong to one college
  @ManyToOne(() => CollegesEntity, (college) => college.id, {
    onDelete: 'CASCADE', // If the college is deleted, associated placements will also be deleted
  })
  @JoinColumn({ name: 'college_id' }) // Specifies the column name to join on
  college: CollegesEntity;

  // Year of the placement data, represented as an unsigned integer
  @Column({ type: 'int', unsigned: true })
  year: number;

  // Highest placement salary for the given year, represented as a decimal with 10 digits precision and 2 digits scale
  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  highest_placement: number;

  // Average placement salary for the given year, represented as a decimal with 10 digits precision and 2 digits scale
  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  average_placement: number;

  // Median placement salary for the given year, represented as a decimal with 10 digits precision and 2 digits scale
  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  median_placement: number;

  // Placement rate for the given year, represented as a decimal with 5 digits precision and 2 digits scale
  @Column({ type: 'decimal', precision: 5, scale: 2, nullable: true })
  placement_rate: number;
}
