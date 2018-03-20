import React from 'react'
import PropTypes from 'prop-types'

class UpdatePasswordForm extends React.Component {
  constructor() {
    super()
    this.state = {}
  }

  handleChange = (event) => {
    const { name, value } = event.target
    this.setState({ [name]: value })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    const { handleSubmit } = this.props
    const { password, newPass, newPassConfirm } = this.state
    handleSubmit({ password, newPass, newPassConfirm })
  }

  render() {
    const commonProps = {
      type: 'password',
      required: true,
      onChange: this.handleChange,
    }
    return (
      <form onSubmit={this.handleSubmit}>
        Existing password<input name="password" {...commonProps} />
        New password<input name="newPass" {...commonProps} />
        Confirm new password<input name="newPassConfirm" {...commonProps} />
        <button type="submit">Submit</button>
      </form>
    )
  }
}

UpdatePasswordForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
}

export default UpdatePasswordForm
