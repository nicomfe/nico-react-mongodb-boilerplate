import { fetchRequest } from '../fetchUtil'

export const UPDATE_PASSWORD = 'UPDATE_PASSWORD'
export const LOGIN = 'LOGIN'
export const LOGOUT = 'LOGOUT'
export const SIGNUP = 'SIGNUP'
export const GET_CURRENT_SESSION = 'GET_CURRENT_SESSION'
export const VERIFY_ACCOUNT = 'VERIFY_ACCOUNT'
export const CREATE_PASSWORD = 'CREATE_PASSWORD'
export const FORGOT_PASSWORD = 'FORGOT_PASSWORD'

export const login = data => ({
  types: LOGIN,
  payload: { request: data },
  meta: {
    fetch: fetchRequest.bind(null, '/api/auth/login_with_email_password', {
      body: JSON.stringify(data),
      method: 'POST',
    }),
  },
})

export const signup = data => ({
  types: SIGNUP,
  payload: { request: data },
  meta: {
    fetch: fetchRequest.bind(null, '/api/auth/create_user', {
      body: JSON.stringify(data),
      method: 'POST',
    }),
  },
})

export const forgotPassword = data => ({
  types: FORGOT_PASSWORD,
  payload: { request: data },
  meta: {
    fetch: fetchRequest.bind(null, '/api/auth/forgot_password', {
      body: JSON.stringify(data),
      method: 'POST',
    }),
  },
})


export const logout = () => ({
  types: LOGOUT,
  meta: {
    fetch: fetchRequest.bind(null, '/api/auth/logout', { method: 'POST' }),
  },
})

export const updatePassword = data => ({
  types: UPDATE_PASSWORD,
  meta: {
    fetch: fetchRequest.bind(null, '/api/auth/update_password', {
      body: JSON.stringify(data),
      method: 'PATCH',
    }),
  },
})

export const createPassword = data => ({
  types: CREATE_PASSWORD,
  meta: {
    fetch: fetchRequest.bind(null, '/api/auth/create_password', {
      body: JSON.stringify(data),
      method: 'POST',
    }),
  },
})

export const getCurrentSession = () => ({
  types: GET_CURRENT_SESSION,
  meta: {
    fetch: fetchRequest.bind(null, '/api/auth/get_current_session'),
  },
})

export const verifyAccount = data => ({
  types: VERIFY_ACCOUNT,
  meta: {
    fetch: fetchRequest.bind(null, '/api/auth/verify_account', {
      body: JSON.stringify(data),
      method: 'PATCH',
    }),
  },
})
