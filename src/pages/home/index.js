import ss from './index.module.less'

import React from 'react'
import { Button, Input } from 'antd'
import { SearchOutlined } from '@ant-design/icons'

import MainBanner from '@/components/main-banner'
import CoinList from '@/components/coin-list'
import Footer from '@/components/footer'

const Home = () => {
  return (
    <section>
      <MainBanner />

      <CoinList promo />

      <p className={ss.upvoteTip}>代币每小时可投票一次</p>

      <div>
        <div className={ss.searchBar}>
          <div className={ss.type}>
            <Button>🔥 今日热门</Button>
            <Button>🔥 新币</Button>
            <Button>🔥 最佳</Button>
            <Button type="primary">🔥 预售</Button>
          </div>
          <Input type="text" style={{ width: 260 }} prefix={<SearchOutlined />} placeholder="搜索..." />
        </div>
        <CoinList />
      </div>

      <Footer />
    </section>
  )
}

export default Home
