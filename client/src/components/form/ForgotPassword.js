import React from 'react'
import PropTypes from 'prop-types'

import FormHoc from '../../hocs/FormHoc'

const ForgotPassword = ({ fields, handleSubmit, handleChange }) => {
  const onSubmit = (event) => {
    event.preventDefault()
    handleSubmit(fields)
  }

  return (<div>
    Please enter your email
    <form onSubmit={onSubmit}>
      Email <input type="email" name="email" onChange={handleChange} />
      <button type="submit">Submit</button>
    </form>
  </div>)
}

ForgotPassword.propTypes = {
  fields: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
}

export default FormHoc(ForgotPassword)
