import { Controller, Post, Body, ValidationPipe } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { SignUpDto, LogInDto } from '../utils/auth.dto';
import { ApiOperation } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /**
   * Handles user signup request.
   *
   * @param signUpDto The data transfer object containing user details for sign-up.
   * @returns The result of the sign-up process.
   */
  @Post('signup')
  @ApiOperation({
    summary: 'Signup a new user',
  })
  async signUp(@Body(new ValidationPipe()) signUpDto: SignUpDto) {
    const { name, email, password } = signUpDto;
    // Calls the AuthService to handle user registration logic
    return this.authService.signUp(name, email, password);
  }

  /**
   * Handles user login request.
   *
   * @param LogInDto The data transfer object containing user email and password for login.
   * @returns The result of the login process, typically a token or error message.
   */
  @Post('login')
  @ApiOperation({
    summary: 'Login user',
  })
  async login(@Body(new ValidationPipe()) LogInDto: LogInDto) {
    const { email, password } = LogInDto;
    // Calls the AuthService to handle the login process
    return this.authService.login(email, password);
  }
}
