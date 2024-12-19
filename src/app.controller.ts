import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ENV } from './config/env.config';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    console.log(ENV["POSTGRES_HOST"])
    return this.appService.getHello();
  }
}
