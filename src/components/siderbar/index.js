import ss from './index.module.less'
import { ReactComponent as TgIcon } from '@/assets/img/link-icon/tg.svg'
import { ReactComponent as TWIcon } from '@/assets/img/link-icon/twitter.svg'
import { ReactComponent as EmailIcon } from '@/assets/img/link-icon/email.svg'

import React from 'react'
import dayjs from 'dayjs'
import { Space } from 'antd'
import { Link } from 'react-router-dom'
import { Observer } from 'mobx-react'

import { email, tg, twitter } from '@/consts'
import PromoVote from '@/components/promo-vote'
import { useStore } from '@/utils/hooks/useStore'

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
          <Link to="/">&emsp;代币排行｜Coin Ranking</Link>
          <Link to="/add-coin">添加代币｜Add a Coin</Link>
          <Link to="/promote">&emsp;推广｜Promote</Link>
        </nav>
        <Space>
          <TgIcon style={{ width: 32, cursor: 'pointer' }} onClick={() => window.open(tg)} />
          <TWIcon style={{ width: 32, cursor: 'pointer' }} onClick={() => window.open(twitter)} />
          <a href={`mailto:${email}`}>
            <EmailIcon style={{ width: 27, marginLeft: 2, cursor: 'pointer' }} />
          </a>
        </Space>
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

export default React.memo(Sidebar)
