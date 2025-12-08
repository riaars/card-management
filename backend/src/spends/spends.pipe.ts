import { Injectable } from '@nestjs/common';
import { ZodValidationPipe } from '../common/pipes/zod-validation.pipe';
import { CardsSpendParamSchema, CompaniesSpendParamSchema } from './spends.zod';
import type { CompaniesSpendParamDto, CardsSpendParamDto } from './spends.zod';

@Injectable()
export class CompaniesSpendParamPipe extends ZodValidationPipe<CompaniesSpendParamDto> {
  constructor() {
    super(CompaniesSpendParamSchema);
  }
}

@Injectable()
export class CardsSpendParamPipe extends ZodValidationPipe<CardsSpendParamDto> {
  constructor() {
    super(CardsSpendParamSchema);
  }
}
