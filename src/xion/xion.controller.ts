import { Controller, Get, NotFoundException } from '@nestjs/common';
import { XionService } from './xion.service';

@Controller('xion')
export class XionController {
  constructor(private readonly xionService: XionService) {}

  @Get('xgt')
  getStatus() {
    try{
    return { status: 'alive' };
}catch(error){
    console.log('getStatus',error)
    throw new NotFoundException();
}
  }

  @Get('xgt/circulation')
  getTotalCirculation() {
    try {
      return this.xionService.getCirculation();
    } catch (error) {
        console.log('getTotalCirculation', error);
      throw new NotFoundException();
    }
  }

  @Get('xgt/total_supply')
  getTotalSupply() {
    try {
      return this.xionService.getTotal_Supply();
    } catch (error) {
        console.log('getTotalSupply', error);
      throw new NotFoundException();
    }
  }

  @Get('xgt/price')
  getPrice() {
    try {
      return this.xionService.getPrice();
    } catch (error) {
        console.log('getPrice', error);
      throw new NotFoundException();
    }
  }
}
