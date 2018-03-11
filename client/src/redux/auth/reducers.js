import Immutable from 'immutable'
import { createReducer } from 'redux-immutablejs'

import { SIGNUP, LOGIN, LOGOUT, GET_CURRENT_SESSION } from './actions'
import { SUCCESS_SUFFIX, FAILURE_SUFFIX } from '../utils/promiseMiddleware'

const initialState = Immutable.fromJS({})

export default createReducer(initialState, {
  [`${LOGIN}${SUCCESS_SUFFIX}`]: (state, action) => {
    const user = action.payload.response
    localStorage.setItem('currentUser', user._id)
    return state.set('currentUser', Immutable.fromJS(action.payload.response))
  },
  [`${SIGNUP}${SUCCESS_SUFFIX}`]: (state, action) => {
    const user = action.payload.response
    localStorage.setItem('currentUser', user._id)
    return state.set('currentUser', Immutable.fromJS(user))
  },
  [`${SIGNUP}${FAILURE_SUFFIX}`]: (state, action) => {
    alert(action.error.message)
    return state.remove('currentUser')
  },
  [`${GET_CURRENT_SESSION}${SUCCESS_SUFFIX}`]: (state, action) => {
    return state.set('currentUser', Immutable.fromJS(action.payload.response))
  },
  [`${LOGIN}${FAILURE_SUFFIX}`]: (state, action) => {
    localStorage.removeItem('currentUser')
    alert(action.error.message)
    return state.remove('currentUser')
  },
  [`${LOGOUT}${SUCCESS_SUFFIX}`]: (state) => {
    localStorage.removeItem('currentUser')
    return state.remove('currentUser')
  },
})
