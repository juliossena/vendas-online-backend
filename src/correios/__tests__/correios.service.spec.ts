import { HttpService } from '@nestjs/axios';
import { Test, TestingModule } from '@nestjs/testing';
import { Client } from 'nestjs-soap';
import { CityService } from '../../city/city.service';
import { CorreiosService } from '../correios.service';

describe('CorreiosService', () => {
  let service: CorreiosService;
  let cityService: CityService;
  let httpService: HttpService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CorreiosService,
        {
          provide: CityService,
          useValue: {},
        },
        {
          provide: 'SOAP_CORREIOS',
          useValue: {},
        },
        {
          provide: HttpService,
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<CorreiosService>(CorreiosService);
    cityService = module.get<CityService>(CityService);
    httpService = module.get<HttpService>(HttpService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(cityService).toBeDefined();
    expect(httpService).toBeDefined();
  });
});
