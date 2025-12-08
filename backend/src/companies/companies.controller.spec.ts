import { Test, TestingModule } from '@nestjs/testing';
import { CompaniesController } from './companies.controller';
import { CompaniesService } from './companies.service';
import { CardsService } from '../cards/cards.service';
import { CompaniesParamDto } from './companies.zod';

describe('CompaniesController', () => {
  let controller: CompaniesController;
  const mockCompaniesService = {
    findAll: jest.fn(),
    findOne: jest.fn(),
  };
  const mockCardsService = {
    findAllCardsByCompany: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CompaniesController],
      providers: [
        {
          provide: CompaniesService,
          useValue: mockCompaniesService,
        },
        {
          provide: CardsService,
          useValue: mockCardsService,
        },
      ],
    }).compile();

    controller = module.get<CompaniesController>(CompaniesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should call CompaniesService.findAll and return result', async () => {
      const companies = [
        { id: 'company-seed-0001', name: 'Acme' },
        { id: 'company-seed-0002', name: 'Globex' },
      ];
      mockCompaniesService.findAll.mockResolvedValue(companies);

      const result = await controller.findAll();

      expect(mockCompaniesService.findAll).toHaveBeenCalledTimes(1);
      expect(result).toEqual(companies);
    });
  });

  describe('findOne', () => {
    it('should call CompaniesService.findOne with companyId from param', async () => {
      const param: CompaniesParamDto = { companyId: 'company-seed-0003' };
      const company = { id: 'company-seed-0003', name: 'Acme' };

      mockCompaniesService.findOne.mockResolvedValue(company);

      const result = await controller.findOne(param);

      expect(mockCompaniesService.findOne).toHaveBeenCalledWith(
        'company-seed-0003',
      );
      expect(result).toEqual(company);
    });
  });

  describe('findAllCardsByCompany', () => {
    it('should call CardsService.findAllCardsByCompany with companyId from param', async () => {
      const param: CompaniesParamDto = { companyId: 'company-seed-0001' };
      const cards = [
        {
          id: 'card-seed-0001',
          companyId: 'company-seed-0001',
          status: 'active',
        },
        {
          id: 'card-seed-0002',
          companyId: 'company-seed-0001',
          status: 'inactive',
        },
      ];

      mockCardsService.findAllCardsByCompany.mockResolvedValue(cards);

      const result = await controller.findAllCardsByCompany(param);

      expect(mockCardsService.findAllCardsByCompany).toHaveBeenCalledWith(
        'company-seed-0001',
      );
      expect(result).toEqual(cards);
    });
  });
});
