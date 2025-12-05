import { Module } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { DashboardController } from './dashboard.controller';
import { DashboardQueryPipe } from './dashboard-query.pipe';

@Module({
  controllers: [DashboardController],
  providers: [DashboardService, DashboardQueryPipe],
})
export class DashboardModule {}
