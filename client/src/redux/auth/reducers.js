import Immutable from 'immutable'
import { createReducer } from 'redux-immutablejs'

import { SIGNUP, LOGIN, LOGOUT, GET_CURRENT_SESSION } from './actions'
import { SUCCESS_SUFFIX, FAILURE_SUFFIX } from '../utils/promiseMiddleware'

const initialState = Immutable.fromJS({})

const updateReducerReducer = (state, action) => {
  const user = action.payload.response
  if (user) {
    localStorage.setItem('currentUser', user._id)
    let _newState = state
    _newState = state.set('currentUser', Immutable.fromJS(user))
    if (_newState.has('all') && _newState.hasIn(['all', user._id])) {
      _newState = _newState.setIn(['all', user._id], Immutable.fromJS(user))
    }
    return _newState
  }
  return state
}

export default createReducer(initialState, {
  [`${LOGIN}${SUCCESS_SUFFIX}`]: (state, action) => {
    const user = action.payload.response
    localStorage.setItem('currentUser', user._id)
    return state.set('currentUser', Immutable.fromJS(action.payload.response))
  },
  [`${SIGNUP}${SUCCESS_SUFFIX}`]: (state) => {
    // const user = action.payload.response
    // localStorage.setItem('currentUser', user._id)

    // email not verified so we dont set current user
    return state.remove('currentUser')
  },
  [`${SIGNUP}${FAILURE_SUFFIX}`]: (state) => {
    return state.remove('currentUser')
  },
  [`${GET_CURRENT_SESSION}${SUCCESS_SUFFIX}`]: updateReducerReducer,
  [`${LOGIN}${FAILURE_SUFFIX}`]: (state) => {
    localStorage.removeItem('currentUser')
    return state.remove('currentUser')
  },
  [`${LOGOUT}${SUCCESS_SUFFIX}`]: (state) => {
    localStorage.removeItem('currentUser')
    return state.remove('currentUser')
  },
})
