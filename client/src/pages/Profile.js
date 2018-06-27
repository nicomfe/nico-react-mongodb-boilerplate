import React from 'react'

import ProfileContainer from '../containers/ProfileContainer'
import MasterPage from '../pages/MasterPage'

class ProfilePage extends React.Component {
  render() {
    return <MasterPage><ProfileContainer {...this.props} /></MasterPage>
  }
}

export default ProfilePage
