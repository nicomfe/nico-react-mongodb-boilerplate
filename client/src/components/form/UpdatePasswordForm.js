import React from 'react'
import PropTypes from 'prop-types'

import FormHoc from '../../hocs/FormHoc'
import InlineNotificationHoc from '../../hocs/InlineNotificationHoc'
import styles from './form.module.css'
import { renderPasswordField } from './utils'
import Button from '../button'

class UpdatePasswordForm extends React.Component {
  handleSubmit = (event) => {
    event.preventDefault()
    const { setNotification, handleSubmit, fields, toggleUpdatePasswordForm } = this.props
    handleSubmit({ ...fields }).then((data) => {
      if (data.error) {
        setNotification(data.error.message || 'Error ocurred', 'error')
      } else {
        alert('Password updated')
        toggleUpdatePasswordForm(event)
      }
    })
  }

  render() {
    const { handleChange, getNotification } = this.props
    const commonProps = {
      type: 'password',
      required: true,
      onChange: handleChange,
    }

    return (
      <form onSubmit={this.handleSubmit} className={styles.container}>
        {renderPasswordField({ ...commonProps, label: 'Existing password' })}
        {renderPasswordField({ ...commonProps, name: 'newPass', label: 'New password' })}
        {renderPasswordField({ ...commonProps, name: 'newPassConfirm', label: 'Confirm new password' })}
        {getNotification()}
        <Button type="submit">Submit</Button>
      </form>
    )
  }
}

UpdatePasswordForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  fields: PropTypes.object.isRequired,
  toggleUpdatePasswordForm: PropTypes.func.isRequired,
  setNotification: PropTypes.func.isRequired,
  getNotification: PropTypes.func.isRequired,
}

export default FormHoc(InlineNotificationHoc(UpdatePasswordForm))
