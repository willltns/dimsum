import loadable from '@loadable/component'

// import Spinner from '../components/spinner'

const loadableWithSpinner = (comp) => loadable(comp /*{ fallback: <Spinner /> }*/)

const routes = [
  {
    path: '/',
    exact: true,
    component: loadableWithSpinner(() => import('../pages/home')),
  },
  {
    path: '/coin/:coinId',
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
    path: '/about-us',
    exact: true,
    component: loadableWithSpinner(() => import('../pages/about-us')),
  },
  {
    path: '/disclaimer',
    exact: true,
    component: loadableWithSpinner(() => import('../pages/disclaimer')),
  },
  {
    path: '*',
    redirectTo: '/',
  },
]

export default routes
