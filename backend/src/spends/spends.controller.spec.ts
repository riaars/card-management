import { Test, TestingModule } from '@nestjs/testing';
import { SpendsController } from './spends.controller';
import { SpendsService } from './spends.service';
import { CardsSpendParamDto, CompaniesSpendParamDto } from './spends.zod';

describe('SpendsController', () => {
  let controller: SpendsController;
  const mockSpendsService = {
    getSpendSummaryByCompany: jest.fn(),
    getSpendSummaryByCard: jest.fn(),
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SpendsController],
      providers: [
        {
          provide: SpendsService,
          useValue: mockSpendsService,
        },
      ],
    }).compile();

    controller = module.get<SpendsController>(SpendsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getSpendSummaryByCompany', () => {
    it('should call SpendsService.getSpendSummaryByCompany with companyId from param', async () => {
      const param: CompaniesSpendParamDto = { companyId: 'company-123' };

      const mockSummary = [
        {
          cardId: 'card-1',
          creditLimit: 10000,
          spentThisMonth: 2500,
          remaining: 7500,
          currency: 'USD',
        },
      ];

      mockSpendsService.getSpendSummaryByCompany.mockResolvedValue(mockSummary);

      const result = await controller.getSpendSummaryByCompany(param);

      expect(mockSpendsService.getSpendSummaryByCompany).toHaveBeenCalledWith(
        'company-123',
      );
      expect(result).toEqual(mockSummary);
    });
  });

  describe('getSpendSummaryByCard', () => {
    it('should call SpendsService.getSpendSummaryByCard with cardId from param', async () => {
      const param: CardsSpendParamDto = { cardId: 'card-999' };

      const mockSummary = {
        cardId: 'card-999',
        creditLimit: 5000,
        spentThisMonth: 1200,
        remaining: 3800,
        currency: 'EUR',
      };

      mockSpendsService.getSpendSummaryByCard.mockResolvedValue(mockSummary);

      const result = await controller.getSpendSummaryByCard(param);

      expect(mockSpendsService.getSpendSummaryByCard).toHaveBeenCalledWith(
        'card-999',
      );
      expect(result).toEqual(mockSummary);
    });
  });
});
