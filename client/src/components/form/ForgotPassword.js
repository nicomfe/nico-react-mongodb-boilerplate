import React from 'react'
import PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography'

import Button from '../button'
import { renderEmailField } from './utils'
import FormHoc from '../../hocs/FormHoc'
import styles from './form.module.css'

const ForgotPassword = ({ fields, handleSubmit, handleChange }) => {
  const onSubmit = (event) => {
    event.preventDefault()
    handleSubmit(fields)
  }

  return (<form onSubmit={onSubmit} className={styles.container}>
    <Typography variant="body2">
      Please enter your email
    </Typography>
    {renderEmailField({ onChange: handleChange })}
    <Button type="submit">Submit</Button>
  </form>)
}

ForgotPassword.propTypes = {
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
}

export default FormHoc(ForgotPassword)
