import { Test, TestingModule } from '@nestjs/testing';
import { CorreiosService } from '../correios.service';

describe('CorreiosService', () => {
  let service: CorreiosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CorreiosService],
    }).compile();

    service = module.get<CorreiosService>(CorreiosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
