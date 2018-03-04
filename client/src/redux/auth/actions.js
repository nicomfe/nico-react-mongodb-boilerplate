import { fetchRequest } from '../fetchUtil'

export const LOGIN = 'LOGIN'
export const LOGIN_REQUEST = 'LOGIN_REQUEST'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAILURE = 'LOGIN_FAILURE'

export const login = data => ({
  types: LOGIN,
  payload: { request: data },
  meta: {
    fetch: fetchRequest.bind(null, 'api/login_with_email_password', {
      body: JSON.stringify(data),
      method: 'POST',
    }),
  },
})
