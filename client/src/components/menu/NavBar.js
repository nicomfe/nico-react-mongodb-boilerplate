import React from 'react'
import ImmutablerPropTypes from 'react-immutable-proptypes'
import PropTypes from 'prop-types'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import AccountCircle from '@material-ui/icons/AccountCircle'
import MenuItem from '@material-ui/core/MenuItem'
import Menu from '@material-ui/core/Menu'

import Link from '../layout/Link'
import styles from './NavBar.module.css'

class NavBar extends React.Component {
  constructor() {
    super()
    this.state = { anchorEl: null }
  }

  handleMenu = (event) => {
    this.setState({ anchorEl: event.currentTarget })
  }

  handleClose = () => {
    this.setState({ anchorEl: null })
  }

  render() {
    const { currentUser, dispatchLogout } = this.props
    const { anchorEl } = this.state
    const open = Boolean(anchorEl)
    return (<AppBar position="static" color="primary" className={styles.menu}>
      <Toolbar>
        <IconButton className={styles.menuButton} color="inherit" aria-label="Menu">
          <MenuIcon />
        </IconButton>
        <Typography variant="title" color="inherit" className={styles.title}>
          <Link to="/">My app</Link>
        </Typography>
        {currentUser ? (
          <div>
            <IconButton
              aria-owns={open ? 'menu-appbar' : null}
              aria-haspopup="true"
              onClick={this.handleMenu}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={open}
              onClose={this.handleClose}
            >
              <Link to="/profile"><MenuItem onClick={this.handleClose}>Profile</MenuItem></Link>
              <Link to="/logout"><MenuItem onClick={dispatchLogout}>Logout</MenuItem></Link>
            </Menu>
          </div>
        ) : (
          <div className={styles.menuLinks}>
            <Link to="/login">LOGIN</Link>
            <Link to="/signup">SIGNUP</Link>
          </div>
        )}
      </Toolbar>
    </AppBar>)
  }
}

NavBar.propTypes = {
  currentUser: ImmutablerPropTypes.map,
  dispatchLogout: PropTypes.func.isRequired,
}
export default NavBar
