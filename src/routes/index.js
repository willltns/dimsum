import loadable from '@loadable/component'

import Spinner from '../components/spinner'

const loadableWithSpinner = (comp) => loadable(comp /*{ fallback: <Spinner /> }*/)

const routes = [
  {
    path: '/',
    exact: true,
    component: loadableWithSpinner(() => import('../pages/home')),
  },
  {
    path: '/coin/:id',
    exact: true,
    component: loadableWithSpinner(() => import('../pages/coin-info')),
  },
  {
    path: '/add-coin',
    exact: true,
    component: loadableWithSpinner(() => import('../pages/add-coin')),
  },

  {
    path: '/promote',
    exact: true,
    component: loadableWithSpinner(() => import('../pages/promote')),
  },
  {
    path: '*',
    redirectTo: '/',
  },
  // {
  //   path: '/counter',
  //   component: loadableWithSpinner(() => import('../pages/counter')),
  // },
]

export default routes
