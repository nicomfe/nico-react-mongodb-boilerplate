import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import ImmutablerPropTypes from 'react-immutable-proptypes'

import * as authSelectors from '../redux/auth/selectors'
import * as authActions from '../redux/auth/actions'

class Login extends React.Component {
  constructor() {
    super()
    this.state = {}
  }

  handleChange = (event) => {
    const { name, value } = event.target
    this.setState({ [name]: value })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    const { dispatchSignup } = this.props
    const { email, password } = this.state
    dispatchSignup({ email, password }).then(() => {
      alert('User created')
    })
  }

  render() {
    const { email, password } = this.state
    const { currentUser } = this.props
    if (currentUser) {
      return <Redirect to="/" />
    }
    return (<form onSubmit={this.handleSubmit}>
      Email <input type="text" name="email" value={email} onChange={this.handleChange} />
      Password <input type="password" name="password" value={password} onChange={this.handleChange} />
      <button type="submit">Signup</button>
    </form>)
  }
}

Login.propTypes = {
  currentUser: ImmutablerPropTypes.map,
  dispatchSignup: PropTypes.func,
}

const mapStateToProps = state => ({
  currentUser: authSelectors.getCurrentUser(state),
})

const mapDispatchToProps = dispatch => ({
  dispatchSignup: data => dispatch(authActions.signup(data)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Login)
