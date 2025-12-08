import { Test, TestingModule } from '@nestjs/testing';
import { CardsService } from './cards.service';
import { DatabaseService } from '../database/database.service';
import { Card } from '@prisma/client';

describe('CardsService', () => {
  let service: CardsService;

  const mockDatabaseService = {
    card: {
      findUnique: jest.fn(),
      findMany: jest.fn(),
      update: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CardsService,
        {
          provide: DatabaseService,
          useValue: mockDatabaseService,
        },
      ],
    }).compile();

    service = module.get<CardsService>(CardsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findOne', () => {
    it('should return the card detais if exists', async () => {
      const cardId = 'card-seed-0001';
      mockDatabaseService.card.findUnique.mockResolvedValue({
        id: cardId,
        maskedNumber: '**** **** **** 1234',
        company: {
          id: 'company-seed-0001',
          name: 'Company AB',
        },
      });

      const result = await service.findOne(cardId);

      expect(mockDatabaseService.card.findUnique).toHaveBeenCalledWith({
        where: { id: cardId },
        include: { company: true },
      });

      expect(result).toEqual({
        id: cardId,
        company: 'Company AB',
        maskedNumber: '**** **** **** 1234',
      });
    });
  });

  describe('findAllCardByCompany', () => {
    it('should return all the cards owned by the company', async () => {
      const companyId = 'company-seed-0001';
      mockDatabaseService.card.findMany.mockResolvedValue([
        {
          id: 'card-seed-1',
          companyId,
          maskedNumber: '**** **** **** 1234',
          status: 'active',
          createdAt: new Date('2024-01-01'),
          updatedAt: new Date('2024-01-02'),
          invoices: [{ id: 'inv-1', status: 'paid' }],
          invoiceStatus: 'paid',
        },

        {
          id: 'card-seed-2',
          companyId,
          maskedNumber: '**** **** **** 4567',
          status: 'active',
          createdAt: new Date('2024-01-01'),
          updatedAt: new Date('2024-01-02'),
          invoices: [{ id: 'inv-1', status: 'due' }],
          invoiceStatus: 'due',
        },
      ]);

      const result = await service.findAllCardsByCompany(companyId);

      expect(mockDatabaseService.card.findMany).toHaveBeenCalledWith({
        where: { companyId },
        include: { invoices: true },
        orderBy: { createdAt: 'asc' },
      });

      expect(result).toHaveLength(2);
      expect(result[0]).toMatchObject({
        id: 'card-seed-1',
        invoiceStatus: 'paid',
      });

      expect(result[1]).toMatchObject({
        id: 'card-seed-2',
        invoiceStatus: 'due',
      });
    });
  });

  describe('activateCard', () => {
    it('should update card status to active when not active', async () => {
      const cardId = 'card-seed-1';
      const existingCard: Partial<Card> = {
        id: cardId,
        status: 'inactive' as Card['status'],
      };
      const updatedCard: Partial<Card> = {
        id: cardId,
        status: 'active' as Card['status'],
      };

      mockDatabaseService.card.findUnique.mockResolvedValue(existingCard);

      mockDatabaseService.card.update.mockResolvedValue(updatedCard);

      const result = await service.activateCard(cardId);

      expect(mockDatabaseService.card.findUnique).toHaveBeenCalledWith({
        where: { id: cardId },
      });

      expect(mockDatabaseService.card.update).toHaveBeenCalledWith({
        where: { id: cardId },
        data: { status: 'active' },
      });

      expect(result).toBe(updatedCard);
    });
  });

  describe('deactivateCard', () => {
    it('should update card status to inactive when active', async () => {
      const cardId = 'card-seed-2';
      const existingCard: Partial<Card> = {
        id: cardId,
        status: 'active' as Card['status'],
      };
      const updatedCard: Partial<Card> = {
        id: cardId,
        status: 'inactive' as Card['status'],
      };

      mockDatabaseService.card.findUnique.mockResolvedValue(existingCard);

      mockDatabaseService.card.update.mockResolvedValue(updatedCard);

      const result = await service.deactivateCard(cardId);

      expect(mockDatabaseService.card.findUnique).toHaveBeenCalledWith({
        where: { id: cardId },
      });

      expect(mockDatabaseService.card.update).toHaveBeenCalledWith({
        where: { id: cardId },
        data: { status: 'inactive' },
      });

      expect(result).toBe(updatedCard);
    });
  });
});
