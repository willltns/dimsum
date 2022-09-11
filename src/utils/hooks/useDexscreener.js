import React from 'react'
import {
  BSC_PAIR_TARGET,
  BSC_PROV,
  contractReg,
  ETH_PAIR_TARGET,
  ETH_PROV,
  TOKEN_ABI,
  PAN_ABI,
  PAN_FAC_ADDR,
  UNI_ABI,
  UNI_FAC_ADDR,
} from '@/consts'
import Web3 from 'web3'

export const useDexscreener = (coinContract, chainId) => {
  const [chartUrl, setChartUrl] = React.useState(null)

  React.useEffect(() => {
    if (chainId !== 7 && chainId !== 8) return
    if (!contractReg.test(coinContract)) return
    ;(async () => {
      const isBsc = chainId === 7
      const provider = new Web3.providers.HttpProvider(isBsc ? BSC_PROV : ETH_PROV)
      const web3 = new Web3(provider)
      const contract = new web3.eth.Contract(isBsc ? PAN_ABI : UNI_ABI, isBsc ? PAN_FAC_ADDR : UNI_FAC_ADDR)

      const loopPairTarget = isBsc ? BSC_PAIR_TARGET : ETH_PAIR_TARGET
      for (let i = 0; i < loopPairTarget.length; i++) {
        try {
          const pair = await contract.methods.getPair(coinContract, loopPairTarget[i]).call()

          const tokenC = new web3.eth.Contract(TOKEN_ABI, loopPairTarget[i])
          const balance = await tokenC.methods.balanceOf(pair).call()
          const decimal = !isBsc && (i === 1 || i === 2) ? 6 : 18
          const realBalance = Number(balance / 10 ** decimal).toFixed(2)
          // bnb > 1, eth > 0.5, usd > 200
          const hasPlentyBalance = i === 0 ? (isBsc ? realBalance > 1 : realBalance > 0.5) : realBalance > 200
          // console.log(pair, realBalance, hasPlentyBalance, ' --- pair and balance')
          if (+pair && hasPlentyBalance) {
            setChartUrl(`https://dexscreener.com/${isBsc ? 'bsc' : 'ethereum'}/${pair}`)
            break
          }
        } catch (error) {
          // console.log(error, ' --- web3 error.')
        }
      }
    })()
  }, [coinContract, chainId])

  return chartUrl
}
