import ss from './index.module.less'

import React from 'react'
import { InlineShareButtons } from 'sharethis-reactjs'

import { fileDomain } from '@/consts'

function ShareBtns(props) {
  const { coinInfo } = props
  if (!coinInfo?.id) return null

  return (
    <div className={ss.shareBtns}>
      <InlineShareButtons
        config={{
          alignment: 'right', // alignment of buttons (left, center, right)
          color: 'white', // set the color of buttons (social, white)
          enabled: true, // show/hide buttons (true, false)
          font_size: 16, // font size for the buttons
          labels: 'null', // button labels (cta, counts, null)
          language: 'en', // which language to use (see LANGUAGES)
          networks: [
            // which networks to include (see SHARING NETWORKS)
            'wechat',
            'weibo',
            'telegram',
            'twitter',
            'facebook',
            'whatsapp',
          ],
          padding: 8, // padding within buttons (INTEGER)
          radius: 8, // the corner radius on each button (INTEGER)
          show_total: false,
          size: 32, // the size of each button (INTEGER)

          // OPTIONAL PARAMETERS
          // url: 'https://www.sharethis.com', // (defaults to current url)
          image: fileDomain + coinInfo.coinLogo, // (defaults to og:image or twitter:image)
          title: `\n${coinInfo.coinName} (${coinInfo.coinSymbol}) | YYDSCoins - 中国社区加密货币收录平台 | Best Chinese Community Coin Listing\n`, // (defaults to og:title or twitter:title)
          // description: 'YYDS', // (defaults to og:description or twitter:description)
          // message: 'custom email text', // (only for email sharing)
          // subject: 'custom email subject', // (only for email sharing)
          // username: 'xxxx twitter handle', // (only for twitter sharing)
        }}
      />
    </div>
  )
}

export default ShareBtns
