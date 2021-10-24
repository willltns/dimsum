import ss from './index.module.less'

import React, { useEffect } from 'react'
import { notification } from 'antd'
import { observer } from 'mobx-react'
import { MenuOutlined } from '@ant-design/icons'
import { Link, useHistory, useLocation } from 'react-router-dom'

import { useStore } from '@/utils/hooks/useStore'
import { fileDomain } from '@/consts'

import CDButton from '@/components/cd-button'

function Header() {
  const history = useHistory()
  const { pathname } = useLocation()

  const { common } = useStore()

  useEffect(() => {
    window.scrollTo(0, 0)
    if (['/add-coin', '/promote'].includes(pathname)) return

    common.getAdvert()
  }, [pathname, common])

  useEffect(() => {
    if (!common.popBanner) return
    notification.open({
      bottom: 8,
      key: 'popPromo',
      duration: null,
      className: ss.popPro,
      placement: 'bottomRight',
      description: (
        <a href={common.popBanner.linkUrl} target="_blank" rel="noreferrer">
          <img src={fileDomain + common.popBanner.bannerUrl} alt={common.popBanner.coinName} />
        </a>
      ),
    })

    return () => notification.close('popPromo')
  }, [common.popBanner])

  const isAddCoinPage = pathname === '/add-coin'

  const toggleSidebar = () => {
    const sidebarEl = document.querySelector('.sidebar')

    if (sidebarEl.style.transform) {
      sidebarEl.style.transform = ''
      setTimeout(() => (sidebarEl.style = ''), 200)
    } else {
      sidebarEl.style.transform = 'translate3d(0, 0, 0)'
      sidebarEl.style.opacity = 1
    }
  }

  return (
    <header className={`${ss.header} ${isAddCoinPage ? ss.noneSticky : ''}`}>
      <Link className="logo" to="/">
        YYDSCoins
      </Link>
      <div className={ss.headerBtn}>
        <CDButton onClick={() => history.push('/add-coin')}>添加代币</CDButton>
        <CDButton primary onClick={() => history.push('/promote')}>
          推广
        </CDButton>
        <MenuOutlined className={ss.sideCtrl} onClick={toggleSidebar} />
      </div>
    </header>
  )
}

export default React.memo(observer(Header))
