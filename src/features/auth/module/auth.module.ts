import { Module } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { AuthController } from '../controllers/auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from '../utils/jwt.strategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/entities/user.entity';

@Module({
  imports: [
    // Importing the UserEntity to interact with the database.
    TypeOrmModule.forFeature([UserEntity]),

    // PassportModule is required for implementing authentication strategies (like JWT).
    PassportModule,

    // Configuring JwtModule with a secret key and setting expiration time for JWT tokens.
    JwtModule.register({
      secret: process.env.JWT_SECRET_KEY, // The secret key to sign the JWT (stored in environment variables).
      signOptions: { expiresIn: '2h' }, // Setting JWT token expiration time to 2 hours.
    }),
  ],
  // The AuthController will handle requests related to authentication (signup, login, etc.).
  controllers: [AuthController],

  // Providers contain the logic for authentication and JWT strategy.
  // AuthService handles user authentication and token generation.
  // JwtStrategy is used to validate JWT tokens during request handling.
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
