import React from 'react'
import { Route, Switch } from 'react-router-dom'

// components
import App from './App'
import Login from './Login'

const Routes = () => {
  return (
    <Switch>
      {/* No Login required */}
      <Route path={'/login'} component={Login} />
      {/* Login required */}
      <Route path={'/'} component={App} />
    </Switch>
  )
}

export default Routes
