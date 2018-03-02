import { createSelector } from 'reselect'

export const getAuth = state => state.get('auth')

export const getCurrentUser = createSelector(
  getAuth,
  auth => auth.get('currentUser')
)
