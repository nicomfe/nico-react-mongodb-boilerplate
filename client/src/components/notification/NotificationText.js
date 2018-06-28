import React from 'react'
import PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography'

const NotificationText = ({ message, type }) => {
  const commonProps = {
    variant: 'body2',
    gutterBottom: true,
  }

  switch (type) {
    case 'error': {
      return <Typography {...commonProps} color="error">{message}</Typography>
    }
    default: {
      return <Typography {...commonProps} color="primary">{message}</Typography>
    }
  }
}

NotificationText.defaultProps = {
  type: 'info',
}

NotificationText.propTypes = {
  message: PropTypes.string,
  type: PropTypes.string,
}

export default NotificationText
