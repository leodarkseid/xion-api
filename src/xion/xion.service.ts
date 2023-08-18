import { Injectable } from '@nestjs/common';
import { ethers } from 'ethers';
import { formatEther, parseEther, formatUnits } from 'ethers/lib/utils';
import { TOKEN_CONTRACT_ABI } from './constants';
import { Router } from 'express';

const provider = ethers.getDefaultProvider('polygon');

const TOKEN_ADDRESS = '0x9EB8A789Ed1Bd38D281962b523349d5D17A37d47';

const USDC = '0x2791bca1f2de4661ed88a30c99a7a9449aa84174';
const ROUTER_ADDRESS = '0xf38a7A7Ac2D745E2204c13F824c00139DF831FFf';

const ROUTER_ABI = [
  'function getAmountsOut(uint amountIn, address[] memory path) public view returns (uint[] memory accounts)',
];

const excludeList = [
  '0xCB66C450B338067b0134a121C27c4dc688Da9270',
  '0x5540eE86E9f11D6670C41e934DFc2AC28fe378e5',
  '0x4C22Aac7B491cD4314B84bf03D7Fc5D19D30Fc9e',
  '0xa4333466d6c9483ca91C041D74E690A141D0bFb6',
  '0x2814e2b7E8915451b0c12C41a6d9aE377a6c4DD6',
  '0xf560ff907f3a5C377E0bDdA10c27D7a1961a86A7',
  '0x2e354d027924b000ba3dcdbdb458104cc2cc0fae',
  '0x04bda42de3bc32abb00df46004204424d4cf8287',
  '0xb0a402cdfc8e24a7446af738d063c0a730c9e4fd',
  '0xD0D23CcC0d9A853DD92Cfbade73967036ADBAeBB',
  '0xbafaaf1d73603fa45ad111ad79c7a63395030e58',
  '0xca6518489d7f955aa0c0c28ffa212f49dd80c99d',
  '0x9DFBb299E3d32A83776658e1ece81836A75DB872',
  '0xe49715c2f2d8004937d208b81736e0fddef73d6c',
  '0x6D775C9B6df7c28A93E509797574a1bdaF18756B',
  '0x7efd1f29734a976bd12bc1ce60e3a48cd6053d56',
  '0x826bcea879e4496ed163bcc128926b5627e1f08d',
  '0x0d548260cea4f4e129c79336ddbc3573c65ffe0a',
  '0xf4894288494d4d30bf1e00403b2d303f786af754',
  '0x17c15dedd3b55dde78295b3565f9b0bfea8937b9',
];

const amountIn = parseEther('1');

const path = [TOKEN_ADDRESS, USDC];

const router = new ethers.Contract(ROUTER_ADDRESS, ROUTER_ABI, provider);

const call_price = async () => {
  const amounts = await router.getAmountsOut(amountIn, path);
  const price = formatUnits(amounts[1].toString(), 6);
  console.log('price', price);
};

@Injectable()
export class XionService {
  provider: ethers.providers.Provider;
  tokenContract: ethers.Contract;
  tokenContractABI;

  constructor() {
    this.provider = ethers.getDefaultProvider('polygon');

    this.tokenContract = new ethers.Contract(
      TOKEN_ADDRESS,
      TOKEN_CONTRACT_ABI,
      this.provider,
    );

    console.log('Construct Success !');
  }

  async getCirculation() {
    const totalSupply: number = await this.totalSupply();
    let totalExclude: number = 0;
    for (const address of excludeList) {
      const balance_ = this.tokenContract.balanceOf(address);
      const balance = parseFloat(formatEther(balance_));
      totalExclude += balance;
    }

    return { polygon: totalSupply - totalExclude };
  }

  async totalSupply() {
    const result_ = await this.tokenContract.totalSupply();
    const result = parseFloat(formatEther(result_));
    return result;
  }

  async getTotal_Supply(): Promise<{}> {
    return { polygon: await this.totalSupply() };
  }
  getPrice() {
    return { polygon: '42424242' };
  }
}
