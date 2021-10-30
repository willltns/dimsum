import axios from '@/utils/axios'

export const sourceRef = { current: null }

export const getBanners = () => axios.post('/banner/', {})

export const getPromoCoins = () => axios.post('/promo-coin/list', {})

export const getCoinList = (params) => axios.post('/coin-list', params || {}, { cancelToken: sourceRef.current?.token })

export const getChainList = () => axios.post('/chain-list', {})

export const addCoin = (params) => axios.post('/coin/add', params, {})

export const voteCoin = (params) => axios.post('/coin/vote', params, {})

export const getCoinDetail = (params) => axios.post('/coin', params, {})

export const getServTime = () => axios.post('/serv-time', {})

export const getPromoVote = () => axios.post('/promo-vote', {})

export const votePromoVote = (params) => axios.post('/promo-vote/vote', params || {})

export const getChamp = () => axios.post('/promo-vote/champ', {})

export const uploadFile = (params) => axios.post('/file/upload', params)
