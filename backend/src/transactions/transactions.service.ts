import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import type { Transaction } from '@prisma/client';
@Injectable()
export class TransactionsService {
  constructor(private readonly databaseService: DatabaseService) {}

  async list(cardId: string, page: number, pageSize: number) {
    const skip = (page - 1) * pageSize;

    const [items, totalCount] = await Promise.all([
      this.databaseService.transaction.findMany({
        where: { cardId },
        orderBy: { postedAt: 'desc' },
        skip,
        take: pageSize,
      }),
      this.databaseService.transaction.count({ where: { cardId } }),
    ]);

    return {
      items: items.map((tx) => ({
        ...tx,
        amount: tx.amount.toNumber(),
      })),
      page,
      pageSize,
      totalCount,
      hasMore: skip + items.length < totalCount,
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
}
