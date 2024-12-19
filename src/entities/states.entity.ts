import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'states' })
export class StatesEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 300 })
  name: string;
}
