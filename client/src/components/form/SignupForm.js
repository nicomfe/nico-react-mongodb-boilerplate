import React from 'react'
import PropTypes from 'prop-types'

import Button from '../button'
import FormHoc from '../../hocs/FormHoc'
import styles from './form.module.css'
import { renderEmailField, renderPasswordField } from './utils'

const SignupForm = ({ fields, handleSubmit, handleChange }) => {
  const onSubmit = (event) => {
    event.preventDefault()
    handleSubmit(fields)
  }

  return (<form onSubmit={onSubmit} className={styles.container}>
    {renderEmailField({ onChange: handleChange }) }
    {renderPasswordField({ onChange: handleChange })}
    <Button type="submit">Signup</Button>
  </form>)
}

SignupForm.propTypes = {
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
}

export default FormHoc(SignupForm)
