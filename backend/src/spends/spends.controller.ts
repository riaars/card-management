import { Controller, Get, Param } from '@nestjs/common';
import { SpendsService } from './spends.service';
import type { CompaniesSpendParamDto, CardsSpendParamDto } from './spends.zod';
import { CardsSpendParamPipe, CompaniesSpendParamPipe } from './spends.pipe';
import { ApiParam } from '@nestjs/swagger';

@Controller()
export class SpendsController {
  constructor(private readonly spendService: SpendsService) {}

  @Get('companies/:companyId/spends')
  @ApiParam({ name: 'companyId', type: String })
  async getSpendSummaryByCompany(
    @Param(CompaniesSpendParamPipe) param: CompaniesSpendParamDto,
  ) {
    const { companyId } = param;
    return this.spendService.getSpendSummaryByCompany(companyId);
  }

  @Get('cards/:cardId/spends')
  @ApiParam({ name: 'cardId', type: String })
  async getSpendSummaryByCard(
    @Param(CardsSpendParamPipe) param: CardsSpendParamDto,
  ) {
    const { cardId } = param;
    return this.spendService.getSpendSummaryByCard(cardId);
  }
}
