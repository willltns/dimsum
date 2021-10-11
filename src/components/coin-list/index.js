import ss from './index.module.less'
import birbLogo from '@/assets/img/birb.png'

import React from 'react'
import CDButton from '@/components/cd-button'
import { useHistory } from 'react-router-dom'
import { modalInfo } from '@/components/coin-list/modalInfo'
import { airdropTemplate, presaleTemplate } from '@/pages/add-coin/const'

function CoinList(props) {
  const { promo } = props

  const history = useHistory()

  const title = promo ? (
    <>
      <span className={ss.diamond}>💎</span>推广代币
    </>
  ) : (
    '代币'
  )

  return (
    <div className={ss.tTable}>
      <div className={ss.tHead}>
        <div className={ss.tRow}>
          <div>{title}</div>
          <div>符号</div>
          <div>发布 (UTC+8)</div>
          <div>预售信息</div>
          <div>空投信息</div>
          <div>链接</div>
          <div>投票</div>
        </div>
      </div>
      <div className={ss.tBody}>
        <div className={ss.tRow} onClick={() => history.push('/coin/999')}>
          <div className={ss.name}>
            <img src={birbLogo} alt="birb" />
            Birb
          </div>
          <div>BIRB</div>
          <div className={ss.date}>
            <span>2020-</span>10-12<i>12:00</i>
          </div>
          <div className={ss.btnCol}>
            <CDButton
              onClick={(e) => {
                e.stopPropagation()
                modalInfo({ title: '预售信息', text: `${airdropTemplate}` })
              }}
            >
              查看
            </CDButton>
          </div>
          <div className={ss.btnCol}>
            <CDButton onClick={(e) => e.stopPropagation()}>查看</CDButton>
          </div>
          <div>✈️&emsp;✈️</div>
          <div className={ss.upvote}>
            <CDButton onClick={(e) => e.stopPropagation()}>
              <span>🚀</span>1999
            </CDButton>
          </div>
        </div>

        <div className={ss.tRow} onClick={() => history.push('/coin/999')}>
          <div className={ss.name}>
            <img src={birbLogo} alt="birb" />
            Baby Doge Coin
          </div>
          <div>BABYDOGE</div>
          <div className={ss.date}>
            <span>2020-</span>10-12<i>12:00</i>
          </div>
          <div className={ss.btnCol}>
            <CDButton>查看</CDButton>
          </div>
          <div className={ss.btnCol}>
            <CDButton>查看</CDButton>
          </div>
          <div>✈️&emsp;✈️</div>
          <div className={ss.upvote}>
            <CDButton>
              <span>🚀</span>1999
            </CDButton>
          </div>
        </div>

        <div className={ss.tRow} onClick={() => history.push('/coin/999')}>
          <div className={ss.name}>
            <img src={birbLogo} alt="birb" />
            FAIRLAUNCH PAD TOKEN
          </div>
          <div>BIRB</div>
          <div className={ss.date}>
            <span>2020-</span>10-12<i>12:00</i>
          </div>
          <div className={ss.btnCol}>
            <CDButton>查看</CDButton>
          </div>
          <div className={ss.btnCol}>
            <CDButton>查看</CDButton>
          </div>
          <div>✈️&emsp;✈️</div>
          <div className={ss.upvote}>
            <CDButton>
              <span>🚀</span>1999
            </CDButton>
          </div>
        </div>

        <div className={ss.tRow} onClick={() => history.push('/coin/999')}>
          <div className={ss.name}>
            <img src={birbLogo} alt="birb" />
            Birb
          </div>
          <div>BIRB</div>
          <div className={ss.date}>
            <span>2020-</span>10-12<i>12:00</i>
          </div>
          <div className={ss.btnCol}>
            <CDButton>查看</CDButton>
          </div>
          <div className={ss.btnCol}>
            <CDButton>查看</CDButton>
          </div>
          <div>✈️&emsp;✈️</div>
          <div className={ss.upvote}>
            <CDButton>
              <span>🚀</span>1999
            </CDButton>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CoinList
