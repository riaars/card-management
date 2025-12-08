import { Module } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { TransactionsController } from './transactions.controller';
import {
  LatestTransactionsQueryPipe,
  TransactionsParamPipe,
  TransactionsQueryPipe,
} from './transactions.pipe';

@Module({
  controllers: [TransactionsController],
  providers: [
    TransactionsService,
    TransactionsQueryPipe,
    LatestTransactionsQueryPipe,
    TransactionsParamPipe,
  ],
})
export class TransactionsModule {}
