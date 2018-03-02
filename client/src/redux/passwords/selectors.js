import { createSelector } from 'reselect'

export const getPassword = state => state.get('password')

export const getLastPassword = createSelector(
  getPassword,
  password => password.get('lastGenerated')
)
