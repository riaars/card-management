import { Controller, Get, Param, Query } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import {
  LatestTransactionsQueryDto,
  TransactionsParamDto,
  TransactionsQueryDto,
} from './transactions.zod';
import {
  TransactionsParamPipe,
  TransactionsQueryPipe,
} from './transactions.pipe';
import { ApiParam } from '@nestjs/swagger';

@Controller('cards')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Get(':cardId/transactions')
  @ApiParam({ name: 'cardId', type: String })
  findAllTransactionsByCard(
    @Param(TransactionsParamPipe) param: TransactionsParamDto,
    @Query(TransactionsQueryPipe)
    query: TransactionsQueryDto,
  ) {
    const { cardId } = param;
    const { page, pageSize, search } = query;

    return this.transactionsService.findAllTransactionsByCard(
      cardId,
      page,
      pageSize,
      search,
    );
  }

  @Get(':cardId/transactions/latest')
  @ApiParam({ name: 'cardId', type: String })
  async latestByCard(
    @Param(TransactionsParamPipe) param: TransactionsParamDto,
    @Query(TransactionsQueryPipe)
    query: LatestTransactionsQueryDto,
  ) {
    const { cardId } = param;
    const { limit } = query;
    return this.transactionsService.findLatestTransactionsByCard(cardId, limit);
  }
}
