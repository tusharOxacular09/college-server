import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike } from 'typeorm';
import {
  CollegePlacementEntity,
  CollegeWiseCourseEntity,
  CollegesEntity,
  CitiesEntity,
  StatesEntity,
} from 'src/entities';

/**
 * College Services
 * Contains functions to interact with the database for retrieving and managing data related to college services.
 */

@Injectable()
export class CollegeService {
  constructor(
    @InjectRepository(CollegePlacementEntity)
    private readonly collegePlacementRepository: Repository<CollegePlacementEntity>,
    @InjectRepository(CollegeWiseCourseEntity)
    private readonly collegeCourseRepository: Repository<CollegeWiseCourseEntity>,
    @InjectRepository(CollegesEntity)
    private readonly collegeRepository: Repository<CollegesEntity>,
    @InjectRepository(CitiesEntity)
    private readonly cityRepository: Repository<CitiesEntity>,
    @InjectRepository(StatesEntity)
    private readonly stateRepository: Repository<StatesEntity>,
  ) {}

  // **Get Average Placement Statistics by Year**
  async getAveragePlacementsByYear(
    collegeId: string,
  ): Promise<{ success: boolean; message: string; data: any[] }> {
    const query = await this.fetchAveragePlacementStats(collegeId);

    if (query.length === 0)
      throw new Error(`No records found for college ID ${collegeId}`);

    return {
      success: true,
      message: `Successfully retrieved average placement details for college ID: ${collegeId}`,
      data: query.map(this.formatPlacementStats),
    };
  }

  // Helper to fetch average placement statistics
  private async fetchAveragePlacementStats(collegeId: string) {
    return this.collegePlacementRepository
      .createQueryBuilder('placement')
      .select('placement.year', 'year')
      .addSelect('AVG(placement.highest_placement)', 'avg_highest_placement')
      .addSelect('AVG(placement.average_placement)', 'avg_average_placement')
      .addSelect('AVG(placement.median_placement)', 'avg_median_placement')
      .addSelect('AVG(placement.placement_rate)', 'avg_placement_rate')
      .where('placement.highest_placement > 0')
      .andWhere('placement.average_placement > 0')
      .andWhere('placement.median_placement > 0')
      .andWhere('placement.placement_rate > 0')
      .andWhere('placement.college_id = :collegeId', { collegeId })
      .groupBy('placement.year')
      .getRawMany();
  }

  // Helper to format placement statistics
  private formatPlacementStats(item: any) {
    return {
      year: item.year,
      avg_highest_placement: parseFloat(item.avg_highest_placement),
      avg_average_placement: parseFloat(item.avg_average_placement),
      avg_median_placement: parseFloat(item.avg_median_placement),
      avg_placement_rate: parseFloat(item.avg_placement_rate),
    };
  }

  // **Get Detailed Placement Data for a College**
  async getCollegePlacements(
    collegeId: string,
  ): Promise<{ success: boolean; message: string; data: any[] }> {
    const placements = await this.fetchCollegePlacements(collegeId);

    if (placements.length === 0)
      return {
        success: false,
        message: `No placement details found for college ID: ${collegeId}`,
        data: [],
      };

    // Calculate placement trends
    placements.forEach(this.addPlacementTrend);

    return {
      success: true,
      message: `Successfully retrieved all placement details for college ID: ${collegeId}`,
      data: placements,
    };
  }

  // Helper to fetch placement data
  private async fetchCollegePlacements(collegeId: string) {
    return this.collegePlacementRepository
      .createQueryBuilder('placement')
      .select([
        'placement.id',
        'placement.year',
        'placement.highest_placement',
        'placement.average_placement',
        'placement.median_placement',
        'placement.placement_rate',
      ])
      .where('placement.college_id = :collegeId', { collegeId })
      .andWhere('placement.highest_placement > 0')
      .andWhere('placement.average_placement > 0')
      .andWhere('placement.median_placement > 0')
      .andWhere('placement.placement_rate > 0')
      .orderBy('placement.year', 'DESC')
      .getMany();
  }

