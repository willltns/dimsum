import ss from './index.module.less'

import React from 'react'
import { Button, Input } from 'antd'
import { Observer } from 'mobx-react'
import { SearchOutlined } from '@ant-design/icons'

import { useStore } from '@/utils/hooks/useStore'
import { coinTypeList } from '@/pages/home/consts'

import MainBanner from '@/components/main-banner'
import CoinList from '@/components/coin-list'
import Footer from '@/components/footer'

const Home = () => {
  const { home } = useStore()

  React.useLayoutEffect(() => {
    home.getCoins({ type: 1 })
  }, [home])

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
                      onClick={() => home.getCoins({ value: '', type: item.value, pageNo: 1 })}
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
                      onClick={() => home.getCoins({ value: '', type: item.value, pageNo: 1 })}
                    >
                      {item.text}
                    </Button>
                  ))}
                </div>
              </div>
              <Input.Search
                value={home.value}
                style={{ width: 260 }}
                prefix={<SearchOutlined />}
                placeholder="输入名称或符号，按 Enter 搜索..."
                onChange={(e) => home.updateProp({ value: e.target.value })}
                onSearch={() => home.getCoins({ value: home.value?.trim(), type: undefined, pageNo: 1 })}
              />
            </div>
          )}
        />

        <CoinList />
        <Observer
          render={() => (
            <div style={{ textAlign: 'center' }}>
              <Button
                type="primary"
                loading={home.loading}
                style={{ borderRadius: '0 0 40px 40px', width: 120, paddingLeft: 22 }}
                onClick={() => home.getCoins({ pageNo: home.pageNo + 1, value: home.value, type: home.type })}
              >
                加载更多
              </Button>
            </div>
          )}
        />
      </div>

      <Footer />
    </section>
  )
}

export default Home
