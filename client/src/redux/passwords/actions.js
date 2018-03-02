export const GENERATE_PASSWORD = 'GENERATE_PASSWORD'
export const GENERATE_PASSWORD_PENDING = 'GENERATE_PASSWORD_PENDING'
export const GENERATE_PASSWORD_FULFILLED = 'GENERATE_PASSWORD_FULFILLED'
export const GENERATE_PASSWORD_REJECTED = 'GENERATE_PASSWORD_REJECTED'

export const generatePassword = () => ({
  type: GENERATE_PASSWORD,
  payload: {
    promise: fetch('/api/passwords').then(data => data.json())
  },
})
