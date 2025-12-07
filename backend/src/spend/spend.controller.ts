import { Controller, Get, Query } from '@nestjs/common';
import { SpendService } from './spend.service';
import { SkipThrottle } from '@nestjs/throttler';

@SkipThrottle()
@Controller('spend-summary')
export class SpendController {
  constructor(private readonly spendService: SpendService) {}

  @Get()
  async getSpendSummary(@Query('companyId') companyId: string) {
    return this.spendService.getSpendSummary(companyId);
  }
}
