import React from 'react'
import PropTypes from 'prop-types'

import FormHoc from '../../hocs/FormHoc'
import styles from './form.module.css'

const SignupForm = ({ fields, handleSubmit, handleChange }) => {
  const onSubmit = (event) => {
    event.preventDefault()
    handleSubmit(fields)
  }

  return (<form onSubmit={onSubmit} className={styles.container}>
    Email <input type="text" name="email" onChange={handleChange} />
    Password <input type="password" name="password" onChange={handleChange} />
    <button type="submit">Signup</button>
  </form>)
}

SignupForm.propTypes = {
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
}

export default FormHoc(SignupForm)
