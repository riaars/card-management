import { Module } from '@nestjs/common';
import { CardsService } from './cards.service';
import { CardsController } from './cards.controller';
import { CardsParamPipe } from './cards.pipe';

@Module({
  controllers: [CardsController],
  providers: [CardsService, CardsParamPipe],
})
export class CardsModule {}
