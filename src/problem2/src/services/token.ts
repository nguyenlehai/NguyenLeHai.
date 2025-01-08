import { TokenItemTyped } from '../type'
import {tokenListData} from "../utils/constants.ts";
import {formatNumber} from "../utils/utils.ts";

// Simulator delay cho API calls
const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

export const getTokenList = async (keyword?: string): Promise<TokenItemTyped[]> => {
  await sleep(1000)
  // return axiosInstance.get('/tokens', { params: { keyword } })
  return tokenListData.filter(item => 
    keyword ? item.currency.toLowerCase().includes(keyword.toLowerCase()) : true
  )
}

export const getExchangeRate = async (from: string, to: string): Promise<number> => {
  await sleep(1000)
  // return axiosInstance.get(`/exchange-rate`, { params: { from, to } })
  const fromToken = tokenListData.find(item => item.currency === from)
  const toToken = tokenListData.find(item => item.currency === to)
  if (fromToken && toToken) {
    return formatNumber(fromToken.price / toToken.price)
  }
  return 0
}

export const updateSwapToken = async () => {
  await sleep(1000)
  return true
  // return axiosInstance.post('/swap')
}
