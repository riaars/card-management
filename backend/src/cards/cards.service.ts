import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import type { Card } from '@prisma/client';

@Injectable()
export class CardsService {
  constructor(private readonly databaseService: DatabaseService) {}

  async findOne(id: string) {
    const card = await this.databaseService.card.findUnique({
      where: { id },
      include: { company: true },
    });

    if (!card) {
      throw new NotFoundException('Card not found');
    }

    return {
      id,
      company: card.company.name,
      maskedNumber: card.maskedNumber,
    };
  }

  async findAllCardsByCompany(companyId: string): Promise<Card[]> {
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
