import { Test, TestingModule } from '@nestjs/testing';
import { TransactionsService } from './transactions.service';
import { DatabaseService } from '../database/database.service';
import { Transaction } from '@prisma/client';
import { NotFoundException } from '@nestjs/common';
import { Decimal } from '@prisma/client/runtime/library';

describe('TransactionsService', () => {
  let service: TransactionsService;
  const mockDatabaseService = {
    transaction: {
      findMany: jest.fn(),
      count: jest.fn(),
    },
    company: {
      findUnique: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TransactionsService,
        {
          provide: DatabaseService,
          useValue: mockDatabaseService,
        },
      ],
    }).compile();

    service = module.get<TransactionsService>(TransactionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAllTransactionsByCompany', () => {
    it('should return paginated transactions with amount converted to number and hasMore true', async () => {
      const companyId = 'company-1';
      const page = 2;
      const pageSize = 2;
      const skip = (page - 1) * pageSize;

      mockDatabaseService.transaction.findMany.mockResolvedValue([
        {
          id: 'tx-1',
          amount: { toNumber: () => 100.5 },
          postedAt: new Date('2024-01-02'),
        },
        {
          id: 'tx-2',
          amount: { toNumber: () => 200 },
          postedAt: new Date('2024-01-01'),
        },
      ]);
      mockDatabaseService.transaction.count.mockResolvedValue(10);

      const result = await service.findAllTransactionsByCompany(
        companyId,
        page,
        pageSize,
      );

      expect(mockDatabaseService.transaction.findMany).toHaveBeenCalledWith({
        where: {
          card: { companyId },
        },
        orderBy: { postedAt: 'desc' },
        skip,
        take: pageSize,
      });

      expect(mockDatabaseService.transaction.count).toHaveBeenCalledWith({
        where: { id: companyId },
      });

      expect(result.transactions).toEqual([
        expect.objectContaining({ id: 'tx-1', amount: 100.5 }),
        expect.objectContaining({ id: 'tx-2', amount: 200 }),
      ]);
      expect(result.page).toBe(page);
      expect(result.pageSize).toBe(pageSize);
      expect(result.totalCount).toBe(10);
      expect(result.hasMore).toBe(true);
    });

    it('should set hasMore to false when there are no more results', async () => {
      const companyId = 'company-1';
      const page = 1;
      const pageSize = 2;

      mockDatabaseService.transaction.findMany.mockResolvedValue([
        {
          id: 'tx-1',
          amount: { toNumber: () => 100 },
          postedAt: new Date('2024-01-02'),
        },
        {
          id: 'tx-2',
          amount: { toNumber: () => 200 },
          postedAt: new Date('2024-01-01'),
        },
      ]);
      mockDatabaseService.transaction.count.mockResolvedValue(2);

      const result = await service.findAllTransactionsByCompany(
        companyId,
        page,
        pageSize,
      );

      expect(result.hasMore).toBe(false);
    });
  });

  describe('findLatestTransactionsByCompany', () => {
    it('should throw NotFoundException when company does not exist', async () => {
      const companyId = 'missing-company';

      mockDatabaseService.company.findUnique.mockResolvedValue(null);

      await expect(
        service.findLatestTransactionsByCompany(companyId, 5),
      ).rejects.toThrow(NotFoundException);
      await expect(
        service.findLatestTransactionsByCompany(companyId, 5),
      ).rejects.toThrow('Company not found');

      expect(mockDatabaseService.company.findUnique).toHaveBeenCalledWith({
        where: { id: companyId },
        select: { id: true },
      });
    });

    it('should return latest transactions when company exists', async () => {
      const companyId = 'company-1';
      const limit = 3;

      mockDatabaseService.company.findUnique.mockResolvedValue({
        id: companyId,
      });

      const transactions: Transaction[] = [
        {
          id: 'tx-1',
          cardId: 'card-1',
          amount: new Decimal(129),
          postedAt: new Date('2024-01-03'),
          createdAt: new Date(),
          description: 'Test 1',
          category: 'Category 1',
          dataPointsSummary: null,
          currency: 'SEK',
        },
      ];

      mockDatabaseService.transaction.findMany.mockResolvedValue(transactions);

      const result = await service.findLatestTransactionsByCompany(
        companyId,
        limit,
      );

      expect(mockDatabaseService.company.findUnique).toHaveBeenCalledWith({
        where: { id: companyId },
        select: { id: true },
      });

      expect(mockDatabaseService.transaction.findMany).toHaveBeenCalledWith({
        where: {
          card: { companyId },
        },
        orderBy: { postedAt: 'desc' },
        take: limit,
      });

      expect(result).toBe(transactions);
    });
  });

  describe('findAllTransactionsByCard', () => {
    it('should return paginated transactions with amount converted to number (no search)', async () => {
      const cardId = 'card-1';
      const page = 1;
      const pageSize = 2;
      const skip = 0;

      mockDatabaseService.transaction.findMany.mockResolvedValue([
        {
          id: 'tx-1',
          cardId,
          amount: { toNumber: () => 50 },
          postedAt: new Date('2024-01-02'),
        },
        {
          id: 'tx-2',
          cardId,
          amount: { toNumber: () => 75.5 },
          postedAt: new Date('2024-01-01'),
        },
      ]);
      mockDatabaseService.transaction.count.mockResolvedValue(2);

      const result = await service.findAllTransactionsByCard(
        cardId,
        page,
        pageSize,
      );

      expect(mockDatabaseService.transaction.findMany).toHaveBeenCalledWith({
        where: {
          cardId,
          OR: undefined,
        },
        orderBy: { postedAt: 'desc' },
        skip,
        take: pageSize,
      });

      expect(mockDatabaseService.transaction.count).toHaveBeenCalledWith({
        where: {
          cardId,
          OR: undefined,
        },
      });

      expect(result.transactions).toEqual([
        expect.objectContaining({ id: 'tx-1', amount: 50 }),
        expect.objectContaining({ id: 'tx-2', amount: 75.5 }),
      ]);
      expect(result.page).toBe(page);
      expect(result.pageSize).toBe(pageSize);
      expect(result.totalCount).toBe(2);
      expect(result.hasMore).toBe(false);
    });

    it('should include OR filters when search is provided', async () => {
      const cardId = 'card-1';
      const page = 1;
      const pageSize = 10;
      const search = 'coffee';

      mockDatabaseService.transaction.findMany.mockResolvedValue([]);
      mockDatabaseService.transaction.count.mockResolvedValue(0);

      await service.findAllTransactionsByCard(cardId, page, pageSize, search);

      const expectedOR = [
        { description: { contains: search, mode: 'insensitive' } },
        { category: { contains: search, mode: 'insensitive' } },
        {
          dataPointsSummary: { contains: search, mode: 'insensitive' },
        },
      ];

      expect(mockDatabaseService.transaction.findMany).toHaveBeenCalledWith({
        where: {
          cardId,
          OR: expectedOR,
        },
        orderBy: { postedAt: 'desc' },
        skip: 0,
        take: pageSize,
      });

      expect(mockDatabaseService.transaction.count).toHaveBeenCalledWith({
        where: {
          cardId,
          OR: expectedOR,
        },
      });
    });
  });

  describe('findLatestTransactionsByCard', () => {
    it('should return latest transactions for a card', async () => {
      const cardId = 'card-1';
      const limit = 3;

      const transactions: Transaction[] = [
        {
          id: 'tx-1',
          cardId,
          amount: new Decimal(500),
          postedAt: new Date('2024-01-03'),
          createdAt: new Date(),
          description: 'Test 1',
          category: 'Cat 1',
          dataPointsSummary: null,
          currency: 'SEK',
        },
      ];

      mockDatabaseService.transaction.findMany.mockResolvedValue(transactions);

      const result = await service.findLatestTransactionsByCard(cardId, limit);

      expect(mockDatabaseService.transaction.findMany).toHaveBeenCalledWith({
        where: { cardId },
        orderBy: { postedAt: 'desc' },
        take: limit,
      });

      expect(result).toBe(transactions);
    });
  });
});
