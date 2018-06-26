import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import ImmutablerPropTypes from 'react-immutable-proptypes'

import MasterPage from '../pages/MasterPage'
import SignupForm from '../components/form/SignupForm'
import * as authSelectors from '../redux/auth/selectors'
import * as authActions from '../redux/auth/actions'

class Login extends React.Component {
  constructor() {
    super()
    this.state = { userCreated: false }
  }
  handleSubmit = (fields) => {
    const { dispatchSignup } = this.props
    const { email, password } = fields
    dispatchSignup({ email, password }).then(() => {
      alert('User created')
      this.setState({ userCreated: true })
    })
  }

  render() {
    const { currentUser } = this.props
    const { userCreated } = this.state
    if (currentUser) {
      return <Redirect to="/" />
    }
    if (userCreated) {
      return <Redirect to="/confirmEmail" />
    }
    return (<MasterPage><SignupForm handleSubmit={this.handleSubmit} /></MasterPage>)
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
