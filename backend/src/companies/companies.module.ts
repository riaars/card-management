import { Module } from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { CompaniesController } from './companies.controller';
import { CardsService } from 'src/cards/cards.service';
import { CompaniesParamPipe } from './companies.pipe';

@Module({
  controllers: [CompaniesController],
  providers: [CompaniesService, CardsService, CompaniesParamPipe],
})
export class CompaniesModule {}
