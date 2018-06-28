import React from 'react'
import PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography'
import Button from '../button'

import styles from './form.module.css'
import InlineNotificationHoc from '../../hocs/InlineNotificationHoc'
import FormHoc from '../../hocs/FormHoc'
import { renderPasswordField } from './utils'

class ResetPasswordForm extends React.Component {
  onSubmit = (event) => {
    event.preventDefault()
    const { handleSubmit, fields, setNotification } = this.props
    handleSubmit(fields).then(() => {
      alert('Password updated')
    }, (errorMessage) => {
      setNotification(errorMessage, 'error')
    })
  }

  render() {
    const { handleChange, getNotification } = this.props
    return (<form onSubmit={this.onSubmit} className={styles.container}>
      <Typography variant="body2">
        Please enter your new password
      </Typography>
      {renderPasswordField({ onChange: handleChange })}
      {renderPasswordField({ label: 'Confirm Password', name: 'confirmPassword', onChange: handleChange })}
      {getNotification()}
      <Button type="submit">Submit</Button>
    </form>)
  }
}

ResetPasswordForm.propTypes = {
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  setNotification: PropTypes.func.isRequired,
  getNotification: PropTypes.func.isRequired,
}

export default FormHoc(InlineNotificationHoc(ResetPasswordForm))
