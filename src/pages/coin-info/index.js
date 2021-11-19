import ss from './index.module.less'
import { ReactComponent as RocketIcon } from '@/assets/img/link-icon/rocket.svg'

import React, { useRef, useState, useEffect } from 'react'
import ClipboardJS from 'clipboard'
import { Divider, Input, notification, Popover } from 'antd'
import { CopyOutlined } from '@ant-design/icons'
import { useParams } from 'react-router-dom'
import { observer } from 'mobx-react'

import { fileDomain, urlReg } from '@/consts'
import { getCoinDetail } from '@/assets/xhr'
import { useStore } from '@/utils/hooks/useStore'
import zh from './lang/zh.json'
import en from './lang/en.json'

import MainBanner from '@/components/main-banner'
import CoinList from '@/components/coin-list'
import Footer from '@/components/footer'
import CDButton from '@/components/cd-button'
import ShareBtns from './ShareBtns'
import { modalInfo } from '@/components/coin-list/modalInfo'

const copiedTitle = { current: null }

function CoinInfo() {
  const copyBtnRef = useRef()
  const { common, home } = useStore()
  const lang = common.isZH ? zh : en

  copiedTitle.current = lang.copied

  const { coinId } = useParams()
  const [state, setState] = useState({ coinInfo: {}, loading: true })
  const { coinInfo, loading } = state

  const key = /^[1-9]\d*$/.test(coinId) ? 'id' : 'coinUniqueUrl'
  useEffect(() => {
    const key = /^[1-9]\d*$/.test(coinId) ? 'id' : 'coinUniqueUrl'

    const params = { [key]: coinId }
    getCoinDetail(params)
      .then((coinInfo) => {
        setState((state) => ({ ...state, coinInfo, loading: false }))
        document.title = `${coinInfo.coinName} (${coinInfo.coinSymbol}) | YYDSCoins - 中国社区加密货币收录平台 | Best Chinese Community Coin Listing`
      })
      .catch(() => setState((state) => ({ ...state, loading: false })))
    return () => setState((state) => ({ ...state, coinInfo: {}, loading: true }))
  }, [coinId])

  useEffect(() => {
    if (!coinInfo.coinAddress) return

    const clipboard = new ClipboardJS(copyBtnRef.current)
    clipboard.on('success', () => {
      copyBtnRef.current.style = 'opacity: 0; pointer-events: none'
      notification.success({ message: copiedTitle.current, description: coinInfo.coinAddress, duration: 2.5 })
      setTimeout(() => copyBtnRef.current && (copyBtnRef.current.style = 'opacity: 1; pointer-events: default'), 3000)
    })

    return () => clipboard.destroy()
  }, [coinInfo.coinAddress])

  const openWeb = (e) => {
    const { link } = e.target.dataset
    window.open(link)
  }

  // 如果该 详情代币 正好推广列表里也有，那么投票数据使用推广列表里的
  // 因为该 coinInfo 为组件内状态，当存在 推广列表 当前代币投票数更新时，该内部 state 变更不易交互
  const upvotesData = common.promoCoinList?.find((pc) => +pc[key] === +coinId) || coinInfo

  const chainInfo = common.coinChainList.find((c) => +c.id === coinInfo.coinChain) || {}

  return (
    <section className={ss.ciS}>
      <MainBanner />

      <div className={ss.wrapper}>
        <div className={ss.coin}>
          <div className={ss.coinInfo}>
            <div className={ss.infoHead}>
              <div className={ss.base}>
                {coinInfo.coinLogo ? <img src={fileDomain + coinInfo.coinLogo} alt={coinInfo.coinName} /> : <i>?</i>}

                <div>
                  <div className={ss.name}>{coinInfo.coinName || '??'}</div>
                  <div className={ss.symbol}>{coinInfo.coinSymbol || '??'}</div>
                </div>
              </div>
              <div className={ss.stat}>
                <span>
                  {lang.votes} <b>{upvotesData.coinUpvotes || '0'}</b>
                </span>
                <span>
                  {lang.tVotes} <b>{upvotesData.coinUpvotesToday || '0'}</b>
                </span>
              </div>
            </div>

            <div className={ss.launchDate}>
              {!!coinInfo.coinPresaleDate && (
                <div style={{ marginRight: 40, marginBottom: 16 }}>
                  {lang.presaleD}：{coinInfo.coinPresaleDate.slice(0, -3) || '-'}
                </div>
              )}
              <div style={{ marginBottom: 24 }}>
                {lang.launchD}：{coinInfo.coinLaunchDate?.slice(0, -3) || '-'}
              </div>

              {loading && <span className={ss.loading}>Loading</span>}
            </div>

            <span className={ss.addressInfo}>
              <div>
                {chainInfo.logo ? <img src={fileDomain + chainInfo.logo} alt="" /> : <i />}

                {chainInfo.chainName || '--'}
              </div>
              <div>
                <span className={ss.address}>{coinInfo.coinAddress || '---'}</span>
                {!!coinInfo.coinAddress && <CopyOutlined ref={copyBtnRef} data-clipboard-text={coinInfo.coinAddress} />}
              </div>
            </span>

            <Input.TextArea autoSize readOnly value={coinInfo.coinDescription} className={ss.desc} />
          </div>

          <div className={ss.links}>
            {coinInfo.linkWebsite && (
              <Popover content={coinInfo.linkWebsite} mouseLeaveDelay={0}>
                <CDButton data-link={coinInfo.linkWebsite} onClick={openWeb}>
                  {lang.oSite}
                </CDButton>
              </Popover>
            )}

            {coinInfo.linkChineseTg && (
              <Popover content={coinInfo.linkChineseTg} mouseLeaveDelay={0}>
                <CDButton data-link={coinInfo.linkChineseTg} onClick={openWeb}>
                  {lang.cnTG}
                </CDButton>
              </Popover>
            )}

            {coinInfo.linkEnglishTg && (
              <Popover content={coinInfo.linkEnglishTg} mouseLeaveDelay={0}>
                <CDButton data-link={coinInfo.linkEnglishTg} onClick={openWeb}>
                  {lang.enTG}
                </CDButton>
              </Popover>
            )}

            {coinInfo.linkTwitter && (
              <Popover content={coinInfo.linkTwitter} mouseLeaveDelay={0}>
                <CDButton data-link={coinInfo.linkTwitter} onClick={openWeb}>
                  {lang.tt}
                </CDButton>
              </Popover>
            )}

            {coinInfo.linkDiscord && (
              <Popover content={coinInfo.linkDiscord} mouseLeaveDelay={0}>
                <CDButton data-link={coinInfo.linkDiscord} onClick={openWeb}>
                  {lang.discord}
                </CDButton>
              </Popover>
            )}

            {coinInfo.linkMedium && (
              <Popover content={coinInfo.linkMedium} mouseLeaveDelay={0}>
                <CDButton data-link={coinInfo.linkMedium} onClick={openWeb}>
                  {lang.medium}
                </CDButton>
              </Popover>
            )}

            {coinInfo.linkAdditionalInfo
              ?.split('\n')
              .map((s) => {
                const [name, link] = s.split('$$$')
                // prettier-ignore
                if (name && urlReg.test(link)) {return (<Popover overlayClassName={ss.linkPop} content={link} mouseLeaveDelay={0} key={link}><CDButton data-link={link} onClick={openWeb}>{name}</CDButton></Popover>)}
                return null
              })
              .filter(Boolean)}

            {(coinInfo.coinPresaleInfo || coinInfo.coinAirdropInfo) && <Divider />}

            {!!coinInfo.coinPresaleInfo && (
              <CDButton
                className={ss.presBtn}
                onClick={() =>
                  modalInfo({
                    title:
                      lang.presaleI + (coinInfo.coinPresaleDate ? ` - ${coinInfo.coinPresaleDate.slice(0, -3)}` : ''),
                    text: coinInfo.coinPresaleInfo,
                    okText: common.isZH ? '好的' : 'Ok',
                  })
                }
              >
                {lang.presaleI}
                {coinInfo.coinPresaleDate && <i>{coinInfo.coinPresaleDate.slice(0, -3)}</i>}
              </CDButton>
            )}

            {!!coinInfo.coinAirdropInfo && (
              <CDButton
                className={ss.airdBtn}
                onClick={() =>
                  modalInfo({
                    title:
                      lang.airdropI + (coinInfo.coinAirdropDate ? ` - ${coinInfo.coinAirdropDate.slice(0, -3)}` : ''),
                    text: coinInfo.coinAirdropInfo,
                    okText: common.isZH ? '好的' : 'Ok',
                  })
                }
              >
                {lang.airdropI}
                {coinInfo.coinAirdropDate && <i>{coinInfo.coinAirdropDate.slice(0, -3)}</i>}
              </CDButton>
            )}
          </div>
        </div>

        <div style={{ textAlign: 'center', marginTop: 32 }}>
          <CDButton
            primary={common.votedIdList.includes(coinInfo.id + '')}
            className={`${ss.upvoteBtn} ${home.votingIdList.includes(coinInfo.id) ? ss.voting : ''}`}
            onClick={
              coinInfo.id
                ? (e) => {
                    e.target?.firstChild.classList.add(ss.mooning)
                    if (common.votedIdList.includes(coinInfo.id + '')) return
                    home.handleVote(coinInfo, true, true)
                    // 这里有个 hack，该页面投票数更新依赖了 common.votedIdList 的变化
                  }
                : undefined
            }
            onMouseEnter={(e) => e.target.firstChild?.classList.remove(ss.mooning)}
          >
            <RocketIcon />
            {common.votedIdList.includes(coinInfo.id + '') ? lang.voted : lang.vote}
          </CDButton>
          <p>{lang.voteTime}</p>
        </div>

        {!!coinInfo.id && (
          <ShareBtns
            coinInfo={coinInfo}
            chainAbbr={(common.coinChainList.find((c) => +c.id === coinInfo.coinChain) || {}).symbol}
          />
        )}
      </div>

      <CoinList promo list={common.promoCoinList} />

      <Footer />
    </section>
  )
}

export default observer(CoinInfo)
