import React from 'react'
import { Route, Switch } from 'react-router-dom'

// components
import App from './App'
import Login from './pages/Login'
import SignUp from './pages/SignUp'

const Routes = () => {
  return (
    <Switch>
      {/* No Login required */}
      <Route path={'/login'} component={Login} />
      <Route path={'/signup'} component={SignUp} />
      {/* Login required */}
      <Route path={'/'} component={App} />
    </Switch>
  )
}

export default Routes
