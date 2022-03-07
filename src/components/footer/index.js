import ss from './index.module.less'

import React from 'react'
import { observer } from 'mobx-react'
import { Link } from 'react-router-dom'

import { tg } from '@/consts'
import { useStore } from '@/utils/hooks/useStore'

function Footer() {
  const { common } = useStore()

  return (
    <footer className={ss.footer}>
      <img src="/logo.png" alt="logo" />

      <nav>
        <Link to="/about-us">{common.isZH ? '关于我们' : 'About Us'}</Link>
        <Link to="/disclaimer">{common.isZH ? '免责声明' : 'Disclaimer'}</Link>
      </nav>

      <p>
        YYDSCoins © 2022 -{' '}
        <a href={tg} target="_blank" rel="noreferrer">
          @YYDSCoinsPromo
        </a>
      </p>
    </footer>
  )
}

export default React.memo(observer(Footer))
