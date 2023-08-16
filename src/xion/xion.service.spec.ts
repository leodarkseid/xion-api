import { Test, TestingModule } from '@nestjs/testing';
import { XionService } from './xion.service';

describe('XionService', () => {
  let service: XionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [XionService],
    }).compile();

    service = module.get<XionService>(XionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
