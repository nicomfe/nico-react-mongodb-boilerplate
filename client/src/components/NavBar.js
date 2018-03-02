import React from 'react'

const NavBar = ({ currentUser }) => {
  if(currentUser) {
    return <div>{`Logged with ${currentUser.get('email')}`}</div>
  }
  return <a href="/login">Login</a>
}

export default NavBar
