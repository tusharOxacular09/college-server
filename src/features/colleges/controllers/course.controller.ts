import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { CollegeService } from '../services/college.service';
import { CustomParseUUIDPipe } from '../../../validators/uuid.validator';
import { JwtAuthGuard } from '../../auth/utils/jwt-auth.guard';
import { ApiBearerAuth, ApiOperation, ApiQuery } from '@nestjs/swagger';

/**
 * Controller for handling course-related data for colleges.
 * This includes retrieving all courses offered by a specific college.
 */
@Controller('/college_courses')
@ApiBearerAuth() // Allows to add Bearer token in swagger ui.
export class CourseController {
  constructor(private readonly collegeService: CollegeService) {}

  /**
   * Get all courses for a specific college, with pagination.
   * The default page is 1, and the default limit is 10 courses per page.
   * @param collegeId The UUID of the college to fetch courses for.
   * @param page The page number for pagination (defaults to 1).
   * @param limit The number of courses per page (defaults to 10).
   * @returns A paginated list of courses for the specified college.
   */
  @ApiOperation({
    summary: 'College Courses Data',
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
  @UseGuards(JwtAuthGuard) // Ensures that the user is authenticated using JWT token
  @Get('/:college_id')
  async getAllCourses(
    @Param('college_id', CustomParseUUIDPipe) collegeId: string, // Param to capture college ID
    @Query('page') page: string = '1', // Optional query parameter for page (default: 1)
    @Query('limit') limit: string = '10', // Optional query parameter for limit (default: 10)
  ) {
    // Parse page and limit to integers for pagination
    const pageNumber = parseInt(page, 10);
    const limitNumber = parseInt(limit, 10);

    // Call the service method to get courses for the given college with pagination
    return this.collegeService.getCoursesByCollegeId(
      collegeId,
      pageNumber,
      limitNumber,
    );
  }
}
