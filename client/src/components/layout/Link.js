import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import styles from './link.module.css'

const MyLink = ({ children, ...rest }) => <Link {...rest} className={styles.link}>{children}</Link>

MyLink.propTypes = {
  children: PropTypes.element,
}

export default MyLink
