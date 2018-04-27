import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import ImmutablerPropTypes from 'react-immutable-proptypes'

import LoginForm from '../components/form/LoginForm'
import * as authSelectors from '../redux/auth/selectors'
import * as authActions from '../redux/auth/actions'

class Login extends React.Component {
  handleSubmit = (fields) => {
    const { dispatchLogin } = this.props
    const { email, password } = fields
    dispatchLogin({ email, password })
  }

  render() {
    const { currentUser } = this.props
    if (currentUser) {
      return <Redirect to="/" />
    }
    return (<LoginForm handleSubmit={this.handleSubmit} />)
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
