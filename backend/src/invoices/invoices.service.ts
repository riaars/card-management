import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import type { Invoice } from '@prisma/client';

@Injectable()
export class InvoicesService {
  constructor(private readonly databaseService: DatabaseService) {}

  async listByCompany(companyId: string): Promise<Invoice[]> {
    const company = await this.databaseService.company.findUnique({
      where: { id: companyId },
      select: { id: true },
    });

    if (!company) {
      throw new NotFoundException('Company not found');
    }

    const invoices = await this.databaseService.invoice.findMany({
      where: {
        card: { companyId },
      },
      orderBy: { dueDate: 'desc' },
    });

    return invoices;
  }
}