  // Helper to add placement trends
  private addPlacementTrend(placement: any, index: number, placements: any[]) {
    if (index < placements.length - 1) {
      const nextPlacement = placements[index + 1];
      placement['placement_trend'] =
        placement.placement_rate > nextPlacement.placement_rate
          ? 'UP'
          : placement.placement_rate == nextPlacement.placement_rate
            ? 'SAME'
            : 'DOWN';
    } else {
      placement['placement_trend'] = 'STARTED';
    }
  }

  // **Get Courses Offered by a College**
  async getCoursesByCollegeId(
    collegeId: string,
    page: number,
    limit: number,
  ): Promise<{
    success: boolean;
    message: string;
    data: any[];
    total: number;
  }> {
    const [courses, total] = await this.fetchCourses(collegeId, page, limit);

    if (courses.length === 0) {
      return {
        success: false,
        message: `No courses found for the provided college ID: ${collegeId}.`,
        data: [],
        total: 0,
      };
    }

    return {
      success: true,
      message: 'Successfully retrieved all courses.',
      data: courses,
      total,
    };
  }

  // Helper to fetch courses
  private async fetchCourses(collegeId: string, page: number, limit: number) {
    return this.collegeCourseRepository.findAndCount({
      where: { college_id: collegeId },
      order: { course_fee: 'DESC' },
      skip: (page - 1) * limit,
      take: limit,
    });
  }

  // **Get Colleges Based on City or State**
  async getCollegesByCityOrState(
    cityName?: string,
    stateName?: string,
    page: number = 1,
    limit: number = 10,
  ): Promise<{
    success: boolean;
    message: string;
    data: CollegesEntity[];
    totalRecords: number;
    totalPages: number;
    currentPage: number;
  }> {
    const cityId = cityName ? await this.findCityId(cityName) : null;
    const stateId = stateName ? await this.findStateId(stateName) : null;

    if (!cityId && !stateId) {
      return {
        success: false,
        message: 'No colleges found for the specified filters.',
        data: [],
        totalRecords: 0,
        totalPages: 0,
        currentPage: page,
      };
    }

    const [colleges, totalRecords] = await this.fetchColleges(
      cityId,
      stateId,
      page,
      limit,
    );

    if (colleges.length === 0) {
      return {
        success: false,
        message: 'No colleges found for the specified filters.',
        data: [],
        totalRecords: 0,
        totalPages: 0,
        currentPage: page,
      };
    }

    return {
      success: true,
      message: 'Successfully retrieved colleges.',
      data: colleges,
      totalRecords,
      totalPages: Math.ceil(totalRecords / limit),
      currentPage: page,
    };
  }

  // Helper to find city ID by name
  private async findCityId(cityName: string): Promise<string | null> {
    const city = await this.cityRepository.findOne({
      where: { name: ILike(`%${cityName}%`) },
    });
    return city ? city.id : null;
  }

  // Helper to find state ID by name
  private async findStateId(stateName: string): Promise<string | null> {
    const state = await this.stateRepository.findOne({
      where: { name: ILike(`%${stateName}%`) },
    });
    return state ? state.id : null;
  }

  // Helper to fetch colleges by city or state
  private async fetchColleges(
    cityId: string | null,
    stateId: string | null,
    page: number,
    limit: number,
  ) {
    const queryBuilder = this.collegeRepository
      .createQueryBuilder('college')
      .leftJoinAndSelect('college.city', 'city')
      .leftJoinAndSelect('college.state', 'state');

    if (cityId) queryBuilder.andWhere('college.city_id = :cityId', { cityId });
    if (stateId)
      queryBuilder.andWhere('college.state_id = :stateId', { stateId });

    return queryBuilder
      .take(limit)
      .skip((page - 1) * limit)
      .getManyAndCount();
  }
}
