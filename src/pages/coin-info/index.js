import ss from './index.module.less'
import birbLogo from '@/assets/img/birb.png'

import React from 'react'
import { Divider, Input, Popover } from 'antd'
import { CopyOutlined } from '@ant-design/icons'

import MainBanner from '@/components/main-banner'
import CoinList from '@/components/coin-list'
import Footer from '@/components/footer'
import CDButton from '@/components/cd-button'

import { presaleTemplate } from '@/pages/add-coin/const'

function CoinInfo() {
  return (
    <section>
      <MainBanner />

      <div className={ss.wrapper}>
        <div className={ss.coin}>
          <div className={ss.coinInfo}>
            <div className={ss.infoHead}>
              <div className={ss.base}>
                <img src={birbLogo} alt="b" />
                <div>
                  <div className={ss.name}>Birb</div>
                  <div className={ss.symbol}>$BIRB</div>
                </div>
              </div>
              <div className={ss.stat}>
                <span>
                  投票 <b>1992</b>
                </span>
                <span>
                  今日投票 <b>999</b>
                </span>
                {/*<CDButton>预售信息</CDButton>*/}
                {/*<CDButton>空投信息</CDButton>*/}
              </div>
            </div>

            <div className={ss.addressInfo}>
              <span>
                Binance Smart Chain: <span className={ss.address}>0x82a479264b36104be4fdb91618a59a4fc0f50650</span>
              </span>
              <CopyOutlined />
            </div>

            <Input.TextArea autoSize readOnly value={presaleTemplate} className={ss.desc} />
          </div>

          <div className={ss.links}>
            <Popover content="https://www.dimsumcoins.com" mouseEnterDelay={0}>
              <CDButton>官方网站</CDButton>
            </Popover>
            <CDButton>中文电报</CDButton>
            <CDButton>英文电报</CDButton>
            <CDButton>推特</CDButton>
            <CDButton>Discord</CDButton>
            <CDButton>更多...</CDButton>
            <Divider />
            <CDButton>预售信息</CDButton>
            <CDButton>空投信息</CDButton>
          </div>
        </div>

        <div style={{ textAlign: 'center', marginTop: 32 }}>
          <CDButton primary className={ss.upvoteBtn}>
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
