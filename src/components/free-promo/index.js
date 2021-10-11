import ss from './index.module.less'
import birbLogo from '@/assets/img/birb.png'

import React from 'react'
import { Radio, Space } from 'antd'

function FreePromo() {
  const [voted, setVoted] = React.useState(false)

  return (
    <div className={`${ss.freePromo} ${voted ? ss.voted : ''}`}>
      <div className={ss.winner}>
        <span>🏆</span>
        <div className={ss.cc}>
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
        <Radio.Group onChange={() => setVoted(true)}>
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
