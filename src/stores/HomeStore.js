import { makeAutoObservable, flow } from 'mobx'

import { getCoinList, voteCoin } from '@/assets/xhr'

const coinL = [
  {
    id: '1',
    coinName: 'VV',
    coinSymbol: 'V',
    coinLogo: 'xcc',
    coinLaunchDate: '2020-12-12 12:00',
    coinPresaleInfo: '发发发',
    coinAirdropInfo: '先休息',
    coinUpvotes: '22231',
    coinUpvotesToday: '231',
    linkWebsite: 'www.baidu.com',
    linkChineseTg: '',
    linkEnglishTg: 't.me/liangjianshequ',
    linkTwitter: 'twitter.com',
    linkDiscord: '',
    linkMedium: '',
    linkAdditionalInfo: '',
  },
  {
    id: '2',
    coinName: 'BBCX',
    coinSymbol: 'NN',
    coinLogo: 'NN',
    coinLaunchDate: '2020-12-12 12:00',
    coinPresaleInfo: '发发发',
    coinAirdropInfo: '先休息',
    coinUpvotes: '22231',
    coinUpvotesToday: '231',
    linkWebsite: 'www.baidu.com',
    linkChineseTg: '',
    linkEnglishTg: 't.me/liangjianshequ',
    linkTwitter: 'twitter.com',
    linkDiscord: '',
    linkMedium: '',
    linkAdditionalInfo: '',
  },
]

export class HomeStore {
  constructor() {
    makeAutoObservable(this, {}, { autoBind: true })
  }

  // state
  coinList = []
  votingId = null
  pageNo = 1
  pageSize = 10
  value = ''
  type = 1

  // computed

  updateProp(property) {
    Object.assign(this, property)
  }

  // action
  increase() {
    // get rootStore
    // const rootStore = this.getRoot()
    this.count++
  }

  getCoins = flow(
    function* (searchV = {}) {
      if (!searchV.value && searchV.type === undefined) return
      let params = { type: this.type, value: this.value, pageNo: this.pageNo, pageSize: this.pageSize, ...searchV }
      const isLoadMore = searchV.pageNo !== this.pageNo && searchV.pageNo !== 1
      if (searchV?.pageNo) this.updateProp({ ...searchV })
      console.log('search', params, isLoadMore)

      this.loading = true
      try {
        const res = yield getCoinList(params)
      } catch (err) {}
      this.coinList = coinL
      this.loading = false
    }.bind(this)
  )

  // Creating async action using generator
  handleVote = flow(
    function* (coin) {
      if (this.votingId) return

      const { id } = coin
      const { common } = this.getRoot()

      // if (common.votedIdList.includes(id + '')) {
      //   ++coin.coinUpvotes
      //   ++coin.coinUpvotesToday
      //   return
      // }

      this.votingId = coin.id
      try {
        //const timestamp = yield voteCoin({ id })
        const timestamp = yield delay(3)

        const votedStr = `${id}.${new Date().getTime() + 10000}`
        const { common } = this.getRoot()
        common.pushVoted(votedStr)
        ++coin.coinUpvotes
        ++coin.coinUpvotesToday
      } catch (err) {}

      // const votedStr = `${id}.${new Date().getTime() + 10000}`
      // common.pushVoted(votedStr)
      // ++coin.coinUpvotes
      // ++coin.coinUpvotesToday

      this.votingId = null
    }.bind(this)
  )
}

function delay(second) {
  return new Promise((resolve) => setTimeout(resolve, second * 1000))
}
