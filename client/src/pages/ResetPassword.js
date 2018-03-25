import React from 'react'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import queryString from 'query-string'

import * as authActions from '../redux/auth/actions'

class ResetPassword extends React.Component {
  constructor() {
    super()
    this.state = { created: false }
  }

  handleChange = (event) => {
    const { name, value } = event.target
    this.setState({ [name]: value })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    const { dispatchCreatePassword, location } = this.props
    const { password, confirmPassword } = this.state
    const { token, email } = queryString.parse(location.search)
    if (password !== confirmPassword) return alert('passwords dont match')
    return dispatchCreatePassword({ email, verifyEmailToken: token, password, confirmPassword }).then(() => {
      this.setState({ created: true })
    })
  }

  render() {
    const { password, confirmPassword, created } = this.state
    if (created) {
      return <Redirect to="/login" />
    }
    return (<div>
      Please enter your new password
      <form onSubmit={this.handleSubmit}>
        Password <input type="password" name="password" value={password} onChange={this.handleChange} />
        Confirm Password <input type="password" name="confirmPassword" value={confirmPassword} onChange={this.handleChange} />
        <button type="submit">Submit</button>
      </form>
    </div>)
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
