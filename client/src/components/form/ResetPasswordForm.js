import React from 'react'
import PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography'
import Button from '../button'

import NotificationText from '../notification/NotificationText'
import styles from './form.module.css'
import FormHoc from '../../hocs/FormHoc'
import { renderPasswordField } from './utils'

class ResetPasswordForm extends React.Component {
  constructor() {
    super()
    this.state = { errorMessage: null }
  }

  onSubmit = (event) => {
    event.preventDefault()
    const { handleSubmit, fields } = this.props
    handleSubmit(fields).then(() => {
      alert('Password updated')
    }, (errorMessage) => {
      this.setState({ errorMessage })
    })
  }

  render() {
    const { handleChange } = this.props
    const { errorMessage } = this.state
    return (<form onSubmit={this.onSubmit} className={styles.container}>
      <Typography variant="body2">
        Please enter your new password
      </Typography>
      {renderPasswordField({ onChange: handleChange })}
      {renderPasswordField({ label: 'Confirm Password', name: 'confirmPassword', onChange: handleChange })}
      {errorMessage && <NotificationText type="error" message={errorMessage} />}
      <Button type="submit">Submit</Button>
    </form>)
  }
}

ResetPasswordForm.propTypes = {
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
}

export default FormHoc(ResetPasswordForm)
