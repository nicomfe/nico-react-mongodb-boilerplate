import React from 'react'
import { Route, Switch } from 'react-router-dom'

// components
import PrivateRoute from './components/routing/PrivateRoute'
import App from './App'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import VerifyAccount from './pages/VerifyAccount'
import ProfileContainer from './containers/ProfileContainer'

const Routes = () => {
  return (
    <Switch>
      {/* No Login required */}
      <Route path={'/login'} component={Login} />
      <Route path={'/signup'} component={SignUp} />
      <Route path={'/verifyAccount'} component={VerifyAccount} />
      {/* Login required */}
      <PrivateRoute path={'/profile'} component={ProfileContainer} />

      <Route path={'/'} component={App} />
    </Switch>
  )
}

export default Routes
