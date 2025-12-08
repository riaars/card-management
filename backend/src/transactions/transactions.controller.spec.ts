import { Test, TestingModule } from '@nestjs/testing';
import { TransactionsController } from './transactions.controller';
import { TransactionsService } from './transactions.service';
import {
  LatestTransactionsQueryDto,
  TransactionsParamDto,
  TransactionsQueryDto,
} from './transactions.zod';

describe('TransactionsController', () => {
  let controller: TransactionsController;
  const mockTransactionsService = {
    findAllTransactionsByCard: jest.fn(),
    findLatestTransactionsByCard: jest.fn(),
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TransactionsController],
      providers: [
        {
          provide: TransactionsService,
          useValue: mockTransactionsService,
        },
      ],
    }).compile();

    controller = module.get<TransactionsController>(TransactionsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAllTransactionsByCard', () => {
    it('should call TransactionsService.findAllTransactionsByCard with cardId, page, pageSize, search', async () => {
      const param: TransactionsParamDto = { cardId: 'card-123' };

      const query: TransactionsQueryDto = {
        page: 2,
        pageSize: 20,
        search: 'coffee',
      };

      const mockResult = {
        transactions: [],
        page: 2,
        pageSize: 20,
        totalCount: 0,
        hasMore: false,
      };

      mockTransactionsService.findAllTransactionsByCard.mockResolvedValue(
        mockResult,
      );

      const result = await controller.findAllTransactionsByCard(param, query);

      expect(
        mockTransactionsService.findAllTransactionsByCard,
      ).toHaveBeenCalledWith('card-123', 2, 20, 'coffee');
      expect(result).toEqual(mockResult);
    });

    it('should work when search is undefined', async () => {
      const param: TransactionsParamDto = { cardId: 'card-456' };

      const query: TransactionsQueryDto = {
        page: 1,
        pageSize: 10,
        search: undefined,
      };

      const mockResult = {
        transactions: [],
        page: 1,
        pageSize: 10,
        totalCount: 0,
        hasMore: false,
      };

      mockTransactionsService.findAllTransactionsByCard.mockResolvedValue(
        mockResult,
      );

      const result = await controller.findAllTransactionsByCard(param, query);

      expect(
        mockTransactionsService.findAllTransactionsByCard,
      ).toHaveBeenCalledWith('card-456', 1, 10, undefined);
      expect(result).toEqual(mockResult);
    });
  });

  describe('latestByCard', () => {
    it('should call TransactionsService.findLatestTransactionsByCard with cardId and limit', async () => {
      const param: TransactionsParamDto = { cardId: 'card-999' };

      const query: LatestTransactionsQueryDto = {
        limit: 5,
      };

      const mockTransactions = [{ id: 'tx-1' }, { id: 'tx-2' }] as any[];

      mockTransactionsService.findLatestTransactionsByCard.mockResolvedValue(
        mockTransactions,
      );

      const result = await controller.latestByCard(param, query);

      expect(
        mockTransactionsService.findLatestTransactionsByCard,
      ).toHaveBeenCalledWith('card-999', 5);
      expect(result).toEqual(mockTransactions);
    });
  });
});
