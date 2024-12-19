import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityNotFoundError, Repository } from 'typeorm';
import { CollegePlacementEntity } from 'src/entities';

@Injectable()
export class CollegeService {
  constructor(
    @InjectRepository(CollegePlacementEntity)
    private readonly collegePlacementRepository: Repository<CollegePlacementEntity>,
  ) {}

  async getAveragePlacementsByYear(
    collegeId: string,
  ): Promise<{ success: boolean; message: string; data: any[] }> {
    const query = await this.collegePlacementRepository
      .createQueryBuilder('placement')
      .select('placement.year', 'year')
      .addSelect('AVG(placement.highest_placement)', 'avg_highest_placement')
      .addSelect('AVG(placement.average_placement)', 'avg_average_placement')
      .addSelect('AVG(placement.median_placement)', 'avg_median_placement')
      .addSelect('AVG(placement.placement_rate)', 'avg_placement_rate')
      .where(
        'placement.highest_placement IS NOT NULL AND placement.highest_placement != 0',
      )
      .andWhere(
        'placement.average_placement IS NOT NULL AND placement.average_placement != 0',
      )
      .andWhere(
        'placement.median_placement IS NOT NULL AND placement.median_placement != 0',
      )
      .andWhere(
        'placement.placement_rate IS NOT NULL AND placement.placement_rate != 0',
      )
      .andWhere('placement.college_id = :collegeId', { collegeId }) // Filter by college_id
      .groupBy('placement.year')
      .getRawMany();

    if (query.length === 0) {
      throw new EntityNotFoundError(
        CollegePlacementEntity,
        `No records found for college ID ${collegeId}`,
      );
    }

    return {
      success: true,
      message: `Successfully retrieved average placement details for college ID: ${collegeId}`,
      data: query.map((item) => ({
        year: item.year,
        avg_highest_placement: parseFloat(item.avg_highest_placement),
        avg_average_placement: parseFloat(item.avg_average_placement),
        avg_median_placement: parseFloat(item.avg_median_placement),
        avg_placement_rate: parseFloat(item.avg_placement_rate),
      })),
    };
  }
}
