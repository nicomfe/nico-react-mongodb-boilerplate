import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import ImmutablerPropTypes from 'react-immutable-proptypes'

import styles from './page.module.css'
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
    const { dispatchLogin } = this.props
    const { email, password } = this.state
    dispatchLogin({ email, password })
  }

  render() {
    const { email, password } = this.state
    const { currentUser } = this.props
    if (currentUser) {
      return <Redirect to="/" />
    }
    return (<form onSubmit={this.handleSubmit} className={styles.container}>
      Email <input type="text" name="email" value={email} onChange={this.handleChange} />
      Password <input type="password" name="password" value={password} onChange={this.handleChange} />
      <button type="submit">Login</button>
      <small>If you dont want to create a user just use nico@nico.com/password</small>
    </form>)
  }
}

Login.propTypes = {
  currentUser: ImmutablerPropTypes.map,
  dispatchLogin: PropTypes.func,
}

const mapStateToProps = state => ({
  currentUser: authSelectors.getCurrentUser(state),
})

const mapDispatchToProps = dispatch => ({
  dispatchLogin: data => dispatch(authActions.login(data)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Login)
