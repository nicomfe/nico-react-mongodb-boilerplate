import React from 'react'
import PropTypes from 'prop-types'

import Button from '../button'
import FormHoc from '../../hocs/FormHoc'
import InlineNotificationHoc from '../../hocs/InlineNotificationHoc'
import styles from './form.module.css'
import { renderEmailField, renderPasswordField } from './utils'

const SignupForm = ({ fields, handleSubmit, handleChange, getNotification, setNotification }) => {
  const onSubmit = (event) => {
    event.preventDefault()
    handleSubmit(fields).then((data) => {
      if (data.error) {
        const { message } = data.error
        setNotification(message || 'Unkown error when trying to signup', 'error')
      }
    })
  }

  return (<form onSubmit={onSubmit} className={styles.container}>
    {renderEmailField({ onChange: handleChange }) }
    {renderPasswordField({ onChange: handleChange })}
    {getNotification()}
    <Button type="submit">Signup</Button>
  </form>)
}

SignupForm.propTypes = {
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  getNotification: PropTypes.func.isRequired,
  setNotification: PropTypes.func.isRequired,
}

export default FormHoc(InlineNotificationHoc(SignupForm))
