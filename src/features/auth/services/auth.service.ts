import {
  Injectable,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../../../entities/user.entity';
import * as bcrypt from 'bcrypt'; // For hashing and comparing passwords
import { JwtService } from '@nestjs/jwt'; // For generating JWT tokens

@Injectable()
export class AuthService {
  constructor(
    // Injecting the user repository to interact with the User entity in the database
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,

    // Injecting JwtService to generate JWT tokens
    private readonly jwtService: JwtService,
  ) {}

  /**
   * Sign up a new user.
   * - Checks if the user already exists by their email.
   * - Hashes the password and stores the user in the database.
   * @param name User's name.
   * @param email User's email.
   * @param password User's password.
   * @returns A success message indicating user creation.
   */
  async signUp(
    name: string,
    email: string,
    password: string,
  ): Promise<{ success: boolean; message: string }> {
    // Check if a user already exists with the provided email
    const existingUser = await this.userRepository.findOne({
      where: { email },
    });
    if (existingUser) {
      // If the user exists, throw a BadRequestException
      throw new BadRequestException('User with this email already exists.');
    }

    // Hash the user's password before storing it in the database
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user entity with the provided details
    const newUser = this.userRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    // Save the new user in the database
    await this.userRepository.save(newUser);

    // Return a success message after user creation
    return {
      success: true,
      message: 'Congratulations! User created successfully 🎉',
    };
  }

  /**
   * Log in a user.
   * - Checks if the user exists by their email.
   * - Compares the provided password with the stored hash.
   * - Generates and returns a JWT token upon successful login.
   * @param email User's email.
   * @param password User's password.
   * @returns A success message with the JWT token upon successful login.
   */
  async login(
    email: string,
    password: string,
  ): Promise<{ success: boolean; message: string; accessToken: string }> {
    // Find the user by their email address
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      // If the user does not exist, throw an UnauthorizedException
      throw new UnauthorizedException('Invalid email or password.');
    }

    // Compare the provided password with the stored hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      // If the passwords don't match, throw an UnauthorizedException
      throw new UnauthorizedException('Invalid email or password.');
    }

    // Generate a JWT token using the user's id as payload
    const payload = { userId: user.id };
    const token = this.jwtService.sign(payload, { expiresIn: '2h' });

    // Return a success message and the generated token
    return {
      success: true,
      message: 'Congratulations! You have successfully logged in 🎉',
      accessToken: token,
    };
  }
}
