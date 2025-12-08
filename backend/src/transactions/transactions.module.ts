import { Module } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { TransactionsController } from './transactions.controller';
import {
  TransactionsParamPipe,
  TransactionsQueryPipe,
} from './transactions.pipe';

@Module({
  controllers: [TransactionsController],
  providers: [
    TransactionsService,
    TransactionsQueryPipe,
    TransactionsParamPipe,
  ],
})
export class TransactionsModule {}
