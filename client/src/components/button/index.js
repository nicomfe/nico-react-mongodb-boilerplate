import React from 'react'
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button'

const MyButton = ({ variant, color, ...rest }) => {
  return <Button variant={variant} color={color} {...rest} />
}

MyButton.defaultProps = {
  variant: 'contained',
  color: 'primary',
}

MyButton.propTypes = {
  variant: PropTypes.string,
  color: PropTypes.string,
}

export default MyButton
