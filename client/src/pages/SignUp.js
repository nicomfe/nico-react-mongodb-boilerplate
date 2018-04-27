import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import ImmutablerPropTypes from 'react-immutable-proptypes'

import SignupForm from '../components/form/SignupForm'
import * as authSelectors from '../redux/auth/selectors'
import * as authActions from '../redux/auth/actions'

class Login extends React.Component {
  handleSubmit = (fields) => {
    const { dispatchSignup } = this.props
    const { email, password } = fields
    dispatchSignup({ email, password }).then(() => {
      alert('User created')
    })
  }

  render() {
    const { currentUser } = this.props
    if (currentUser) {
      return <Redirect to="/" />
    }
    return (<SignupForm handleSubmit={this.handleSubmit} />)
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
