import { Controller, Get, Param } from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { CardsService } from 'src/cards/cards.service';
import type { CompaniesParamDto } from './companies.zod';
import { CompaniesParamPipe } from './companies.pipe';
import { ApiParam } from '@nestjs/swagger';

@Controller('/companies')
export class CompaniesController {
  constructor(
    private readonly companiesService: CompaniesService,
    private readonly cardsService: CardsService,
  ) {}

  @Get()
  findAll() {
    return this.companiesService.findAll();
  }

  @Get(':companyId')
  @ApiParam({ name: 'companyId', type: String })
  findOne(@Param(CompaniesParamPipe) param: CompaniesParamDto) {
    const { companyId } = param;
    return this.companiesService.findOne(companyId);
  }

  @Get(':companyId/cards')
  @ApiParam({ name: 'companyId', type: String })
  async findAllCardsByCompany(
    @Param(CompaniesParamPipe) param: CompaniesParamDto,
  ) {
    const { companyId } = param;
    return this.cardsService.findAllCardsByCompany(companyId);
  }
}
