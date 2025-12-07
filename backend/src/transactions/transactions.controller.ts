import { Controller, Get, Query } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import type { TransactionsQueryDto } from './transactions.zod';
import { TransactionsQueryPipe } from './transactions-query.pipe';

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly service: TransactionsService) {}

  @Get()
  findAllTransactionsByCard(
    @Query(TransactionsQueryPipe)
    query: TransactionsQueryDto,
  ) {
    const { cardId, page, pageSize, search } = query;
    return this.service.findAllTransactionsByCard(
      cardId,
      page,
      pageSize,
      search,
    );
  }

  @Get('/latest')
  async latest(
    @Query('companyId') companyId: string,
    @Query('limit') limit?: string,
  ) {
    const parsedLimit = limit ? parseInt(limit, 10) : 5;
    return this.service.latestByCompany(companyId, parsedLimit);
  }

  @Get('/latestbycard')
  async latestByCard(
    @Query('cardId') cardId: string,
    @Query('limit') limit?: string,
  ) {
    const parsedLimit = limit ? parseInt(limit, 10) : 5;
    return this.service.latestTransactionsByCard(cardId, parsedLimit);
  }
}
