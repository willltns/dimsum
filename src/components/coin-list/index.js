import ss from './index.module.less'
import { ReactComponent as WebsiteIcon } from '@/assets/img/link-icon/website.svg'
import { ReactComponent as TGIcon } from '@/assets/img/link-icon/tg.svg'
import { ReactComponent as CNIcon } from '@/assets/img/link-icon/cn.svg'
import { ReactComponent as ENIcon } from '@/assets/img/link-icon/en.svg'
import { ReactComponent as TwitterIcon } from '@/assets/img/link-icon/twitter.svg'
import { ReactComponent as DiscordIcon } from '@/assets/img/link-icon/discord.svg'
import { ReactComponent as MediumIcon } from '@/assets/img/link-icon/medium.svg'
import { ReactComponent as Rocket } from '@/assets/img/link-icon/rocket.svg'

import React from 'react'
import dayjs from 'dayjs'
import { Tooltip } from 'antd'
import { observer } from 'mobx-react'
import { Link } from 'react-router-dom'

import { useStore } from '@/utils/hooks/useStore'
import { fileDomain } from '@/consts'

import CDButton from '@/components/cd-button'
import { modalInfo } from '@/components/coin-list/modalInfo'

function CoinList(props) {
  const { promo } = props

  const { common, home } = useStore()

  const list = promo ? common.promoCoinList : home.coinList

  // 推广代币列表，但列表没有值，不渲染
  if (promo && !list?.length) return null

  const title = promo ? (
    <>
      <span className={ss.diamond}>💎</span>推广代币
    </>
  ) : (
    '代币'
  )

  const stopProp = (e, action) => {
    e.preventDefault()
    e.stopPropagation()
    typeof action === 'function' && action()
  }

  return (
    <div className={ss.tTable}>
      <div className={ss.tHead}>
        <div className={ss.tRow}>
          <div>{title}</div>
          <div>符号</div>
          <div>发布 (UTC+8)</div>
          <div>预售信息</div>
          <div>空投信息</div>
          <div>链接</div>
          <div>投票</div>
        </div>
      </div>
      <div className={ss.tBody}>
        {list?.map((coin) => (
          <Link className={ss.tRow} to={`/coin/${coin.id}`} key={coin.id}>
            <div className={ss.name}>
              <span>
                <img src={fileDomain + coin.coinLogo} alt={coin.coinSymbol} className={ss.coinLogo} />

                {common.coinChainList.find((c) => +c.id === +coin.coinChain) ? (
                  <img
                    src={common.coinChainList.find((c) => +c.id === +coin.coinChain).logo}
                    alt={coin.coinSymbol}
                    className={ss.coinChain}
                  />
                ) : null}
              </span>
              {coin.coinName}
            </div>

            <div>{coin.coinSymbol}</div>

            <div className={ss.date}>
              <span>{dayjs(coin.coinLaunchDate).format('YYYY-')}</span>
              {dayjs(coin.coinLaunchDate).format('MM-DD')}
              <i>{dayjs(coin.coinLaunchDate).format('HH:mm')}</i>
            </div>

            <div className={ss.btnCol}>
              {coin.coinPresaleInfo ? (
                <CDButton
                  onClick={(e) => stopProp(e, () => modalInfo({ title: '预售信息', text: coin.coinPresaleInfo }))}
                >
                  查看
                </CDButton>
              ) : (
                '---'
              )}
            </div>

            <div className={ss.btnCol}>
              {coin.coinAirdropInfo ? (
                <CDButton
                  onClick={(e) => stopProp(e, () => modalInfo({ title: '空投信息', text: coin.coinAirdropInfo }))}
                >
                  查看
                </CDButton>
              ) : (
                '---'
              )}
            </div>

            <div className={ss.links}>
              {coin.linkWebsite && (
                <Tooltip
                  mouseLeaveDelay={0}
                  overlayClassName={ss.linkTt}
                  title={<span onClick={stopProp}>{coin.linkWebsite}</span>}
                >
                  <WebsiteIcon onClick={(e) => stopProp(e, () => window.open(coin.linkWebsite))} />
                </Tooltip>
              )}

              {coin.linkChineseTg && (
                <Tooltip
                  mouseLeaveDelay={0}
                  overlayClassName={ss.linkTt}
                  title={<span onClick={stopProp}>{coin.linkChineseTg}</span>}
                >
                  <span className={ss.tgIcon} onClick={(e) => stopProp(e, () => window.open(coin.linkChineseTg))}>
                    <TGIcon />
                    <CNIcon />
                  </span>
                </Tooltip>
              )}

              {coin.linkEnglishTg && (
                <Tooltip
                  mouseLeaveDelay={0}
                  overlayClassName={ss.linkTt}
                  title={<span onClick={stopProp}>{coin.linkEnglishTg}</span>}
                >
                  <span className={ss.tgIcon} onClick={(e) => stopProp(e, () => window.open(coin.linkEnglishTg))}>
                    <TGIcon />
                    <ENIcon />
                  </span>
                </Tooltip>
              )}

              {coin.linkTwitter && (
                <Tooltip
                  mouseLeaveDelay={0}
                  overlayClassName={ss.linkTt}
                  title={<span onClick={stopProp}>{coin.linkTwitter}</span>}
                >
                  <TwitterIcon onClick={(e) => stopProp(e, () => window.open(coin.linkTwitter))} />
                </Tooltip>
              )}

              {coin.linkDiscord && (
                <Tooltip
                  mouseLeaveDelay={0}
                  overlayClassName={ss.linkTt}
                  title={<span onClick={stopProp}>{coin.linkDiscord}</span>}
                >
                  <DiscordIcon onClick={(e) => stopProp(e, () => window.open(coin.linkDiscord))} />
                </Tooltip>
              )}

              {coin.linkMedium && (
                <Tooltip
                  mouseLeaveDelay={0}
                  overlayClassName={ss.linkTt}
                  title={<span onClick={stopProp}>{coin.linkMedium}</span>}
                >
                  <MediumIcon onClick={(e) => stopProp(e, () => window.open(coin.linkMedium))} />
                </Tooltip>
              )}
            </div>

            <div className={ss.upvote}>
              <CDButton
                className={+coin.id === +home.votingId ? ss.voting : ''}
                primary={common.votedIdList.includes(coin.id + '')}
                onClick={(e) =>
                  stopProp(
                    e,
                    common.votedIdList.includes(coin.id + '') ? null : () => home.handleVote(coin, promo, !promo)
                  )
                }
              >
                <Rocket />
                {coin.coinUpvotes}
              </CDButton>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default React.memo(observer(CoinList))
