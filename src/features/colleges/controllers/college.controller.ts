import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { CollegeService } from '../services/college.service';
import { CustomParseUUIDPipe } from '../../../validators/uuid.validator';
import { JwtAuthGuard } from '../../auth/utils/jwt-auth.guard';

@Controller('/college_data')
export class CollegeController {
  constructor(private readonly collegeService: CollegeService) {}

  @UseGuards(JwtAuthGuard)
  @Get('/:college_id/avg_section')
  async getAveragePlacements(
    @Param('college_id', CustomParseUUIDPipe) collegeId: string,
  ) {
    return this.collegeService.getAveragePlacementsByYear(collegeId);
  }
}
