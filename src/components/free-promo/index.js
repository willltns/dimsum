import ss from './index.module.less'
import birbLogo from '@/assets/img/birb.png'
import { ReactComponent as Trophy } from '@/assets/img/link-icon/trophy.svg'

import React from 'react'
import Cookies from 'js-cookie'
import { Radio, Space } from 'antd'

const cookieKey = 'vi'
const id = 2

function FreePromo() {
  const [voted, setVoted] = React.useState(false)

  React.useEffect(() => {
    const votedId = Cookies.get(cookieKey)

    const isVoted = +id === +votedId
    if (!isVoted) Cookies.remove(cookieKey)
    setVoted(isVoted)
  }, [id])

  return (
    <div className={`${ss.freePromo} ${voted ? ss.voted : ''}`}>
      <div className={ss.winner}>
        <Trophy className={ss.trophyIcon} />
        <div className={ss.champ}>
          <h4>人气代币</h4>
          <div className={ss.coin}>
            <img src={birbLogo} alt="b" />
            <div>
              <div className={ss.coinName}>Birb</div>
              <div>$BIRB</div>
            </div>
          </div>
        </div>
      </div>
      <div className={ss.radioBox}>
        <h3>哪个项目获得两天免费推广？</h3>
        <Radio.Group
          onChange={() => {
            if (Cookies.get(cookieKey)) return
            setVoted(true)
            Cookies.set(cookieKey, id, { expires: 365 })
          }}
        >
          <Space direction="vertical">
            <Radio value={1}>
              Baby Cake<span className={ss.pctNum}>25%</span>
              <div className={ss.pctBar}>
                <i style={{ width: `${25}%` }} />
              </div>
            </Radio>
            <Radio value={2}>
              Floki<span className={ss.pctNum}>33%</span>
              <div className={ss.pctBar}>
                <i style={{ width: `${33}%` }} />
              </div>
            </Radio>
            <Radio value={3}>
              Birb<span className={ss.pctNum}>12%</span>
              <div className={ss.pctBar}>
                <i style={{ width: `${12}%` }} />
              </div>
            </Radio>
            <Radio value={4}>
              ForeverFOMO<span className={ss.pctNum}>30%</span>
              <div className={ss.pctBar}>
                <i style={{ width: `${30}%` }} />
              </div>
            </Radio>
          </Space>
        </Radio.Group>
      </div>
    </div>
  )
}

export default FreePromo
