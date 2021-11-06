import ss from './index.module.less'
import Logo from '@/assets/img/YYDS_LOGO_HOR.png'

import React from 'react'

import { email } from '@/consts'

function Footer() {
  return (
    <footer className={ss.footer}>
      <img src={Logo} alt="logo" />
      <p>
        YYDSCoins © 2021 - <a href={`mailto:${email}`}>{email}</a>
      </p>
    </footer>
  )
}

export default React.memo(Footer)
