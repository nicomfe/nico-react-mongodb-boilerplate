import React from 'react'
import PropTypes from 'prop-types'
import ImmutablePropTypes from 'react-immutable-proptypes'
import { connect } from 'react-redux'

import * as passwordSelectors from './redux/passwords/selectors'
import * as authSelectors from './redux/auth/selectors'
import * as passwordActions from './redux/passwords/actions'
import NavBarContainer from './containers/NavBarContainer'

import './App.css'

class App extends React.Component {
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
      <button
        className="more"
        onClick={this.getPasswords}
      >
        Get More
      </button>
    )
  }

  render() {
    const { lastPasswords, currentUser } = this.props

    return (
      <div className="App">
        <NavBarContainer />
        {/* Render the passwords if we have them */}
        {lastPasswords.count() ? (
          <div>
            <h1>5 Passwords.</h1>
            <ul className="passwords">
              {/*
                Generally it's bad to use "index" as a key.
                It's ok for this example because there will always
                be the same number of passwords, and they never
                change positions in the array.
              */}
              {lastPasswords.map((password, index) =>
                <li key={index}>
                  {password}
                </li>
              )}
            </ul>
            {currentUser ? this.showButton() : <div>Login to generate more passwords</div>}
          </div>
        ) : (
          // Render a helpful message otherwise
          <div>
            <h1>No passwords :(</h1>
            <button
              className="more"
              onClick={this.getPasswords}
            >
              Try Again?
            </button>
          </div>
        )}
      </div>
    )
  }
}

App.propTypes = {
  dispatchGeneratePassword: PropTypes.func.isRequired,
  lastPasswords: ImmutablePropTypes.list,
  currentUser: ImmutablePropTypes.map,
}

const mapStateToProps = state => ({
  lastPasswords: passwordSelectors.getLastPassword(state),
  currentUser: authSelectors.getCurrentUser(state),
})

const mapDispatchToProps = dispatch => ({
  dispatchGeneratePassword: () => dispatch(passwordActions.generatePassword()),
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
