import ss from './index.module.less'
import { ReactComponent as Trophy } from '@/assets/img/link-icon/trophy.svg'

import React from 'react'
import Cookies from 'js-cookie'
import { Radio, Space } from 'antd'
import { useHistory } from 'react-router-dom'

import { getChamp, getPromoVote, votePromoVote } from '@/assets/xhr'

const cookieKey = 'vi'
const id = 2

const resPromoInfo = {
  id: 1,
  type: 10,
  voteItems: [
    { coinName: 'Bit Coin', id: 10, optionDesc: '1', pct: '0' },
    { coinName: 'Birb', id: 11, optionDesc: '2', pct: '0' },
    { coinName: 'Bit Coin', id: 12, optionDesc: '1', pct: '0' },
    { coinName: 'Birb', id: 13, optionDesc: '2', pct: '0' },
  ],
  voteName: '哪个代币获得两天免费推广？',
}

const resChamp = {
  id: 1,
  coinName: 'Birb',
  coinLogo: 'https://www.asqql.com/tpqsy/demo.jpg',
  coinSymbol: 'Birb',
}

function PromoVote() {
  const history = useHistory()

  const [state, setState] = React.useState({ voted: false, champ: null, promoInfo: null })
  const { voted, champ, promoInfo } = state

  const voteId = promoInfo?.id

  const getData = async () => {
    try {
      const res = await Promise.all([getChamp(), getPromoVote()])
    } catch (err) {
      setState((state) => ({ ...state, champ: resChamp, promoInfo: resPromoInfo }))
    }
  }

  const handlePromoVote = async (e) => {
    if (Cookies.get(cookieKey)) return

    const optionId = e.target.value
    Cookies.set(cookieKey, voteId, { expires: 365 })

    try {
      await votePromoVote({ id: optionId })
      setState((state) => ({ ...state, voted: true }))
    } catch (err) {
      Cookies.remove(cookieKey)
    }
  }

  React.useEffect(() => {
    getData()
  }, [])

  React.useEffect(() => {
    if (!voteId) return
    const votedId = Cookies.get(cookieKey)

    const isVoted = +voteId === +votedId
    if (!isVoted) Cookies.remove(cookieKey)
    setState((state) => ({ ...state, voted: isVoted }))
  }, [voteId])

  return (
    <div className={`${ss.PromoVote} ${voted ? ss.voted : ''}`}>
      <div className={ss.winner}>
        <Trophy className={ss.trophyIcon} />
        <div className={ss.champ}>
          <h4>人气代币</h4>
          <div className={ss.coin} onClick={champ?.id ? () => history.push(`/coin/${champ.id}`) : null}>
            {champ?.coinLogo ? <img src={champ?.coinLogo} alt="b" /> : <i>?</i>}
            <div>
              <div className={ss.coinName}>{champ?.coinName || '???'}</div>
              <div>${champ?.coinSymbol || '???'}</div>
            </div>
          </div>
        </div>
      </div>

      {voteId ? (
        <div className={ss.radioBox}>
          <h3>{promoInfo.voteName}</h3>
          <Radio.Group onChange={handlePromoVote}>
            <Space direction="vertical">
              {promoInfo.voteItems?.map((item) => (
                <Radio value={item.id} key={item.id}>
                  {+promoInfo.type === 10 ? item.coinName : item.optionDesc}
                  <span className={ss.pctNum}>{(item.pct * 100).toFixed(0)}%</span>
                  <div className={ss.pctBar}>
                    <i style={{ width: `${(item.pct * 100).toFixed(0)}%` }} />
                  </div>
                </Radio>
              ))}
            </Space>
          </Radio.Group>
        </div>
      ) : null}
    </div>
  )
}

export default React.memo(PromoVote)
