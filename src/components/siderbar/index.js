import ss from './index.module.less'
import { ReactComponent as TgIcon } from '@/assets/img/link-icon/tg.svg'

import React from 'react'
import dayjs from 'dayjs'
import { Link } from 'react-router-dom'
import { observer, Observer } from 'mobx-react'

import { tg } from '@/consts'
import PromoVote from '@/components/promo-vote'
import { useStore } from '@/utils/hooks/useStore'
import YYPopover from '@/components/yy-popover'

function Sidebar() {
  const { common } = useStore()
  return (
    <div className={`${ss.sidebar} sidebar`}>
      <div>
        <nav
          onClick={(e) => {
            const sidebarEl = e.target?.parentNode.parentNode.parentNode
            if (!sidebarEl.style.transform) return
            sidebarEl.style.transform = ''
            setTimeout(() => (sidebarEl.style = ''), 200)
          }}
        >
          <Link to="/">代币排行｜Coin Ranking</Link>
          <Link to="/add-coin">添加代币｜List a Project</Link>
          <Link to="/promote" style={{ right: 1 }}>
            推广｜Promote
          </Link>
          <Link
            to="/about-us"
            id="aboutUs"
            className={ss.aboutUs}
            onClick={(e) => e.target?.classList?.remove('about-us-bouncing')}
          >
            {common.isZH ? '什么是' : 'What is'}
            <span>YYDS</span>?
          </Link>
        </nav>
        <YYPopover content="@yydscoins" placement="top">
          <TgIcon
            style={{ width: 32, height: 32, cursor: 'pointer', position: 'relative', top: 5 }}
            onClick={() => window.open(tg)}
          />
        </YYPopover>
        &emsp;
        <YYPopover content="@yydscoinsofficial" placement="top">
          <span className={ss.tgChannel}>
            <TgIcon
              style={{ width: 32, height: 32, cursor: 'pointer' }}
              onClick={() => window.open('https://t.me/yydscoinsofficial')}
            />
            <i>C</i>
          </span>
        </YYPopover>
        <PromoVote />
      </div>

      <Observer
        render={() =>
          !!common.unixTS && (
            <div className={ss.time}>
              <div>
                <span>UTC+8: </span>
                <b>{dayjs.unix(common.unixTS).format('YYYY-MM-DD HH:mm:ss')}</b>
              </div>
              <div>
                <span>UTC: </span>
                <b>{dayjs.unix(common.unixTS - 8 * 3600).format('YYYY-MM-DD HH:mm:ss')}</b>
              </div>
            </div>
          )
        }
      />
    </div>
  )
}

export default React.memo(observer(Sidebar))
