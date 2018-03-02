import React from 'react'
import { connect } from 'react-redux'

import * as authActions from './redux/auth/actions'

class Login extends React.Component {
  constructor() {
    super()
    this.state = {
      email: 'nico@nico.com',
      password: 'password',
    }
  }

  handleChange = (event) => {
    const { name, value } = event.target
    this.setState({ [name]: value })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    const { dispatchLogin } = this.props
    const { email, password } = this.state
    dispatchLogin({ email, password })
  }

  render() {
    const { email, password } = this.state
    return (<form onSubmit={this.handleSubmit}>
      Email <input type="text" name="email" value={email} onChange={this.handleChange} />
      Password <input type="text" name="password" value={password} onChange={this.handleChange} />
      <button type="submit">Login</button>
    </form>)
  }
}

const mapDispatchToProps = dispatch => ({
  dispatchLogin: data => dispatch(authActions.login(data)),
})

export default connect(null, mapDispatchToProps)(Login)
