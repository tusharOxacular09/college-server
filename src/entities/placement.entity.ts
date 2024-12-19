import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { CollegesEntity } from './colleges.entity';

@Entity({ name: 'college_placements' })
export class CollegePlacementEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  college_id: string;

  @ManyToOne(() => CollegesEntity, (college) => college.id, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'college_id' })
  college: CollegesEntity;

  @Column({ type: 'int', unsigned: true })
  year: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  highest_placement: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  average_placement: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  median_placement: number;

  @Column({ type: 'decimal', precision: 5, scale: 2, nullable: true })
  placement_rate: number;
}
