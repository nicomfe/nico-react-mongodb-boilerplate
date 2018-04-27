import React from 'react'

const FormHoc = (InnerComponent) => {
  class FormWrapper extends React.Component {
    constructor() {
      super()
      this.state = { fields: {} }
    }

    handleChange = (event) => {
      const { name, value } = event.target
      const { fields } = this.state
      this.setState({
        fields: { ...fields, [name]: value },
      })
    }

    render() {
      const { fields } = this.state
      return <InnerComponent fields={fields} handleChange={this.handleChange} {...this.props} />
    }
  }
  return FormWrapper
}

export default FormHoc
