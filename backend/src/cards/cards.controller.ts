import { Controller, Get, Param, Patch } from '@nestjs/common';
import { CardsService } from './cards.service';
import type { CardIdParamDto } from './cards.zod';
import { CardsParamPipe } from './cards.pipe';
import { ApiParam } from '@nestjs/swagger';

@Controller('cards')
export class CardsController {
  constructor(private readonly cardsService: CardsService) {}

  @Get(':cardId')
  @ApiParam({ name: 'cardId', type: String })
  async getCardDetails(
    @Param(CardsParamPipe)
    param: CardIdParamDto,
  ) {
    const { cardId } = param;
    return this.cardsService.findOne(cardId);
  }

  @Patch(':cardId/activate')
  @ApiParam({ name: 'cardId', type: String })
  async activateCard(
    @Param(CardsParamPipe)
    param: CardIdParamDto,
  ) {
    const { cardId } = param;
    return this.cardsService.activateCard(cardId);
  }

  @Patch(':cardId/deactivate')
  @ApiParam({ name: 'cardId', type: String })
  async deactivateCard(
    @Param(CardsParamPipe)
    param: CardIdParamDto,
  ) {
    const { cardId } = param;
    return this.cardsService.deactivateCard(cardId);
  }
}
