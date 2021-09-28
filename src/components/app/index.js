import { BrowserRouter } from 'react-router-dom'
import { MobXProviderContext } from 'mobx-react'

import routes from '../../routes'
import rootStore from '../../stores'

import RouteWithSubRoutes from '../route-with-sub-routes'

function App() {
  return (
    <MobXProviderContext.Provider value={rootStore}>
      <BrowserRouter>
        <RouteWithSubRoutes routes={routes} />
      </BrowserRouter>
    </MobXProviderContext.Provider>
  )
}

export default App
