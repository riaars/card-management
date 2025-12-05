import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import type { SpendSummaryItem } from './spend.types';

@Injectable()
export class SpendService {
  constructor(private readonly databaseService: DatabaseService) {}

  async getSpendSummary(companyId: string): Promise<SpendSummaryItem[]> {
    const company = await this.databaseService.company.findUnique({
      where: { id: companyId },
      select: { id: true },
    });

    if (!company) {
      throw new NotFoundException('Company not found');
    }

    const cards = await this.databaseService.card.findMany({
      where: { companyId },
    });

    if (cards.length === 0) return [];

    const cardIds = cards.map((c) => c.id);

    const startOfMonth = new Date();
    startOfMonth.setUTCDate(1);
    startOfMonth.setUTCHours(0, 0, 0, 0);

    const spendByCard = await this.databaseService.transaction.groupBy({
      by: ['cardId'],
      where: {
        cardId: { in: cardIds },
        postedAt: { gte: startOfMonth },
      },
      _sum: { amount: true },
    });

    const spendMap = new Map<string, number>();
    for (const row of spendByCard) {
      const sum = row._sum.amount ?? 0;
      const spent = typeof sum === 'number' ? sum : sum.toNumber();
      spendMap.set(row.cardId, spent);
    }

    const summary: SpendSummaryItem[] = cards.map((card) => {
      const spent = spendMap.get(card.id) ?? 0;
      const limit =
        typeof card.creditLimit === 'number'
          ? card.creditLimit
          : card.creditLimit.toNumber();
      const remaining = limit - spent;

      return {
        cardId: card.id,
        creditLimit: limit,
        spentThisMonth: spent,
        remaining,
        currency: card.currency,
      };
    });

    return summary;
  }
}
