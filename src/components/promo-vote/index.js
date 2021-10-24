import ss from './index.module.less'
import { ReactComponent as Trophy } from '@/assets/img/link-icon/trophy.svg'

import React from 'react'
import Cookies from 'js-cookie'
import { Radio, Space } from 'antd'
import { useHistory } from 'react-router-dom'

import { getChamp, getPromoVote, votePromoVote } from '@/assets/xhr'
import { fileDomain } from '@/consts'

const cookieKey = 'vi'

function PromoVote() {
  const history = useHistory()

  const [state, setState] = React.useState({ voted: false, champ: null, promoInfo: null })
  const { voted, champ, promoInfo } = state

  const voteId = promoInfo?.id

  const getData = async () => {
    try {
      const [champ, promoInfo] = await Promise.all([getChamp(), getPromoVote()])
      setState((state) => ({ ...state, champ, promoInfo }))
    } catch (err) {}
  }

  const handlePromoVote = async (e) => {
    console.log(e.target)
    if (Cookies.get(cookieKey)) return

    const optionId = e.target.value
    Cookies.set(cookieKey, voteId, { expires: 365 })

    try {
      await votePromoVote({ id: optionId })
      setState((state) => ({ ...state, voted: true }))
      // prettier-ignore
      getPromoVote().then((promoInfo) => setState((state) => ({ ...state, promoInfo }))).catch(() => {})
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
    <div className={`${ss.PromoVote} ${voted || promoInfo?.finished ? ss.voted : ''}`}>
      <div className={ss.winner}>
        <Trophy className={ss.trophyIcon} />
        <div className={ss.champ}>
          <h4>人气代币</h4>
          <div className={ss.coin} onClick={champ?.id ? () => history.push(`/coin/${champ.id}`) : null}>
            {champ?.coinLogo ? <img src={fileDomain + champ.coinLogo} alt={champ.coinName} /> : <i>?</i>}
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
          <Radio.Group onChange={voted || promoInfo?.finished ? null : handlePromoVote}>
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
