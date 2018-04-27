import React from 'react'
import ImmutablerPropTypes from 'react-immutable-proptypes'
import PropTypes from 'prop-types'

import styles from './NavBar.module.css'

const NavBar = ({ currentUser, dispatchLogout }) => {
  return (<div className={styles.menu}>
    {currentUser
      ? (<div>
        {`Logged with ${currentUser.get('email')}`} <button onClick={dispatchLogout}>Logout</button>
        <a href="/profile">Profile</a>
      </div>)
      : (<div>
        <a href="/login">Login</a>
        <a href="/signup">Signup</a>
      </div>)
    }
  </div>)
}

NavBar.propTypes = {
  currentUser: ImmutablerPropTypes.map,
  dispatchLogout: PropTypes.func.isRequired,
}
export default NavBar
