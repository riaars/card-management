import { Injectable } from '@nestjs/common';
import { ZodValidationPipe } from '../common/pipes/zod-validation.pipe';
import { CompaniesParamDto, CompaniesParamSchema } from './companies.zod';

@Injectable()
export class CompaniesParamPipe extends ZodValidationPipe<CompaniesParamDto> {
  constructor() {
    super(CompaniesParamSchema);
  }
}
