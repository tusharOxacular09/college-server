import {
  Controller,
  Get,
  Query,
  UseGuards,
  BadRequestException,
} from '@nestjs/common';
import { CollegeService } from '../services/college.service';
import { JwtAuthGuard } from '../../auth/utils/jwt-auth.guard';
import { ApiBearerAuth, ApiOperation, ApiQuery } from '@nestjs/swagger';

/**
 * Controller for filtering and fetching colleges with pagination.
 */
@Controller('/colleges')
@ApiBearerAuth() // Secures the route with Bearer token in Swagger UI
export class CollegeFiltersController {
  constructor(private readonly collegeService: CollegeService) {}

  /**
   * Get colleges filtered by city or state, with pagination.
   * At least one filter (city or state) must be provided.
   */
  @ApiOperation({
    summary: 'Filter colleges by city or state',
    description: 'Filters colleges based on city or state with pagination.',
  })
  @ApiQuery({
    name: 'city',
    required: false,
    description: 'City to filter colleges',
  })
  @ApiQuery({
    name: 'state',
    required: false,
    description: 'State to filter colleges',
  })
  @ApiQuery({
    name: 'page',
    required: false,
    description: 'Pagination page (default: 1)',
    example: '1',
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    description: 'Items per page (default: 10)',
    example: '10',
  })
  @UseGuards(JwtAuthGuard) // Protects the route with JWT authentication
  @Get('/')
  async getAllColleges(
    @Query('city') cityName?: string, // City filter (optional)
    @Query('state') stateName?: string, // State filter (optional)
    @Query('page') page: string = '1', // Pagination: default to page 1
    @Query('limit') limit: string = '10', // Pagination: default to 10 items per page
  ) {
    // Ensure at least one filter (city or state) is provided
    if (!cityName?.trim() && !stateName?.trim()) {
      throw new BadRequestException('Provide either a city or state filter.');
    }

    // Fetch filtered colleges with pagination from the service
    return this.collegeService.getCollegesByCityOrState(
      cityName,
      stateName,
      parseInt(page, 10), // Parse page as integer
      parseInt(limit, 10), // Parse limit as integer
    );
  }
}
