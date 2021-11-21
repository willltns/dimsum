import ss from './index.module.less'
import { ReactComponent as CNIcon } from '@/assets/img/link-icon/cn.svg'
import { ReactComponent as ENIcon } from '@/assets/img/link-icon/en.svg'

import React, { useEffect } from 'react'
import { Divider, notification, Space } from 'antd'
import { observer } from 'mobx-react'
import { MenuOutlined } from '@ant-design/icons'
import { Link, useHistory, useLocation } from 'react-router-dom'

import { useStore } from '@/utils/hooks/useStore'
import { getChainList } from '@/assets/xhr'
import { fileDomain } from '@/consts'

import CDButton from '@/components/cd-button'

function Header() {
  const history = useHistory()
  const { pathname } = useLocation()

  const { common, home } = useStore()

  useEffect(() => {
    home.getCoins({ value: '', type: 1, pageNo: 1 })
    home.getNewCoins(3)
    common.getAdvert()
    // prettier-ignore
    getChainList().then((res) => common.updateProp({ coinChainList: res?.list || [] })).catch(() => {})
  }, [home, common])

  useEffect(() => {
    window.scrollTo(0, 0)
    if (pathname !== '/coin-info')
      document.title = 'YYDSCoins - 中国社区加密货币收录平台 | Best Chinese Community Coin Listing'

    // if (['/add-coin', '/promote'].includes(pathname)) return
    // common.getAdvert()
  }, [pathname, common])

  useEffect(() => {
    if (!common.popBanner?.bannerUrl) return
    notification.open({
      bottom: 8,
      message: null,
      duration: null,
      key: 'popPromo',
      className: ss.popPro,
      placement: 'bottomRight',
      description: (
        <a href={common.popBanner.linkUrl} target="_blank" rel="noreferrer">
          <img src={fileDomain + common.popBanner.bannerUrl} alt={common.popBanner.coinName} />
        </a>
      ),
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [common.popBanner?.bannerUrl])

  const toggleSidebar = () => {
    const sidebarEl = document.querySelector('.sidebar')

    if (sidebarEl.style.transform) {
      sidebarEl.style.transform = ''
      setTimeout(() => (sidebarEl.style = ''), 200)
    } else {
      sidebarEl.style.transform = 'translate3d(0, 0, 0)'
      sidebarEl.style.opacity = 1
    }
  }

  return (
    <header className={ss.header}>
      <Link to="/">
        <img src="/logo.png" alt="YYDSCoins" style={{ height: 40 }} />
      </Link>
      <div className={ss.headerBtn}>
        <CDButton onClick={() => history.push('/add-coin')}>{common.isZH ? '添加代币' : 'List a Project'}</CDButton>
        <CDButton primary onClick={() => history.push('/promote')}>
          {common.isZH ? '推广' : 'Promote'}
        </CDButton>
        <CDButton
          className={`${ss.langBtn} ${common.isZH ? ss.bgZ : ss.bgE}`}
          onClick={() => {
            const lang = common.isZH ? 'en' : 'zh'
            localStorage.setItem('lang', lang)
            common.updateProp({ language: lang })
          }}
        >
          <Space
            size={3}
            split={<Divider type="vertical" />}
            className={`${ss.langTog} ${common.isZH ? ss.zh : ss.en}`}
          >
            <CNIcon />
            <ENIcon />
          </Space>
        </CDButton>
        <MenuOutlined className={ss.sideCtrl} onClick={toggleSidebar} />
      </div>
    </header>
  )
}

export default React.memo(observer(Header))
