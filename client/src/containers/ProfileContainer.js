import React from 'react'
import PropTypes from 'prop-types'
import ImmutablePropTypes from 'react-immutable-proptypes'
import { connect } from 'react-redux'

import ProfilePage from '../pages/Profile'
import * as authActions from '../redux/auth/actions'
import * as authSelectors from '../redux/auth/selectors'

class ProfileContainer extends React.Component {
  componentWillMount() {
    const { dispatchGetCurrentSession } = this.props
    dispatchGetCurrentSession()
  }

  render() {
    const { currentUser } = this.props
    if (!currentUser) return 'Loading...'
    return <ProfilePage currentUser={currentUser} />
  }
}

ProfileContainer.propTypes = {
  dispatchGetCurrentSession: PropTypes.func.isRequired,
  currentUser: ImmutablePropTypes.map,
}

const mapStateToProps = state => ({
  currentUser: authSelectors.getCurrentUser(state),
})

const mapDispatchToProps = dispatch => ({
  dispatchGetCurrentSession: () => dispatch(authActions.getCurrentSession()),
})

export default connect(mapStateToProps, mapDispatchToProps)(ProfileContainer)
