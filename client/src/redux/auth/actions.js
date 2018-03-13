import { fetchRequest } from '../fetchUtil'

export const LOGIN = 'LOGIN'
export const LOGOUT = 'LOGOUT'
export const SIGNUP = 'SIGNUP'
export const GET_CURRENT_SESSION = 'GET_CURRENT_SESSION'
export const VERIFY_ACCOUNT = 'VERIFY_ACCOUNT'

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

export const signup = data => ({
  types: SIGNUP,
  payload: { request: data },
  meta: {
    fetch: fetchRequest.bind(null, '/api/create_user', {
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

export const getCurrentSession = () => ({
  types: GET_CURRENT_SESSION,
  meta: {
    fetch: fetchRequest.bind(null, '/api/get_current_session'),
  },
})

export const verifyAccount = data => ({
  types: VERIFY_ACCOUNT,
  meta: {
    fetch: fetchRequest.bind(null, '/api/verify_account', {
      body: JSON.stringify(data),
      method: 'POST',
    }),
  },
})
