import { Controller, Get, Param, Patch } from '@nestjs/common';
import { CardsService } from './cards.service';
import { SkipThrottle } from '@nestjs/throttler';
import type { CardIdParamDto } from './cards.zod';
import { CardsQueryPipe } from './card-query.pipe';

@SkipThrottle()
@Controller()
export class CardsController {
  constructor(private readonly cardsService: CardsService) {}

  @Get('company/:companyId/cards')
  async listCards(@Param('companyId') companyId: string) {
    return this.cardsService.findByCompany(companyId);
  }

  @Patch('cards/:id/activate')
  async activateCard(
    @Param(CardsQueryPipe)
    param: CardIdParamDto,
  ) {
    const { id } = param;
    return this.cardsService.activateCard(id);
  }

  @Patch('cards/:id/deactivate')
  async deactivateCard(@Param('id') id: string) {
    return this.cardsService.deactivateCard(id);
  }
}
