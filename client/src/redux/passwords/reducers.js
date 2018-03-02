import Immutable from 'immutable'
import { createReducer } from 'redux-immutablejs'

import { GENERATE_PASSWORD_FULFILLED } from './actions'

const initialState = Immutable.fromJS({
  lastGenerated: Immutable.List(),
})

export default createReducer(initialState, {
  [GENERATE_PASSWORD_FULFILLED]: (state, action) => {
    return state.set('lastGenerated', Immutable.fromJS(action.payload))
  }
})
