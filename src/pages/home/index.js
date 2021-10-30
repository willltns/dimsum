import ss from './index.module.less'

import React from 'react'
import axios from 'axios'
import { Observer } from 'mobx-react'
import { Link } from 'react-router-dom'
import { Button, Empty, Input } from 'antd'
import { SearchOutlined } from '@ant-design/icons'

import { sourceRef } from '@/assets/xhr'
import { useStore } from '@/utils/hooks/useStore'
import { coinTypeList } from '@/pages/home/consts'

import MainBanner from '@/components/main-banner'
import CoinList from '@/components/coin-list'
import Spinner from '@/components/spinner'
import Footer from '@/components/footer'

const Home = () => {
  const { home } = useStore()

  return (
    <section>
      <MainBanner />

      <CoinList promo />

      <p className={ss.upvoteTip}>代币每小时可投票一次</p>

      <div>
        <Observer
          render={() => (
            <div className={ss.searchBar}>
              <div className={ss.type}>
                <div>
                  {coinTypeList.slice(0, 2).map((item) => (
                    <Button
                      key={item.value}
                      type={home.type === item.value ? 'primary' : ''}
                      onClick={() => {
                        if (home.type === item.value) return
                        if (sourceRef.current) sourceRef.current.cancel()
                        sourceRef.current = axios.CancelToken.source()
                        home.getCoins({ value: '', type: item.value, pageNo: 1 })
                      }}
                    >
                      {item.text}
                    </Button>
                  ))}
                </div>
                <div>
                  {coinTypeList.slice(2).map((item) => (
                    <Button
                      key={item.value}
                      type={home.type === item.value ? 'primary' : ''}
                      onClick={() => {
                        if (home.type === item.value) return
                        if (sourceRef.current) sourceRef.current.cancel()
                        sourceRef.current = axios.CancelToken.source()
                        home.getCoins({ value: '', type: item.value, pageNo: 1 })
                      }}
                    >
                      {item.text}
                    </Button>
                  ))}
                </div>
              </div>
              <Input.Search
                value={home.value}
                style={{ width: 252, height: 40 }}
                prefix={<SearchOutlined />}
                placeholder="输入名称或符号，按 Enter 搜索..."
                onChange={(e) => home.updateProp({ value: e.target.value, valueSearched: false })}
                onSearch={() => {
                  if (home.valueSearched) return
                  home.updateProp({ valueSearched: true })
                  if (sourceRef.current) sourceRef.current.cancel()
                  sourceRef.current = axios.CancelToken.source()
                  home.getCoins({ value: home.value?.trim(), type: undefined, pageNo: 1 })
                }}
              />
            </div>
          )}
        />

        <CoinList />

        <Observer
          render={() => (
            <div className={ss.listBot}>
              {home.loading ? (
                <Spinner />
              ) : (
                !!home.coinList?.length &&
                (home.noMore ? (
                  <span className={ss.noTip}>没有更多了</span>
                ) : (
                  <span
                    className={ss.loadBtn}
                    onClick={() => home.getCoins({ pageNo: home.pageNo + 1, value: home.value, type: home.type })}
                  >
                    加载更多
                  </span>
                ))
              )}

              {!home.loading && !home.coinList?.length && (
                <Empty
                  className={ss.empty}
                  image={Empty.PRESENTED_IMAGE_SIMPLE}
                  description={
                    <Link to="/add-coin" className={ss.loadBtn}>
                      Add a Coin
                    </Link>
                  }
                />
              )}
            </div>
          )}
        />
      </div>

      <Footer />
    </section>
  )
}

export default Home
