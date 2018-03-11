import React from 'react'
import PropTypes from 'prop-types'
import ImmutablePropTypes from 'react-immutable-proptypes'
import { Route, Redirect } from 'react-router-dom'

const PrivateRoute = ({ component, ...rest }) => {
  const isAuthenticated = () => {
    return localStorage.currentUser
  }

  const renderComponent = (routeProps) => {
    const InnerComponent = component
    return <InnerComponent {...rest} {...routeProps} />
  }

  return (<Route
    {...rest}
    render={(routeProps) => {
      return isAuthenticated()
        ? renderComponent(routeProps)
        : (<Redirect to={{ pathname: '/login', state: { from: routeProps.location.pathname } }} />)
    }}
  />)
}

PrivateRoute.propTypes = {
  component: PropTypes.func.isRequired,
  currentUser: ImmutablePropTypes.map,
}

export default PrivateRoute
