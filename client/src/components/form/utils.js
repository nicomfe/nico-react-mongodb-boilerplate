import React from 'react'
import TextField from '@material-ui/core/TextField'

export const renderTextField = props => (
  <TextField {...props} margin="normal" />
)

export const renderEmailField = props => (
  renderTextField({ label: 'Email', type: 'text', name: 'email', ...props })
)

export const renderPasswordField = props => (
  renderTextField({ label: 'Password', type: 'password', name: 'password', ...props })
)
