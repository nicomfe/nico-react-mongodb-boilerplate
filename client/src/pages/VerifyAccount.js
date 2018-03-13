import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import queryString from 'query-string'

import * as authActions from '../redux/auth/actions'

class VerifyAccount extends React.Component {
  componentWillMount() {
    const { location, dispatchVerifyAccount } = this.props
    const { token, email } = queryString.parse(location.search)
    dispatchVerifyAccount({ token, email })
  }

  render() {
    return <div>Verifying account...</div>
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
