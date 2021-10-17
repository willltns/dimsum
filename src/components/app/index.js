import ss from './index.module.less'

import { BrowserRouter } from 'react-router-dom'
import { MobXProviderContext } from 'mobx-react'

import routes from '@/routes'
import rootStore from '@/stores'

import RouteWithSubRoutes from '../route-with-sub-routes'
import Header from '@/components/header'
import Sidebar from '@/components/siderbar'

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
    return null
  },
  false
)
