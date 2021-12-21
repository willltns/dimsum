import ss from './index.module.less'
import { ReactComponent as TGIcon } from '@/assets/img/link-icon/tg.svg'
import { ReactComponent as CNIcon } from '@/assets/img/link-icon/cn.svg'
// import aboutZh from '@/assets/img/yy-about-zh.png'
// import aboutEn from '@/assets/img/yy-about-en.png'
// import promoZh from '@/assets/img/yy-promo-full-zh.png'
// import promoEn from '@/assets/img/yy-promo-full-en.png'
// import packageZh from '@/assets/img/yy-package-zh.png'
// import packageEn from '@/assets/img/yy-package-en.png'

import React from 'react'
import { Image, Popover } from 'antd'
import { observer } from 'mobx-react'

import { fileDomain } from '@/consts'
import { useStore } from '@/utils/hooks/useStore'

import Footer from '@/components/footer'

const weibo1 = (
  <Popover
    mouseEnterDelay={0}
    content={
      <a href="https://weibo.com/u/5803009508" target="_blank" rel="noreferrer">
        https://weibo.com/u/5803009508
      </a>
    }
    overlayInnerStyle={{ fontSize: 16 }}
  >
    <a href="https://weibo.com/u/5803009508" target="_blank" rel="noreferrer">
      kongtoubifeizai｜空投币费仔
    </a>
  </Popover>
)

const weibo2 = (
  <Popover
    mouseEnterDelay={0}
    content={
      <a href="https://weibo.com/5976209911" target="_blank" rel="noreferrer">
        https://weibo.com/5976209911
      </a>
    }
    overlayInnerStyle={{ fontSize: 16 }}
  >
    <a href="https://weibo.com/5976209911" target="_blank" rel="noreferrer">
      biquanniyuge｜币圈你宇哥
    </a>
  </Popover>
)

const telegram1 = (
  <Popover
    mouseEnterDelay={0}
    content={
      <a href="https://t.me/liangjianshequ" target="_blank" rel="noreferrer">
        https://t.me/liangjianshequ
      </a>
    }
    overlayInnerStyle={{ fontSize: 16 }}
  >
    <a href="https://t.me/liangjianshequ" target="_blank" rel="noreferrer" className={ss.tgLink}>
      <span className={ss.tgIcon}>
        <TGIcon />
        <CNIcon />
      </span>
      亮剑社区｜@liangjianshequ
    </a>
  </Popover>
)

