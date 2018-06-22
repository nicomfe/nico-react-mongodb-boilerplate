import React from 'react'
import PropTypes from 'prop-types'

import CssBaseline from '@material-ui/core/CssBaseline'
import NavBarContainer from '../containers/NavBarContainer'
import Footer from '../components/layout/Footer'

const MasterPage = ({ children, location, showNavBar }) => {
  return (<div style={{ height: '100%' }}>
    {showNavBar && <NavBarContainer location={location} />}
    <CssBaseline />
    <div>
      {children}
      <Footer />
    </div>
  </div>)
}

MasterPage.defaultProps = {
  showNavBar: true,
}

MasterPage.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.array]),
  location: PropTypes.object,
  showNavBar: PropTypes.bool,
}

export default MasterPage
