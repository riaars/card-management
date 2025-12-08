import { Test, TestingModule } from '@nestjs/testing';
import { SpendsService } from './spends.service';
import { DatabaseService } from '../database/database.service';
import { NotFoundException } from '@nestjs/common';
import { Decimal } from '@prisma/client/runtime/library';
import { SpendSummaryItem } from './spends.types';

describe('SpendsService', () => {
  let service: SpendsService;

  const mockDatabaseService = {
    company: {
      findUnique: jest.fn(),
    },
    card: {
      findMany: jest.fn(),
      findUnique: jest.fn(),
    },
    transaction: {
      groupBy: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SpendsService,
        {
          provide: DatabaseService,
          useValue: mockDatabaseService,
        },
      ],
    }).compile();

    service = module.get<SpendsService>(SpendsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getSpendSummaryByCompany', () => {
    it('should throw NotFoundException if company does not exist', async () => {
      const companyId = 'missing-company';
      mockDatabaseService.company.findUnique.mockResolvedValue(null);

      await expect(service.getSpendSummaryByCompany(companyId)).rejects.toThrow(
        NotFoundException,
      );
      await expect(service.getSpendSummaryByCompany(companyId)).rejects.toThrow(
        'Company not found',
      );

      expect(mockDatabaseService.company.findUnique).toHaveBeenCalledWith({
        where: { id: companyId },
        select: { id: true },
      });
    });

    it('should return empty array if company has no cards', async () => {
      const companyId = 'company-seed-0001';

      mockDatabaseService.company.findUnique.mockResolvedValue({
        id: companyId,
      });
      mockDatabaseService.card.findMany.mockResolvedValue([]);

      const result = await service.getSpendSummaryByCompany(companyId);

      expect(mockDatabaseService.card.findMany).toHaveBeenCalledWith({
        where: { companyId },
      });
      expect(mockDatabaseService.transaction.groupBy).not.toHaveBeenCalled();
      expect(result).toEqual([]);
    });

    it('should return spend summary for cards with Decimal and number amounts', async () => {
      const companyId = 'company-seed-0001';

      mockDatabaseService.company.findUnique.mockResolvedValue({
        id: companyId,
      });

      const cards = [
        { id: 'card-seed-1', creditLimit: new Decimal(10000), currency: 'SEK' },
        { id: 'card-seed-2', creditLimit: new Decimal(5000), currency: 'SEK' },
      ];
      mockDatabaseService.card.findMany.mockResolvedValue(cards);

      mockDatabaseService.transaction.groupBy.mockResolvedValue([
        {
          cardId: 'card-seed-1',
          _sum: { amount: new Decimal(2500) },
        },
        {
          cardId: 'card-seed-2',
          _sum: { amount: new Decimal(1000) },
        },
      ]);

      const result = await service.getSpendSummaryByCompany(companyId);

      expect(mockDatabaseService.card.findMany).toHaveBeenCalledWith({
        where: { companyId },
      });

      expect(mockDatabaseService.transaction.groupBy).toHaveBeenCalledWith({
        by: ['cardId'],
        where: {
          cardId: { in: ['card-seed-1', 'card-seed-2'] },
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          postedAt: { gte: expect.any(Date) },
        },
        _sum: { amount: true },
      });

      const expected: SpendSummaryItem[] = [
        {
          cardId: 'card-seed-1',
          creditLimit: 10000,
          spentThisMonth: 2500,
          remaining: 7500,
          currency: 'SEK',
        },
        {
          cardId: 'card-seed-2',
          creditLimit: 5000,
          spentThisMonth: 1000,
          remaining: 4000,
          currency: 'SEK',
        },
      ];

      expect(result).toEqual(expected);
    });

    it('should treat missing groupBy rows as spent 0', async () => {
      const companyId = 'company-1';

      mockDatabaseService.company.findUnique.mockResolvedValue({
        id: companyId,
      });

      const cards = [
        { id: 'card-seed-1', creditLimit: new Decimal(10000), currency: 'SEK' },
        { id: 'card-seed-2', creditLimit: new Decimal(2000), currency: 'SEK' },
      ];
      mockDatabaseService.card.findMany.mockResolvedValue(cards);

      mockDatabaseService.transaction.groupBy.mockResolvedValue([
        {
          cardId: 'card-seed-1',
          _sum: { amount: new Decimal(500) },
        },
      ]);

      const result = await service.getSpendSummaryByCompany(companyId);

      expect(result).toEqual([
        {
          cardId: 'card-seed-1',
          creditLimit: 10000,
          spentThisMonth: 500,
          remaining: 9500,
          currency: 'SEK',
        },
        {
          cardId: 'card-seed-2',
          creditLimit: 2000,
          spentThisMonth: 0,
          remaining: 2000,
          currency: 'SEK',
        },
      ]);
    });
  });
});
