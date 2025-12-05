import { Controller, Get, Query } from '@nestjs/common';
import { CardsService } from './cards.service';

@Controller('api/v1')
export class CardsController {
  constructor(private readonly cardsService: CardsService) {}

  @Get('cards')
  async listCards(@Query('companyId') companyId: string) {
    return this.cardsService.listByCompany(companyId);
  }
}
