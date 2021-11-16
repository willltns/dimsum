import ss from './index.module.less'

import React from 'react'

import { tg } from '@/consts'

function Footer() {
  return (
    <footer className={ss.footer}>
      <img src="/logo_hor.png" alt="logo" />
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
