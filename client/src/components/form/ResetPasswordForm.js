import React from 'react'
import PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography'
import Button from '../button'

import styles from './form.module.css'
import FormHoc from '../../hocs/FormHoc'
import { renderPasswordField } from './utils'

const ResetPasswordForm = ({ fields, handleSubmit, handleChange }) => {
  const onSubmit = (event) => {
    event.preventDefault()
    handleSubmit(fields).then(() => {
      alert('Password updated')
    })
  }

  return (<form onSubmit={onSubmit} className={styles.container}>
    <Typography variant="body2">
      Please enter your new password
    </Typography>
    {renderPasswordField({ onChange: handleChange })}
    {renderPasswordField({ label: 'Confirm Password', name: 'confirmPassword', onChange: handleChange })}
    <Button type="submit">Submit</Button>
  </form>)
}

ResetPasswordForm.propTypes = {
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
}

export default FormHoc(ResetPasswordForm)
