import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { StatesEntity } from './states.entity';

@Entity({ name: 'cities' })
export class CitiesEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  state_id: string;

  @ManyToOne(() => StatesEntity, (state) => state.id, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'state_id' })
  state: StatesEntity;

  @Column({ type: 'varchar', length: 300 })
  name: string;
}
