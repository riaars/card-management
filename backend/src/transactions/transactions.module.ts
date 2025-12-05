import { Module } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { TransactionsController } from './transactions.controller';
import { TransactionsQueryPipe } from './transactions-query.pipe';

@Module({
  controllers: [TransactionsController],
  providers: [TransactionsService, TransactionsQueryPipe],
})
export class TransactionsModule {}
