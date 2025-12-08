import { Test, TestingModule } from '@nestjs/testing';
import { CompaniesService } from './companies.service';
import { DatabaseService } from '../database/database.service';

describe('CompaniesService', () => {
  let service: CompaniesService;

  const mockDatabaseService = {
    company: {
      findUnique: jest.fn(),
      findMany: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CompaniesService,
        {
          provide: DatabaseService,
          useValue: mockDatabaseService,
        },
      ],
    }).compile();

    service = module.get<CompaniesService>(CompaniesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findOne', () => {
    it('should return the company details', async () => {
      const companyId = 'company-seed-0001';
      mockDatabaseService.company.findUnique.mockResolvedValue({
        id: companyId,
        name: 'Company AB',
        logoUrl: 'https://dummyimage.com/200x200/000/fff.png&text=Company+AB',
        createdAt: '2025-12-06T12:21:44.610Z',
      });

      const result = await service.findOne(companyId);

      expect(mockDatabaseService.company.findUnique).toHaveBeenCalledWith({
        where: { id: companyId },
      });

      expect(result).toEqual({
        id: companyId,
        name: 'Company AB',
        logoUrl: 'https://dummyimage.com/200x200/000/fff.png&text=Company+AB',
        createdAt: '2025-12-06T12:21:44.610Z',
      });
    });
  });

  describe('findAll', () => {
    it('should return all the companies', async () => {
      mockDatabaseService.company.findMany.mockResolvedValue([
        {
          id: 'company-seed-0001',
          name: 'Company AB',
          logoUrl: 'https://dummyimage.com/200x200/000/fff.png&text=Company+AB',
          createdAt: '2025-12-06T12:21:44.610Z',
        },
        {
          id: 'company-seed-0002',
          name: 'Foretag AB',
          logoUrl: 'https://dummyimage.com/200x200/000/fff.png&text=Foretag+AB',
          createdAt: '2025-12-06T12:21:44.610Z',
        },
      ]);

      const result = await service.findAll();

      expect(mockDatabaseService.company.findMany).toHaveBeenCalled();

      expect(result).toHaveLength(2);

      expect(result[0]).toMatchObject({
        id: 'company-seed-0001',
        name: 'Company AB',
        logoUrl: 'https://dummyimage.com/200x200/000/fff.png&text=Company+AB',
        createdAt: '2025-12-06T12:21:44.610Z',
      });

      expect(result[1]).toMatchObject({
        id: 'company-seed-0002',
        name: 'Foretag AB',
        logoUrl: 'https://dummyimage.com/200x200/000/fff.png&text=Foretag+AB',
        createdAt: '2025-12-06T12:21:44.610Z',
      });
    });
  });
});
