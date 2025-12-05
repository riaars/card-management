import { Controller, Get, Query } from '@nestjs/common';
import { SpendService } from './spend.service';

@Controller('api/v1')
export class SpendController {
  constructor(private readonly spendService: SpendService) {}

  @Get('spend-summary')
  async getSpendSummary(@Query('companyId') companyId: string) {
    return this.spendService.getSpendSummary(companyId);
  }
}
