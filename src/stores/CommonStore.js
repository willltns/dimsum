import { makeAutoObservable, flow } from 'mobx'
import { getBanners, getChamp, getPromoCoins, getPromoVote } from '@/assets/xhr'

export class CommonStore {
  constructor() {
    makeAutoObservable(this, {}, { autoBind: true })
  }

  // state
  bannerData = []
  promoCoinList = []
  promoVoteChamp = {}
  promoVoteInfo = {}
  loading = false
  votedList = []

  // computed
  get wideBannerList() {
    return this.bannerData?.wideBanner || []
  }
  get scrollBannerList() {
    return this.bannerData?.scrollBanner || []
  }
  get popBanner() {
    return this.bannerData?.popBanner?.[0]
  }

  // action
  increase() {
    // get rootStore
    // const rootStore = this.getRoot()
    // this.count++
  }

  get votedIdList() {
    return this.votedList.map((item) => item.split('.')[0])
  }

  getVotedList() {
    const votedList = JSON.parse(localStorage.getItem('__ivot'))
    localStorage.removeItem('__ivot')

    const curTime = new Date().getTime() // TODO server time
    this.votedList = (votedList || []).filter((item) => item.split('.')[1] > curTime)
  }

  pushVoted(coinStr) {
    this.votedList.push(coinStr)
  }

  // Creating async action using generator
  getAdvert = flow(
    function* () {
      this.loading = true
      try {
        const [bannerData, promoCoinList, promoVoteChamp, promoVoteInfo] = yield Promise.all([
          getBanners(),
          getPromoCoins(),
          getChamp(),
          getPromoVote(),
        ])
        this.bannerData = bannerData
        this.promoCoinList = promoCoinList
        this.promoVoteChamp = promoVoteChamp
        this.promoVoteInfo = promoVoteInfo
      } catch (err) {}
      this.loading = false
    }.bind(this)
  )
}

function delay(second) {
  return new Promise((resolve) => setTimeout(() => resolve(second), second * 1000))
}
