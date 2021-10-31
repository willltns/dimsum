import axios from 'axios'
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
  pageSize = 10
  value = ''
  searchedInputValue = ''
  type = 1
  noMore = false

  updateProp(property) {
    Object.assign(this, property)
  }

  getCoins = flow(
    function* (searchV = {}) {
      const { common } = this.getRoot()

      if (!searchV.value && searchV.type === undefined) return

      let params = { pageSize: this.pageSize, ...searchV }

      this.value = this.searchedInputValue || common.searchPromo
      this.type = params.type

      if (!params.value) params.value = undefined

      this.loading = true
      const isLoadMore = params.pageNo !== this.pageNo && params.pageNo !== 1
      this.pageNo = params.pageNo

      if (!isLoadMore) this.coinList = []
      try {
        const [res] = yield Promise.all([getCoinList(params), delay(0.7)]) // 至少 0.7s 左右的 loading 动画效果，交互体验更好
        this.coinList = isLoadMore ? this.coinList.concat(res?.list || []) : res?.list || []
        this.noMore = !res?.list?.length
        this.loading = false
      } catch (error) {
        if (!axios.isCancel(error)) this.loading = false
        this.searchedInputValue = ''
      }
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
