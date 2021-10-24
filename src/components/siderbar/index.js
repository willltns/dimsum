import ss from './index.module.less'
import { ReactComponent as TgIcon } from '@/assets/img/link-icon/tg.svg'

import React from 'react'
import { Link } from 'react-router-dom'

import PromoVote from '@/components/promo-vote'

function Sidebar() {
  return (
    <div className={`${ss.sidebar} sidebar`}>
      <nav>
        <Link to="/">&emsp;代币排行｜Coin Ranking</Link>
        <Link to="/add-coin">添加代币｜Add a Coin</Link>
        <Link to="/promote">&emsp;推广｜Promote</Link>
      </nav>
      <div>
        <TgIcon style={{ width: 32 }} onClick={() => window.open('https://t.me/liangjianshequ')} />
      </div>

      <PromoVote />
    </div>
  )
}

export default React.memo(Sidebar)
