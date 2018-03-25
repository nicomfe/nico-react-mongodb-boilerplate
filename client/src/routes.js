import React from 'react'
import { Route, Switch } from 'react-router-dom'

// components
import PrivateRoute from './components/routing/PrivateRoute'
import App from './App'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import ResetPassword from './pages/ResetPassword'
import VerifyAccount from './pages/VerifyAccount'
import Profile from './pages/Profile'
import ForgotPassword from './pages/ForgotPassword'

const Routes = () => {
  return (
    <Switch>
      {/* No Login required */}
      <Route path={'/login'} component={Login} />
      <Route path={'/signup'} component={SignUp} />
      <Route path={'/verifyAccount'} component={VerifyAccount} />
      <Route path={'/forgotPassword'} component={ForgotPassword} />
      <Route path={'/resetPassword'} component={ResetPassword} />
      {/* Login required */}
      <PrivateRoute path={'/profile'} component={Profile} />

      <Route path={'/'} component={App} />
    </Switch>
  )
}

export default Routes
