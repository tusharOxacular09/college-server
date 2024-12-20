import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { StatesEntity } from './states.entity';

// Defining the 'cities' entity for the cities table
@Entity({ name: 'cities' })
export class CitiesEntity {
  // Primary key for the city entity, using a UUID
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // Foreign key to link the city to a state, stored as a UUID
  @Column({ type: 'uuid' })
  state_id: string;

  // Many-to-one relationship with the StatesEntity, indicating that many cities belong to one state
  @ManyToOne(() => StatesEntity, (state) => state.id, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'state_id' }) // Specifies the column name to join on
  state: StatesEntity;

  // Name of the city with a maximum length of 300 characters
  @Column({ type: 'varchar', length: 300 })
  name: string;
}
