import ss from './index.module.less'

import React from 'react'
import { Empty } from 'antd'
import { throttle } from 'lodash'
import { observer } from 'mobx-react'
import { Link } from 'react-router-dom'

import { useEventListener } from '@/utils/hooks/useEventListener'
import { useStore } from '@/utils/hooks/useStore'
import zh from './lang/zh.json'
import en from './lang/en.json'

import MainBanner from '@/components/main-banner'
import CoinList from '@/components/coin-list'
import Spinner from '@/components/spinner'
import Footer from '@/components/footer'
import Search from '@/pages/home/Search'

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

  const listBotRef = React.useRef()
  const blockLoad = React.useRef(false)
  const handleScroll = throttle(() => {
    if (home.loading || home.noMore) return

    const listBotTop = listBotRef.current.getBoundingClientRect().top
    if (listBotTop - 180 > window.innerHeight) {
      blockLoad.current = false
      return
    }
    if (blockLoad.current) return

    blockLoad.current = true
    home.getCoins({ value: home.searchedInputValue, type: home.type, pageNo: home.pageNo + 1 })
  }, 50)

  useEventListener('scroll', handleScroll, home.noMore ? null : undefined)

  return (
    <section className={ss.homeS}>
      <MainBanner />

      {/* 推广代币列表 */}
      <CoinList promo list={common.promoCoinList} />

      {/* 新币列表 */}
      <p className={ss.upvoteTip}>{common.isZH ? zh.voteTime : en.voteTime}</p>
      <Search activeType={home.newCoinType} />
      <CoinList list={home.newCoinsMap[home.newCoinType] || []} listType={home.newCoinType} />
      {!home.newCoinsMap[home.newCoinType]?.length && (
        <Empty
          className={ss.empty}
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description={
            <Link to="/add-coin" className={ss.loadBtn}>
              List a {home.newCoinType === 3 && 'New Launch'}
              {home.newCoinType === 4 && 'New Presale'}
              {home.newCoinType === 5 && 'New Whitelist Competition'}
            </Link>
          }
        />
      )}

      {/* 所有币列表，today's hot, top listing. */}
      <p className={ss.upvoteTip}>{common.isZH ? zh.voteTime : en.voteTime}</p>
      <Search allCoins activeType={home.type} />
      <div className={ss.allCoinsSec}>
        <CoinList list={home.coinList} listType={home.type} />
        <div ref={listBotRef} className={ss.listBot} style={{ height: home.loading ? home.loadingAdd : 'auto' }}>
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
      </div>

      <Footer />
    </section>
  )
}

export default observer(Home)
