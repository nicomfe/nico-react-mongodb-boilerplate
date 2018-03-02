export const GENERATE_PASSWORD_REQUEST = 'GENERATE_PASSWORD_REQUEST'
export const GENERATE_PASSWORD_SUCCESS = 'GENERATE_PASSWORD_SUCCESS'

export const generatePassword = (item) => {
  return (dispatch) => {
    dispatch(generatePasswordRequest(item))
    fetch('/api/passwords')
      .then(res => res.json())
      .then((data) => {
        dispatch(generatePasswordSuccess(data))
      })
  }
}

export const generatePasswordRequest = () => ({
  type: GENERATE_PASSWORD_REQUEST,
})

export const generatePasswordSuccess = (data) => ({
  type: GENERATE_PASSWORD_SUCCESS,
  payload: data,
})
