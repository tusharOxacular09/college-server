import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { CitiesEntity } from './cities.entity';
import { StatesEntity } from './states.entity';

@Entity({ name: 'colleges' })
export class CollegesEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 300 })
  name: string;

  @Column({ type: 'int', width: 4, unsigned: true })
  score: number;

  @Column({ type: 'uuid' })
  city_id: string;

  @ManyToOne(() => CitiesEntity, (city) => city.id, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'city_id' })
  city: CitiesEntity;

  @Column({ type: 'uuid' })
  state_id: string;

  @ManyToOne(() => StatesEntity, (state) => state.id, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'state_id' })
  state: StatesEntity;
}
