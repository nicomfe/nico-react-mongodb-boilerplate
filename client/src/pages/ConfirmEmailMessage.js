import React from 'react'
import Typography from '@material-ui/core/Typography'

import MasterPage from './MasterPage'

const ConfirmEmailMessage = () => (
  <MasterPage>
    <Typography variant="headline" gutterBottom align="center">
      Please check your email to confirm your account
    </Typography>
  </MasterPage>
)

export default ConfirmEmailMessage
