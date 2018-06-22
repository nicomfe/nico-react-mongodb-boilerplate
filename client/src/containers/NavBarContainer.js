import { connect } from 'react-redux'

import NavBar from '../components/menu/NavBar'
import * as authSelectors from '../redux/auth/selectors'
import * as authActions from '../redux/auth/actions'

const mapStateToProps = state => ({
  currentUser: authSelectors.getCurrentUser(state),
})

const mapDispatchToProps = dispatch => ({
  dispatchLogout: () => dispatch(authActions.logout()),
})

export default connect(mapStateToProps, mapDispatchToProps)(NavBar)
