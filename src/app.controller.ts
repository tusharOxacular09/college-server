import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Health Check') // Grouping the health check endpoint in Swagger UI
@Controller() // Defines the root controller for the application
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get() // Handles GET requests to the root path "/"
  @ApiOperation({
    summary: 'Health check endpoint to verify if the server is running.',
  }) // Adding description for Swagger
  getHello(): string {
    return this.appService.getHello(); // Calls the AppService to get a greeting message
  }
}
