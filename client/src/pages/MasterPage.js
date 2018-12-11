import React from 'react'
import PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography'
import CssBaseline from '@material-ui/core/CssBaseline'

import NavBarContainer from '../containers/NavBarContainer'
import Footer from '../components/layout/Footer'

import styles from './master.module.css'

const MasterPage = ({ children, location, showNavBar, title }) => {
  return (<div style={{ height: '100%' }}>
    {showNavBar && <NavBarContainer location={location} />}
    <CssBaseline />
    <div className={styles.content}>
      {title && <Typography variant="display4">{title}</Typography>}
      {children}
    </div>
    <Footer />
  </div>)
}

MasterPage.defaultProps = {
  showNavBar: true,
}

MasterPage.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.array]),
  location: PropTypes.object,
  showNavBar: PropTypes.bool,
  title: PropTypes.string,
}

export default MasterPage
