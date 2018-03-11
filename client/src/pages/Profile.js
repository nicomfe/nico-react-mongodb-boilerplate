import React from 'react'
import ImmutablePropTypes from 'react-immutable-proptypes'

class ProfilePage extends React.Component {
  render() {
    const { currentUser } = this.props
    return <div>This is the profile page of {currentUser.get('email')}</div>
  }
}

ProfilePage.propTypes = {
  currentUser: ImmutablePropTypes.map.isRequired,
}

export default ProfilePage
