import { Injectable, NotFoundException } from '@nestjs/common';

import { DatabaseService } from '../database/database.service';
import { SpendSummaryItem } from './spends.types';
import { Decimal } from '@prisma/client/runtime/library';

@Injectable()
export class SpendsService {
  constructor(private readonly databaseService: DatabaseService) {}
  private getStartOfCurrentMonth(): Date {
    const date = new Date();
    date.setUTCDate(1);
    date.setUTCHours(0, 0, 0, 0);
    return date;
  }

  private toNumber(value: number | Decimal | null): number {
    if (value == null) return 0;
    return typeof value === 'number' ? value : Number(value);
  }

  private buildSpendSummaryItem(
    card: { id: string; creditLimit: number | Decimal; currency: string },
    spent: number,
  ): SpendSummaryItem {
    const limit = this.toNumber(card.creditLimit);
    const remaining = limit - spent;

    return {
      cardId: card.id,
      creditLimit: limit,
      spentThisMonth: spent,
      remaining,
      currency: card.currency,
    };
  }

  async getSpendSummaryByCompany(
    companyId: string,
  ): Promise<SpendSummaryItem[]> {
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

    const startOfMonth = this.getStartOfCurrentMonth();

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
      return this.buildSpendSummaryItem(card, spent);
    });

    return summary;
  }

  async getSpendSummaryByCard(cardId: string): Promise<SpendSummaryItem> {
    const card = await this.databaseService.card.findUnique({
      where: { id: cardId },
    });

    if (!card) {
      throw new NotFoundException('Card not found');
    }

    const startOfMonth = this.getStartOfCurrentMonth();

    const [row] = await this.databaseService.transaction.groupBy({
      by: ['cardId'],
      where: {
        cardId,
        postedAt: { gte: startOfMonth },
      },
      _sum: { amount: true },
    });

    const sum = row?._sum.amount ?? 0;
    const spent = typeof sum === 'number' ? sum : sum.toNumber();

    return this.buildSpendSummaryItem(card, spent);
  }
}
