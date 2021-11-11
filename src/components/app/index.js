import ss from './index.module.less'

import { notification } from 'antd'
import { BrowserRouter } from 'react-router-dom'
import { MobXProviderContext } from 'mobx-react'

import routes from '@/routes'
import rootStore from '@/stores'

import RouteWithSubRoutes from '../route-with-sub-routes'
import Header from '@/components/header'
import Sidebar from '@/components/siderbar'
import { getServTime } from '@/assets/xhr'

notification.config({ top: 60, duration: 2, maxCount: 1 })

function App() {
  return (
    <MobXProviderContext.Provider value={rootStore}>
      <BrowserRouter>
        <Header />
        <div className={ss.main}>
          <Sidebar />
          <RouteWithSubRoutes routes={routes} />
        </div>
      </BrowserRouter>
    </MobXProviderContext.Provider>
  )
}

export default App

rootStore.common.getVotedList()
window.addEventListener(
  'beforeunload',
  () => {
    localStorage.setItem('__ivot', JSON.stringify(rootStore.common.votedList))
    rootStore.common.intervalTimer && clearInterval(rootStore.common.intervalTimer)
    return null
  },
  false
)

document.addEventListener('visibilitychange', function () {
  if (document.visibilityState !== 'visible') return
  // prettier-ignore
  getServTime().then(res => rootStore.common.updateUnixTS(res?.date)).catch(()=> {})
})

rootStore.common.updateProp({ language: localStorage.getItem('lang') || 'zh' })
