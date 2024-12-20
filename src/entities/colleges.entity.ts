import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { CitiesEntity } from './cities.entity';
import { StatesEntity } from './states.entity';

// Defining the 'colleges' entity for the colleges table
@Entity({ name: 'colleges' })
export class CollegesEntity {
  // Primary key for the college entity, using a UUID
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // Name of the college with a maximum length of 300 characters
  @Column({ type: 'varchar', length: 300 })
  name: string;

  // College score represented as an integer, unsigned and with a width of 4 digits
  @Column({ type: 'int', width: 4, unsigned: true })
  score: number;

  // Foreign key to link the college to a city, stored as a UUID
  @Column({ type: 'uuid' })
  city_id: string;

  // Many-to-one relationship with the CitiesEntity, indicating that many colleges belong to one city
  @ManyToOne(() => CitiesEntity, (city) => city.id, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'city_id' }) // Specifies the column name to join on
  city: CitiesEntity;

  // Foreign key to link the college to a state, stored as a UUID
  @Column({ type: 'uuid' })
  state_id: string;

  // Many-to-one relationship with the StatesEntity, indicating that many colleges belong to one state
  @ManyToOne(() => StatesEntity, (state) => state.id, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'state_id' }) // Specifies the column name to join on
  state: StatesEntity;
}
