import dayjs from 'dayjs'
import { makeAutoObservable, flow, action } from 'mobx'

import { getBanners, getPromoCoins, getSearchPromo, getServTime } from '@/assets/xhr'

export class CommonStore {
  constructor() {
    makeAutoObservable(this, {}, { autoBind: true })
  }

  // state
  language = 'zh'
  unixTS = 0
  serverDateStr = ''
  bannerData = []
  promoCoinList = []
  searchPromo = ''
  loading = false
  votedList = []
  intervalTimer = null
  coinChainList = []

  // computed
  get isZH() {
    return this.language === 'zh'
  }
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

  updateUnixTS(date) {
    this.unixTS = dayjs(date, 'YYYY-MM-DD HH:mm:ss').unix()
    this.serverDateStr = date
  }

  get votedIdList() {
    return this.votedList.map((item) => item.split('.')[0])
  }

  getVotedList() {
    const votedList = JSON.parse(localStorage.getItem('__ivot'))
    localStorage.removeItem('__ivot')

    getServTime()
      .then((res) => {
        res?.date && this.timeStart(res?.date)
        this.votedList = (votedList || []).filter((item) => item.split('.')[1] > res?.timestamp)
      })
      .catch(() => {})
  }

  pushVoted(coinStr) {
    this.votedList.push(coinStr)
  }

  timeStart(dateStr) {
    // prettier-ignore
    this.intervalTimer = setInterval(action(() => ++this.unixTS), 1000)
    this.unixTS = dayjs(dateStr, 'YYYY-MM-DD HH:mm:ss').unix()
    this.serverDateStr = dateStr
  }

  // Creating async action using generator
  getAdvert = flow(
    function* () {
      this.loading = true
      const { home } = this.getRoot()
      try {
        const [bannerData, promoCoinList, searchData] = yield Promise.all([
          getBanners(),
          getPromoCoins(),
          getSearchPromo(),
        ])
        this.bannerData = bannerData
        this.promoCoinList = promoCoinList || []
        this.searchPromo = searchData?.coinName || ''

        if (!home.value) home.value = searchData?.coinName || ''
      } catch (err) {}
      this.loading = false
    }.bind(this)
  )
}
