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
  promoVote = { voted: false, champ: null, promoInfo: null }

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
  updatePromoVote(property) {
    Object.assign(this.promoVote, property)
  }

  updateUnixTS(date) {
    this.unixTS = dayjs(date, 'YYYY-MM-DD HH:mm:ss').unix()
    this.serverDateStr = date
  }

  get votedIdList() {
    return this.votedList.map((item) => item.split('.')[0])
  }

  getVotedList() {
    const votedList = localStorage.getItem('__ivot')?.split(',') || []

    getServTime()
      .then((res) => {
        res?.date && this.timeStart(res.date)
        this.votedList = votedList.filter((item) => item?.split('.')?.[1] > res?.timestamp)
      })
      .catch(() => {})
  }

  pushVoted(coinStr) {
    this.votedList.push(coinStr)
    setTimeout(() => localStorage.setItem('__ivot', this.votedList.toString()))
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
      try {
        const [bannerData, promoCoinList, searchData] = yield Promise.all([
          getBanners(),
          getPromoCoins(),
          getSearchPromo(),
        ])
        this.bannerData = bannerData
        this.promoCoinList = promoCoinList || []
        this.searchPromo = searchData?.coinName || ''
      } catch (err) {}
      this.loading = false
    }.bind(this)
  )

  mixUp({ id, strArr, i, aA, hH, indexes, final }) {
    if (strArr.length - i + 1 >= `${id}`.length) {
      let digit = `${indexes.length}`.length + ''
      digit = digit.replace(/1/g, aA[Math.round(Math.random() * (aA.length - 1))])
      digit = digit.replace(/2/g, hH[Math.round(Math.random() * (hH.length - 1))])
      return digit + indexes.length + final
    }
    return final
  }
}
