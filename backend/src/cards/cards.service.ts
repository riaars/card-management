import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import type { Card } from '@prisma/client';

@Injectable()
export class CardsService {
  constructor(private readonly databaseService: DatabaseService) {}

  async findByCompany(companyId: string): Promise<Card[]> {
    const company = await this.databaseService.company.findUnique({
      where: { id: companyId },
      select: { id: true },
    });

    if (!company) {
      throw new NotFoundException('Company not found');
    }

    const cards = await this.databaseService.card.findMany({
      where: { companyId },
      include: {
        invoices: true,
      },
      orderBy: { createdAt: 'asc' },
    });

    return cards.map((card) => {
      const invoice = card.invoices[0] ?? null;
      return {
        ...card,
        invoiceStatus: invoice?.status ?? null,
      };
    });
  }

  async activateCard(id: string): Promise<Card> {
    const card = await this.databaseService.card.findUnique({
      where: { id },
    });
    if (!card) {
      throw new NotFoundException('Card not found');
    }
    if (card.status === 'active') {
      return card;
    }
    const updatedCard = await this.databaseService.card.update({
      where: { id },
      data: { status: 'active' },
    });
    return updatedCard;
  }

  async deactivateCard(id: string): Promise<Card> {
    const card = await this.databaseService.card.findUnique({
      where: { id },
    });
    if (!card) {
      throw new NotFoundException('Card not found');
    }
    if (card.status === 'inactive') {
      return card;
    }
    const updatedCard = await this.databaseService.card.update({
      where: { id },
      data: { status: 'inactive' },
    });
    return updatedCard;
  }
}
