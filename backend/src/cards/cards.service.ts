import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import type { Card } from '@prisma/client';

@Injectable()
export class CardsService {
  constructor(private readonly databaseService: DatabaseService) {}

  async listByCompany(companyId: string): Promise<Card[]> {
    const company = await this.databaseService.company.findUnique({
      where: { id: companyId },
      select: { id: true },
    });

    if (!company) {
      throw new NotFoundException('Company not found');
    }

    const cards = await this.databaseService.card.findMany({
      where: { companyId },
      orderBy: { createdAt: 'asc' },
    });

    return cards;
  }
}
