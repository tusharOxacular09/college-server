import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

// Defining the 'users' entity for the users table
@Entity('users')
export class UserEntity {
  // Primary key for the user entity, using a UUID
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // User's name, with a maximum length of 255 characters
  @Column({ type: 'varchar', length: 255 })
  name: string;

  // User's email, with a maximum length of 255 characters and unique constraint
  @Column({ type: 'varchar', length: 255, unique: true })
  email: string;

  // User's password, with a maximum length of 255 characters
  // Hashed password will be saved
  @Column({ type: 'varchar', length: 255 })
  password: string;
}
