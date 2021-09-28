import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

function RouteWithSubRoutes({ routes }) {
  if (!routes?.length) return null

  return (
    <Switch>
      {routes.map((route) => (
        <Route
          key={route.path}
          path={route.path}
          exact={!!route.exact}
          render={(props) =>
            route.redirectTo ? <Redirect to={route.redirectTo} /> : <route.component {...props} routes={route.routes} />
          }
        />
      ))}
    </Switch>
  )
}

export default RouteWithSubRoutes
