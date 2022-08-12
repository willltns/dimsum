import ss from './index.module.less'
import { ReactComponent as Trophy } from '@/assets/img/link-icon/trophy.svg'

import React from 'react'
import Cookies from 'js-cookie'
import { Radio, Space } from 'antd'
import { useHistory } from 'react-router-dom'
import { observer } from 'mobx-react'

import { getPromoVote, votePromoVote } from '@/assets/xhr'
import { useStore } from '@/utils/hooks/useStore'
import { fileDomain } from '@/consts'

const cookieKey = 'vi'

function PromoVote() {
  return null

  const history = useHistory()
  const { common } = useStore()

  const { voted, champ, promoInfo } = common.promoVote

  const voteId = promoInfo?.id

  const handlePromoVote = async (e) => {
    if (Cookies.get(cookieKey)) return

    const optionId = e.target.value
    Cookies.set(cookieKey, voteId, { expires: 365 })

    try {
      await votePromoVote({ id: optionId })
      common.updatePromoVote({ voted: true })
      // prettier-ignore
      getPromoVote().then(promoInfo => common.updatePromoVote({ promoInfo })).catch(() => {})
    } catch (err) {
      Cookies.remove(cookieKey)
    }
  }

  React.useEffect(() => {
    if (!voteId) return
    const votedId = Cookies.get(cookieKey)

    const isVoted = +voteId === +votedId
    if (!isVoted) Cookies.remove(cookieKey)
    common.updatePromoVote({ voted: isVoted })
  }, [voteId, common])

  const voteNameZH = promoInfo?.voteName?.split('$$$')?.[0]
  const voteNameEN = promoInfo?.voteName?.split('$$$')?.[1] || voteNameZH

  return (
    <div className={`${ss.PromoVote} ${voted || promoInfo?.finished ? ss.voted : ''}`}>
      <div className={ss.winner}>
        <Trophy className={ss.trophyIcon} />
        <div className={ss.champ}>
          <h4>{common.isZH ? '最佳票选' : 'Vote Winner'}</h4>
          <div
            className={ss.coin}
            onClick={champ?.id ? () => history.push(`/coin/${champ.coinUniqueUrl || champ.id}`) : null}
          >
            {champ?.coinLogo ? <img src={fileDomain + champ.coinLogo} alt={champ.coinName} /> : <i>?</i>}
            <div>
              <div className={`${ss.coinName} coin-name`}>{champ?.coinName || '??'}</div>
              <div>{champ?.coinSymbol || '??'}</div>
            </div>
          </div>
        </div>
      </div>

      {voteId ? (
        <div className={ss.radioBox}>
          <h3>{common.isZH ? voteNameZH : voteNameEN}</h3>
          <Radio.Group onChange={voted || promoInfo?.finished ? null : handlePromoVote}>
            <Space direction="vertical">
              {promoInfo.voteItems?.map((item) => {
                let label
                if (+promoInfo.type !== 10) {
                  if (common.isZH) label = item.optionDesc?.split('$$$')?.[0]
                  else label = item.optionDesc?.split('$$$')?.[1] || item.optionDesc?.split('$$$')?.[0]
                } else label = item.coinName

                return (
                  <Radio value={item.id} key={item.id}>
                    {label}
                    <span className={ss.pctNum}>{(item.pct * 100).toFixed(0)}%</span>
                    <div className={ss.pctBar}>
                      <i style={{ width: `${(item.pct * 100).toFixed(0)}%` }} />
                    </div>
                  </Radio>
                )
              })}
            </Space>
          </Radio.Group>
        </div>
      ) : null}
    </div>
  )
}

export default React.memo(observer(PromoVote))
