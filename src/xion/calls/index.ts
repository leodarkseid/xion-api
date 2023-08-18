import { ethers } from 'ethers';
import { formatEther, parseEther, formatUnits } from 'ethers/lib/utils';
import {
  TOKEN_ADDRESS,
  TOKEN_CONTRACT_ABI,
  provider,
  ROUTER_ABI,
  ROUTER_ADDRESS,
  excludeList,
  path,
  amountIn,
} from '../constants';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';

export const tokenContract = new ethers.Contract(
  TOKEN_ADDRESS,
  TOKEN_CONTRACT_ABI,
  provider,
);

export const router = new ethers.Contract(ROUTER_ADDRESS, ROUTER_ABI, provider);

export async function getCirculation_() {
  const totalSupplyAmount: number = await totalSupply();
  const balancePromises = excludeList.map((address) =>
    tokenContract.balanceOf(address),
  );
  const balances = await Promise.all(balancePromises);
  const totalExclude = balances.reduce(
    (acc, balance) => acc + parseFloat(formatEther(balance)),
    0,
  );
  return (totalSupplyAmount - totalExclude).toFixed(0);
}

export async function totalSupply() {
  const result_ = await tokenContract.totalSupply();
  const result = parseFloat(formatEther(result_));
  return result as number;
}

export async function price() {
  const amounts = await router.getAmountsOut(amountIn, path);
  const price = formatUnits(amounts[1].toString(), 6);
  const formattedPrice = parseFloat(price).toFixed(6);
  return formattedPrice;
}
