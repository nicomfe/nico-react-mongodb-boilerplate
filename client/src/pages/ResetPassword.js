import React from 'react'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import queryString from 'query-string'

import ResetPasswordForm from '../components/form/ResetPasswordForm'
import * as authActions from '../redux/auth/actions'

class ResetPassword extends React.Component {
  constructor() {
    super()
    this.state = { created: false }
  }

  handleSubmit = (fields) => {
    const { dispatchCreatePassword, location } = this.props
    const { password, confirmPassword } = fields
    const { token, email } = queryString.parse(location.search)
    if (password !== confirmPassword) return alert('passwords dont match')
    return dispatchCreatePassword({ email, verifyEmailToken: token, password, confirmPassword }).then(() => {
      this.setState({ created: true })
    })
  }

  render() {
    const { created } = this.state
    if (created) {
      return <Redirect to="/login" />
    }
    return (<ResetPasswordForm handleSubmit={this.handleSubmit} />)
  }
}

ResetPassword.propTypes = {
  location: PropTypes.object.isRequired,
  dispatchCreatePassword: PropTypes.func.isRequired,
}

const mapDispatchToProps = dispatch => ({
  dispatchCreatePassword: data => dispatch(authActions.createPassword(data)),
})

export default connect(null, mapDispatchToProps)(ResetPassword)
