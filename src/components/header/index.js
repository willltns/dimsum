import ss from './index.module.less'
import birbLogo from '@/assets/img/birb.png'

import React, { useEffect } from 'react'
import { notification } from 'antd'
import { MenuOutlined } from '@ant-design/icons'
import { Link, useHistory, useLocation } from 'react-router-dom'

import CDButton from '@/components/cd-button'

function Header() {
  const history = useHistory()
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
    if (['/add-coin', '/promote'].includes(pathname)) return

    notification.open({
      bottom: 8,
      key: 'popPro',
      duration: null,
      placement: 'bottomRight',
      className: ss.popPro,
      description: <img src={birbLogo} alt="birbLogo" />,
    })

    return () => notification.close('popPro')
  }, [pathname])

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
        DimsumCoins
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

export default Header
