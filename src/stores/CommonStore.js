import { makeAutoObservable, flow } from 'mobx'
import { getBanners, getPromoCoins, getServTime } from '@/assets/xhr'

export class CommonStore {
  constructor() {
    makeAutoObservable(this, {}, { autoBind: true })
  }

  // state
  bannerData = []
  promoCoinList = []
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
  updateProp(property) {
    Object.assign(this, property)
  }

  get votedIdList() {
    return this.votedList.map((item) => item.split('.')[0])
  }

  getVotedList() {
    const votedList = JSON.parse(localStorage.getItem('__ivot'))
    localStorage.removeItem('__ivot')

    getServTime()
      .then((res) => (this.votedList = (votedList || []).filter((item) => item.split('.')[1] > res.timestamp)))
      .catch(() => {})
  }

  pushVoted(coinStr) {
    this.votedList.push(coinStr)
  }

  // Creating async action using generator
  getAdvert = flow(
    function* () {
      this.loading = true
      try {
        const [bannerData, promoCoinList] = yield Promise.all([getBanners(), getPromoCoins()])
        this.bannerData = bannerData
        this.promoCoinList = promoCoinList
      } catch (err) {}
      this.loading = false
    }.bind(this)
  )
}

// function delay(second) {
//   return new Promise((resolve) => setTimeout(() => resolve(second), second * 1000))
// }
