import { Injectable } from '@nestjs/common';
import { ethers } from 'ethers';
import { formatEther, formatUnits } from 'ethers/lib/utils';

const TOKEN_ADDRESS = "0x9EB8A789Ed1Bd38D281962b523349d5D17A37d47";

@Injectable()
export class XionService {
  provider: ethers.providers.Provider;
  tokenContract: ethers.Contract;
  tokenContractABI 

  constructor() {
    this.provider = ethers.getDefaultProvider('polygon');
    this.tokenContract = new ethers.Contract(
        TOKEN_ADDRESS,
        contractJson.abi,
        this.provider,
    );
    
    console.log('Construct Success !')
  }

  async getCirculation() {
    const balance_ = this.tokenContract.balanceOf();
    const balance = await formatEther(balance_);
    return { polygon: '42424242' };
  }

  

  async getTotal_Supply(): Promise<{}> {
    const result_ = await this.tokenContract.totalSupply();
    const result = await formatEther(result_)

    return { polygon: result };
  }
  getPrice() {
    return { polygon: '42424242' };
  }
}
