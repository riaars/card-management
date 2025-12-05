import { Injectable } from '@nestjs/common';
import { TransactionsQuerySchema } from './transactions.zod';
import { ZodValidationPipe } from '../common/pipes/zod-validation.pipe';
import type { TransactionsQueryDto } from './transactions.zod';

@Injectable()
export class TransactionsQueryPipe extends ZodValidationPipe<TransactionsQueryDto> {
  constructor() {
    super(TransactionsQuerySchema);
  }
}
