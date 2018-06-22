import React from 'react'
import PropTypes from 'prop-types'
import ImmutablePropTypes from 'react-immutable-proptypes'
import { connect } from 'react-redux'
import Typography from '@material-ui/core/Typography'

// selectors
import * as passwordSelectors from '../redux/passwords/selectors'
import * as authSelectors from '../redux/auth/selectors'
// actions
import * as authActions from '../redux/auth/actions'
import * as passwordActions from '../redux/passwords/actions'
// components
import MasterPage from './MasterPage'
import Button from '../components/button'

class HomePage extends React.Component {
  componentWillMount() {
    const { dispatchGetCurrentSession } = this.props
    dispatchGetCurrentSession()
  }

  // Fetch passwords after first mount
  componentDidMount() {
    this.getPasswords()
  }

  getPasswords = () => {
    const { dispatchGeneratePassword } = this.props
    dispatchGeneratePassword()
  }

  showButton = () => {
    return (
      <Button
        variant="raised"
        color="primary"
        onClick={this.getPasswords}
      >
        Get More
      </Button>
    )
  }

  render() {
    const { lastPasswords, currentUser } = this.props

    return (
      <MasterPage>
        {/* Render the passwords if we have them */}
        {lastPasswords.count() ? (
          <div>
            <Typography variant="display4" gutterBottom>Passwords</Typography>
            <ul className="passwords">
              {/*
                Generally it's bad to use "index" as a key.
                It's ok for this example because there will always
                be the same number of passwords, and they never
                change positions in the array.
              */}
              {lastPasswords.map((password, index) =>
                <li key={index}>
                  <Typography variant="body1" gutterBottom>{password}</Typography>
                </li>
              )}
            </ul>
            {currentUser ? this.showButton() : <Typography variant="caption" gutterBottom>Login to generate more passwords</Typography>}
          </div>
        ) : (
          // Render a helpful message otherwise
          <div>
            <Typography variant="display4" gutterBottom>No passwords :(</Typography>
            <Button
              className="more"
              onClick={this.getPasswords}
            >
              Try Again?
            </Button>
          </div>
        )}
      </MasterPage>
    )
  }
}

HomePage.propTypes = {
  dispatchGeneratePassword: PropTypes.func.isRequired,
  dispatchGetCurrentSession: PropTypes.func.isRequired,
  lastPasswords: ImmutablePropTypes.list,
  currentUser: ImmutablePropTypes.map,
}

const mapStateToProps = state => ({
  lastPasswords: passwordSelectors.getLastPassword(state),
  currentUser: authSelectors.getCurrentUser(state),
})

const mapDispatchToProps = dispatch => ({
  dispatchGeneratePassword: () => dispatch(passwordActions.generatePassword()),
  dispatchGetCurrentSession: () => dispatch(authActions.getCurrentSession()),
})

export default connect(mapStateToProps, mapDispatchToProps)(HomePage)
