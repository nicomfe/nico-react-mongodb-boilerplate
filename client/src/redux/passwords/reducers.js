import Immutable from 'immutable'
import { createReducer } from 'redux-immutablejs'

import { GENERATE_PASSWORD } from './actions'
import { SUCCESS_SUFFIX } from '../utils/promiseMiddleware'

const initialState = Immutable.fromJS({
  lastGenerated: Immutable.List(),
})

export default createReducer(initialState, {
  [`${GENERATE_PASSWORD}${SUCCESS_SUFFIX}`]: (state, action) => {
    return state.set('lastGenerated', Immutable.fromJS(action.payload.response))
  },
})
