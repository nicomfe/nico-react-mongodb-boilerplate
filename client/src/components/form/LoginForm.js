import React from 'react'
import PropTypes from 'prop-types'

import FormHoc from '../../hocs/FormHoc'
import styles from './form.module.css'

const LoginForm = ({ fields, handleSubmit, handleChange }) => {
  const onSubmit = (event) => {
    event.preventDefault()
    handleSubmit(fields)
  }

  return (<form onSubmit={onSubmit} className={styles.container}>
    Email <input type="text" name="email" onChange={handleChange} />
    Password <input type="password" name="password" onChange={handleChange} />
    <button type="submit">Login</button>
    <small>If you dont want to create a user just use nico@nico.com/password</small>
    <a href="/forgotPassword">Forgot password?</a>
  </form>)
}

LoginForm.propTypes = {
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
}

export default FormHoc(LoginForm)
