import ss from './index.module.less'
import { ReactComponent as FacebookIcon } from '@/assets/img/share-icon/facebook.svg'
import { ReactComponent as TelegramIcon } from '@/assets/img/share-icon/telegram.svg'
import { ReactComponent as TwitterIcon } from '@/assets/img/share-icon/twitter.svg'
import { ReactComponent as WeiboIcon } from '@/assets/img/share-icon/weibo.svg'
import { ReactComponent as WhatsappIcon } from '@/assets/img/share-icon/whatsapp.svg'

import React from 'react'
import { Modal } from 'antd'
import ClipboardJS from 'clipboard'
import { observer } from 'mobx-react'
import { ShareAltOutlined, CopyOutlined, CheckCircleOutlined, RiseOutlined } from '@ant-design/icons'

import { fileDomain } from '@/consts'
import { useStore } from '@/utils/hooks/useStore'

function fixedEncodeURIComponent(str) {
  return encodeURIComponent(str).replace(/[!'()*]/g, function (c) {
    return '%' + c.charCodeAt(0).toString(16)
  })
}

const shareWindowParams = `menubar=no,toolbar=no,status=no,width=${window.innerWidth / 2},height=${
  window.innerHeight / 2
}`

const appTitle = 'YYDSCoins - 中国社区加密货币收录平台 | Best Chinese Community Coin Listing'

function ShareBtns(props) {
  const { coinInfo, chainAbbr } = props
  const { common } = useStore()

  const [visible, setVisible] = React.useState(false)
  const cpBtn = React.useRef(null)
  const sucIcon = React.useRef(null)

  React.useEffect(() => {
    if (!visible) return

    const clipboard = new ClipboardJS(cpBtn.current)
    clipboard.on('success', () => {
      cpBtn.current.style.display = 'none'
      sucIcon.current.style.display = 'block'
      setTimeout(() => {
        cpBtn.current && (cpBtn.current.style.display = 'block')
        sucIcon.current && (sucIcon.current.style.display = 'none')
      }, 2222)
    })
    return () => clipboard.destroy()
  }, [visible])

  const url = fixedEncodeURIComponent(window.location.href)
  const title = fixedEncodeURIComponent(`\n${coinInfo.coinName} (${coinInfo.coinSymbol}) 💎🚀🌕\n\n${appTitle}\n\n`)

  const text = fixedEncodeURIComponent(`\n${coinInfo.coinName} (${coinInfo.coinSymbol}) 💎🚀🌕\n\n${appTitle}\n\n`)
  const hash_tags = fixedEncodeURIComponent(
    `\n\n#YYDSCoins,${chainAbbr},coin,token,crypto,cryptocurrency,altcoin,bitcoin`
  )
  const pic = fixedEncodeURIComponent(fileDomain + coinInfo.coinLogo)

  const platformMap = {
    weibo: 'https://service.weibo.com/share/share.php?url=' + url + '&title=' + title + '&pic=' + pic,
    telegram: 'https://t.me/share/url?url=' + url + `&text=%0A${coinInfo.coinName} (${coinInfo.coinSymbol}) 💎🚀🌕%0A`,
    twitter: 'https://twitter.com/intent/tweet?url=' + url + '&text=' + text + '&hashtags=' + hash_tags,
    facebook: 'https://www.facebook.com/sharer.php?u=' + url,
    whatsapp: 'https://api.whatsapp.com/send?text=' + url + '%0A%0A' + text,
  }

  const handleShare = (e) => {
    const platform = e.target?.dataset?.platform
    if (!platform) return

    if (platform === 'cp') return setVisible(true)
    window.open(platformMap[platform], 'Share Window', shareWindowParams)
  }

  return (
    <>
      <div className={ss.shareBtns} onClick={handleShare}>
        <div data-platform="weibo">
          <WeiboIcon />
        </div>
        <div data-platform="telegram">
          <TelegramIcon />
        </div>
        <div data-platform="twitter">
          <TwitterIcon />
        </div>
        <div data-platform="facebook">
          <FacebookIcon />
        </div>
        <div data-platform="whatsapp">
          <WhatsappIcon />
        </div>
        <div data-platform="cp">
          <ShareAltOutlined />
        </div>
      </div>

      <Modal
        zIndex={1011}
        footer={null}
        visible={visible}
        onCancel={() => setVisible(false)}
        title={common.isZH ? '复制分享' : 'Copy & Share'}
      >
        <div className={ss.cpsMo}>
          <div className={ss.cpsText}>
            <p>
              <a href={window.location.href} target="_blank" rel="noreferrer">
                {window.location.href}
              </a>
            </p>
            <p>
              {coinInfo.coinName} ({coinInfo.coinSymbol}) 💎🚀🌕
            </p>
            <p>{appTitle}</p>
          </div>

          <CopyOutlined
            ref={cpBtn}
            className={ss.cpsBtn}
            data-clipboard-text={`${window.location.href}\n\n${coinInfo.coinName} (${coinInfo.coinSymbol}) 💎🚀🌕\n\n${appTitle}`}
          />
          <CheckCircleOutlined className={ss.sucIcon} ref={sucIcon} />
          <i>
            {common.isZH ? '和朋友一起分享 💎🚀🌕' : 'Share this 💎🚀🌕 with your friends'}
            <RiseOutlined />
          </i>
        </div>
      </Modal>
    </>
  )
}

export default React.memo(observer(ShareBtns))
