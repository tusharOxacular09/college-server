import { Controller, Post, Body, ValidationPipe } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { SignUpDto, LogInDto } from '../utils/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signUp(@Body(new ValidationPipe()) signUpDto: SignUpDto) {
    const { name, email, password } = signUpDto;
    return this.authService.signUp(name, email, password);
  }

  @Post('login')
  async login(
    @Body(new ValidationPipe()) LogInDto: LogInDto
  ) {
    const { email, password } = LogInDto;
    return this.authService.login(email, password);
  }
}
