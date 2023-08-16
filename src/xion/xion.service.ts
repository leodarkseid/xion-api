import { Injectable } from '@nestjs/common';
import { ethers } from 'ethers';
import { formatEther, parseEther, formatUnits } from 'ethers/lib/utils';
import { Router } from 'express';

const provider = ethers.getDefaultProvider('polygon');


const TOKEN_ADDRESS = "0x9EB8A789Ed1Bd38D281962b523349d5D17A37d47";

const USDC = "0x0"
const ROUTER_ADDRESS = "0x0"

const ROUTER_ABI = ['function getAmountsOut(uint amountIn, address[] memory path) public view returns (uint[] memory accounts)']

const excludeList = ['d','d','e','e']

const amountIn = parseEther('1')

const path = [TOKEN_ADDRESS,USDC]

const router = new ethers.Contract(
    ROUTER_ADDRESS,
    ROUTER_ABI,
    provider
)

const call price = async () =>{
    const amounts = await router.getAmountsOut(amountIn, path);
    const price = formatUnits(amounts[1].toString(), 6)
    console.log('price', price)
}

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
    const totalSupply:number = await this.totalSupply()
        let totalExclude:number = 0
    for(const address of excludeList){
        const balance_ = this.tokenContract.balanceOf(address);
    const balance = parseFloat(formatEther(balance_));
    totalExclude += balance;
    }
    
    return { polygon: (totalSupply-totalExclude)};
  }

  async totalSupply(){
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
