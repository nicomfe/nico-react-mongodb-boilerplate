import React from 'react'
import PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography'

import Button from '../button'
import FormHoc from '../../hocs/FormHoc'
import InlineNotificationHoc from '../../hocs/InlineNotificationHoc'
import styles from './form.module.css'
import { renderEmailField, renderPasswordField } from './utils'

const LoginForm = ({ getNotification, setNotification, fields, handleSubmit, handleChange }) => {
  const onSubmit = (event) => {
    event.preventDefault()
    handleSubmit(fields).then((data) => {
      if (data.error) {
        setNotification(data.error.message || 'Could not login.', 'error')
      }
    })
  }

  return (<form onSubmit={onSubmit} className={styles.container}>
    {renderEmailField({ onChange: handleChange }) }
    {renderPasswordField({ onChange: handleChange }) }
    {getNotification()}
    <Button type="submit">Login</Button>
    <Typography variant="body2" gutterBottom>
      <p><a href="/forgotPassword">Forgot password?</a></p>
    </Typography>
  </form>)
}

LoginForm.propTypes = {
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  getNotification: PropTypes.func, // inline notification hoc
  setNotification: PropTypes.func, // inline notification hoc
}

export default FormHoc(InlineNotificationHoc(LoginForm))
