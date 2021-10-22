import ss from './index.module.less'
import { ReactComponent as TgIcon } from '@/assets/img/link-icon/tg.svg'

import React from 'react'
import { Link } from 'react-router-dom'

import PromoVote from '@/components/promo-vote'

function Sidebar() {
  return (
    <div className={`${ss.sidebar} sidebar`}>
      <nav>
        <Link to="/">代币排行</Link>
        <Link to="/add-coin">添加代币</Link>
        {/*<Link to="/">空投</Link>*/}
        <Link to="/promote">推广</Link>
      </nav>
      <div>
        <TgIcon style={{ width: 32 }} onClick={() => window.open('https://t.me/liangjianshequ')} />
      </div>

      <PromoVote />
    </div>
  )
}

export default React.memo(Sidebar)
