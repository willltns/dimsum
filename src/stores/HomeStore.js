import { makeAutoObservable, flow } from 'mobx'

import { getCoinList, voteCoin } from '@/assets/xhr'

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

  updateProp(property) {
    Object.assign(this, property)
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
        this.coinList = res?.list || []
      } catch (err) {}
      // this.coinList = coinL
      this.loading = false
    }.bind(this)
  )

  // Creating async action using generator
  handleVote = flow(
    function* (coin) {
      if (this.votingId) return

      const { id } = coin
      const { common } = this.getRoot()

      this.votingId = id
      try {
        const timestamp = yield voteCoin({ id })
        // const timestamp = yield delay(3)

        // TODO 服务器返回时间戳 + 3600000s
        const votedStr = `${id}.${new Date().getTime() + 10000}`
        common.pushVoted(votedStr)
        coin.coinUpvotes = coin.coinUpvotes ? coin.coinUpvotes + 1 : 1
        coin.coinUpvotesToday = coin.coinUpvotesToday ? coin.coinUpvotesToday + 1 : 1
      } catch (err) {}

      this.votingId = null
    }.bind(this)
  )
}