function AboutUs() {
  const { common } = useStore()

  if (common.isZH) {
    // 中文版
    return (
      <section>
        <div className={ss.aboutUs}>
          <h1>
            关于我们 - 什么是<span>YYDS</span>?
          </h1>
          <div>
            <h2>YYDSCoins 介绍</h2>
            <p>
              YYDSCoins 是领先的基于社区投票来决定代币流行趋势的代币收录平台。<em>YYDS 指 Eternal God | 永远的神</em>
              。我们提供中英文两种语言，目标是使加密货币在全球范围内高效可发现，正相应平台的名称和创建者的志向。我们还提供必要的信息来帮助中国的潜在投资者：代币的电报、价格图表、白名单，预售信息等。
            </p>
          </div>

          <div>
            <h2>YYDSCoins 的独特之处</h2>
            <p>
              通常代币进入大型交易所之前，都会在这个平台先列出。我们平台的用户可以使用 YYDSCoins
              投票他们喜欢的代币，每月最受欢迎的代币会获得 YYDSCoins
              的免费广告服务，来奖励他们的项目，以进一步提高其曝光率。
            </p>
            <p>
              YYDSCoins平台具有独特的功能，支持代币信息社交分享，如 Telegram、Weibo、Whatsapp、Twitter、Facebook
              等，深受数百万用户的喜爱。有了这个功能，用户现在可以帮助他们的朋友、家人和社区发掘最新的 NFT、DeFi
              等项目。
            </p>
          </div>

          <div>
            <h2>关键伙伴关系和生态系统建设</h2>
            <div style={{ fontSize: 16 }}>
              凭借 YYDSCoins
              团队的人脉关系和值得信赖的声誉，我们已成功建立了一个与数百万（！）中国加密货币投资者接触的合作伙伴网络：
              <ul>
                <li>主要中文电报合作社区。</li>
                <li>
                  加密货币微博大咖 (>300万曝光率， 包括 {weibo1} 和 {weibo2}，等更多大咖)。
                </li>
                {/*<li>Swaps.</li>*/}
                <li>英文电报合作社区。</li>
              </ul>
              通过这些重要的合作伙伴关系，YYDSCoins 团队拥有了一些关于使加密代币成功的关键因素。
            </div>
          </div>

          <div>
            <h2>方便开发者</h2>
            <p>
              现在通过与 YYDSCoins
              合作，简化您推广代币的过程，无需寻找不同的推广服务。通过多方合作，我们的服务业务包括中文社区置顶帖（
              {telegram1} 等其他合作社区）、AMA、社区建设与管理、活动策划、微博推广和 Bilibili 广告服务。
            </p>
            <p style={{ color: '#ff8200', fontWeight: 600 }}>
              YYDSCoins 将使用能够为其投资者带来最佳投资回报的营销组合。
            </p>
          </div>

          <Image.PreviewGroup>
            <Image src={`${fileDomain}images/yy-about-zh.png`} />
            <Image src={`${fileDomain}images/yy-promo-full-zh.png`} />
            <Image src={`${fileDomain}images/yy-package-zh.png`} />
          </Image.PreviewGroup>
        </div>

        <Footer />
      </section>
    )
  }

  // 英文版
  return (
    <section>
      <div className={ss.aboutUs}>
        <h1>
          About Us - What is <span>YYDS</span>?
        </h1>
        <div>
          <h2>YYDSCoins Introduction</h2>
          <p>
            YYDSCoins is the leading pioneer of coin listing website, based on the community voting to determine the
            popularity of coin. <em>YYDS stands for Eternal God | 永远的神</em>. Available in both English and Chinese
            language, this platform aims to make crypto discoverable and efficient globally; its name signifies the
            founders’ ambitions to create a platform that is god-like. We also provide the essential information to
            assist Chinese potential investors, from the coins' telegram groups, price charts, discord down to
            whitelisting and presale information.
          </p>
        </div>

        <div>
          <h2>Unique Features of YYDSCoins</h2>
          <p>
            Way before they pump up to the big exchanges, those projects are listed here. Users of our platform can use
            YYDSCoins can vote their favorite coins and reward their project with free advertising services on
            YYDSCoins, to further boost its exposure.
          </p>
          <p>
            YYDSCoins platform has unique features to support coin information social sharing, largely enjoyed by
            millions of users interacting with the website. With this, users can now help their fellow retail friends,
            family and acquaintances discover the latest NFTs, community and DeFi projects.
          </p>
        </div>

        <div>
          <h2>Key Partnership & Ecosystem Building</h2>
          <div style={{ fontSize: 16 }}>
            With its team's connections and trustworthy reputation, we have successfully built a partnership network
            with touch points of millions(!) of Chinese crypto investors:
            <ul>
              <li>Major Chinese communities with partnership.</li>
              <li>
                Weibo Influencers (>3M Chinese investors’ eyeballs, through {weibo1} and {weibo2} and more).
              </li>
              {/*<li>Swaps.</li>*/}
              <li>English communities with partnership.</li>
            </ul>
            With these key partnerships, YYDSCoins team has obtained some key insights on what makes a crypto token
            successful.
          </div>
        </div>

        <div>
          <h2>Ease for Developers</h2>
          <p>
            Working with YYDSCoins now eases the process of promoting coins. There is no need to look for different
            sources of promotional services. Through multiple partnerships, we also specialize in Chinese Community
            pinned post (with {telegram1} and others), AMA, community building, shilling, modding, Weibo and Bilibili
            advert services.
          </p>
          <p style={{ color: '#ff8200', fontWeight: 600 }}>
            YYDSCoins will be using a marketing mix that will bring the best ROI to its investors.
          </p>
        </div>

        <Image.PreviewGroup>
          <Image src={`${fileDomain}images/yy-about-en.png`} />
          <Image src={`${fileDomain}images/yy-promo-full-en.png`} />
          <Image src={`${fileDomain}images/yy-package-en.png`} />
        </Image.PreviewGroup>
      </div>

      <Footer />
    </section>
  )
}

export default observer(AboutUs)
