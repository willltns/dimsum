import ss from './index.module.less'

import React from 'react'
import { Link } from 'react-router-dom'
import FreePromo from '@/components/free-promo'

function Sidebar() {
  return (
    <div className={`${ss.sidebar} sidebar`}>
      <nav>
        <Link to="/">代币排行</Link>
        <Link to="/add-coin">添加代币</Link>
        {/*<Link to="/">空投</Link>*/}
        <Link to="/promote">推广</Link>
      </nav>
      <div>✈️</div>

      <FreePromo />
    </div>
  )
}

export default Sidebar
