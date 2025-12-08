import { Module } from '@nestjs/common';
import { SpendsService } from './spends.service';
import { SpendsController } from './spends.controller';
import { CardsSpendParamPipe, CompaniesSpendParamPipe } from './spends.pipe';

@Module({
  controllers: [SpendsController],
  providers: [SpendsService, CompaniesSpendParamPipe, CardsSpendParamPipe],
})
export class SpendsModule {}
