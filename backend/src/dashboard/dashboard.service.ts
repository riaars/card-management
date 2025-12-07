import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import {
  CardSummaryDto,
  DashboardResponseDto,
  InvoiceDto,
  SpendSummaryItemDto,
  TransactionDto,
} from './dashboard.types';

@Injectable()
export class DashboardService {
  constructor(private readonly databaseService: DatabaseService) {}

  async getDashboard(companyId: string): Promise<DashboardResponseDto> {
    const company = await this.databaseService.company.findUnique({
      where: { id: companyId },
      select: { id: true },
    });

    console.log(company);

    if (!company) {
      throw new NotFoundException('Company not found');
    }

    const cards = await this.databaseService.card.findMany({
      where: { companyId },
      orderBy: { createdAt: 'asc' },
    });

    const cardIds = cards.map((c) => c.id);

    if (cardIds.length === 0) {
      return {
        companyId,
        cards: [],
        invoices: [],
        latestTransactions: [],
        spendSummary: [],
      };
    }

    const invoices = await this.databaseService.invoice.findMany({
      where: { cardId: { in: cardIds } },
      orderBy: { dueDate: 'desc' },
    });

    const latestTransactions = await this.databaseService.transaction.findMany({
      where: { cardId: { in: cardIds } },
      orderBy: { postedAt: 'desc' },
      take: 10,
    });

    const startOfMonth = new Date();
    startOfMonth.setUTCDate(1);
    startOfMonth.setUTCHours(0, 0, 0, 0);

    const spendByCard = await this.databaseService.transaction.groupBy({
      by: ['cardId'],
      where: {
        cardId: { in: cardIds },
        postedAt: { gte: startOfMonth },
      },
      _sum: {
        amount: true,
      },
    });

    const spendSummaryMap = new Map<string, number>();
    for (const row of spendByCard) {
      const sum = row._sum.amount ?? 0;
      const spent = typeof sum === 'number' ? sum : sum.toNumber();
      spendSummaryMap.set(row.cardId, spent);
    }

    const cardsDto: CardSummaryDto[] = cards.map((card) => ({
      id: card.id,
      maskedNumber: card.maskedNumber,
      status: card.status as CardSummaryDto['status'],
      imageUrl: card.imageUrl ?? null,
      creditLimit:
        typeof card.creditLimit === 'number'
          ? card.creditLimit
          : card.creditLimit.toNumber(),
      currency: card.currency,
    }));

    const invoicesDto: InvoiceDto[] = invoices.map((inv) => ({
      id: inv.id,
      cardId: inv.cardId,
      status: inv.status as InvoiceDto['status'],
      dueDate: inv.dueDate,
      amountDue:
        typeof inv.amountDue === 'number'
          ? inv.amountDue
          : inv.amountDue.toNumber(),
      currency: inv.currency,
    }));

    const latestTransactionsDto: TransactionDto[] = latestTransactions.map(
      (tx) => ({
        id: tx.id,
        cardId: tx.cardId,
        description: tx.description,
        postedAt: tx.postedAt,
        amount:
          typeof tx.amount === 'number' ? tx.amount : tx.amount.toNumber(),
        currency: tx.currency,
        category: tx.category ?? null,
        dataPointsSummary: tx.dataPointsSummary ?? null,
      }),
    );

    const spendSummaryDto: SpendSummaryItemDto[] = cards.map((card) => {
      const spent = spendSummaryMap.get(card.id) ?? 0;
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

    return {
      companyId,
      cards: cardsDto,
      invoices: invoicesDto,
      latestTransactions: latestTransactionsDto,
      spendSummary: spendSummaryDto,
    };
  }
}
