import React from 'react'
import Typography from '@material-ui/core/Typography'

import styles from './footer.module.css'

const Footer = () => {
  const year = new Date().getYear()
  return (<div className={styles.footer}>
    <Typography variant="caption" gutterBottom align="center">
      {`Smart Creations. All rights reserved. Copyright ${year + 1900}`}
    </Typography>
  </div>)
}

export default Footer
