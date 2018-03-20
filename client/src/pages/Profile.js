import React from 'react'

import ProfileContainer from '../containers/ProfileContainer'

class ProfilePage extends React.Component {
  render() {
    return <ProfileContainer {...this.props} />
  }
}

export default ProfilePage
