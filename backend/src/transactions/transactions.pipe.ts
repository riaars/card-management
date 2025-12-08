import { Injectable } from '@nestjs/common';
import {
  LatestTransactionsQuerySchema,
  TransactionsParamSchema,
  TransactionsQuerySchema,
} from './transactions.zod';
import { ZodValidationPipe } from '../common/pipes/zod-validation.pipe';
import type {
  LatestTransactionsQueryDto,
  TransactionsQueryDto,
} from './transactions.zod';

@Injectable()
export class TransactionsQueryPipe extends ZodValidationPipe<TransactionsQueryDto> {
  constructor() {
    super(TransactionsQuerySchema);
  }
}

@Injectable()
export class LatestTransactionsQueryPipe extends ZodValidationPipe<LatestTransactionsQueryDto> {
  constructor() {
    super(LatestTransactionsQuerySchema);
  }
}

@Injectable()
export class TransactionsParamPipe extends ZodValidationPipe<any> {
  constructor() {
    super(TransactionsParamSchema);
  }
}
