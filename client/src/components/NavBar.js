import React from 'react'
import ImmutablerPropTypes from 'react-immutable-proptypes'
import PropTypes from 'prop-types'

import './NavBar.css'

const NavBar = ({ currentUser, dispatchLogout }) => {
  if (currentUser) {
    return (<div>
      {`Logged with ${currentUser.get('email')}`} <button onClick={dispatchLogout}>Logout</button>
      <a href="/profile">Profile</a>
    </div>)
  }
  return (<div className="menu">
    <a href="/login">Login</a>
    <a href="/signup">Signup</a>
  </div>)
}

NavBar.propTypes = {
  currentUser: ImmutablerPropTypes.map,
  dispatchLogout: PropTypes.func.isRequired,
}
export default NavBar
