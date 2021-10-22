import ss from './index.module.less'

import React, { useRef, useState, useEffect } from 'react'
import ClipboardJS from 'clipboard'
import { Divider, Dropdown, Input, Menu, notification, Popover } from 'antd'
import { CopyOutlined } from '@ant-design/icons'
import { useParams } from 'react-router-dom'

import { urlReg } from '@/consts'
import { getCoinDetail } from '@/assets/xhr'
import { useStore } from '@/utils/hooks/useStore'

import MainBanner from '@/components/main-banner'
import CoinList from '@/components/coin-list'
import Footer from '@/components/footer'
import CDButton from '@/components/cd-button'
import { modalInfo } from '@/components/coin-list/modalInfo'

function CoinInfo() {
  const copyBtnRef = useRef()
  const { common } = useStore()
  const { coinId } = useParams()
  const [state, setState] = useState({ coinInfo: {}, loading: true })
  const { coinInfo, loading } = state

  useEffect(() => {
    getCoinDetail({ id: coinId })
      .then((coinInfo) => setState((state) => ({ ...state, coinInfo, loading: false })))
      .catch(() => setState((state) => ({ ...state, loading: false })))
    return () => setState((state) => ({ ...state, coinInfo: {}, loading: true }))
  }, [coinId])

  useEffect(() => {
    if (!coinInfo.coinAddress) return

    const clipboard = new ClipboardJS(copyBtnRef.current)

    clipboard.on('success', () => {
      copyBtnRef.current.style = 'opacity: 0; pointer-events: none'
      notification.success({ message: '合约已复制', description: coinInfo.coinAddress })
      setTimeout(() => (copyBtnRef.current.style = 'opacity: 1; pointer-events: default'), 3000)
    })

    return () => clipboard.destroy()
  }, [coinInfo.coinAddress])

  const openWeb = (e) => {
    const { link } = e.target.dataset
    window.open(link)
  }

  return (
    <section>
      <MainBanner />

      <div className={ss.wrapper}>
        <div className={ss.coin}>
          <div className={ss.coinInfo}>
            <div className={ss.infoHead}>
              <div className={ss.base}>
                {coinInfo.coinLogo ? <img src={coinInfo.coinLogo} alt={coinInfo.coinName} /> : <i>?</i>}

                <div>
                  <div className={ss.name}>{coinInfo.coinName || '??'}</div>
                  <div className={ss.symbol}>${coinInfo.coinSymbol || '??'}</div>
                </div>
              </div>
              <div className={ss.stat}>
                <span>
                  投票 <b>{coinInfo.coinUpvotes || '?'}</b>
                </span>
                <span>
                  今日投票 <b>{coinInfo.coinUpvotesToday || '?'}</b>
                </span>
              </div>
            </div>

            <div className={ss.addressInfo}>
              <span>
                Binance Smart Chain: <span className={ss.address}>{coinInfo.coinAddress || '--'}</span>
              </span>
              {!!coinInfo.coinAddress && (
                <CopyOutlined id="#copy" ref={copyBtnRef} data-clipboard-text={coinInfo.coinAddress} />
              )}
            </div>

            <Input.TextArea autoSize readOnly value={coinInfo.coinDescription} className={ss.desc} />
          </div>

          <div className={ss.links}>
            {coinInfo.linkWebsite && (
              <Popover content={coinInfo.linkWebsite} mouseLeaveDelay={0}>
                <CDButton data-link={coinInfo.linkWebsite} onClick={openWeb}>
                  官方网站
                </CDButton>
              </Popover>
            )}

            {coinInfo.linkChineseTg && (
              <Popover content={coinInfo.linkChineseTg} mouseLeaveDelay={0}>
                <CDButton data-link={coinInfo.linkChineseTg} onClick={openWeb}>
                  中文电报
                </CDButton>
              </Popover>
            )}

            {coinInfo.linkEnglishTg && (
              <Popover content={coinInfo.linkEnglishTg} mouseLeaveDelay={0}>
                <CDButton data-link={coinInfo.linkEnglishTg} onClick={openWeb}>
                  英文电报
                </CDButton>
              </Popover>
            )}

            {coinInfo.linkTwitter && (
              <Popover content={coinInfo.linkTwitter} mouseLeaveDelay={0}>
                <CDButton data-link={coinInfo.linkTwitter} onClick={openWeb}>
                  推特
                </CDButton>
              </Popover>
            )}

            {coinInfo.linkDiscord && (
              <Popover content={coinInfo.linkDiscord} mouseLeaveDelay={0}>
                <CDButton data-link={coinInfo.linkDiscord} onClick={openWeb}>
                  Discord
                </CDButton>
              </Popover>
            )}

            {coinInfo.linkMedium && (
              <Popover content={coinInfo.linkMedium} mouseLeaveDelay={0}>
                <CDButton data-link={coinInfo.linkMedium} onClick={openWeb}>
                  Medium
                </CDButton>
              </Popover>
            )}

            <Dropdown
              zIndex={999}
              trigger="click"
              disabled={!coinInfo.linkAdditionalInfo}
              overlay={
                <Menu className={ss.linkMenus}>
                  {coinInfo.linkAdditionalInfo
                    ?.split('\n')
                    .map((s) => {
                      const [name, link] = s.split('$$')
                      if (name && urlReg.test(link)) {
                        // prettier-ignore
                        return (<Menu.Item key={link}><Popover content={link} mouseLeaveDelay={0}><a href={link} target="_blank" rel="noreferrer">{name}</a></Popover></Menu.Item>)
                      }
                      return null
                    })
                    .filter(Boolean)}
                </Menu>
              }
            >
              <CDButton>更多...</CDButton>
            </Dropdown>

            <Divider />

            <CDButton
              disabled={!coinInfo.coinPresaleInfo}
              onClick={
                !!coinInfo.coinPresaleInfo
                  ? () => modalInfo({ title: '预售信息', text: coinInfo.coinPresaleInfo })
                  : null
              }
            >
              预售信息
            </CDButton>
            <CDButton
              disabled={!coinInfo.coinAirdropInfo}
              onClick={
                !!coinInfo.coinAirdropInfo
                  ? () => modalInfo({ title: '空投信息', text: coinInfo.coinAirdropInfo })
                  : null
              }
            >
              空投信息
            </CDButton>
          </div>
        </div>

        <div style={{ textAlign: 'center', marginTop: 32 }}>
          <CDButton
            primary
            className={ss.upvoteBtn}
            onClick={() => {
              const coinStr = `${999}.${new Date().getTime() + 30 * 1000}`
              common.pushVoted(coinStr)
            }}
          >
            🚀&emsp;投 票
          </CDButton>
          <p>每 1 小时可投 1 次票</p>
        </div>
      </div>

      <CoinList promo />
      <Footer />
    </section>
  )
}

export default CoinInfo
