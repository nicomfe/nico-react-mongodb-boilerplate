import React from 'react'
import PropTypes from 'prop-types'

import FormHoc from '../../hocs/FormHoc'

class UpdatePasswordForm extends React.Component {
  handleSubmit = (event) => {
    event.preventDefault()
    const { handleSubmit, fields } = this.props
    handleSubmit({ ...fields })
  }

  render() {
    const { handleChange } = this.props
    const commonProps = {
      type: 'password',
      required: true,
      onChange: handleChange,
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
  handleChange: PropTypes.func.isRequired,
  fields: PropTypes.object.isRequired,
}

export default FormHoc(UpdatePasswordForm)
