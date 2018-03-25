import React from 'react'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import queryString from 'query-string'

import * as authActions from '../redux/auth/actions'

class ForgotPassword extends React.Component {
  constructor() {
    super()
    this.state = { sent: false }
  }

  handleChange = (event) => {
    const { name, value } = event.target
    this.setState({ [name]: value })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    const { dispatchForgotPassword } = this.props
    const { email } = this.state
    dispatchForgotPassword({ email }).then(() => this.setState({ sent: true }))
    alert('We sent you an email with a link to reset your password')
  }

  render() {
    const { email, sent } = this.state
    if (sent) {
      return <Redirect to="/login" />
    }
    return (<div>
      Please enter your email
      <form onSubmit={this.handleSubmit}>
        Email <input type="email" name="email" value={email} onChange={this.handleChange} />
        <button type="submit">Submit</button>
      </form>
    </div>)
  }
}

ForgotPassword.propTypes = {
  dispatchForgotPassword: PropTypes.func.isRequired,
}

const mapDispatchToProps = dispatch => ({
  dispatchForgotPassword: data => dispatch(authActions.forgotPassword(data)),
})

export default connect(null, mapDispatchToProps)(ForgotPassword)
