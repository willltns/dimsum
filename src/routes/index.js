import loadable from '@loadable/component'

import Spinner from '../components/spinner'

const loadableWithSpinner = (comp) => loadable(comp, { fallback: <Spinner /> })

const routes = [
  {
    path: '/',
    exact: true,
    redirectTo: '/counter',
  },
  {
    path: '/counter',
    component: loadableWithSpinner(() => import('../pages/counter')),
  },
  {
    path: '/about',
    component: loadableWithSpinner(() => import('../pages/about')),
  },
  // Keep 'page-not-fount' at the end
  {
    path: '*',
    component: loadableWithSpinner(() => import('../pages/page-not-found')),
  },
]

export default routes
