import React from 'react'
import PropTypes from 'prop-types'

import FormHoc from '../../hocs/FormHoc'
import styles from './form.module.css'
import { renderPasswordField } from './utils'
import Button from '../button'
import NotificationText from '../notification/NotificationText'

class UpdatePasswordForm extends React.Component {
  constructor() {
    super()
    this.state = { error: null }
  }

  handleSubmit = (event) => {
    event.preventDefault()
    const { handleSubmit, fields, toggleUpdatePasswordForm } = this.props
    handleSubmit({ ...fields }).then((data) => {
      if (data.error) {
        this.setState({ error: data.error.message || 'Error ocurred' })
      } else {
        alert('Password updated')
        toggleUpdatePasswordForm(event)
      }
    })
  }

  render() {
    const { handleChange } = this.props
    const { error } = this.state
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
        {error && <NotificationText message={error} type="error" />}
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
}

export default FormHoc(UpdatePasswordForm)
