import React from 'react'
import ImmutablePropTypes from 'react-immutable-proptypes'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import CircularProgress from '@material-ui/core/CircularProgress'

import * as authSelectors from '../redux/auth/selectors'
import * as authActions from '../redux/auth/actions'

class Logout extends React.Component {
  componentWillMount() {
    const { dispatchLogout } = this.props
    dispatchLogout()
  }

  render() {
    const { currentUser } = this.props
    if (currentUser) return <CircularProgress size={50} />
    return <Redirect to="/" />
  }
}

Logout.propTypes = {
  dispatchLogout: PropTypes.func,
  currentUser: ImmutablePropTypes.map,
}

const mapStateToProps = state => ({
  currentUser: authSelectors.getCurrentUser(state),
})

const mapDispatchToProps = dispatch => ({
  dispatchLogout: () => dispatch(authActions.logout()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Logout)
