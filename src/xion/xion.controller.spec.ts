import { Test, TestingModule } from '@nestjs/testing';
import { XionController } from './xion.controller';

describe('XionController', () => {
  let controller: XionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [XionController],
    }).compile();

    controller = module.get<XionController>(XionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
