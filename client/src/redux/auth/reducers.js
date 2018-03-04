import Immutable from 'immutable'
import { createReducer } from 'redux-immutablejs'

import { LOGIN, LOGOUT, GET_CURRENT_SESSION } from './actions'
import { SUCCESS_SUFFIX, FAILURE_SUFFIX } from '../utils/promiseMiddleware'

const initialState = Immutable.fromJS({})

export default createReducer(initialState, {
  [`${LOGIN}${SUCCESS_SUFFIX}`]: (state, action) => {
    return state.set('currentUser', Immutable.fromJS(action.payload.response))
  },
  [`${GET_CURRENT_SESSION}${SUCCESS_SUFFIX}`]: (state, action) => {
    return state.set('currentUser', Immutable.fromJS(action.payload.response))
  },
  [`${LOGIN}${FAILURE_SUFFIX}`]: (state) => {
    return state.remove('currentUser')
  },
  [`${LOGOUT}${SUCCESS_SUFFIX}`]: state => state.remove('currentUser'),
})
