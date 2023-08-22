import { Injectable } from '@nestjs/common';
import { totalSupply, getCirculation_, price, dynamicPrice } from './calls';

@Injectable()
export class XionService {
  async getCirculation() {
    return { polygon: await getCirculation_() };
  }

  async getTotal_Supply(): Promise<{}> {
    const result = await totalSupply();
    return { polygon: result.toString() };
  }

  async getPrice() {
    return { polygon: await price() };
  }
  async getDynamicPrice(token: string, stable: string) {
    return { polygon: await dynamicPrice(token, stable) };
  }
}
