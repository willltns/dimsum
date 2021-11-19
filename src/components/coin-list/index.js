import ss from './index.module.less'
import { ReactComponent as WebsiteIcon } from '@/assets/img/link-icon/website.svg'
import { ReactComponent as TGIcon } from '@/assets/img/link-icon/tg.svg'
import { ReactComponent as CNIcon } from '@/assets/img/link-icon/cn.svg'
import { ReactComponent as ENIcon } from '@/assets/img/link-icon/en.svg'
import { ReactComponent as TwitterIcon } from '@/assets/img/link-icon/twitter.svg'
import { ReactComponent as DiscordIcon } from '@/assets/img/link-icon/discord.svg'
import { ReactComponent as MediumIcon } from '@/assets/img/link-icon/medium.svg'
import { ReactComponent as Rocket } from '@/assets/img/link-icon/rocket.svg'
import { ReactComponent as Diamond } from '@/assets/img/diamond.svg'

import React from 'react'
import dayjs from 'dayjs'
import { Tooltip, Image } from 'antd'
import { observer } from 'mobx-react'
import { Link } from 'react-router-dom'

import { useStore } from '@/utils/hooks/useStore'
import { fileDomain } from '@/consts'
import zh from './lang/zh.json'
import en from './lang/en.json'

import CDButton from '@/components/cd-button'
import { modalInfo } from '@/components/coin-list/modalInfo'

const lang = { zh, en }

const logoFB = {
  s: 'data:image/png;base64,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',
}

function CoinList(props) {
  const { list, listType, promo } = props

  const { common, home } = useStore()
  const language = lang[common.language]

  // 推广代币列表，但列表没有值，不渲染
  if (promo && !list?.length) return null

  const title = promo ? (
    <>
      <Diamond className={ss.diamond} />
      {language.pName}
      <Diamond className={ss.diamond} />
    </>
  ) : (
    language.name
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
          <div>{language.symbol}</div>
          <div>
            {listType === 4 && language.datePres}
            {listType === 5 && language.dateAird}
            {(!listType || listType < 4) && language.dateLaunch} (UTC+8)
          </div>
          <div>{language.presale}</div>
          <div>{language.airdrop}</div>
          <div>{language.links}</div>
          <div>{language.upvotes}</div>
        </div>
      </div>
      <div className={ss.tBody}>
        {list?.map((coin) => (
          <Link className={ss.tRow} to={`/coin/${coin.coinUniqueUrl || coin.id}`} key={coin.id}>
            <div className={ss.name}>
              <span>
                <Image
                  src={fileDomain + coin.coinLogo}
                  className={ss.coinLogo}
                  alt={coin.coinSymbol}
                  fallback={logoFB.s}
                  preview={false}
                />

                {common.coinChainList.find((c) => +c.id === +coin.coinChain) ? (
                  <img
                    src={fileDomain + common.coinChainList.find((c) => +c.id === +coin.coinChain).logo}
                    alt={coin.coinSymbol}
                    className={ss.coinChain}
                  />
                ) : null}
              </span>
              {coin.coinName}
            </div>

            <div>{coin.coinSymbol}</div>

            {(() => {
              const dateStr =
                listType === 4 ? coin.coinPresaleDate : listType === 5 ? coin.coinAirdropDate : coin.coinLaunchDate
              if (!dateStr) return <div className={ss.date}>--</div>
              const djDate = dayjs(dateStr)
              const style = djDate.isAfter(common.serverDateStr) ? { color: '#ff8200' } : undefined
              return (
                <div className={ss.date} style={style}>
                  <span>{djDate.format('YYYY-')}</span>
                  {djDate.format('MM-DD')}
                  <i>{djDate.format('HH:mm')}</i>
                </div>
              )
            })()}

            <div className={ss.btnCol}>
              {coin.coinPresaleInfo ? (
                <CDButton
                  onClick={(e) =>
                    stopProp(e, () =>
                      modalInfo({
                        title:
                          language.presale + (coin.coinPresaleDate ? ` - ${coin.coinPresaleDate.slice(0, -3)}` : ''),
                        text: coin.coinPresaleInfo,
                        okText: common.isZH ? '好的' : 'Ok',
                      })
                    )
                  }
                >
                  {language.check}
                </CDButton>
              ) : (
                '---'
              )}
            </div>

            <div className={ss.btnCol}>
              {coin.coinAirdropInfo ? (
                <CDButton
                  onClick={(e) =>
                    stopProp(e, () =>
                      modalInfo({
                        title:
                          language.airdrop + (coin.coinAirdropDate ? ` - ${coin.coinAirdropDate.slice(0, -3)}` : ''),
                        text: coin.coinAirdropInfo,
                        okText: common.isZH ? '好的' : 'Ok',
                      })
                    )
                  }
                >
                  {language.check}
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
                className={home.votingIdList.includes(coin.id) ? ss.voting : ''}
                primary={common.votedIdList.includes(coin.id + '')}
                onClick={(e) => {
                  e.target.firstChild?.classList.add(ss.mooning)
                  stopProp(
                    e,
                    common.votedIdList.includes(coin.id + '') ? null : () => home.handleVote(coin, promo, !promo)
                  )
                }}
                onMouseEnter={(e) => e.target.firstChild?.classList.remove(ss.mooning)}
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
