import {
  Injectable,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../../../entities/user.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(
    name: string,
    email: string,
    password: string,
  ): Promise<{ success: boolean; message: string }> {
    const existingUser = await this.userRepository.findOne({
      where: { email },
    });
    if (existingUser) {
      throw new BadRequestException('User with this email already exists.');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = this.userRepository.create({
      name,
      email,
      password: hashedPassword,
    });
    await this.userRepository.save(newUser);

    return {
      success: true,
      message: 'Congratulations! User created successfully 🎉',
    };
  }

  async login(
    email: string,
    password: string,
  ): Promise<{ success: boolean; message: string; accessToken: string }> {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      throw new UnauthorizedException('Invalid email or password.');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid email or password.');
    }

    const payload = { userId: user.id };
    const token = this.jwtService.sign(payload, { expiresIn: '2h' });

    return {
      success: true,
      message: 'Congratulations! You have successfully logged in 🎉',
      accessToken: token,
    };
  }
}
