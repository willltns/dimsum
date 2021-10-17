import axios from '@/utils/axios'

export const getBanners = () => axios.post('/banner')

export const getPromoCoins = () => axios.post('/promo-coin')

export const getCoinList = (params) => axios.post('/coin/list', params)

export const addCoin = (params) => axios.post('/coin/add', params)

export const voteCoin = (params) => axios.post('/coin/vote', params)

export const getCoinDetail = (params) => axios.post('/coin', params)

export const getServTime = () => axios.post('/serv-time')

export const getPromoVote = () => axios.post('/promo-vote')

export const votePromoVote = (params) => axios.post('/promo-vote/vote', { params })

export const getChamp = () => axios.post('/promo-vote/champ')
