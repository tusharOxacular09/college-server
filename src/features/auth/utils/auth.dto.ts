import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

// Sign-up Data Transfer Object (DTO) for validating the user input during registration
export class SignUpDto {
  // Ensures that the name field is not empty
  @IsNotEmpty({ message: 'Name is required' })
  name: string;

  // Ensures that the email field is a valid email address format
  @IsEmail({}, { message: 'Invalid email address' })
  email: string;

  // Ensures that the password field is not empty and has a minimum length of 6 characters
  @IsNotEmpty({ message: 'Password is required' })
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  password: string;
}

// Login Data Transfer Object (DTO) for validating the user input during login
export class LogInDto {
  // Ensures that the email field is a valid email address format
  @IsEmail({}, { message: 'Invalid email address' })
  email: string;

  // Ensures that the password field is not empty
  @IsNotEmpty({ message: 'Password is required' })
  password: string;
}
