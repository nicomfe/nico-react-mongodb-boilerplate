import React from 'react'
import PropTypes from 'prop-types'
import ImmutablePropTypes from 'react-immutable-proptypes'
import { connect } from 'react-redux'

import UpdatePasswordForm from '../components/form/UpdatePasswordForm'
import * as authActions from '../redux/auth/actions'
import * as authSelectors from '../redux/auth/selectors'

class ProfileContainer extends React.Component {
  constructor() {
    super()
    this.state = { showPasswordForm: false }
  }

  componentWillMount() {
    const { dispatchGetCurrentSession } = this.props
    dispatchGetCurrentSession()
  }

  toggleUpdatePasswordForm = (event) => {
    event.preventDefault()
    const { showPasswordForm } = this.state
    this.setState({ showPasswordForm: !showPasswordForm })
  }

  updatePassword = (data) => {
    const { currentUser, dispatchUpdatePassword } = this.props
    dispatchUpdatePassword({ email: currentUser.get('email'), ...data })
  }

  render() {
    const { currentUser } = this.props
    if (!currentUser) return 'Loading...'

    const { showPasswordForm } = this.state
    return (<div>
      This is the profile page of {currentUser.get('email')}
      <button onClick={this.toggleUpdatePasswordForm}>Update password</button>
      {showPasswordForm && <UpdatePasswordForm handleSubmit={this.updatePassword} />}
    </div>)
  }
}

ProfileContainer.propTypes = {
  dispatchGetCurrentSession: PropTypes.func.isRequired,
  currentUser: ImmutablePropTypes.map,
  dispatchUpdatePassword: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  currentUser: authSelectors.getCurrentUser(state),
})

const mapDispatchToProps = dispatch => ({
  dispatchGetCurrentSession: () => dispatch(authActions.getCurrentSession()),
  dispatchUpdatePassword: data => dispatch(authActions.updatePassword(data)),
})

export default connect(mapStateToProps, mapDispatchToProps)(ProfileContainer)
