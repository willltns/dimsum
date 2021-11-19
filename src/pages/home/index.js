import ss from './index.module.less'

import React from 'react'
import { Empty } from 'antd'
import { Observer } from 'mobx-react'
import { Link } from 'react-router-dom'

import { useStore } from '@/utils/hooks/useStore'
import zh from './lang/zh.json'
import en from './lang/en.json'

import MainBanner from '@/components/main-banner'
import CoinList from '@/components/coin-list'
import Spinner from '@/components/spinner'
import Footer from '@/components/footer'
import Search from '@/pages/home/search'

const Home = () => {
  const { home, common } = useStore()

  React.useEffect(() => window.scrollTo(0, home.scrollTop), [home])

  React.useLayoutEffect(
    () => () =>
      home.updateProp({
        scrollTop: window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0,
      }),
    [home]
  )

  return (
    <section className={ss.homeS}>
      <MainBanner />

      <CoinList promo list={common.promoCoinList} />

      <Observer render={() => <p className={ss.upvoteTip}>{common.isZH ? zh.voteTime : en.voteTime}</p>} />

      <Search />

      <div>
        <Observer render={() => <CoinList list={home.coinList} listType={home.type} />} />
        <Observer
          render={() => (
            <div className={ss.listBot} style={{ height: home.loading ? home.loadingAdd : 'auto' }}>
              {home.loading ? (
                <Spinner />
              ) : (
                !!home.coinList?.length &&
                (home.noMore ? (
                  <>
                    <span className={ss.noTip}>{common.isZH ? zh.noMore : en.noMore}</span>
                    <Link to="/add-coin" className={ss.loadBtn}>
                      List a Project
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
                    {common.isZH ? zh.loadMore : en.loadMore}
                  </span>
                ))
              )}

              {!home.loading && !home.coinList?.length && (
                <Empty
                  className={ss.empty}
                  image={Empty.PRESENTED_IMAGE_SIMPLE}
                  description={
                    <Link to="/add-coin" className={ss.loadBtn}>
                      List a Project
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
