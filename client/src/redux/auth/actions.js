import { fetchRequest } from '../fetchUtil'

export const LOGIN = 'LOGIN'
export const LOGOUT = 'LOGOUT'

export const login = data => ({
  types: LOGIN,
  payload: { request: data },
  meta: {
    fetch: fetchRequest.bind(null, '/api/login_with_email_password', {
      body: JSON.stringify(data),
      method: 'POST',
    }),
  },
})

export const logout = () => ({
  types: LOGOUT,
  meta: {
    fetch: fetchRequest.bind(null, '/api/logout', { method: 'POST' }),
  },
})
