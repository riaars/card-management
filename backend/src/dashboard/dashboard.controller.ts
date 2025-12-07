import { Controller, Get, Query } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import type { DashboardQueryDto } from './dashboard.zod';
import { DashboardQueryPipe } from './dashboard-query.pipe';

@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get()
  async getDashboard(
    @Query(DashboardQueryPipe)
    query: DashboardQueryDto,
  ) {
    const { companyId } = query;
    return this.dashboardService.getDashboard(companyId);
  }
}
