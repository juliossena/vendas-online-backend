import { Controller, Get, Param } from '@nestjs/common';
import { CorreiosService } from './correios.service';
import { ResponsePriceCorreios } from './dto/response-price-correios';
import { ReturnCep } from './dto/return-cep.dto';

@Controller('correios')
export class CorreiosController {
  constructor(private readonly correiosService: CorreiosService) {}

  @Get(':cep')
  async findAll(@Param('cep') cep: string): Promise<ReturnCep> {
    return this.correiosService.findAddressByCep(cep);
  }
}
