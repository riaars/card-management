import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import type { Transaction } from '@prisma/client';
@Injectable()
export class TransactionsService {
  constructor(private readonly databaseService: DatabaseService) {}

  async list(companyId: string, page: number, pageSize: number) {
    const skip = (page - 1) * pageSize;

    const [transactions, totalCount] = await Promise.all([
      this.databaseService.transaction.findMany({
        where: {
          card: { companyId },
        },
        orderBy: { postedAt: 'desc' },
        skip,
        take: pageSize,
      }),
      this.databaseService.transaction.count({ where: { id: companyId } }),
    ]);

    return {
      transactions: transactions.map((tx) => ({
        ...tx,
        amount: tx.amount.toNumber(),
      })),
      page,
      pageSize,
      totalCount,
      hasMore: skip + transactions.length < totalCount,
    };
  }

  async findAllTransactionsByCard(
    cardId: string,
    page: number,
    pageSize: number,
    search?: string,
  ) {
    const skip = (page - 1) * pageSize;

    const [transactions, totalCount] = await Promise.all([
      this.databaseService.transaction.findMany({
        where: {
          cardId,
          OR: search
            ? [
                { description: { contains: search, mode: 'insensitive' } },
                { category: { contains: search, mode: 'insensitive' } },
                {
                  dataPointsSummary: { contains: search, mode: 'insensitive' },
                },
              ]
            : undefined,
        },
        orderBy: { postedAt: 'desc' },
        skip,
        take: pageSize,
      }),
      this.databaseService.transaction.count({
        where: {
          cardId,
          OR: search
            ? [
                { description: { contains: search, mode: 'insensitive' } },
                { category: { contains: search, mode: 'insensitive' } },
                {
                  dataPointsSummary: { contains: search, mode: 'insensitive' },
                },
              ]
            : undefined,
        },
      }),
    ]);

    return {
      transactions: transactions.map((tx) => ({
        ...tx,
        amount: tx.amount.toNumber(),
      })),
      page,
      pageSize,
      totalCount,
      hasMore: skip + transactions.length < totalCount,
    };
  }

  async latestByCompany(companyId: string, limit = 5): Promise<Transaction[]> {
    const company = await this.databaseService.company.findUnique({
      where: { id: companyId },
      select: { id: true },
    });

    if (!company) {
      throw new NotFoundException('Company not found');
    }

    const transactions = await this.databaseService.transaction.findMany({
      where: {
        card: { companyId },
      },
      orderBy: { postedAt: 'desc' },
      take: limit,
    });

    return transactions;
  }

  async latestTransactionsByCard(
    cardId: string,
    limit = 5,
  ): Promise<Transaction[]> {
    const transactions = await this.databaseService.transaction.findMany({
      where: { cardId },
      orderBy: { postedAt: 'desc' },
      take: limit,
    });

    return transactions;
  }
}
