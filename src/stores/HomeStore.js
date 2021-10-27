import { makeAutoObservable, flow } from 'mobx'

import { getCoinList, voteCoin } from '@/assets/xhr'

export class HomeStore {
  constructor() {
    makeAutoObservable(this, {}, { autoBind: true })
  }

  // state
  loading = true
  coinList = []
  votingId = null
  pageNo = 1
  pageSize = 1
  value = ''
  type = 1
  noMore = false

  updateProp(property) {
    Object.assign(this, property)
  }

  getCoins = flow(
    function* (searchV = {}) {
      if (!searchV.value && searchV.type === undefined) return
      let params = { type: this.type, value: this.value, pageNo: this.pageNo, pageSize: this.pageSize, ...searchV }
      const isLoadMore = searchV.pageNo !== this.pageNo && searchV.pageNo !== 1
      if (searchV?.pageNo) this.updateProp({ ...searchV })
      if (!params.value) params.value = undefined

      this.loading = true
      if (!isLoadMore) this.coinList = []
      try {
        const [res] = yield Promise.all([getCoinList(params), delay(0.7)]) // 至少 0.7s 左右的 loading 动画效果，交互体验更好
        this.noMore = !res?.list?.length
        this.coinList = isLoadMore ? this.coinList.concat(res?.list || []) : res?.list || []
      } catch (err) {}
      this.loading = false
    }.bind(this)
  )

  // Creating async action using generator
  handleVote = flow(
    function* (coin, updateCoinList, updatePromoList) {
      if (this.votingId) return
      const { id } = coin
      this.votingId = id

      const { common } = this.getRoot()

      try {
        const timestamp = yield voteCoin({ id })

        const votedStr = `${id}.${timestamp}`
        common.pushVoted(votedStr)
        coin.coinUpvotes = coin.coinUpvotes ? coin.coinUpvotes + 1 : 1
        coin.coinUpvotesToday = coin.coinUpvotesToday ? coin.coinUpvotesToday + 1 : 1

        if (updateCoinList) {
          const found = this.coinList.find((c) => c.id === id)
          found && ++found.coinUpvotes && ++found.coinUpvotesToday
        }
        if (updatePromoList) {
          const found = common.promoCoinList.find((c) => c.id === id)
          found && ++found.coinUpvotes && ++found.coinUpvotesToday
        }
      } catch (err) {}

      this.votingId = null
    }.bind(this)
  )
}

function delay(s) {
  return new Promise((resolve) => setTimeout(resolve, s * 1000))
}
