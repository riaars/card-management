import { Test, TestingModule } from '@nestjs/testing';
import { SpendsController } from './spends.controller';
import { SpendsService } from './spends.service';

describe('SpendsController', () => {
  let controller: SpendsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SpendsController],
      providers: [SpendsService],
    }).compile();

    controller = module.get<SpendsController>(SpendsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
