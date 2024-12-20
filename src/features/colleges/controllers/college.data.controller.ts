import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { CollegeService } from '../services/college.service';
import { CustomParseUUIDPipe } from '../../../validators/uuid.validator';
import { JwtAuthGuard } from '../../auth/utils/jwt-auth.guard';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';

/**
 * Controller for handling all college-related data requests
 * such as average placements and detailed placement information.
 */
@Controller('/college_data')
@ApiBearerAuth() // Allows to add Bearer token in swagger ui.
export class CollegeDataController {
  constructor(private readonly collegeService: CollegeService) {}

  /**
   * Get average placement data (highest, average, median, placement rate)
   * for a specific college by its ID.
   * @param collegeId The UUID of the college.
   * @returns Placement averages for the college, grouped by year.
   */
  @ApiOperation({
    summary: 'Average placements data',
  })
  @UseGuards(JwtAuthGuard) // Ensures the user is authenticated with JWT token
  @Get('/:college_id/avg_section')
  async getAveragePlacements(
    @Param('college_id', CustomParseUUIDPipe) collegeId: string,
  ) {
    return this.collegeService.getAveragePlacementsByYear(collegeId);
  }

  /**
   * Get all placement data for a specific college by its ID.
   * @param collegeId The UUID of the college.
   * @returns A list of placements for the college, including trends.
   */
  @ApiOperation({
    summary: 'Full placements data',
  })
  @UseGuards(JwtAuthGuard) // Ensures the user is authenticated with JWT token
  @Get('/:college_id/placement_section')
  async getAllPlacements(
    @Param('college_id', CustomParseUUIDPipe) collegeId: string,
  ) {
    return this.collegeService.getCollegePlacements(collegeId);
  }
}
