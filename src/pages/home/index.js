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
  const { home, common } = useStore()

  const searchInputRef = React.useRef(null)

  React.useEffect(() => window.scrollTo(0, home.scrollTop), [home])

  React.useLayoutEffect(
    () => () =>
      home.updateProp({
        scrollTop: window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0,
      }),
    [home]
  )

  return (
    <section>
      <MainBanner />

      <CoinList promo />

      <p className={ss.upvoteTip}>代币每小时可投票一次</p>

      <div>
        <Observer
          render={() => (
            <>
              <div className={ss.searchBar}>
                <div className={ss.type}>
                  <div>
                    {coinTypeList.slice(0, 2).map((item) => (
                      <Button
                        key={item.value}
                        type={home.type === item.value ? 'primary' : ''}
                        onClick={(e) => {
                          if (home.type === item.value) return
                          // prettier-ignore
                          home.updateProp({ loadingAdd: window.innerHeight - e.target.getBoundingClientRect().top - 300, })
                          if (sourceRef.current) sourceRef.current.cancel()
                          sourceRef.current = axios.CancelToken.source()
                          home.getCoins({ value: '', type: item.value, pageNo: 1 })
                          home.updateProp({ searchedInputValue: '', value: common.searchPromo || '' })
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
                        onClick={(e) => {
                          if (home.type === item.value) return
                          // prettier-ignore
                          home.updateProp({ loadingAdd: window.innerHeight - e.target.getBoundingClientRect().top - 300, })
                          if (sourceRef.current) sourceRef.current.cancel()
                          sourceRef.current = axios.CancelToken.source()
                          home.getCoins({ value: '', type: item.value, pageNo: 1 })
                          home.updateProp({ searchedInputValue: '', value: common.searchPromo || '' })
                        }}
                      >
                        {item.text}
                      </Button>
                    ))}
                  </div>
                </div>
                <Input.Search
                  autoComplete="off"
                  spellCheck={false}
                  value={home.value}
                  ref={searchInputRef}
                  style={{ width: 252, height: 40 }}
                  prefix={<SearchOutlined />}
                  className={`${home.value && home.value === common.searchPromo ? ss.promoVal : ''} ${
                    home.searchedInputValue === common.searchPromo ? ss.promoSearched : ''
                  }`}
                  placeholder="输入名称或符号，按 Enter 搜索..."
                  onBlur={() =>
                    home.value?.trim() && home.searchedInputValue
                      ? null
                      : home.updateProp({ value: common.searchPromo || '' })
                  }
                  onChange={(e) => home.updateProp({ value: e.target.value })}
                  onSearch={() => {
                    if (home.searchedInputValue === home.value) return
                    home.updateProp({
                      searchedInputValue: home.value?.trim() || '',
                      loadingAdd: window.innerHeight - searchInputRef.current?.input.getBoundingClientRect().top - 300,
                    })
                    if (sourceRef.current) sourceRef.current.cancel()
                    sourceRef.current = axios.CancelToken.source()
                    home.getCoins({ value: home.value?.trim() || '', type: undefined, pageNo: 1 })
                  }}
                />
              </div>

              <CoinList listType={home.type} />
            </>
          )}
        />

        <Observer
          render={() => (
            <div className={ss.listBot} style={{ height: home.loading ? home.loadingAdd : 'auto' }}>
              {home.loading ? (
                <Spinner />
              ) : (
                !!home.coinList?.length &&
                (home.noMore ? (
                  <>
                    <span className={ss.noTip}>没有更多了</span>
                    <Link to="/add-coin" className={ss.loadBtn}>
                      Add a Coin
                    </Link>
                  </>
                ) : (
                  <span
                    className={ss.loadBtn}
                    onClick={() => {
                      home.updateProp({ loadingAdd: 'auto' })
                      home.getCoins({ value: home.searchedInputValue, type: home.type, pageNo: home.pageNo + 1 })
                    }}
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
