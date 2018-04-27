import React from 'react'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'

import * as authActions from '../redux/auth/actions'

class ForgotPassword extends React.Component {
  constructor() {
    super()
    this.state = { sent: false }
  }

  handleSubmit = (fields) => {
    const { dispatchForgotPassword } = this.props
    const { email } = fields
    dispatchForgotPassword({ email }).then(() => this.setState({ sent: true }))
    alert('We sent you an email with a link to reset your password')
  }

  render() {
    const { sent } = this.state
    if (sent) {
      return <Redirect to="/login" />
    }
    return (<ForgotPassword handleSubmit={this.handleSubmit} />)
  }
}

ForgotPassword.propTypes = {
  dispatchForgotPassword: PropTypes.func.isRequired,
}

const mapDispatchToProps = dispatch => ({
  dispatchForgotPassword: data => dispatch(authActions.forgotPassword(data)),
})

export default connect(null, mapDispatchToProps)(ForgotPassword)
