import ss from './index.module.less'

import { notification } from 'antd'
import { BrowserRouter } from 'react-router-dom'
import { MobXProviderContext } from 'mobx-react'

import routes from '@/routes'
import rootStore from '@/stores'
import { getChamp, getPromoVote, getServTime } from '@/assets/xhr'
import RouteWithSubRoutes from '../route-with-sub-routes'

import Header from '@/components/header'
import Sidebar from '@/components/siderbar'
import PromoVoteModal from '@/components/promo-vote-modal'

notification.config({ top: 60, duration: 2, maxCount: 1 })
// 本地语言
rootStore.common.updateProp({ language: localStorage.getItem('lang') || 'zh' })

function App() {
  return (
    <MobXProviderContext.Provider value={rootStore}>
      <BrowserRouter>
        <Header />

        <div className={ss.main}>
          <Sidebar />
          <RouteWithSubRoutes routes={routes} />
        </div>

        <PromoVoteModal />
      </BrowserRouter>
    </MobXProviderContext.Provider>
  )
}

export default App

// 获取当前 ip 在 1h 内已投票的项目
rootStore.common.getVotedList()

// 获取推广投票数据
;(async () => {
  try {
    const [champ, promoInfo] = await Promise.all([getChamp(), getPromoVote()])
    rootStore.common.updatePromoVote({ champ, promoInfo })
  } catch (err) {}
})()

// 页面可见时获取服务器时间，校准页面时钟
document.addEventListener('visibilitychange', function () {
  if (document.visibilityState !== 'visible') return
  // rootStore.common.getAdvert()
  // prettier-ignore
  getServTime().then(res => res?.date && rootStore.common.updateUnixTS(res.date)).catch(()=> {})
})
