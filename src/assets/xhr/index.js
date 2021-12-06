import axios from '@/utils/axios'

const get4digits = () => Math.random().toString(10).slice(2, 6)

export const sourceRef = { current: null }
export const newSourceRef = { current: null }

export const getBanners = () => axios.post('/banner/', {})

export const getPromoCoins = () => axios.post('/promo-coin/list', {})

export const getCoinList = (params) => axios.post('/coin-list', params || {}, { cancelToken: sourceRef.current?.token })

export const getNewCoinList = (params) =>
  axios.post('/coin-list', params || {}, { cancelToken: newSourceRef.current?.token })

export const getChainList = () => axios.post('/chain-list', {})

export const addCoin = (params) => axios.post('/coin/add', params, { headers: { mill_sec_: get4digits() } })

export const voteCoin = (params) => axios.post('/coin/vote', params, { headers: { mill_sec_: get4digits() } })

export const getCoinDetail = (params) => axios.post('/coin', params, {})

export const getServTime = () => axios.post('/serv-time', {})

export const getPromoVote = () => axios.post('/promo-vote', {})

export const votePromoVote = (params) =>
  axios.post('/promo-vote/vote', params || {}, { headers: { mill_sec_: get4digits() } })

export const getChamp = () => axios.post('/promo-vote/champ', {})

export const getSearchPromo = () => axios.post('/search/promo', {})

export const uploadFile = (params) => axios.post('/file/upload', params, { headers: { mill_sec_: get4digits() } })

// promo-request
export const applyReferrer = (params) => axios.post('/referrer/apply', params, { headers: { mill_sec_: get4digits() } })

export const applyPromo = (params) => axios.post('/promotion/apply', params, { headers: { mill_sec_: get4digits() } })
