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
    if (!this.bannerData.length) return []
    //return this.bannerData?.wideBanner || []
    return [this.bannerData[0], this.bannerData[1]]
  }
  get scrollBannerList() {
    if (!this.bannerData.length) return []
    //return this.bannerData?.scrollBanner || []
    return [this.bannerData[0], this.bannerData[1], this.bannerData[2], this.bannerData[3]]
  }
  get popBanner() {
    if (!this.bannerData.length) return null
    //return this.bannerData?.popBanner?.[0]
    return this.bannerData[3]
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
        this.bannerData = bannerData.map((item) => ({
          ...item,
          bannerUrl: 'https://www.asqql.com/tpqsy/demo.jpg',
        }))
        this.promoCoinList = promoCoinList
      } catch (err) {}
      this.loading = false
    }.bind(this)
  )
}

// function delay(second) {
//   return new Promise((resolve) => setTimeout(() => resolve(second), second * 1000))
// }
