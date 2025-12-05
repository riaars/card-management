import { Module } from '@nestjs/common';
import { CardsService } from './cards.service';
import { CardsController } from './cards.controller';
import { CardsQueryPipe } from './card-query.pipe';

@Module({
  controllers: [CardsController],
  providers: [CardsService, CardsQueryPipe],
})
export class CardsModule {}
