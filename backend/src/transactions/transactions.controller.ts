import { Controller, Get, Query } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import type { TransactionsQueryDto } from './transactions.zod';
import { TransactionsQueryPipe } from './transactions-query.pipe';

@Controller('api/v1')
export class TransactionsController {
  constructor(private readonly service: TransactionsService) {}

  @Get('transactions')
  list(
    @Query(TransactionsQueryPipe)
    query: TransactionsQueryDto,
  ) {
    const { cardId, page, pageSize } = query;
    return this.service.list(cardId, page, pageSize);
  }

  @Get('transactions/latest')
  async latest(
    @Query('companyId') companyId: string,
    @Query('limit') limit?: string,
  ) {
    const parsedLimit = limit ? parseInt(limit, 10) : 5;
    return this.service.latestByCompany(companyId, parsedLimit);
  }
}
