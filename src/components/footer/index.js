import ss from './index.module.less'
import Logo from '@/assets/img/YYDS_LOGO_HOR.png'

import React from 'react'

import { tg } from '@/consts'

function Footer() {
  return (
    <footer className={ss.footer}>
      <img src={Logo} alt="logo" />
      <p>
        YYDSCoins © 2021 -{' '}
        <a href={tg} target="_blank" rel="noreferrer">
          @YYDSCoinsPromo
        </a>
      </p>
    </footer>
  )
}

export default React.memo(Footer)
