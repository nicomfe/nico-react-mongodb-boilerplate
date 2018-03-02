/**
 * Middlewares
 * Please read http://redux.js.org/docs/advanced/Middleware.html for more details
 **/

export const REQUEST_SUFFIX = '_REQUEST'
export const SUCCESS_SUFFIX = '_SUCCESS'
export const FAILURE_SUFFIX = '_FAILURE'

// This middleware handles all the fetch requests
// Dispatching a request action and then either a success or failure action
const fetch = store => next => (action) => {
  if (!action.meta || !action.meta.fetch) {
    return next(action)
  }

  if (action.meta.shouldFetch) {
    const alreadyFetchedValue = action.meta.shouldFetch(store.getState())
    if (alreadyFetchedValue) {
      return alreadyFetchedValue
    }
  }

  const REQUEST = `${action.types}${REQUEST_SUFFIX}`
  const SUCCESS = `${action.types}${SUCCESS_SUFFIX}`
  const FAILURE = `${action.types}${FAILURE_SUFFIX}`

  const { payload = {} } = action

  // dispatch request action
  next({ type: REQUEST, payload })

  return action.meta.fetch().then((response) => {
    let value = response
    if (value.error) {
      throw value.error
    }
    // dispatch success
    next({ type: SUCCESS, payload: { ...payload, response: value } })

    return value
  }).catch((error) => {
    // if console  only show <Cannot read property 'getHostNode' of null>
    // uncomnet this console.log for more details
    // console.error(error)

    next({
      type: FAILURE,
      error: {
        status: error.status,
        data: 'Bad request',
        ...error,
      },
      payload,
    })
  })
}

export default fetch
