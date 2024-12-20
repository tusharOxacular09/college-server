import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

// Defining the 'states' entity for the states table
@Entity({ name: 'states' })
export class StatesEntity {
  // Primary key for the state entity, using a UUID
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // Name of the state, with a maximum length of 300 characters
  @Column({ type: 'varchar', length: 300 })
  name: string;
}
