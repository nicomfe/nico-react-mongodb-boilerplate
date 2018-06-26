import React from 'react'
import PropTypes from 'prop-types'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'

import Button from '../button'
import FormHoc from '../../hocs/FormHoc'
import styles from './form.module.css'

const LoginForm = ({ fields, handleSubmit, handleChange }) => {
  const onSubmit = (event) => {
    event.preventDefault()
    handleSubmit(fields)
  }

  const renderTextField = (props) => {
    return (<TextField {...props} margin="normal" />)
  }

  return (<form onSubmit={onSubmit} className={styles.container}>
    {renderTextField({ label: 'Email', type: 'text', name: 'email', onChange: handleChange }) }
    {renderTextField({ label: 'Password', type: 'password', name: 'password', onChange: handleChange }) }
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
}

export default FormHoc(LoginForm)
