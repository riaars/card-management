import { Test, TestingModule } from '@nestjs/testing';
import { CardsController } from './cards.controller';
import { CardsService } from './cards.service';
import { CardIdParamDto } from './cards.zod';

describe('CardsController', () => {
  let controller: CardsController;

  const mockCardsService = {
    findOne: jest.fn(),
    activateCard: jest.fn(),
    deactivateCard: jest.fn(),
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CardsController],
      providers: [
        {
          provide: CardsService,
          useValue: mockCardsService,
        },
      ],
    }).compile();

    controller = module.get<CardsController>(CardsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getCardDetails', () => {
    it('should call CardsService.findOne with the cardId', async () => {
      const param: CardIdParamDto = { cardId: 'card-seed-0001' };
      const mockResponse = {
        id: 'card-seed-0001',
        maskedNumber: '**** 1234',
        company: 'Acme',
      };

      mockCardsService.findOne.mockResolvedValue(mockResponse);

      const result = await controller.getCardDetails(param);

      expect(mockCardsService.findOne).toHaveBeenCalledWith('card-seed-0001');
      expect(result).toEqual(mockResponse);
    });
  });

  describe('activateCard', () => {
    it('should call CardsService.activateCard with the cardId', async () => {
      const param: CardIdParamDto = { cardId: 'card-seed-0002' };
      const mockResponse = { id: 'card-seed-0002', status: 'active' };

      mockCardsService.activateCard.mockResolvedValue(mockResponse);

      const result = await controller.activateCard(param);

      expect(mockCardsService.activateCard).toHaveBeenCalledWith(
        'card-seed-0002',
      );
      expect(result).toEqual(mockResponse);
    });
  });

  describe('deactivateCard', () => {
    it('should call CardsService.deactivateCard with the cardId', async () => {
      const param: CardIdParamDto = { cardId: 'card-seed-0003' };
      const mockResponse = { id: 'card-seed-0003', status: 'inactive' };

      mockCardsService.deactivateCard.mockResolvedValue(mockResponse);

      const result = await controller.deactivateCard(param);

      expect(mockCardsService.deactivateCard).toHaveBeenCalledWith(
        'card-seed-0003',
      );
      expect(result).toEqual(mockResponse);
    });
  });
});
