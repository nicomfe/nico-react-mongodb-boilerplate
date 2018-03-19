import React from 'react'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import queryString from 'query-string'

import * as authActions from '../redux/auth/actions'

class VerifyAccount extends React.Component {
  constructor() {
    super()
    this.state = { verified: false }
  }
  componentWillMount() {
    const { location, dispatchVerifyAccount } = this.props
    const { token, email } = queryString.parse(location.search)
    dispatchVerifyAccount({ token, email }).then(() => {
      this.setState({ verified: true })
    })
  }

  render() {
    const { verified } = this.state
    return verified ? <div>Verifying account...</div> : <Redirect to="/login" />
  }
}

VerifyAccount.propTypes = {
  location: PropTypes.object.isRequired,
  dispatchVerifyAccount: PropTypes.func.isRequired,
}

const mapDispatchToProps = dispatch => ({
  dispatchVerifyAccount: data => dispatch(authActions.verifyAccount(data)),
})

export default connect(null, mapDispatchToProps)(VerifyAccount)
