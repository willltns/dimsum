import ss from './index.module.less'

import React from 'react'

import { tg } from '@/consts'
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <footer className={ss.footer}>
      <img src="/logo.png" alt="logo" />
      <Link to="/disclaimer">Disclaimer</Link>
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
