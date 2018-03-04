import React from 'react'
import ImmutablerPropTypes from 'react-immutable-proptypes'
import PropTypes from 'prop-types'

const NavBar = ({ currentUser, dispatchLogout }) => {
  if (currentUser) {
    return <div>{`Logged with ${currentUser.get('email')}`} <a href onClick={dispatchLogout}>Logout</a></div>
  }
  return <a href="/login">Login</a>
}

NavBar.propTypes = {
  currentUser: ImmutablerPropTypes.map,
  dispatchLogout: PropTypes.func.isRequired,
}
export default NavBar
