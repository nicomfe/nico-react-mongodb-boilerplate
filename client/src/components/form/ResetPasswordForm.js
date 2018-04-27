import React from 'react'
import PropTypes from 'prop-types'

import FormHoc from '../../hocs/FormHoc'

const ResetPasswordForm = ({ fields, handleSubmit, handleChange }) => {
  const onSubmit = (event) => {
    event.preventDefault()
    handleSubmit(fields)
  }

  return (<div>
    Please enter your new password
    <form onSubmit={onSubmit}>
      Password <input type="password" name="password" onChange={handleChange} />
      Confirm Password <input type="password" name="confirmPassword" onChange={handleChange} />
      <button type="submit">Submit</button>
    </form>
  </div>)
}

ResetPasswordForm.propTypes = {
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
}

export default FormHoc(ResetPasswordForm)
